function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-lg text-gray-500">
          Please check the URL or return to the homepage.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-300"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
