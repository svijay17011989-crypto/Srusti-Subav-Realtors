import { useEffect, useState } from "react";
import axiosAdmin from "../../api/axiosAdmin";
import api from "../../api/axios"; // ✅ PUBLIC API (env-based)

const AdminDashboard = () => {
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
    const fetchStats = async () => {
      try {
        /* ================= PROPERTIES ================= */
        let properties = [];

        try {
          // ✅ Try ADMIN API first
          const res = await axiosAdmin.get("/properties");
          properties = Array.isArray(res.data) ? res.data : [];
        } catch {
          // ✅ Fallback → PUBLIC API (ENV BASED)
          const res = await api.get("/properties");
          properties = Array.isArray(res.data) ? res.data : [];
        }

        const total = properties.length;
        const available = properties.filter(p => p.status === "available").length;
        const sold = properties.filter(p => p.status === "sold").length;
        const draft = properties.filter(p => p.status === "draft").length;
        const featured = properties.filter(p => p.featured === true).length;

        /* ================= TESTIMONIALS ================= */
        let testimonialsCount = 0;
        try {
          const res = await api.get("/testimonials");
          testimonialsCount = Array.isArray(res.data) ? res.data.length : 0;
        } catch {}

        /* ================= HERO SLIDES ================= */
        let heroSlidesCount = 0;
        try {
          const res = await api.get("/hero");
          heroSlidesCount = Array.isArray(res.data) ? res.data.length : 0;
        } catch {}

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
        console.error("Dashboard error:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-playfair mb-1">
          Admin Dashboard
        </h1>
        <p className="text-[var(--text-muted)]">
          Platform overview
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
        <div className="admin-card">
          <p className="text-sm text-[var(--text-muted)]">Total</p>
          <h2 className="text-3xl font-semibold">{stats.total}</h2>
        </div>

        <div className="admin-card border border-green-500/30">
          <p className="text-sm text-green-400">Available</p>
          <h2 className="text-3xl font-semibold text-green-400">
            {stats.available}
          </h2>
        </div>

        <div className="admin-card border border-red-500/30">
          <p className="text-sm text-red-400">Sold</p>
          <h2 className="text-3xl font-semibold text-red-400">
            {stats.sold}
          </h2>
        </div>

        <div className="admin-card border border-yellow-500/30">
          <p className="text-sm text-yellow-400">Draft / Hidden</p>
          <h2 className="text-3xl font-semibold text-yellow-400">
            {stats.draft}
          </h2>
        </div>

        <div className="admin-card border border-blue-500/30">
          <p className="text-sm text-blue-400">Testimonials</p>
          <h2 className="text-3xl font-semibold text-blue-400">
            {stats.testimonials}
          </h2>
        </div>

        <div className="admin-card border border-purple-500/30">
          <p className="text-sm text-purple-400">Hero Slides</p>
          <h2 className="text-3xl font-semibold text-purple-400">
            {stats.heroSlides}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
