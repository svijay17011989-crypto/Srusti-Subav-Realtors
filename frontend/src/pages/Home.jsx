import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import PropertyCard from "../components/PropertyCard";
import Testimonials from "../components/Testimonials";

/* ======================================================
   HERO SLIDES (UNCHANGED)
====================================================== */
const heroSlides = Array.from({ length: 10 }).map((_, i) => ({
  src: `/images/hero${i + 1}.jpg`,
  heading: "Trusted Real Estate Partner",
  text: "Transparent process & end-to-end support",
}));

/* ======================================================
   COUNTERS
====================================================== */
const countersData = [
  { label: "Properties Sold", value: 1200 },
  { label: "Happy Clients", value: 950 },
  { label: "Prime Locations", value: 35 },
  { label: "Years of Experience", value: 10 },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [featured, setFeatured] = useState([]);
  const [counters, setCounters] = useState(countersData.map(() => 0));

  useEffect(() => {
    const timer = setInterval(
      () => setSlide((p) => (p + 1) % heroSlides.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axios
      .get("/properties/featured")
      .then((res) => setFeatured(res.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const intervals = countersData.map((item, i) =>
      setInterval(() => {
        setCounters((prev) => {
          const next = [...prev];
          if (next[i] < item.value)
            next[i] += Math.ceil(item.value / 80);
          return next;
        });
      }, 40)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === slide ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            <img
              src={s.src}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 text-white">
                <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">
                  {s.heading}
                </h1>
                <p className="mt-6 text-lg max-w-xl text-gray-200">
                  {s.text}
                </p>
                <Link
                  to="/properties"
                  className="inline-block mt-8 bg-yellow-500 text-black px-8 py-4 rounded-full font-medium"
                >
                  Explore Properties
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ================= COUNTERS ================= */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {countersData.map((c, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-yellow-400">
                {Math.min(counters[i], c.value)}+
              </p>
              <p className="mt-2 text-gray-300">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US (FIXED) ================= */}
      <section className="relative py-24 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">
                Prime Locations
              </h3>
              <p className="text-gray-300">
                Strategically selected properties in high-growth zones.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">
                Trusted Investment
              </h3>
              <p className="text-gray-300">
                DTCP-approved and legally verified developments.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">
                End-to-End Support
              </h3>
              <p className="text-gray-300">
                From site visit to registration — guided at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS (FIXED) ================= */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-6 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <Testimonials />
        </div>
      </section>
    </>
  );
}
