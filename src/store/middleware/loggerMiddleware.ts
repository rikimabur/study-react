import type { Middleware, PayloadAction } from "@reduxjs/toolkit";

// Logger middleware: logs actions and state (development only)
export const loggerMiddleware: Middleware =
  (store) => (next) => (action: unknown) => {
    const act = action as PayloadAction<unknown>;
    if (process.env.NODE_ENV === "development") {
      console.groupCollapsed(`Action: ${act.type}`);
      console.log("Previous state:", store.getState());
      console.log("Action payload:", action);
    }
    const result = next(action);
    if (process.env.NODE_ENV === "development") {
      console.log("Next state:", store.getState());
      console.groupEnd();
    }

    return result;
  };
