import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)]">
      
      {/* ================= GLOBAL SEO SCHEMA ================= */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Srusti Subav Realtors",
            "url": "https://www.srustisubav.com",
            "logo": "https://www.srustisubav.com/logo.png",
            "description":
              "Srusti Subav Realtors is a trusted real estate advisory specializing in premium residential plots, land investments, and legally verified properties in Coimbatore and Tamil Nadu.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Coimbatore",
              "addressRegion": "Tamil Nadu",
              "addressCountry": "IN"
            },
            "areaServed": [
              "Coimbatore",
              "Kalapatti",
              "Saravanampatti",
              "Avinashi Road",
              "Tamil Nadu",
              "Kerala"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-8466069839",
              "contactType": "customer support"
            },
            "sameAs": [
              "https://www.google.com/maps",
              "https://wa.me/918466069839"
            ]
          })}
        </script>
      </Helmet>

      <Header />

      {/* PAGE CONTENT */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
