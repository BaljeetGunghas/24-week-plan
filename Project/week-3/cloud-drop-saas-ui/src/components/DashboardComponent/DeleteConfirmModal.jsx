import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteFileApi } from "../../api/file";
import { useToast } from "../../../context/ToastContext";

import { deleteFilesActionReducer } from "../../redux/slice/fileSlice";
import { updateStatesActionReducer } from "../../redux/slice/statsSlice";

const DeleteConfirmModal = ({ isOpen, onClose, file }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  if (!isOpen || !file) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      const responseData = await deleteFileApi(file._id);

      if (responseData.statusCode !== 200) {
        throw new Error(responseData.message || "Delete failed");
      }

      dispatch(deleteFilesActionReducer(file._id));

      dispatch(updateStatesActionReducer(responseData?.data?.storage));

      toast.success("File deleted successfully");

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || error?.message || "Delete failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Content */}
        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">
                Delete File
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                This file will be permanently removed from your CloudDrop
                storage.
              </p>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              disabled={loading}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-50"
            >
              ✕
            </button>
          </div>

          {/* File Preview */}
          <div className="mt-8 rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-5">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-500 text-3xl shadow-lg shadow-blue-500/20">
                📄
              </div>

              {/* Info */}
              <div className="flex-1 overflow-hidden">
                <p
                  className="truncate text-sm font-black text-slate-800 dark:text-white"
                  title={file.name}
                >
                  {file.name}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  Stored securely in CloudDrop
                </p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-5 rounded-2xl border border-amber-200 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-500/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="text-lg">⚠️</div>

              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            {/* Cancel */}
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-4 font-bold text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"
            >
              Cancel
            </button>

            {/* Delete */}
            <button
              onClick={handleDelete}
              disabled={loading}
              className={`
                flex-1 rounded-2xl px-5 py-4 font-bold text-white transition-all shadow-xl
                ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95"
                }
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Deleting...
                </div>
              ) : (
                "Delete File"
              )}
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-[11px] font-medium text-slate-400 dark:text-slate-500">
            CloudDrop • Secure Cloud Storage
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
