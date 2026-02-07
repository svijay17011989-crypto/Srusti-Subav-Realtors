import { useEffect, useState } from "react";
import axios from "../../api/axiosAdmin";
import { Link } from "react-router-dom";

const fallbackImage = "/images/property1.jpg";

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);

  /* 🔍 Search + Filters */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  /* FETCH PROPERTIES */
  useEffect(() => {
    axios.get("/properties").then((res) => {
      setProperties(res.data || []);
    });
  }, []);

  /* FILTER LOGIC */
  const filteredProperties = properties.filter((p) => {
    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.facing?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || p.status === statusFilter;

    const matchType =
      typeFilter === "all" || p.type === typeFilter;

    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="admin-theme min-h-screen p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold lux-title text-gray-900">
          Properties
        </h1>

        <Link to="/admin/add-property">
          <button className="admin-btn">
            + Add Property
          </button>
        </Link>
      </div>

      {/* SEARCH + FILTER BAR */}
      <div className="admin-card mb-6 flex flex-wrap gap-4 items-center text-gray-900">
        <input
          type="text"
          placeholder="Search by title or facing..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-gray-300 rounded px-4 py-2 text-sm w-full md:w-64 text-gray-900"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded px-4 py-2 text-sm text-gray-900"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded px-4 py-2 text-sm text-gray-900"
        >
          <option value="all">All Types</option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Industrial</option>
          <option>Agri</option>
        </select>
      </div>

      {/* PROPERTY TABLE */}
      <div className="admin-card overflow-x-auto">
        <table className="w-full admin-table text-sm text-gray-900">
          <thead className="border-b">
            <tr>
              <th className="text-left py-3 px-2 font-semibold text-gray-900">
                Property
              </th>
              <th className="px-2 font-semibold text-gray-900">Type</th>
              <th className="px-2 font-semibold text-gray-900">Status</th>
              <th className="px-2 font-semibold text-gray-900">Price</th>
              <th className="text-right px-2 font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProperties.map((p) => (
              <tr
                key={p._id}
                className="hover:bg-gray-50 transition align-top border-b"
              >
                {/* PROPERTY + IMAGE */}
                <td className="py-4 px-2">
                  <div className="flex gap-4 items-start">
                    <img
                      src={p.images?.[0] || fallbackImage}
                      onError={(e) => (e.target.src = fallbackImage)}
                      alt={p.title}
                      className="w-20 h-16 object-cover rounded-lg border border-gray-200"
                    />

                    <div>
                      <div className="font-medium text-gray-900">
                        {p.title}
                      </div>

                      <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                        <div>
                          Area: {p.area || p.plotArea || "-"}
                        </div>
                        <div>
                          Road: {p.road || p.roadWidth || "-"}
                        </div>
                        <div>
                          Facing: {p.facing || "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-2 text-gray-800">
                  {p.type || "-"}
                </td>

                <td className="px-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      p.status === "sold"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="px-2 text-gray-900">
                  ₹ {p.price}
                  <div className="text-xs text-gray-600">
                    / {p.priceUnit === "perCent" ? "Cent" : "Acre"}
                  </div>
                </td>

                <td className="text-right px-2 space-x-2">
                  <Link to={`/admin/edit-property/${p._id}`}>
                    <button className="admin-btn-outline">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="admin-btn-outline text-red-600 border-red-400"
                    onClick={async () => {
                      if (confirm("Delete this property?")) {
                        await axios.delete(`/properties/admin/${p._id}`);
                        setProperties(
                          properties.filter((x) => x._id !== p._id)
                        );
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredProperties.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No properties match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProperties;
