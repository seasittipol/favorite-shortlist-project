export const MAX_PAGE_SIZE = 100;

export function getPaginationParams(
  page?: number,
  pageSize?: number,
): { skip: number; take: number } {
  const take =
    pageSize && pageSize > 0
      ? Math.min(pageSize, MAX_PAGE_SIZE)
      : MAX_PAGE_SIZE;
  const skip = page && page > 0 ? (page - 1) * take : 0;
  return { skip, take };
}

export function generatePaginationMeta(
  totalItems: number,
  page?: number,
  pageSize?: number,
): {
  totalItems: number;
  totalPages: number;
  page: number;
  pageSize: number;
} {
  const effectivePageSize =
    pageSize && pageSize > 0
      ? Math.min(pageSize, MAX_PAGE_SIZE)
      : MAX_PAGE_SIZE;
  const totalPages = Math.ceil(totalItems / effectivePageSize);
  const currentPage = page && page > 0 ? page : 1;

  return {
    totalItems,
    totalPages,
    page: currentPage,
    pageSize: effectivePageSize,
  };
}
