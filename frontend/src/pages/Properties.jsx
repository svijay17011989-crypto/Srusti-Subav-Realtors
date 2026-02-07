import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const fallbackImage = "/images/property1.jpg";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("/properties").then((res) => {
      setProperties(res.data || []);
    });
  }, []);

  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* PAGE TITLE */}
        <h1 className="text-3xl md:text-4xl font-playfair mb-10">
          Available Properties
        </h1>

        {/* PROPERTY GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.map((p) => {
            const cover =
              p.images && p.images.length > 0
                ? p.images[0]
                : fallbackImage;

            return (
              <Link
                key={p._id}
                to={`/properties/${p._id}`}
                className="group"
              >
                <div className="lux-card overflow-hidden">

                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={cover}
                      onError={(e) => (e.target.src = fallbackImage)}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* STATUS BADGE */}
                    {p.status && (
                      <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                        {p.status}
                      </span>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 space-y-2">
                    <h2 className="text-lg font-semibold leading-tight">
                      {p.title}
                    </h2>

                    {p.location && (
                      <p className="text-sm text-[var(--text-muted)]">
                        {p.location}
                      </p>
                    )}

                    {p.facing && (
                      <p className="text-xs text-[var(--text-muted)]">
                        Facing: {p.facing}
                      </p>
                    )}

                    {/* META ROW */}
                    <div className="flex items-center justify-between pt-3">
                      <p className="text-base font-medium">
                        ₹ {p.price}
                        {p.priceUnit === "perCent" && (
                          <span className="text-xs text-gray-400">
                            {" "} / Cent
                          </span>
                        )}
                      </p>

                      {p.type && (
                        <span className="text-xs border px-2 py-1 rounded">
                          {p.type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {properties.length === 0 && (
          <p className="text-center text-gray-400 mt-20">
            No properties available
          </p>
        )}
      </div>
    </div>
  );
};

export default Properties;
