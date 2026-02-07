import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProperties } from "../services/propertyService";

const fallbackImage = "/images/property1.jpg";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllProperties()
      .then(res => setProperties(res.data.slice(0, 6)))
      .catch(err => console.error(err));
  }, []);

  if (properties.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Featured Properties
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {properties.map(p => (
            <Link
              key={p._id}
              to={`/properties/${p._id}`}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <img
                src={p.images?.[0] || fallbackImage}
                alt={p.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {p.title}
                </h3>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">
                    ₹ {p.price}
                  </span>

                  <span className={`text-sm px-3 py-1 rounded-full ${
                    p.status === "sold"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {p.status || "available"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
