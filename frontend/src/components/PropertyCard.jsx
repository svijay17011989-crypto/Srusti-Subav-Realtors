import { Link } from "react-router-dom";

const fallbackImage = "/images/property1.jpg";

/* PRICE FORMATTER (₹ 17 → ₹ 17,00,000 style if needed later) */
const formatPrice = (price) => {
  if (!price) return "";
  return Number(price).toLocaleString("en-IN");
};

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
        {/* FEATURED BADGE */}
        {property.featured && (
          <span className="
            absolute top-4 left-4 z-10
            bg-yellow-500 text-black
            text-xs font-semibold
            px-3 py-1 rounded-full
            shadow
          ">
            Investment Pick
          </span>
        )}

        {/* STATUS BADGE */}
        {property.status && (
          <span className="
            absolute top-4 right-4 z-10
            bg-black/70 text-white
            text-xs font-medium
            px-3 py-1 rounded-full
            backdrop-blur
          ">
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        )}

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
      <div className="p-6 text-[var(--text-main)] flex flex-col justify-between min-h-[170px]">
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
          <div className="mt-4">
            <p className="font-semibold text-lg">
              ₹ {formatPrice(property.price)}
              {property.priceUnit && (
                <span className="text-sm text-[var(--text-muted)] ml-1">
                  / {property.priceUnit === "perCent" ? "Cent" : "Acre"}
                </span>
              )}
            </p>

            {/* INVESTOR SUBTEXT */}
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Long-term value • Clear documentation
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PropertyCard;
