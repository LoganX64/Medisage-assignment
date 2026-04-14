export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      ></div>

      {/* Delete Modal */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-sm w-full p-6 animate-in fade-in zoom-in duration-150">
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          {title}
        </h3>
        <p className="text-slate-600 text-sm mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
