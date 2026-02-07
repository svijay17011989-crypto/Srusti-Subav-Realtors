import { useEffect, useState } from "react";
import { getHeroes, updateHero, deleteHero } from "../services/heroAdminApi";

export default function HeroManager() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    loadHeroes();
  }, []);

  const loadHeroes = async () => {
    const res = await getHeroes();
    setHeroes(res.data);
  };

  const toggleActive = async (hero) => {
    await updateHero(hero._id, { active: !hero.active });
    loadHeroes();
  };

  const removeHero = async (id) => {
    if (window.confirm("Delete this slide?")) {
      await deleteHero(id);
      loadHeroes();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Hero Slides</h2>

      {heroes.map((hero) => (
        <div
          key={hero._id}
          style={{
            display: "flex",
            gap: 20,
            marginBottom: 15,
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 8
          }}
        >
          <img
            src={hero.image}
            alt=""
            width="160"
            style={{ borderRadius: 6 }}
          />

          <div style={{ flex: 1 }}>
            <h4>{hero.title}</h4>
            <p>{hero.subtitle}</p>
            <p>Order: {hero.order}</p>
            <p>Status: {hero.active ? "Active" : "Inactive"}</p>

            <button onClick={() => toggleActive(hero)}>
              Toggle Active
            </button>

            <button
              style={{ marginLeft: 10, color: "red" }}
              onClick={() => removeHero(hero._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
