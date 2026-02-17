import { Link } from "react-router-dom";
import { useEffect } from "react";

const Footer = () => {

  /* =========================
     FOOTER SEO SCHEMA (ORG)
  ========================= */
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: "Srusti Subav Realtors",
      url: window.location.origin,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Coimbatore",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN"
      },
      areaServed: [
        "Coimbatore",
        "Kalapatti",
        "Saravanampatti",
        "Avinashi Road",
        "Thudiyalur"
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-8466069839",
        contactType: "customer support"
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-[#0a0f1c] text-gray-300 pt-20">
      <div className="max-w-7xl mx-auto px-6 grid gap-16 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Srusti Subav Realtors
          </h3>

          <p className="text-sm leading-relaxed text-gray-400">
            A trusted real estate advisory specializing in premium residential
            plots, strategic land investments, and legally verified properties.
            Built for investors, trusted by families, and focused on long-term
            value.
          </p>

          {/* SEO / TRUST STATEMENT */}
          <p className="text-xs leading-relaxed text-gray-500 mt-4">
            We operate as an independent real estate advisory firm, assisting
            clients with verified property opportunities, documentation clarity,
            and long-term investment planning across Coimbatore and surrounding
            growth corridors.
          </p>
        </div>

        {/* QUICK LINKS (CRAWLABLE) */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/properties" className="hover:text-white">Properties</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* LOCATION SEO LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Investment Locations
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/properties?location=Kalapatti">Kalapatti Properties</Link></li>
            <li><Link to="/properties?location=Saravanampatti">Saravanampatti Properties</Link></li>
            <li><Link to="/properties?location=Avinashi Road">Avinashi Road Properties</Link></li>
            <li><Link to="/properties?location=Thudiyalur">Thudiyalur Properties</Link></li>
            <li>Coimbatore Growth Corridors</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>📍 Kalapatti, Coimbatore, Tamil Nadu</li>
            <li>📞 +91 8466069839</li>
            <li>✉️ info@srustisubav.com</li>
          </ul>

          <a
            href="https://wa.me/918466069839"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 bg-green-500 text-black px-5 py-3 rounded-full text-sm font-medium hover:bg-green-400 transition"
          >
            WhatsApp Enquiry
          </a>
        </div>
      </div>

      {/* LEGAL / INVESTOR DISCLAIMER */}
      <div className="max-w-7xl mx-auto px-6 mt-14">
        <p className="text-[11px] leading-relaxed text-gray-500">
          Disclaimer: Property details, pricing, and availability are subject to
          change and provided for informational purposes only. Srusti Subav
          Realtors does not guarantee appreciation or investment outcomes.
          Buyers are advised to conduct independent due diligence before
          entering into any transaction.
        </p>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Srusti Subav Realtors. All rights reserved.
          </p>
          <p className="mt-3 md:mt-0">
            Serving Coimbatore, Tamil Nadu & Kerala • Focused on long-term value
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
