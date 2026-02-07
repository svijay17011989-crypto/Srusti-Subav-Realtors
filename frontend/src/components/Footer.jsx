import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-24 bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Srusti <span className="text-yellow-500">Subav</span> Realtors
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Premium residential & land properties in and around Coimbatore.
            Trusted guidance. Transparent deals. Long-term value.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/properties" className="hover:text-white">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* LOCATIONS */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">
            Popular Locations
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Kalapatti</li>
            <li>Saravanampatti</li>
            <li>Avinashi Road</li>
            <li>Thudiyalur</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">
            Contact
          </h4>
          <p className="text-sm text-gray-400">
            📍 Coimbatore, Tamil Nadu
          </p>
          <p className="text-sm text-gray-400 mt-2">
            📞 +91 84660 69839
          </p>
          <p className="text-sm text-gray-400 mt-2">
            ✉️ info@srustisubav.com
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Srusti Subav Realtors. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
