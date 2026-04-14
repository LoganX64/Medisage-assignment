import { useState } from "react";

export default function CreateTask({ onCreate, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    due_date: new Date().toISOString().split("T")[0],
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
    if (!form.title.trim()) newErrors.title = "Task title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.status) newErrors.status = "Status is required";
    if (!form.priority) newErrors.priority = "Priority is required";
    if (!form.due_date) newErrors.due_date = "Due date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onCreate(form);
    setForm({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      due_date: new Date().toISOString().split("T")[0],
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <div className="space-y-5 text-left">
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Task Title</label>
        <input
          className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          name="title"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && <p className="text-xs text-rose-500 ml-1">{errors.title}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Description</label>
        <textarea
          className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition resize-none"
          name="description"
          rows={2}
          placeholder="Add some details..."
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && <p className="text-xs text-rose-500 ml-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Status</label>
          <select
            className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && <p className="text-xs text-rose-500 ml-1">{errors.status}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Priority</label>
          <select
            className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="text-xs text-rose-500 ml-1">{errors.priority}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Due Date</label>
        <input
          type="date"
          className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-slate-600"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
        />
        {errors.due_date && <p className="text-xs text-rose-500 ml-1">{errors.due_date}</p>}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl text-sm font-bold transition border border-slate-100"
        >
          Cancel
        </button>
        <button
          className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition shadow-lg shadow-emerald-100"
          onClick={handleSubmit}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
