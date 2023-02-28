import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ResultProps } from "antd";
import agent from "../api/agent";
import { Delivery, StatusDelivery } from "../models/Delivery";
import { Result } from "../models/Interfaces/IResponse";
import { RootState } from "./configureStore";

interface DeliveryState {
    delivery: Delivery | null;
    deliveryLoaded: boolean;
    statusDelivery: StatusDelivery[] | null;
    statusDeliveryLoaded: boolean;

};

const deliverysAdapter = createEntityAdapter<Delivery>();

export const fetchStatusDeliverysAsync = createAsyncThunk("delivery/fetchStatusDeliverysAsync",
    async (_, thunkAPI) => {
        try {
            const { result }: Result = await agent.StatusDelivery.list();
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const fetchDeliveryByOrderIdAsync = createAsyncThunk<Result, string>("delivery/fetchDeliveryByOrderIdAsync",
    async (orderId, thunkAPI) => {
        try {
            const result: Result = await agent.Delivery.getByIdOrder(orderId);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });
export const createDeliveryAsync = createAsyncThunk<Result, any>("delivery/createDeliveryAsync", async (delivery, thunkAPI) => {
    try {
        const results: Result = await agent.Delivery.create(delivery);
        return results;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});

export const updateDeliveryAsync = createAsyncThunk<Result, any>("delivery/updateDeliveryAsync", async (delivery, thunkAPI) => {
    try {
        const results: Result = await agent.Delivery.update(delivery);
        return results;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});

export const deliverySlice = createSlice({
    name: "delivery",
    initialState: deliverysAdapter.getInitialState<DeliveryState>({
        delivery: null,
        deliveryLoaded: false,
        statusDelivery: null,
        statusDeliveryLoaded: false
    }),
    reducers: {
        resetStatusDelivery: (state) => {
            state.deliveryLoaded = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchStatusDeliverysAsync.fulfilled, (state, action) => {
            state.statusDelivery = action.payload;
            state.statusDeliveryLoaded = true;
        });
        builder.addCase(fetchDeliveryByOrderIdAsync.fulfilled, (state, action) => {
            const { isSuccess, result, statusCode } = action.payload;
            if (isSuccess === true && statusCode === 200) {
                deliverysAdapter.upsertOne(state, result);
            }
        });
        builder.addMatcher(isAnyOf(createDeliveryAsync.fulfilled, updateDeliveryAsync.fulfilled), (state, action) => {
            const { isSuccess } = action.payload;
            if (isSuccess === true) state.deliveryLoaded = false;
        });
    }
});

export const { resetStatusDelivery } = deliverySlice.actions;
export const deliverySelectors = deliverysAdapter.getSelectors((state: RootState) => state.delivery); 