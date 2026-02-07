import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosAdmin from "../../api/axiosAdmin";

export default function EditProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosAdmin.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error("EDIT PROPERTY ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-300">
        Loading property...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="py-20 text-center text-red-500">
        Property not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-100">
        Edit Property
      </h1>

      <div className="admin-card p-6 space-y-3">
        <p className="text-gray-300">
          <strong>Title:</strong> {property.title}
        </p>
        <p className="text-gray-300">
          <strong>Price:</strong> ₹ {property.price}
        </p>
        <p className="text-gray-300">
          <strong>Status:</strong> {property.status}
        </p>
      </div>

      {/* FORM WILL COME NEXT — THIS CONFIRMS ROUTE + DATA */}
    </div>
  );
}
