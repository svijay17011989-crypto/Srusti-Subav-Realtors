import { Link } from "react-router-dom";

const fallbackImage = "/images/property1.jpg";

const PropertyCard = ({ property }) => {
  if (!property) return null;

  return (
    <Link
      to={`/properties/${property._id}`}
      className="
        group block
        rounded-2xl overflow-hidden
        bg-[var(--bg-card)]
        border border-[var(--border-soft)]
        shadow-md
        hover:-translate-y-2 hover:shadow-2xl
        transition-all duration-300
      "
    >
      {/* IMAGE WRAPPER */}
      <div className="relative w-full bg-black/5">
        {/* Aspect ratio container */}
        <div className="aspect-[4/3] flex items-center justify-center p-4">
          <img
            src={property.images?.[0] || fallbackImage}
            onError={(e) => (e.currentTarget.src = fallbackImage)}
            alt={property.title || "Property image"}
            className="
              max-h-full max-w-full
              object-contain
              transition-transform duration-500
              group-hover:scale-[1.03]
            "
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 text-[var(--text-main)] flex flex-col justify-between min-h-[160px]">
        <div>
          <h3 className="text-lg font-semibold mb-1 leading-snug">
            {property.title}
          </h3>

          {property.location && (
            <p className="text-sm text-[var(--text-muted)]">
              {property.location}
            </p>
          )}
        </div>

        {/* PRICE */}
        {property.price && (
          <p className="mt-4 font-semibold text-lg">
            ₹ {property.price}
            {property.priceUnit && (
              <span className="text-sm text-[var(--text-muted)] ml-1">
                / {property.priceUnit === "perCent" ? "Cent" : "Acre"}
              </span>
            )}
          </p>
        )}
      </div>
    </Link>
  );
};

export default PropertyCard;
