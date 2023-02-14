
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Result } from "../models/Interfaces/IResponse";
import { Order, OrderRequest } from "../models/Order";
import { RootState } from "./configureStore";

interface OrderState {
    orders: Order[] | null,
    ordersLoaded: boolean
};
const initialState: OrderState = {
    orders: null,
    ordersLoaded: false
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

const orderAdapter = createEntityAdapter<Order>();

export const orderSlice = createSlice({
    name: "order",
    initialState: orderAdapter.getInitialState<OrderState>({
        orders: null,
        ordersLoaded: false
    }),
    reducers: {
        resetOrder: (state) => {
            state.ordersLoaded = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchOrderByIdAccountAsync.fulfilled, (state, action) => {
            const { result, isSuccess, statusCode } = action.payload;
            if (isSuccess === true && statusCode === 200) {
                orderAdapter.setAll(state, result);
                // state.orders = result;
                state.ordersLoaded = true;
            };
        });
        builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
            const { isSuccess, statusCode, result } = action.payload;
            if (isSuccess === true && statusCode === 200) {
                orderAdapter.upsertOne(state, result);
            }
        });
    },
});

export const { resetOrder } = orderSlice.actions;

export const orderSelectors = orderAdapter.getSelectors((state: RootState) => state.order); 