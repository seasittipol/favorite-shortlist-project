export interface Resort {
  id: number;
  no: number | null;
  name: string;
  place: string | null;
  room: string | null;
  bed: string | null;
  condition: string | null;
  price: string | null;
  travelSustainableLevel: string | null;
  rating: number | null;
  totalReviews: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ResortWithFavorite extends Resort {
  isFavorite: boolean;
  favoriteId?: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
