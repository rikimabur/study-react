import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import ProductReducer from "./productSlice";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import authMiddleware from "./middleware/authMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: ProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware, loggerMiddleware),
  devTools: true,
});
export default store;
