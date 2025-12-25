import { CreateFavoriteDto, Favorite } from "@/types/favorite";
import { apiClient } from "./api-client";

export const favoritesApi = {
  getAll: () => apiClient.get<Favorite[]>("/favorites"),
  getByUserId: (userId: number) =>
    apiClient.get<Favorite[]>(`/favorites/user/${userId}`),
  create: (data: CreateFavoriteDto) =>
    apiClient.post<Favorite>("/favorites", data),
  delete: (resortId: number) =>
    apiClient.delete<void>(`/favorites/${resortId}`),
};
