import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Hide sidebar on login page
  const isLoginPage = location.pathname === "/admin/login";

  /* ======================================================
     ✅ NEW: ADMIN LOGOUT HANDLER (ADDED ONLY)
  ====================================================== */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#111",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2>Admin</h2>

          <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <NavLink to="/admin/dashboard" style={{ color: "#fff" }}>
              Dashboard
            </NavLink>

            <NavLink to="/admin/properties" style={{ color: "#fff" }}>
              Properties
            </NavLink>

            <NavLink to="/admin/add-property" style={{ color: "#fff" }}>
              Add Property
            </NavLink>

            <NavLink to="/admin/hero" style={{ color: "#fff" }}>
              Hero
            </NavLink>

            <NavLink to="/admin/testimonials" style={{ color: "#fff" }}>
              Testimonials
            </NavLink>
          </nav>
        </div>

        {/* ======================================================
            ✅ NEW: LOGOUT BUTTON (ADDED ONLY)
        ====================================================== */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#222",
            color: "#fff",
            border: "1px solid #444",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
