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

      const res = await deleteFileApi(file._id);

      if (res.statusCode !== 200) {
        throw new Error(res.message || "Delete failed");
      }

      dispatch(deleteFilesActionReducer(file._id));
      dispatch(updateStatesActionReducer(res?.data?.storage));

      toast.success("File deleted");
      onClose();
    } catch (err) {
      toast.error(err?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      {/* MODAL */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl">
        {/* GLOW */}
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative p-5">
          {/* HEADER */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">Delete file?</h2>

              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                This action cannot be undone.
              </p>
            </div>

            <button
              onClick={onClose}
              disabled={loading}
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-slate-300"
            >
              ✕
            </button>
          </div>

          {/* FILE */}
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-3">
            <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl">
              📄
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {file.name}
              </p>
              <p className="text-[11px] text-slate-400">Stored in CloudDrop</p>
            </div>
          </div>

          {/* WARNING */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2">
            <span className="text-sm">⚠️</span>

            <p className="text-[11px] text-red-300">Permanent deletion</p>
          </div>

          {/* ACTIONS */}
          <div className="mt-5 flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 h-10 rounded-xl border border-white/10 bg-white/10 text-sm text-slate-200"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className={`
                flex-1 h-10 rounded-xl text-sm font-semibold text-white transition
                ${
                  loading
                    ? "bg-slate-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-red-600"
                }
              `}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>

          {/* FOOTER */}
          <p className="mt-4 text-center text-[10px] text-slate-500">
            CloudDrop Storage
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
