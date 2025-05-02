function LoadingSpinner() {
  return (
    <div role="status" aria-label="Loading" className="flex justify-center items-center py-6">
      <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-white"></div>
    </div>
  );
}

export default LoadingSpinner;
