import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { RootState } from "../store";
import { API_BASE_URL, STORAGE_KEYS } from "../../constants/commonConstant";

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL + "/api",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token || localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithAuth: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: [],
  endpoints: () => ({}), // Endpoints defined in individual API files
});
