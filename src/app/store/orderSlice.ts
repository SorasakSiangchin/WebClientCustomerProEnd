
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Result } from "../models/Interfaces/IResponse";
import { Order, OrderParams, OrderRequest } from "../models/Order";
import { RootState } from "./configureStore";
import { MetaData } from '../../app/models/Pagination';

interface OrderState {
    orders: Order[] | null,
    ordersLoaded: boolean,
    orderParams: OrderParams,
    metaData: MetaData | null;
};

export const fetchOrderByIdAccountAsync = createAsyncThunk<Result, any>("order/fetchOrderByIdAccountAsync",
    async (idAccount, thunkAPI) => {
        try {
            const result: Result = await agent.Order.getByIdAccount(idAccount);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const crateOrderAsync = createAsyncThunk<Result, OrderRequest>("order/crateOrderAsync", async (value, thunkAPI) => {
    try {
        const result: Result = await agent.Order.create(value);
        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});

export const updateOrderAsync = createAsyncThunk<Result, any>("order/updateOrderAsync", async (value, thunkAPI) => {
    try {
        const result: Result = await agent.Order.update(value);
        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});

export const fetchOrderAsync = createAsyncThunk<Result, any>(
    "product/fetchProduct",
    async (orderId, thunkAPI) => {
        try {
            const result: Result = await agent.Order.detail(orderId);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchOrdersAsync = createAsyncThunk<Order[], void, { state: RootState }>(
    'order/fetchOrdersAsync',
    async (_, thunkAPI) => {
        const params = thunkAPI.getState().order.orderParams;
        try {
            const result = await agent.Order.list(params);
            const orders = result.items.result;
            thunkAPI.dispatch(setMetaData(result.metaData));
            return orders;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

const orderAdapter = createEntityAdapter<Order>();

export const initParams = (): OrderParams => {
    return {
        pageNumber: 1,
        pageSize: 9,
        accountId: "",
        id: "",
        orderCancel: "",
        orderStatus: "",
        sellerId: "",
        orderUsage: "" ,
        haveEvidence : false,
    }
};

export const orderSlice = createSlice({
    name: "order",
    initialState: orderAdapter.getInitialState<OrderState>({
        orders: null,
        ordersLoaded: false,
        orderParams: initParams(),
        metaData: null
    }),
    reducers: {
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        setParams: (state, action) => {
            state.ordersLoaded = false; // เพื่อ Product มัน reload ใหม่
            state.orderParams = { ...state.orderParams, ...action.payload };
        },
        resetOrder: (state) => {
            state.ordersLoaded = false;
        },
        resetParams: (state) => {
            state.ordersLoaded = false;
            state.orderParams = initParams();
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
            const { isSuccess, statusCode, result } = action.payload;
            if (isSuccess === true && statusCode === 200) orderAdapter.upsertOne(state, result);
        });
        builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
            orderAdapter.setAll(state, action.payload); // set products
            state.ordersLoaded = true;
        });
        builder.addCase(updateOrderAsync.fulfilled, (state, action) => {
            state.ordersLoaded = true;
        });
    },
});

export const { resetOrder, setMetaData, setParams, resetParams } = orderSlice.actions;

export const orderSelectors = orderAdapter.getSelectors((state: RootState) => state.order); 