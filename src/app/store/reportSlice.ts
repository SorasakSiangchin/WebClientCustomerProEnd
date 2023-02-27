import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Result } from "../models/Interfaces/IResponse";
import { ProductStatistics, SalesStatistics } from "../models/Report";

interface ReportState {
    productStatistics: ProductStatistics[] | null;
    productStatisticsLoaded: boolean;
    salesStatistics: SalesStatistics | null;
    salesStatisticsLoaded: boolean;
};

const initialState: ReportState = {
    productStatistics: null,
    productStatisticsLoaded: false,
    salesStatistics: null,
    salesStatisticsLoaded: false
};

export const fetchProductStatisticsAsync = createAsyncThunk<Result, any>(
    'report/fetchProductStatisticsAsync',
    async (value, thunkAPI) => {
        try {
            const result = await agent.Report.getProductStatistics(value);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchSalesStatisticsAsync = createAsyncThunk<Result, any>(
    'report/fetchSalesStatisticsAsync',
    async (value, thunkAPI) => {
        try {
            const result = await agent.Report.getSalesStatistics(value);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        reSetProductStatistics: (state) => {
            state.productStatisticsLoaded = false;
            state.productStatistics = null;
        } ,
        reSetSalesStatistics: (state) => {
            state.salesStatisticsLoaded = false;
            state.salesStatistics = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProductStatisticsAsync.fulfilled, (state, action) => {
            const { isSuccess, result, statusCode } = action.payload;
            if (isSuccess === true && statusCode === 200) {
                state.productStatistics = result;
                state.productStatisticsLoaded = true;
            }
        });

        builder.addCase(fetchSalesStatisticsAsync.fulfilled, (state, action) => {
            const { isSuccess, result, statusCode } = action.payload;
            if (isSuccess === true && statusCode === 200) {
                state.salesStatistics = result;
                state.salesStatisticsLoaded = true;
            }
        });


    }
});

export const { reSetProductStatistics , reSetSalesStatistics } = reportSlice.actions;