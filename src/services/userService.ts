import type { UserItem, UserPaginationApiResponse } from "../models/rootModel";
import { deleteRequest, getRequest } from "../api/apiClient";
const API_URL = import.meta.env.VITE_API_URL;

export const userService = {
  get: async (
    skip: number = 0,
    limit: number = 10
  ): Promise<UserPaginationApiResponse<UserItem>> => {
    const params = new URLSearchParams();
    params.append("skip", skip.toString());
    params.append("limit", limit.toString());

    const res = await getRequest<UserPaginationApiResponse<UserItem>>(
      `${API_URL}/users?${params.toString()}`
    );
    return res;
  },
  delete: async (id: number): Promise<UserItem> => {
    const res = await deleteRequest<UserItem>(`${API_URL}/users/${id}`);
    return res;
  },
};
