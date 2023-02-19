
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { EvidenceMoneyTransfer } from "../models/EvidenceMoneyTransfer";
import { Result } from "../models/Interfaces/IResponse";

interface EvidenceMoneyTransferState {
    evidenceMoneyTransfer: EvidenceMoneyTransfer | null
    evidenceMoneyTransferLoaded: boolean;
    evidenceMoneyTransferCancel: EvidenceMoneyTransfer[] | null
    evidenceMoneyTransferCancelLoaded: boolean;
}

const initialState: EvidenceMoneyTransferState = {
    evidenceMoneyTransfer: null,
    evidenceMoneyTransferLoaded: false,
    evidenceMoneyTransferCancel: null,
    evidenceMoneyTransferCancelLoaded: false
}

export const createEvidenceMoneyTransferAsync = createAsyncThunk<Result, any>("evidenceMoneyTransfer/createEvidenceMoneyTransferAsync",
    async (value, thunkAPI) => {
        try {
            return await agent.EvidenceMoneyTransfer.create(value);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const fetchEvidenceMoneyTransferAsync = createAsyncThunk<Result, any>("evidenceMoneyTransfer/fetchEvidenceMoneyTransferAsync",
    async (orderId, thunkAPI) => {
        try {
            return await agent.EvidenceMoneyTransfer.get(orderId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const fetchEvidenceMoneyTransferCancelAsync = createAsyncThunk<Result, any>("evidenceMoneyTransfer/fetchEvidenceMoneyTransferCancelAsync",
    async (orderId, thunkAPI) => {
        try {
            return await agent.EvidenceMoneyTransfer.getCancel(orderId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const updateEvidenceMoneyTransferAsync = createAsyncThunk<Result, any>("evidenceMoneyTransfer/updateEvidenceMoneyTransferAsync",
    async (value, thunkAPI) => {
        try {
            return await agent.EvidenceMoneyTransfer.update(value);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const evidenceMoneyTransferSlice = createSlice({
    name: "evidenceMoneyTransfer",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchEvidenceMoneyTransferAsync.fulfilled, (state, action) => {
            const { isSuccess, result, statusCode } = action.payload;
            if (isSuccess === true && statusCode === 200) {
                state.evidenceMoneyTransfer = result;
                state.evidenceMoneyTransferLoaded = true;
            };
        });
        builder.addCase(fetchEvidenceMoneyTransferCancelAsync.fulfilled, (state, action) => {
            const { isSuccess, result, statusCode } = action.payload;
            if (isSuccess === true && statusCode === 200) {
                state.evidenceMoneyTransferCancel = result;
                state.evidenceMoneyTransferCancelLoaded = true;
            };
        });
        // builder.addCase(fetchEvidenceMoneyTransferAsync.fulfilled, (state, action) => {
        //     const { isSuccess, result, statusCode } = action.payload;
        //     if (isSuccess === true && statusCode === 200) {
        //         state.evidenceMoneyTransfer = result;
        //         state.evidenceMoneyTransferLoaded = true;
        //     };
        // });
        builder.addMatcher(isAnyOf(createEvidenceMoneyTransferAsync.fulfilled, updateEvidenceMoneyTransferAsync.fulfilled), (state, action) => {
            const { isSuccess } = action.payload;
            if (isSuccess === true) state.evidenceMoneyTransferLoaded = false;
        });
    },
});

const { } = evidenceMoneyTransferSlice.actions;