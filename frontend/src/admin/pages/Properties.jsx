import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ✅ FIXED IMPORT — CORRECT LOCATION */
import axiosAdmin from "../../api/axiosAdmin";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosAdmin.get("/properties");
        setProperties(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("ADMIN PROPERTIES ERROR:", err);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-300">
        Loading properties...
      </div>
    );
  }

  /* =========================
     ERROR STATE
  ========================= */
  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-100">
          Properties
        </h1>

        <Link
          to="/admin/add-property"
          className="admin-btn"
        >
          + Add Property
        </Link>
      </div>

      {/* =========================
         TABLE
      ========================= */}
      <div className="admin-card overflow-x-auto">
        <table className="admin-table w-full text-sm text-gray-200">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 text-gray-300">Image</th>
              <th className="text-left text-gray-300">Title</th>
              <th className="text-gray-300">Status</th>
              <th className="text-gray-300">Price</th>
              <th className="text-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody>
            {properties.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-400"
                >
                  No properties found
                </td>
              </tr>
            )}

            {properties.map((p) => (
              <tr
                key={p._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="py-3">
                  <img
                    src={p.images?.[0] || FALLBACK_IMAGE}
                    alt={p.title}
                    className="w-20 h-14 object-cover rounded-md"
                  />
                </td>

                <td className="font-medium text-gray-100">
                  {p.title}
                </td>

                <td className="text-gray-300">
                  {p.status}
                </td>

                <td className="text-gray-300">
                  ₹ {p.price?.toLocaleString()}
                </td>

                <td>
                  <Link
                    to={`/admin/edit-property/${p._id}`}
                    className="text-yellow-400 hover:text-yellow-300 underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
