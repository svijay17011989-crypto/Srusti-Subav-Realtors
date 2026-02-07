import { useEffect, useState } from "react";
import axios from "axios";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    message: "",
    active: true,
  });
  const [editingId, setEditingId] = useState(null);

  /* FETCH TESTIMONIALS */
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/testimonials");
      setTestimonials(res.data || []);
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/testimonials/${editingId}`,
          form,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/testimonials",
          form,
          { withCredentials: true }
        );
      }

      setForm({ name: "", role: "", message: "", active: true });
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  /* EDIT */
  const handleEdit = (t) => {
    setForm({
      name: t.name,
      role: t.role,
      message: t.message,
      active: t.active,
    });
    setEditingId(t._id);
  };

  /* DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/testimonials/${id}`,
        { withCredentials: true }
      );
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
        <div className="mb-4">
          <label className="block text-sm mb-1">Customer Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Role / Location</label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          <label className="text-sm">Active</label>
        </div>

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
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.role}</p>
                <p className="mt-2 text-gray-700">{t.message}</p>
                {!t.active && (
                  <span className="text-xs text-red-500">Inactive</span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="text-sm px-3 py-1 border rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-sm px-3 py-1 border rounded text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
