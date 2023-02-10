import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { DetailProduct } from "../models/DetailProduct";
import { Result } from "../models/Interfaces/IResponse";

interface DetailProductState {
    detailProduct: DetailProduct | null,
    detailProductLoaded: boolean;

}

const initialState: DetailProductState = {
    detailProduct: null,
    detailProductLoaded: false
}

export const createDetailProductByIdProduct = createAsyncThunk<Result, any>("detailProduct/createDetailProductByIdProduct",
    async (value, thunkAPI) => {
        try {
            return await agent.DetailProduct.create(value);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const updateDetailProductByIdProduct = createAsyncThunk<Result, any>("detailProduct/updateDetailProductByIdProduct",
    async (value, thunkAPI) => {
        try {
            return await agent.DetailProduct.update(value);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });
export const fetchDetailProductByIdProduct = createAsyncThunk<Result, any>("detailProduct/fetchDetailProductByIdProduct",
    async (idProduct, thunkAPI) => {
        try {
            return await agent.DetailProduct.getByIdProduct(idProduct);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const detailProductSlice = createSlice({
    name: "detailProduct",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(isAnyOf(createDetailProductByIdProduct.fulfilled, updateDetailProductByIdProduct.fulfilled), (state, action) => {
            const { isSuccess } = action.payload;
            if (isSuccess === true) state.detailProductLoaded = false;
        });
    },
});

const { } = detailProductSlice.actions;