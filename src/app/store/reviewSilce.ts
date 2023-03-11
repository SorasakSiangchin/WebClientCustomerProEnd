import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Result } from "../models/Interfaces/IResponse";
import { MetaData } from "../models/Pagination";
import { ReviewParams, ReviewResponse } from "../models/Review";
import { RootState } from "./configureStore";

const initParams = (): ReviewParams => {
    return {
        pageNumber : 1 ,
        pageSize : 5 ,
        productId : "",
        score : 0
    };
};

interface ReviewState {
    reviews: ReviewResponse | null;
    reviewsLoaded: boolean;
    reviewParams : ReviewParams;
    metaData: MetaData | null;
};

const initialState: ReviewState = {
    reviews: null,
    reviewsLoaded: false,
    reviewParams : initParams(),
    metaData : null
};

export const fetchReviewByProductIdAsync = createAsyncThunk<Result, void, { state: RootState }>(
    "review/fetchReviewByProductIdAsync",
    async (_, thunkAPI) => {
        const params = thunkAPI.getState().review.reviewParams;
        try {
            const { items , metaData } = await agent.Review.getByIdProduct(params);
            thunkAPI.dispatch(setMetaData(metaData));
            return items;
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
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        setParams: (state, action) => {
            state.reviewsLoaded = false;
            state.reviewParams = { ...state.reviewParams, ...action.payload };
        },
        resetReviewByProductId: (state) => {
            state.reviews = null;
            state.reviewParams = initParams();
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

export const { resetReviewByProductId , setMetaData , setParams} = reviewSlice.actions;