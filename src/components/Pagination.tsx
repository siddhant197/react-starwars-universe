function Pagination() {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button disabled={true} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
        Prev
      </button>
      <span className="text-white">Page 1 of 5</span>
      <button disabled={false} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
        Next
      </button>
    </div>
  );
}

export default Pagination;
