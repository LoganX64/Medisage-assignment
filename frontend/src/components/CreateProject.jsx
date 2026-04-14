import { useState } from "react";

export default function CreateProject({ onCreate, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Project name is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onCreate({
      name: form.name.trim(),
      description: form.description.trim(),
    });

    setForm({ name: "", description: "" });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <div className="space-y-5 text-left">
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Project Name</label>
        <input
          className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          name="name"
          placeholder="e.g. Marketing Campaign 2024"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-xs text-rose-500 ml-1">{errors.name}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Description</label>
        <textarea
          className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition resize-none"
          name="description"
          rows={3}
          placeholder="Tell us a bit about this project..."
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && <p className="text-xs text-rose-500 ml-1">{errors.description}</p>}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl text-sm font-bold transition border border-slate-100"
        >
          Cancel
        </button>
        <button
          className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition shadow-lg shadow-blue-100"
          onClick={handleSubmit}
        >
          Create Project
        </button>
      </div>
    </div>
  );
}
