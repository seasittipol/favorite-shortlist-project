import { PaginationMeta } from "@/types/resort";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  meta: PaginationMeta;
  currentPage: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  meta,
  currentPage,
  loading,
  onPageChange,
}: PaginationProps) {
  if (meta.totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!(meta.page > 1) || loading}
        className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <div className="flex gap-2">
        {(() => {
          const pages: (number | string)[] = [];
          const totalPages = meta.totalPages;

          // Always show first page
          pages.push(1);

          // Add ellipsis after first page if needed
          if (currentPage > 3) {
            pages.push("ellipsis-start");
          }

          // Add page 2 if current page is 3 (to avoid 1 ... 2 3 4)
          if (currentPage === 3) {
            pages.push(2);
          }

          // Add pages around current page
          for (
            let i = Math.max(2, currentPage - 1);
            i <= Math.min(totalPages - 1, currentPage + 1);
            i++
          ) {
            if (!pages.includes(i)) {
              pages.push(i);
            }
          }

          // Add second to last page if current is at totalPages - 2
          if (
            currentPage === totalPages - 2 &&
            !pages.includes(totalPages - 1)
          ) {
            pages.push(totalPages - 1);
          }

          // Add ellipsis before last page if needed
          if (currentPage < totalPages - 2) {
            pages.push("ellipsis-end");
          }

          // Always show last page (if more than 1 page)
          if (totalPages > 1 && !pages.includes(totalPages)) {
            pages.push(totalPages);
          }

          return pages.map((page) => {
            if (typeof page === "string") {
              return (
                <span
                  key={page}
                  className="px-4 py-2 text-gray-500 dark:text-gray-400"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            );
          });
        })()}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!(meta.page < meta.totalPages) || loading}
        className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
