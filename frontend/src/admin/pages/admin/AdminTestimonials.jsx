import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    text: "",
  });
  const [editingId, setEditingId] = useState(null);

  /* ======================================
     FETCH TESTIMONIALS
  ====================================== */
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("/testimonials");
      setTestimonials(res.data || []);
    } catch (err) {
      console.warn("Using static testimonials (API not ready)");
      setTestimonials([]);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* ======================================
     SUBMIT (ADD / UPDATE)
  ====================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`/testimonials/${editingId}`, form);
      } else {
        await axios.post("/testimonials", form);
      }

      setForm({ name: "", role: "", text: "" });
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  /* ======================================
     EDIT
  ====================================== */
  const handleEdit = (t) => {
    setForm({
      name: t.name,
      role: t.role,
      text: t.text,
    });
    setEditingId(t._id);
  };

  /* ======================================
     DELETE
  ====================================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await axios.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Testimonials</h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 mb-10"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Client Name"
            className="border rounded-lg p-3"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Role / Designation"
            className="border rounded-lg p-3"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
            required
          />
        </div>

        <textarea
          placeholder="Testimonial Text"
          className="border rounded-lg p-3 w-full mt-6"
          rows="4"
          value={form.text}
          onChange={(e) =>
            setForm({ ...form, text: e.target.value })
          }
          required
        />

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            {editingId ? "Update Testimonial" : "Add Testimonial"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", role: "", text: "" });
              }}
              className="border px-6 py-3 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ================= LIST ================= */}
      <div className="space-y-4">
        {testimonials.length === 0 && (
          <p className="text-gray-500">
            No testimonials found.
          </p>
        )}

        {testimonials.map((t) => (
          <div
            key={t._id}
            className="bg-white border rounded-xl p-6 flex justify-between items-start gap-6"
          >
            <div>
              <h3 className="font-semibold text-lg">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.role}</p>
              <p className="mt-3 text-gray-700">{t.text}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(t)}
                className="text-blue-600 font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t._id)}
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
