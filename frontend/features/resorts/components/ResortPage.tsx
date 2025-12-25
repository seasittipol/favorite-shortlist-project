import { Pagination } from "@/components";
import { useResort } from "../hook/useResort";
import ResortCard from "./ResortCard";

export default function ResortPage() {
  const {
    resorts,
    meta,
    loading,
    error,
    currentPage,
    pageSize,
    loadResorts,
    toggleFavorite,
    handlePageSizeChange,
  } = useResort();

  if (loading && !resorts.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading resorts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Pagination Info */}
      {meta && (
        <div className="mb-6 flex items-center justify-between">
          <div className="text-gray-600 dark:text-gray-300">
            Showing{" "}
            <span className="font-semibold">
              {meta.page * pageSize - pageSize + 1} -{" "}
              {Math.min(meta.page * pageSize, meta.totalItems)}{" "}
            </span>
            of {meta.totalItems} resorts (Page {meta.page} of {meta.totalPages})
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="pageSize"
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              Items per page:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
              <option value={96}>96</option>
            </select>
          </div>
        </div>
      )}

      {/* Resorts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {resorts.map((resort) => (
          <ResortCard
            key={resort.id}
            resort={resort}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Pagination */}
      {meta && (
        <Pagination
          meta={meta}
          currentPage={currentPage}
          loading={loading}
          onPageChange={loadResorts}
        />
      )}
    </main>
  );
}
