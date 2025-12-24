import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductModel } from "../models/product/ProductModel";
interface ProductState {
  products: ProductModel[];
  loading: boolean;
  error?: string;
}

const initialState: ProductState = { products: [], loading: false };

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductModel[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
