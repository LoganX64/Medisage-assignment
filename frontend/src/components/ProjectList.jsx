import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function ProjectList({ projects, selectedProject, onSelect, onDelete }) {
  const [deleteProjectId, setDeleteProjectId] = useState(null);

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setDeleteProjectId(id);
  };

  const confirmDelete = () => {
    onDelete(deleteProjectId);
    setDeleteProjectId(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-semibold text-slate-800">Your Projects</h2>
        </div>
        <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
          {projects.length === 0 ? (
            <div className="p-5 text-sm text-center text-slate-500">No projects yet.</div>
          ) : (
            projects.map((p) => {
              const isSelected = selectedProject?._id === p._id;
              return (
                <div
                  key={p._id}
                  className={`flex justify-between items-center px-5 py-3 group transition cursor-pointer ${isSelected ? "bg-blue-50/50 border-l-4 border-blue-500" : "hover:bg-slate-50 border-l-4 border-transparent"
                    }`}
                  onClick={() => onSelect(p)}
                >
                  <span className={`text-sm ${isSelected ? "font-medium text-blue-700" : "text-slate-700"}`}>
                    {p.name}
                  </span>
                  <button
                    className="text-rose-400 opacity-0 group-hover:opacity-100 transition hover:text-rose-600 text-sm font-medium"
                    onClick={(e) => handleDeleteClick(e, p._id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteProjectId}
        onClose={() => setDeleteProjectId(null)}
        onConfirm={confirmDelete}
        title="Delete Project?"
        message="Are you sure you want to delete this project? "
      />
    </>
  );
}
