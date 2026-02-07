import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-24 backdrop-blur-xl bg-white/80 border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 select-none"
        >
          <span className="text-2xl font-semibold tracking-wide text-gray-900">
            Srusti
          </span>

          <span className="text-2xl font-semibold tracking-wide text-yellow-500">
            Subav
          </span>

          <span className="hidden sm:inline text-lg font-medium tracking-wide text-gray-600 ml-1">
            Realtors
          </span>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-10 text-sm font-medium text-gray-700">
          <Link
            to="/"
            className="hover:text-black transition"
          >
            Home
          </Link>

          <Link
            to="/properties"
            className="hover:text-black transition"
          >
            Properties
          </Link>

          <Link
            to="/contact"
            className="hover:text-black transition"
          >
            Contact
          </Link>

          <Link
            to="/admin"
            className="px-5 py-2 border border-yellow-500 rounded-full text-yellow-600 hover:bg-yellow-50 transition"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
