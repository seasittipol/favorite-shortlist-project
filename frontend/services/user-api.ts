import { User } from "@/types/user";
import { apiClient } from "./api-client";

export const usersApi = {
  getAll: () => apiClient.get<User[]>("/users"),
  getById: (id: number) => apiClient.get<User>(`/users/${id}`),
  create: (data: { name: string; email: string }) =>
    apiClient.post<User>("/users", data),
  update: (id: number, data: { name?: string; email?: string }) =>
    apiClient.put<User>(`/users/${id}`, data),
  delete: (id: number) => apiClient.delete(`/users/${id}`),
};
