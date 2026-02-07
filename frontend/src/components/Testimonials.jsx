import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "Property Buyer",
    text: "Srusti Subav Realtors helped me find my dream home in Coimbatore. Very professional and transparent.",
  },
  {
    name: "Bindhya",
    role: "Investor",
    text: "Excellent service and great property options. Their guidance made investing easy.",
  },
  {
    name: "Sukumaran",
    role: "Commercial Client",
    text: "Highly trustworthy team. Smooth documentation and quick closure.",
  },
];

function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-10 transition-all">
          <p className="text-lg md:text-xl text-gray-200 mb-6 italic leading-relaxed">
            “{testimonials[index].text}”
          </p>

          <h4 className="font-semibold text-lg text-white">
            {testimonials[index].name}
          </h4>

          <p className="text-sm text-gray-400 mt-1">
            {testimonials[index].role}
          </p>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full transition ${
                i === index
                  ? "bg-yellow-400 scale-110"
                  : "bg-gray-500/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
