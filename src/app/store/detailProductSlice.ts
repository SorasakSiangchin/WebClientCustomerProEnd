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

export const createDetailProductAsync = createAsyncThunk<Result, any>("detailProduct/createDetailProductAsync",
    async (value, thunkAPI) => {
        try {
            return await agent.DetailProduct.create(value);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const updateDetailProductAsync = createAsyncThunk<Result, any>("detailProduct/updateDetailProductAsync",
    async (value, thunkAPI) => {
        try {
            return await agent.DetailProduct.update(value);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const deleteDetailProductAsync = createAsyncThunk<Result, any>("detailProduct/deleteDetailProductAsync",
    async (id, thunkAPI) => {
        try {
            const result = await agent.DetailProduct.delete(id);
            return result ;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const fetchDetailProductByIdProductAsync = createAsyncThunk<Result, any>("detailProduct/fetchDetailProductByIdProductAsync",
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
    reducers: {
        reSetDetailProduct: (state) => {
            state.detailProduct = null;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchDetailProductByIdProductAsync.fulfilled, (state, action) => {
            const { isSuccess, result } = action.payload;
            if (isSuccess === true) {
                state.detailProduct = result;
                state.detailProductLoaded = true;
            };
        });
        builder.addMatcher(isAnyOf(createDetailProductAsync.fulfilled, updateDetailProductAsync.fulfilled , deleteDetailProductAsync.fulfilled ), (state, action) => {
            const { isSuccess } = action.payload;
            if (isSuccess === true) state.detailProductLoaded = false;
        });

    },
});

export const { reSetDetailProduct } = detailProductSlice.actions;