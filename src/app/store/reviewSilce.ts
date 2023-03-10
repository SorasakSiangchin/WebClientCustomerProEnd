import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Result } from "../models/Interfaces/IResponse";
import { ReviewResponse } from "../models/Review";

interface ReviewState {
    reviews: ReviewResponse | null;
    reviewsLoaded: boolean;
};

const initialState: ReviewState = {
    reviews: null,
    reviewsLoaded: false,
};

export const fetchReviewByProductIdAsync = createAsyncThunk<Result, any>(
    "review/fetchReviewByProductIdAsync",
    async (productId, thunkAPI) => {
        try {
            const result: Result = await agent.Review.getByIdProduct(productId);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const createReviewAsync = createAsyncThunk<Result, any>(
    "review/createReviewAsync",
    async (value, thunkAPI) => {
        try {
            const result: Result = await agent.Review.create(value);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        resetReviewByProductId: (state) => {
            state.reviews = null;
            state.reviewsLoaded = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchReviewByProductIdAsync.fulfilled, (state, action) => {
            const { isSuccess, result, statusCode } = action.payload;
            if (isSuccess && statusCode === 200) {
                state.reviews = result;
                state.reviewsLoaded = true;
            };
        });
    }
});

export const { resetReviewByProductId } = reviewSlice.actions;