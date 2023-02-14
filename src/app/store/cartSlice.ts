import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Cart } from "../../app/models/Cart";
import { Result } from "../../app/models/Interfaces/IResponse";

interface CartState {
    cart: Cart | null;
    status: string;
}

const initialState: CartState = {
    cart: null,
    status: ""
}

export const fetchCartAsync = createAsyncThunk<Cart, string>("cart/fetchCartAsync", async (accountId, thunkAPI) => {
    try {
        const { result }: Result = await agent.Cart.get(accountId);
        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const addCartItemAsync = createAsyncThunk<Cart, { productId: string, accountId?: string, amount?: number }>("cart/addCartItemAsync",
    async ({ productId, accountId, amount }, thunkAPI) => {
        try {
            const { result } = await agent.Cart.addItem({ productId, accountId, amount });
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    });

export const removeCartItemAsync = createAsyncThunk<void, { productId: string, accountId?: string, amount?: number, name?: string }>("cart/removeCartItemAsync",
    async ({ productId, accountId, amount }, thunkAPI) => {
        try {
            return await agent.Cart.removeItem({ productId, accountId, amount });
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    });

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        clearCart: (state) => {
            state.cart = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
            const { productId, amount } = action.meta.arg; // ค่าที่ส่งมา
            const itemIndex = state.cart?.items.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.cart!.items[itemIndex].amount -= Number(amount);
            if (state.cart?.items[itemIndex].amount === 0)
                state.cart.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeCartItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeCartItemAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addCartItemAsync.fulfilled, fetchCartAsync.fulfilled), (state, action) => {
            state.cart = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addCartItemAsync.rejected, fetchCartAsync.rejected), (state, action) => {
            state.status = 'idle';
        });
    }
});

export const { setCart, clearCart } = cartSlice.actions;