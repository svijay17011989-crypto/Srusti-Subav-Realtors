import { useEffect, useState } from "react";
import axios from "axios";

const AdminHero = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FETCH HERO SLIDES */
  const fetchHeroes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hero");
      setHeroes(res.data || []);
    } catch (err) {
      console.error("Failed to fetch hero slides", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  /* UPDATE HERO (ORDER / ACTIVE) */
  const updateHero = async (id, data) => {
    try {
      await axios.put(
        `http://localhost:5000/api/hero/${id}`,
        data,
        { withCredentials: true }
      );
      fetchHeroes();
    } catch (err) {
      console.error("Failed to update hero", err);
    }
  };

  if (loading) return <p className="p-6">Loading hero slides...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Hero Slider Management</h1>

      {heroes.length === 0 && (
        <p className="text-gray-500">No hero slides found.</p>
      )}

      <div className="grid gap-6">
        {heroes
          .sort((a, b) => a.order - b.order)
          .map((hero, index) => (
            <div
              key={hero._id}
              className="flex gap-6 items-center border rounded-lg p-4 shadow-sm bg-white"
            >
              {/* IMAGE */}
              <div className="w-48 h-28 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={hero.image}
                  alt={hero.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{hero.title}</h3>
                <p className="text-sm text-gray-500">{hero.subtitle}</p>
              </div>

              {/* ORDER */}
              <div className="flex flex-col items-center">
                <label className="text-xs text-gray-500 mb-1">Order</label>
                <input
                  type="number"
                  value={hero.order}
                  className="w-20 border rounded px-2 py-1 text-center"
                  onChange={(e) =>
                    updateHero(hero._id, {
                      order: Number(e.target.value),
                    })
                  }
                />
              </div>

              {/* ACTIVE TOGGLE */}
              <div className="flex flex-col items-center">
                <label className="text-xs text-gray-500 mb-1">Active</label>
                <input
                  type="checkbox"
                  checked={hero.active}
                  onChange={(e) =>
                    updateHero(hero._id, {
                      active: e.target.checked,
                    })
                  }
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminHero;
