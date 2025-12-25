import { AuthResponse, LoginDto } from "@/types/auth";
import { apiClient, authStorage } from "./api-client";

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    authStorage.setToken(response.accessToken);
    authStorage.setUser(response.email);
    return response;
  },
  logout: () => {
    authStorage.clear();
  },
  getCurrentUser: () => {
    return authStorage.getUser();
  },
  isAuthenticated: () => {
    return !!authStorage.getToken();
  },
};
