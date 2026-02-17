import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";

const WHATSAPP_NUMBER = "918466069839";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState([]);

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

        const all = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/properties`
        );

        const filtered = all.data
          .filter(
            (p) =>
              p._id !== res.data._id &&
              (p.type === res.data.type ||
                p.location === res.data.location)
          )
          .slice(0, 3);

        setSimilar(filtered);
      } catch (err) {
        console.error("Failed to load property", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  /* =========================
     SEO META / CANONICAL / OG / TWITTER
  ========================= */
  useEffect(() => {
    if (!property) return;

    const city =
      property.location?.split(",")?.[0]?.trim() || "India";

    const title = `${property.title} in ${city} | Verified Property Investment`;
    const description = `Explore ${property.title} located in ${city}. A verified real estate investment opportunity offering transparency, structured documentation, and long-term appreciation potential for investors and end users.`;

    document.title = title;

    const setMeta = (key, value, isProperty = false) => {
      let tag = document.querySelector(
        isProperty
          ? `meta[property='${key}']`
          : `meta[name='${key}']`
      );
      if (!tag) {
        tag = document.createElement("meta");
        isProperty
          ? tag.setAttribute("property", key)
          : tag.setAttribute("name", key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    };

    // Basic meta
    setMeta("description", description);

    // Canonical
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "article", true);
    setMeta("og:url", window.location.href, true);
    setMeta(
      "og:image",
      property.images?.[0] || FALLBACK_IMAGE,
      true
    );

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta(
      "twitter:image",
      property.images?.[0] || FALLBACK_IMAGE
    );
  }, [property]);

  /* =========================
     JSON-LD: LISTING + BREADCRUMB
  ========================= */
  useEffect(() => {
    if (!property) return;

    const city =
      property.location?.split(",")?.[0]?.trim() || "India";

    const listingSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: property.title,
      description:
        property.description ||
        "Verified real estate investment opportunity with structured documentation and long-term value potential.",
      image:
        property.images?.length > 0
          ? property.images
          : [FALLBACK_IMAGE],
      url: window.location.href,
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock"
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressCountry: "IN"
      }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: window.location.origin
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Properties",
          item: `${window.location.origin}/properties`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: city,
          item: window.location.href
        }
      ]
    };

    const inject = (schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    };

    const listingScript = inject(listingSchema);
    const breadcrumbScript = inject(breadcrumbSchema);

    return () => {
      document.head.removeChild(listingScript);
      document.head.removeChild(breadcrumbScript);
    };
  }, [property]);

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

  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in the property "${property.title}" located at ${property.location}. Please share investment details.`
  );

  return (
    <div className="pt-28 pb-32 max-w-7xl mx-auto px-6 text-gray-200">
      {/* HEADER */}
      <div className="mb-10">
        <span className="inline-block mb-3 px-4 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-400">
          Verified Investment Opportunity
        </span>

        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
          {property.title}
        </h1>

        {property.location && (
          <p className="text-gray-400">{property.location}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* IMAGES */}
        <div>
          <div className="rounded-2xl overflow-hidden border mb-4">
            <img
              src={activeImage}
              alt={property.title}
              className="w-full h-[420px] object-cover"
            />
          </div>

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
          <p className="text-2xl text-yellow-500 font-medium mb-6">
            ₹ {property.price?.toLocaleString()}{" "}
            <span className="text-sm text-gray-400">
              / {property.priceUnit || ""}
            </span>
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <Meta label="Property Type" value={property.type} />
            <Meta label="Status" value={property.status} />
            <Meta label="Facing" value={property.landFacing} />
            <Meta label="DTCP Approved" value={property.dtcpApproved} />
            <Meta label="Area" value={property.measurements || "—"} />
            <Meta label="Location" value={property.location || "—"} />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-10">
            <h3 className="text-lg font-medium mb-2 text-white">
              Investment Overview
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {property.description ||
                "This property offers long-term value potential, strategic location advantages, and transparent documentation suited for investors and end-users alike."}
            </p>
          </div>

          {/* INVESTOR HIGHLIGHTS */}
          <div className="mb-10 border rounded-2xl p-6 bg-black/40">
            <h3 className="text-lg font-medium mb-4 text-white">
              Investor Highlights
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm list-disc pl-5">
              <li>Strategically selected location with growth potential</li>
              <li>Clear documentation and structured transaction flow</li>
              <li>Suitable for long-term holding and value appreciation</li>
              <li>Balanced appeal for investors and end users</li>
              <li>Professional handling with transparent process</li>
            </ul>
          </div>

          {/* LEAD */}
          <div className="border rounded-2xl p-6 bg-black/40">
            <h4 className="text-lg font-medium text-white mb-4">
              Request Detailed Information
            </h4>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="bg-black border rounded-lg px-4 py-3 text-gray-200" />
              <input type="tel" placeholder="Phone Number" className="bg-black border rounded-lg px-4 py-3 text-gray-200" />
              <input type="email" placeholder="Email Address" className="bg-black border rounded-lg px-4 py-3 text-gray-200 md:col-span-2" />

              <button type="button" className="md:col-span-2 mt-2 px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600">
                Submit Enquiry
              </button>
            </form>

            <div className="mt-4 text-sm text-gray-400">
              Or call / WhatsApp: <span className="text-white">+91 8466069839</span>
            </div>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 text-green-400 hover:underline"
          >
            Chat on WhatsApp →
          </a>

          <div className="mt-6">
            <a
              href={property.brochure || "#"}
              download
              className="inline-block px-6 py-3 border border-gray-500 rounded-lg text-gray-200 hover:bg-white/5"
            >
              Download Property Brochure (PDF)
            </a>
          </div>
        </div>
      </div>

      {property.location && (
        <div className="mt-20">
          <h3 className="text-xl font-semibold text-white mb-4">
            Property Location
          </h3>

          <div className="rounded-2xl overflow-hidden border">
            <iframe
              title="map"
              className="w-full h-[380px]"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                property.location
              )}&output=embed`}
            />
          </div>
        </div>
      )}

      {similar.length > 0 && (
        <div className="mt-24">
          <h3 className="text-2xl font-semibold text-white mb-8">
            Similar Investment Opportunities
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {similar.map((item) => (
              <PropertyCard key={item._id} property={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="font-medium text-gray-200">{value || "—"}</p>
    </div>
  );
}
