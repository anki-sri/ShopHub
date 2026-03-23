import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}    
const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product:item, quantity } = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);

            if(existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({...item, quantity});
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.items.find((i) => i.id === itemId);

            if (existingItem) {
                state.items = state.items.filter((i) => i.id !== itemId);
            }
        },
    }   
})

export default cartReducer.reducer;

export const { addToCart, removeFromCart } = cartReducer.actions;