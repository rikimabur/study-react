// src/utils/mockStore.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";

export type RootState = { auth: ReturnType<typeof authReducer> };

export const mockStore = (preloadedState: RootState) =>
  configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });
