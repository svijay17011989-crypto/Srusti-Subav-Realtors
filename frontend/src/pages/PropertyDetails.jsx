import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/properties/${id}`
        );
        setProperty(res.data);

        if (res.data.images && res.data.images.length > 0) {
          setActiveImage(res.data.images[0]);
        } else {
          setActiveImage(FALLBACK_IMAGE);
        }
      } catch (err) {
        console.error("Failed to load property", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 text-center text-gray-300">
        Loading property...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-32 text-center text-gray-300">
        Property not found
      </div>
    );
  }

  const images =
    property.images && property.images.length > 0
      ? property.images
      : [FALLBACK_IMAGE];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 text-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* IMAGE VIEWER */}
        <div>
          <div className="rounded-2xl overflow-hidden border mb-4">
            <img
              src={activeImage}
              alt={property.title}
              className="w-full h-[420px] object-cover"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`border rounded-lg overflow-hidden w-20 h-20 ${
                  activeImage === img
                    ? "ring-2 ring-yellow-500"
                    : "opacity-70"
                }`}
              >
                <img
                  src={img}
                  alt={`thumb-${index}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-semibold mb-2 text-white">
            {property.title}
          </h1>

          <p className="text-2xl text-yellow-500 font-medium mb-6">
            ₹ {property.price?.toLocaleString()}{" "}
            <span className="text-sm text-gray-400">
              / {property.priceUnit || ""}
            </span>
          </p>

          {/* META GRID */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Meta label="Type" value={property.type} />
            <Meta label="Status" value={property.status} />
            <Meta label="Facing" value={property.landFacing} />
            <Meta label="DTCP Approved" value={property.dtcpApproved} />
            <Meta label="Area" value={property.measurements || "—"} />
            <Meta
              label="Location"
              value={property.location || "Not specified"}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <h3 className="text-lg font-medium mb-2 text-white">
              Property Description
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {property.description || "No description provided."}
            </p>
          </div>

          <button className="mt-8 px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600">
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="font-medium text-gray-200">
        {value || "—"}
      </p>
    </div>
  );
}
