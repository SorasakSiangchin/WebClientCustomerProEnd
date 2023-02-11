import { createSlice } from "@reduxjs/toolkit";

interface HomeState {
    showLayout: boolean;
}

const initialState: HomeState = {
    showLayout: false
}

export const homeSlice = createSlice({
    name: "home",
    initialState ,
    reducers: {
        setShowLayout : (state , action) => {
            state.showLayout = action.payload
        }
    },
    extraReducers: builder => {

    },
});

export const { setShowLayout } = homeSlice.actions;