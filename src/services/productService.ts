import type { PaginationResult, Product } from "../models/rootModel";

const API_URL = import.meta.env.VITE_API_URL;

export const productService = {
  getProducts: async (
    skip: number = 0,
    limit: number = 10
  ): Promise<PaginationResult<Product>> => {
    const params = new URLSearchParams();
    params.append("skip", skip.toString());
    params.append("limit", limit.toString());
    const res = await fetch(`${API_URL}/products?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData?.errorMessages?.[0] || "Failed to load products");
    }

    const data: PaginationResult<Product> = await res.json();
    return data;
  },

  getProductsByCategory: async (categoryName: string) => {
    const res = await fetch(`${API_URL}/products/category/${categoryName}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data: PaginationResult<Product> = await res.json();
    return data.products;
  },
  getSearchProducts: async (keyword: string) => {
    const res = await fetch(`${API_URL}/products/search?q=${keyword}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data: PaginationResult<Product> = await res.json();
    return data.products;
  },
};
