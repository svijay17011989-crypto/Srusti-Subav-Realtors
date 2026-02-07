import { Routes, Route } from "react-router-dom";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails"; // ✅ ADDED (existing file)
import Contact from "./pages/Contact";

/* PUBLIC LAYOUT */
import Layout from "./layouts/Layout";

/* ADMIN LOGIN (PUBLIC) */
import AdminLogin from "./pages/admin/AdminLogin";

/* ADMIN ROUTES CONFIG */
import adminRoutes from "./routes/AdminRoute";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC WEBSITE ================= */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />

        {/* ✅ FIX: PROPERTY DETAILS ROUTE */}
        <Route path="/properties/:id" element={<PropertyDetails />} />

        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ================= ADMIN LOGIN ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ================= ADMIN ROUTES ================= */}
      <Route path={adminRoutes.path} element={adminRoutes.element}>
        {adminRoutes.children.map((level1, i) => (
          <Route key={i} element={level1.element}>
            {level1.children.map((level2, j) => (
              <Route
                key={j}
                path={level2.path}
                index={level2.index}
                element={level2.element}
              />
            ))}
          </Route>
        ))}
      </Route>

    </Routes>
  );
}

export default App;
