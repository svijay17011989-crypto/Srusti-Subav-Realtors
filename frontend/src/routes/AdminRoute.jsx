import { Navigate, Outlet } from "react-router-dom";

/* ✅ ADMIN LAYOUT */
import AdminLayout from "../admin/Components/AdminLayout";

/* ✅ ADMIN PAGES */
import Dashboard from "../admin/pages/Dashboard";
import Properties from "../admin/pages/Properties";
import AddProperty from "../admin/pages/AddProperty";
import AdminHero from "../admin/pages/AdminHero";
import AdminTestimonials from "../admin/pages/AdminTestimonials";

/* ✅ NEW — EDIT PROPERTY */
import EditProperty from "../admin/pages/EditProperty";

/* ======================================================
   🔐 ADMIN AUTH GUARD
====================================================== */
const AdminProtectedRoute = () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

/* ======================================================
   ADMIN ROUTES
====================================================== */
const adminRoutes = {
  path: "/admin",
  element: <AdminProtectedRoute />,
  children: [
    {
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="dashboard" replace />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "properties",
          element: <Properties />,
        },
        {
          path: "add-property",
          element: <AddProperty />,
        },

        /* ✅ NEW — EDIT PROPERTY ROUTE */
        {
          path: "edit-property/:id",
          element: <EditProperty />,
        },

        {
          path: "hero",
          element: <AdminHero />,
        },
        {
          path: "testimonials",
          element: <AdminTestimonials />,
        },
      ],
    },
  ],
};

export default adminRoutes;
