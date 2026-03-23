import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

// created the store and added the product reducer to it
export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer
    }
})  