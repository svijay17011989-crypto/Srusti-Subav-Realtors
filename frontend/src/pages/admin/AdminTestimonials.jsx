import { useEffect, useState } from "react";
import api from "../../api/axios";
import axiosAdmin from "../../api/axiosAdmin";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    message: "",
    active: true,
  });
  const [editingId, setEditingId] = useState(null);

  /* ================= FETCH ================= */
  const fetchTestimonials = async () => {
    try {
      let res;
      try {
        res = await axiosAdmin.get("/testimonials");
      } catch {
        res = await api.get("/testimonials");
      }
      setTestimonials(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosAdmin.put(`/testimonials/${editingId}`, form);
      } else {
        await axiosAdmin.post("/testimonials", form);
      }

      setForm({ name: "", role: "", message: "", active: true });
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (t) => {
    setForm({
      name: t.name,
      role: t.role,
      message: t.message,
      active: t.active,
    });
    setEditingId(t._id);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await axiosAdmin.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Testimonials Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-10 max-w-2xl"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Customer Name"
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role / Location"
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Message"
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          Active
        </label>

        <button className="bg-black text-white px-6 py-2 rounded">
          {editingId ? "Update Testimonial" : "Add Testimonial"}
        </button>
      </form>

      {/* LIST */}
      <div className="grid gap-4">
        {testimonials.map((t) => (
          <div
            key={t._id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <h3 className="font-semibold">{t.name}</h3>
            <p className="text-sm text-gray-500">{t.role}</p>
            <p className="mt-2">{t.message}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(t)}
                className="px-3 py-1 border rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="px-3 py-1 border rounded text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
