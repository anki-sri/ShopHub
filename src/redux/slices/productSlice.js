import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false,
    error: null,
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (__, thunkAPI) => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;   
        })    
    }
})

export const {setProducts, setLoading, setError} = productSlice.actions;

export default productSlice.reducer;