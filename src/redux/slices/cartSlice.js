import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  } catch {
    return [];
  }
};
const initialState = {
    items: loadCart(),
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

            // Save to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.items));
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