import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-yellow-400 tracking-wide">
          <Link to="/">Star Wars Universe</Link>
        </h1>
        <div className="space-x-6 text-white font-medium">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link to="/favorites" className="hover:text-yellow-400 transition">
            Favorites
          </Link>
        </div>
      </nav>
    </header>
  );
}
