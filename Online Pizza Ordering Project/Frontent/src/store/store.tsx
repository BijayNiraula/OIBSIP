import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import controlEditMenuModalReducer from './slices/controlEditMenuModalSlice';
import menuReducer from "./slices/menuSlice";
import orderReducer from "./slices/orderSlice";
export const store = configureStore({
    reducer: {
       auth:authReducer,
       carts:cartReducer,
       menu:menuReducer,
       orders:orderReducer,
       controlEditMenuModal:controlEditMenuModalReducer

    }
})