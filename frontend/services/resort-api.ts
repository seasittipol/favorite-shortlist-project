import { PaginatedResponse, ResortWithFavorite } from "@/types/resort";
import { apiClient } from "./api-client";

export const resortApi = {
  getAll: (page?: number, pageSize?: number) => {
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("pageSize", pageSize.toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiClient.get<PaginatedResponse<ResortWithFavorite>>(
      `/resorts${query}`
    );
  },
};
