import { PaginationProps } from '../types/props';

function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <span className="text-white">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
