import { createSlice } from "@reduxjs/toolkit";
import { isTokenExpired } from "../utils/jwtUtility";
import { STORAGE_KEYS } from "../constants/commonConstant";
import type { AuthData } from "../models/rootModel";
import type { RootState } from "../store";
interface AuthState {
  authData: AuthData | null;
  token: string | null;
  isAuthenticated: boolean;
}
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
      authData: null,
      token: null,
      isAuthenticated: false,
    };
  }

  let authData: AuthData | null = null;
  if (storedUser && storedUser !== "undefined" && storedUser != "null") {
    try {
      authData = JSON.parse(storedUser) as AuthData;
    } catch {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }

  return {
    authData,
    token: storedToken,
    isAuthenticated: Boolean(storedToken && authData?.user),
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { ...(getInitialAuthState() as AuthState) },
  reducers: {
    setAuth: (state, action) => {
      const { result, token }: { result: AuthData; token: string } =
        action.payload;
      state.authData = result;
      state.token = token;
      state.isAuthenticated = result?.isAuthenticated;
      if (token) localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      if (result.user)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(result));
    },
    logout: (state) => {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      state.authData = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
