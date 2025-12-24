import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { logout, setAuth } from "../authSlice";

// Auth middleware: handles 401 errors and token refresh
const authMiddleware: Middleware = (store) => (next) => async (action) => {
  // Pass the action first
  const result = next(action);

  // Example: handle rejected actions globally (using RTK createAsyncThunk pattern)
  if (isRejectedWithValue(action)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = action.payload as unknown;
    if (typeof error === "object" && error !== null && "status" in error) {
      const status = (error as { status: number }).status;
      if (status === 401) {
        try {
          const refreshToken = store.getState().auth.token; // or use separate refresh token
          if (refreshToken) {
            const res = await axiosClient.post("/Auth/refresh-token", {
              token: refreshToken,
            });
            store.dispatch(setAuth({ token: res.data.token }));
          } else {
            store.dispatch(logout());
          }
        } catch {
          store.dispatch(logout());
        }
      }
    }

    return result;
  }
};
export default authMiddleware;
// export const authMiddleware: Middleware =
//   (store) => (next) => async (action) => {
//     // Pass the action
//     const result = next(action);

//     // Example: intercept API calls or check 401 globally
//     if (
//       action.type.endsWith("/rejected") &&
//       action.error?.message === "Unauthorized"
//     ) {
//       try {
//         // Attempt token refresh
//         const refreshToken = store.getState().auth.token; // you may store refresh token separately
//         if (refreshToken) {
//           const res = await axiosClient.post("/Auth/refresh-token", {
//             token: refreshToken,
//           });
//           store.dispatch(setAuth({ token: res.data.token }));
//         } else {
//           store.dispatch(logout());
//         }
//       } catch {
//         store.dispatch(logout());
//       }
//     }

//     return result;
//   };
