import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AdminHero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================================================
     FETCH HERO SLIDES
  ====================================================== */
  const fetchSlides = async () => {
    try {
      const res = await axios.get("/hero");
      setSlides(
        (res.data || []).sort((a, b) => a.order - b.order)
      );
    } catch (err) {
      console.error("Failed to load hero slides", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  /* ======================================================
     UPDATE ORDER
  ====================================================== */
  const updateOrder = async (id, newOrder) => {
    try {
      await axios.put(`/hero/${id}`, {
        order: Number(newOrder),
      });
      fetchSlides();
    } catch (err) {
      console.error("Order update failed", err);
    }
  };

  /* ======================================================
     TOGGLE ACTIVE
  ====================================================== */
  const toggleActive = async (slide) => {
    try {
      await axios.put(`/hero/${slide._id}`, {
        active: !slide.active,
      });
      fetchSlides();
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  /* ======================================================
     DELETE SLIDE
  ====================================================== */
  const deleteSlide = async (id) => {
    if (!window.confirm("Delete this hero slide?")) return;
    try {
      await axios.delete(`/hero/${id}`);
      fetchSlides();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Hero Slider Management
      </h1>

      <p className="text-gray-600 mb-8">
        Control slide order, visibility and content.
        Supports up to 10 images.
      </p>

      {loading && <p>Loading hero slides...</p>}

      {!loading && slides.length === 0 && (
        <p className="text-gray-500">
          No hero slides found.
        </p>
      )}

      <div className="space-y-6">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className="bg-white rounded-xl shadow p-5 flex gap-6 items-center"
          >
            {/* IMAGE */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-40 h-24 object-cover rounded-lg border"
            />

            {/* CONTENT */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {slide.title}
              </h3>
              <p className="text-sm text-gray-500">
                {slide.subtitle}
              </p>

              <div className="mt-3 flex gap-6 items-center">
                {/* ORDER */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">
                    Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="border rounded px-3 py-1 w-20"
                    value={slide.order}
                    onChange={(e) =>
                      updateOrder(slide._id, e.target.value)
                    }
                  />
                </div>

                {/* ACTIVE */}
                <button
                  onClick={() => toggleActive(slide)}
                  className={`px-4 py-1 rounded-full text-sm ${
                    slide.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {slide.active ? "Active" : "Inactive"}
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => deleteSlide(slide._id)}
                className="text-red-600 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
