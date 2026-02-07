import { useEffect, useState } from "react";
import axios from "../../api/axios";

const AdminHeroOrder = () => {
  const [heroes, setHeroes] = useState([]);

  /* FETCH HERO SLIDES */
  const fetchHeroes = async () => {
    try {
      const res = await axios.get("/hero");
      setHeroes(res.data || []);
    } catch (err) {
      console.error("Failed to fetch hero slides", err);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  /* UPDATE ORDER */
  const updateOrder = async (id, newOrder) => {
    try {
      await axios.put(
        `/hero/${id}`,
        { order: Number(newOrder) },
        { withCredentials: true }
      );
      fetchHeroes();
    } catch (err) {
      console.error("Order update failed", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Hero Slider – Order Control
      </h1>

      <p className="text-sm text-gray-500 mb-4">
        Lower order number appears first in the homepage slider.
        Ensure all 10 images have unique order values.
      </p>

      <div className="grid gap-4 max-w-4xl">
        {heroes
          .sort((a, b) => a.order - b.order)
          .map((h) => (
            <div
              key={h._id}
              className="flex items-center gap-4 bg-white border rounded-lg p-4 shadow-sm"
            >
              {/* IMAGE */}
              <img
                src={h.image}
                alt={h.title}
                className="w-32 h-20 object-cover rounded"
              />

              {/* TEXT */}
              <div className="flex-1">
                <h3 className="font-semibold">{h.title}</h3>
                <p className="text-sm text-gray-500">
                  Current Order: {h.order}
                </p>
              </div>

              {/* ORDER INPUT */}
              <input
                type="number"
                min="1"
                className="w-24 border rounded px-2 py-1"
                defaultValue={h.order}
                onBlur={(e) => updateOrder(h._id, e.target.value)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminHeroOrder;
