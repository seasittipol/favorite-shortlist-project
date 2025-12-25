"use client";

import { authApi } from "@/services/auth-api";
import { favoritesApi } from "@/services/favorite";
import { resortApi } from "@/services/resort-api";
import { PaginationMeta, ResortWithFavorite } from "@/types/resort";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";

interface ResortContextType {
  resorts: ResortWithFavorite[];
  meta: PaginationMeta | null;
  user: User | null;
  loading: boolean;
  error: string;
  currentPage: number;
  pageSize: number;
  loadResorts: (page: number) => Promise<void>;
  toggleFavorite: (resort: ResortWithFavorite) => void;
  handlePageSizeChange: (newPageSize: number) => Promise<void>;
}

const ResortContext = createContext<ResortContextType | undefined>(undefined);

interface ResortProviderProps {
  children: ReactNode;
  initialPageSize?: number;
}

function ResortProvider({
  children,
  initialPageSize = 12,
}: ResortProviderProps) {
  const [resorts, setResorts] = useState<ResortWithFavorite[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const router = useRouter();

  // Track original state for rollback on API error
  const pendingChanges = useRef<
    Map<number, { originalState: boolean; originalFavoriteId?: number }>
  >(new Map());

  const loadResorts = useCallback(
    async (page: number) => {
      setLoading(true);
      setError("");
      try {
        const response = await resortApi.getAll(page, pageSize);
        setResorts(response.data);
        setMeta(response.meta);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load resorts");
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    const currentUser = authApi.getCurrentUser();
    if (!currentUser) {
      router.push("/auth/login");
      return;
    }
    setUser(currentUser);
    loadResorts(1);
  }, [router, loadResorts]);

  // Debounced API call
  const debouncedApiCall = useDebouncedCallback(
    async (resortId: number, shouldFavorite: boolean) => {
      if (!user) return;

      const pending = pendingChanges.current.get(resortId);

      try {
        if (pending?.originalState === shouldFavorite) {
          return;
        }
        if (shouldFavorite) {
          const favorite = await favoritesApi.create({
            userId: user.id,
            resortId: resortId,
          });
          setResorts((prevResorts) =>
            prevResorts.map((r) =>
              r.id === resortId ? { ...r, favoriteId: favorite.id } : r
            )
          );
        } else {
          await favoritesApi.delete(resortId);
        }
      } catch (err) {
        console.error("Failed to toggle favorite:", err);
        // Rollback on error
        if (pending) {
          setResorts((prevResorts) =>
            prevResorts.map((r) =>
              r.id === resortId
                ? {
                    ...r,
                    isFavorite: pending.originalState,
                    favoriteId: pending.originalFavoriteId,
                  }
                : r
            )
          );
        }
      } finally {
        pendingChanges.current.delete(resortId);
      }
    },
    500
  );

  // Toggle favorite with optimistic UI update
  const toggleFavorite = useCallback(
    (resort: ResortWithFavorite) => {
      if (!user) return;

      const resortId = resort.id;
      const newState = !resort.isFavorite;

      // Store original state for rollback (only if not already pending)
      if (!pendingChanges.current.has(resortId)) {
        pendingChanges.current.set(resortId, {
          originalState: resort.isFavorite,
          originalFavoriteId: resort.favoriteId,
        });
      }

      // Optimistic UI update
      setResorts((prevResorts) =>
        prevResorts.map((r) =>
          r.id === resortId
            ? {
                ...r,
                isFavorite: newState,
                favoriteId: newState ? r.favoriteId : undefined,
              }
            : r
        )
      );

      // Debounced API call
      debouncedApiCall(resortId, newState);
    },
    [user, debouncedApiCall]
  );

  const handlePageSizeChange = useCallback(async (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    setLoading(true);
    setError("");
    try {
      const response = await resortApi.getAll(1, newPageSize);
      setResorts(response.data);
      setMeta(response.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load resorts");
    } finally {
      setLoading(false);
    }
  }, []);

  const value: ResortContextType = {
    resorts,
    meta,
    user,
    loading,
    error,
    currentPage,
    pageSize,
    loadResorts,
    toggleFavorite,
    handlePageSizeChange,
  };

  return (
    <ResortContext.Provider value={value}>{children}</ResortContext.Provider>
  );
}

function useResort(): ResortContextType {
  const context = useContext(ResortContext);
  if (context === undefined) {
    throw new Error("useResort must be used within a ResortProvider");
  }
  return context;
}

export { ResortProvider, useResort };
