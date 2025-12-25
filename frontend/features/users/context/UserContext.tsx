"use client";

import { usersApi } from "@/services/user-api";
import { User } from "@/types/user";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface CreateUserData {
  name: string;
  email: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
}

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string;
  loadUsers: () => Promise<void>;
  createUser: (data: CreateUserData) => Promise<User>;
  updateUser: (id: number, data: UpdateUserData) => Promise<User>;
  deleteUser: (id: number) => Promise<void>;
  getUserById: (id: number) => Promise<User>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await usersApi.getAll();
      setUsers(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(
    async (data: CreateUserData): Promise<User> => {
      const newUser = await usersApi.create(data);
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    },
    []
  );

  const updateUser = useCallback(
    async (id: number, data: UpdateUserData): Promise<User> => {
      const updatedUser = await usersApi.update(id, data);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updatedUser : user))
      );
      return updatedUser;
    },
    []
  );

  const deleteUser = useCallback(async (id: number) => {
    await usersApi.delete(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }, []);

  const getUserById = useCallback(async (id: number): Promise<User> => {
    return await usersApi.getById(id);
  }, []);

  const value: UserContextType = useMemo(
    () => ({
      users,
      loading,
      error,
      loadUsers,
      createUser,
      updateUser,
      deleteUser,
      getUserById,
    }),
    [
      users,
      loading,
      error,
      loadUsers,
      createUser,
      updateUser,
      deleteUser,
      getUserById,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
