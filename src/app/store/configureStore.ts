import { addressSlice } from './../../features/address/addressSlice';
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";
import { accountSlice } from "../../features/account/accountSlice";
import { cartSlice } from "../../features/cart/cartSlice";
import { productSlice } from "../../features/product/productSlice";

export const store = configureStore({
    reducer:{
       account : accountSlice.reducer ,
       product : productSlice.reducer ,
       cart : cartSlice.reducer ,
       address : addressSlice.reducer 
    }
})

//เป็นค่า Default ที่มีอยู่ใน store คือ store.getState, store.dispatch (ใช้ตามรูปแบบเขาเลย)
export type RootState = ReturnType<typeof store.getState>	// ค่าของ state ทั้งหมด
export type AppDispatch = typeof store.dispatch;			// dispatch สำหรับเรียก action

export const useAppDispatch = ()=> useDispatch<AppDispatch>()
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector
