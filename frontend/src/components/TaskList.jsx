import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function TaskList({
  tasks,
  project,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onApply,
  onDeleteTask,
  onUpdateTask,
  pagination,
  onPageChange,
}) {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const startEdit = (task) => {
    setEditTaskId(task._id);
    setEditForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      due_date: task.due_date?.split("T")[0] || "",
    });
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = () => {
    onUpdateTask(editTaskId, editForm);
    setEditTaskId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "todo": return "bg-slate-100 text-slate-700";
      case "in-progress": return "bg-blue-50 text-blue-700 border-blue-200 border";
      case "done": return "bg-emerald-50 text-emerald-700 border-emerald-200 border";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low": return "text-emerald-500";
      case "medium": return "text-amber-500";
      case "high": return "text-rose-500";
      default: return "text-slate-500";
    }
  };

  const confirmDelete = () => {
    onDeleteTask(deleteTaskId);
    setDeleteTaskId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">{project.name} <span className="text-slate-400 font-normal text-lg ml-1">Tasks</span></h2>

        {/* filter + sort */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <select
            className="border border-slate-300 bg-white rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 transition"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            className="border border-slate-300 bg-white rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 transition"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="due_date_asc">Due Date (Earliest)</option>
            <option value="due_date_desc">Due Date (Latest)</option>
          </select>

          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-1.5 rounded-lg text-sm font-medium transition" onClick={onApply}>
            Apply
          </button>
        </div>
      </div>

      {/* task list */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300 text-slate-500 flex flex-col items-center justify-center">
            <span className="text-4xl mb-2 block">📋</span>
            No tasks found.
          </div>
        ) : (
          tasks.map((t) => (
            <div key={t._id} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition group text-left">
              {editTaskId === t._id ? (
                // EDIT MODE
                <div className="space-y-3">
                  <input
                    className="border border-slate-300 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium transition"
                    name="title"
                    value={editForm.title}
                    onChange={handleChange}
                  />

                  <textarea
                    className="border border-slate-300 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none transition"
                    name="description"
                    rows={2}
                    value={editForm.description}
                    onChange={handleChange}
                  />

                  <div className="flex flex-wrap gap-3">
                    <select
                      className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none transition"
                      name="status"
                      value={editForm.status}
                      onChange={handleChange}
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>

                    <select
                      className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none transition"
                      name="priority"
                      value={editForm.priority}
                      onChange={handleChange}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>

                    <input
                      type="date"
                      className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none text-slate-600 transition"
                      name="due_date"
                      value={editForm.due_date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
                      onClick={saveEdit}
                    >
                      Save Changes
                    </button>

                    <button
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-1.5 rounded-lg text-sm font-medium transition"
                      onClick={() => setEditTaskId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // VIEW MODE
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className={`text-base font-semibold ${t.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {t.title}
                      </h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(t.status)}`}>
                        {t.status.replace("-", " ")}
                      </span>
                    </div>
                    {t.description && (
                      <p className={`text-sm ${t.status === 'done' ? 'text-slate-400' : 'text-slate-600'}`}>{t.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-xs font-medium mt-3 text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">Priority:</span>
                        <span className={`uppercase tracking-wide ${getPriorityColor(t.priority)}`}>{t.priority}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">Due:</span>
                        <span>{t.due_date ? new Date(t.due_date).toLocaleDateString() : "No date"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                    <button
                      className="text-slate-500 font-medium hover:text-blue-600 text-sm px-3 py-1.5 sm:p-0 bg-slate-50 sm:bg-transparent rounded-lg sm:rounded-none transition"
                      onClick={() => startEdit(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-slate-500 font-medium hover:text-rose-600 text-sm px-3 py-1.5 sm:p-0 bg-slate-50 sm:bg-transparent rounded-lg sm:rounded-none transition"
                      onClick={() => setDeleteTaskId(t._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* pagination controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition"
          >
            ←
          </button>

          {[...Array(pagination.totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`w-10 h-10 rounded-lg border text-sm font-medium transition ${pagination.page === i + 1
                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition"
          >
            →
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTaskId}
        onClose={() => setDeleteTaskId(null)}
        onConfirm={confirmDelete}
        title="Delete Task?"
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
}

