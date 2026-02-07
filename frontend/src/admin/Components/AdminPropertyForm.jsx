import { useState } from "react";

const AdminPropertyForm = ({ onSubmit, initialData = {}, loading }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    images: initialData.images || [],
    status: initialData.status || "Available",
    type: initialData.type || "Residential",
    facing: initialData.facing || "East",
    totalCents: initialData.totalCents || "",
    road: initialData.road || "30 feet",
    price: initialData.price || "",
    priceUnit: initialData.priceUnit || "Per Cent",
    dtcpApproved: initialData.dtcpApproved || false,
    description: initialData.description || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setForm({ ...form, images: files });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-[#f4f3ef] p-10 rounded-2xl shadow-xl max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-playfair mb-8">
        Property Details
      </h2>

      {/* TITLE */}
      <Input label="Title" name="title" value={form.title} onChange={handleChange} />

      {/* IMAGES */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Images (max 5)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        <Select label="Status" name="status" value={form.status} onChange={handleChange}
          options={["Available", "Sold"]}
        />

        <Select label="Type" name="type" value={form.type} onChange={handleChange}
          options={["Residential", "Commercial", "Industrial", "Agri"]}
        />

        <Select label="Facing" name="facing" value={form.facing} onChange={handleChange}
          options={[
            "East", "West", "North", "South",
            "North East", "North West", "South East", "South West"
          ]}
        />

        <Input label="Total Cents" name="totalCents" value={form.totalCents} onChange={handleChange} />

        <Select label="Road Width" name="road" value={form.road} onChange={handleChange}
          options={["20 feet", "23 feet", "30 feet", "40 feet", "60 feet"]}
        />

        <Input label="Price" name="price" value={form.price} onChange={handleChange} />

        <Select label="Price Unit" name="priceUnit" value={form.priceUnit} onChange={handleChange}
          options={["Per Cent", "Per Acre"]}
        />
      </div>

      {/* DTCP */}
      <div className="flex items-center gap-3 mt-6">
        <input
          type="checkbox"
          name="dtcpApproved"
          checked={form.dtcpApproved}
          onChange={handleChange}
        />
        <label>DTCP Approved</label>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">More Details</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="mt-8 bg-[#d6b25e] hover:bg-[#c7a64f] px-8 py-3 rounded-md font-medium"
      >
        {loading ? "Saving..." : "Save Property"}
      </button>
    </form>
  );
};

/* SMALL COMPONENTS */
const Input = ({ label, ...props }) => (
  <div>
    <label className="block mb-2 font-medium">{label}</label>
    <input
      {...props}
      className="w-full border rounded-lg p-3"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block mb-2 font-medium">{label}</label>
    <select {...props} className="w-full border rounded-lg p-3">
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default AdminPropertyForm;
