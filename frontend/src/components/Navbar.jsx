import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

<ThemeToggle />

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full z-[999] bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-lg tracking-widest font-semibold text-gray-900"
        >
          SRUSTI SUBAV{" "}
          <span className="font-light text-gray-600">REALTORS</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm uppercase tracking-wider">
          {[
            { to: "/", label: "Home" },
            { to: "/properties", label: "Properties" },
            { to: "/contact", label: "Contact" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `hover:text-black transition ${
                  isActive
                    ? "text-black font-medium"
                    : "text-gray-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <NavLink
            to="/admin/login"
            className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
