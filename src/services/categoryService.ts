import type { Category } from "../models/rootModel";

const API_URL = import.meta.env.VITE_API_URL;

export const categoryService = {
  getCategories: async () => {
    const res = await fetch(`${API_URL}/products/categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const categories: Category[] = await res.json();
    return categories;
  },
};
