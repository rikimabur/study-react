import type { OrderRequest, OrderResponse } from "../models/rootModel";

const API_URL = import.meta.env.VITE_API_URL;

export const orderService = {
  createOrder: async (request: OrderRequest) => {
    const res = await fetch(`${API_URL}/carts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    const orderResponse: OrderResponse[] = await res.json();
    if (!res.ok) {
      switch (res.status) {
        case 400:
          throw new Error(
            res.statusText || "Bad Request: Please check your order data."
          );
        case 404:
          throw new Error(
            res.statusText || "Not Found: API endpoint not found."
          );
        case 503:
          throw new Error(
            res.statusText || "Service Unavailable: Try again later."
          );
        default:
          throw new Error(
            `Unexpected error: ${res.statusText} (${res.status})`
          );
      }
    }
    return orderResponse;
  },
};
