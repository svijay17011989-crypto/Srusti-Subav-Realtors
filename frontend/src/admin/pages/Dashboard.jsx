import { useEffect, useState } from "react";
import axios from "../../api/axiosAdmin";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    sold: 0,
    featured: 0,
    draft: 0,
    testimonials: 0,
    heroSlides: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        /* =========================================
           ✅ NEW: TRY AGGREGATED DASHBOARD API FIRST
        ========================================= */
        try {
          const res = await axios.get("/dashboard-stats");

          setStats({
            total: res.data.total || 0,
            available: res.data.available || 0,
            sold: res.data.sold || 0,
            featured: res.data.featured || 0,
            draft: res.data.draft || 0,
            testimonials: res.data.testimonials || 0,
            heroSlides: res.data.heroSlides || 0,
          });

          return; // stop here if successful
        } catch (aggErr) {
          console.warn("Dashboard aggregation not available, using fallback");
        }

        /* =========================================
           ⛑️ FALLBACK — YOUR EXISTING LOGIC (UNCHANGED)
        ========================================= */

        // 1. ADMIN PROPERTIES
        const propertiesRes = await axios.get("/properties");
        const properties = Array.isArray(propertiesRes.data)
          ? propertiesRes.data
          : [];

        const total = properties.length;
        const available = properties.filter(
          (p) => p.status === "available"
        ).length;
        const sold = properties.filter(
          (p) => p.status === "sold"
        ).length;
        const featured = properties.filter(
          (p) => p.featured === true
        ).length;
        const draft = properties.filter(
          (p) => p.status === "draft" || p.active === false
        ).length;

        // 2. TESTIMONIALS (PUBLIC ADMIN-SAFE ROUTE)
        let testimonialsCount = 0;
        try {
          const tRes = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/testimonials`
          );
          testimonialsCount = Array.isArray(tRes.data)
            ? tRes.data.length
            : 0;
        } catch {
          console.warn("Testimonials endpoint not available");
        }

        // 3. HERO SLIDES (PUBLIC ADMIN-SAFE ROUTE)
        let heroSlidesCount = 0;
        try {
          const hRes = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/hero`
          );
          heroSlidesCount = Array.isArray(hRes.data)
            ? hRes.data.length
            : 0;
        } catch {
          console.warn("Hero endpoint not available");
        }

        setStats({
          total,
          available,
          sold,
          featured,
          draft,
          testimonials: testimonialsCount,
          heroSlides: heroSlidesCount,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold lux-title">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="admin-card p-6">
          <p className="text-sm text-gray-400 mb-1">
            Total Properties
          </p>
          <p className="text-3xl font-semibold">
            {stats.total}
          </p>
        </div>

        <div className="admin-card p-6">
          <p className="text-sm text-gray-400 mb-1">
            Available
          </p>
          <p className="text-3xl font-semibold text-green-400">
            {stats.available}
          </p>
        </div>

        <div className="admin-card p-6">
          <p className="text-sm text-gray-400 mb-1">
            Sold
          </p>
          <p className="text-3xl font-semibold text-red-400">
            {stats.sold}
          </p>
        </div>

        <div className="admin-card p-6">
          <p className="text-sm text-gray-400 mb-1">
            Featured
          </p>
          <p className="text-3xl font-semibold text-yellow-400">
            {stats.featured}
          </p>
        </div>

        <div className="admin-card p-6">
          <p className="text-sm text-gray-400 mb-1">
            Draft / Hidden
          </p>
          <p className="text-3xl font-semibold text-yellow-300">
            {stats.draft}
          </p>
        </div>

        <div className="admin-card p-6">
          <p className="text-sm text-gray-400 mb-1">
            Testimonials
          </p>
          <p className="text-3xl font-semibold">
            {stats.testimonials}
          </p>
        </div>

        <div className="admin-card p-6">
          <p className="text-sm text-gray-400 mb-1">
            Hero Slides
          </p>
          <p className="text-3xl font-semibold">
            {stats.heroSlides}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
