import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    text: "",
    order: 0,
  });

  const fetchTestimonials = async () => {
    const res = await axios.get("/testimonials");
    setItems(res.data || []);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("/testimonials", form);
    setForm({ name: "", role: "", text: "", order: 0 });
    fetchTestimonials();
  };

  const toggleActive = async (id, active) => {
    await axios.put(`/testimonials/${id}`, { active: !active });
    fetchTestimonials();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete testimonial?")) return;
    await axios.delete(`/testimonials/${id}`);
    fetchTestimonials();
  };

  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Testimonials Management</h1>

      {/* ADD FORM */}
      <form
        onSubmit={submit}
        className="bg-white rounded-xl shadow p-6 mb-10"
      >
        <div className="grid gap-4">
          <input
            placeholder="Client Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-3 rounded"
            required
          />
          <input
            placeholder="Role (Buyer / Investor)"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="border p-3 rounded"
          />
          <textarea
            placeholder="Testimonial text"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="border p-3 rounded"
            required
          />
          <input
            type="number"
            placeholder="Order"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: +e.target.value })}
            className="border p-3 rounded w-40"
          />
          <button className="bg-black text-white px-6 py-3 rounded w-fit">
            Add Testimonial
          </button>
        </div>
      </form>

      {/* LIST */}
      <div className="grid gap-6">
        {items.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-xl shadow p-5 flex justify-between"
          >
            <div>
              <h3 className="font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.role}</p>
              <p className="mt-2 text-gray-700 italic">“{t.text}”</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => toggleActive(t._id, t.active)}
                className={`px-3 py-1 rounded text-sm ${
                  t.active ? "bg-green-600 text-white" : "bg-gray-300"
                }`}
              >
                {t.active ? "Active" : "Inactive"}
              </button>
              <button
                onClick={() => remove(t._id)}
                className="px-3 py-1 rounded text-sm bg-red-600 text-white"
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
