import { createSlice } from "@reduxjs/toolkit";
import { isTokenExpired } from "../utils/jwtUtility";
import { STORAGE_KEYS } from "../constants/commonConstant";
import type { AuthData } from "../models/rootModel";
import type { RootState } from "../store";
const getInitialAuthState = () => {
  const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
  if (
    !storedToken ||
    storedToken === "undefined" ||
    storedToken === "null" ||
    isTokenExpired(storedToken)
  ) {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    return {
      authData: undefined,
      token: undefined,
      isAuthenticated: false,
    };
  }

  let authData = undefined;
  if (storedUser && storedUser !== "undefined" && storedUser != "null") {
    try {
      authData = JSON.parse(storedUser) as AuthData;
    } catch {
      if (authData) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authData));
      }
    }
  }

  return {
    authData,
    token: storedToken,
    isAuthenticated: !!storedToken && !!authData,
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { ...getInitialAuthState() },
  reducers: {
    setAuth: (state, action) => {
      const { user, token } = action.payload;
      state.authData = user;
      state.token = token;
      state.isAuthenticated = !!(user && token);
      if (token) localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    },
    logout: (state) => {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      state.authData = undefined;
      state.token = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
