import { useState } from "react";
import { useDispatch } from "react-redux";

import { uploadFileApi } from "../../api/file";
import { addFileActionReducer } from "../../redux/slice/fileSlice";
import { updateStatesActionReducer } from "../../redux/slice/statsSlice";

const UploadModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const responseData = await uploadFileApi(formData);

      if (responseData.statusCode === 201) {
        const { file, storage } = responseData?.data || {};

        dispatch(addFileActionReducer(file));
        dispatch(updateStatesActionReducer(storage));

        setFile(null);
        onClose();
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      {/* MODAL */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl">
        {/* GLOW (aligned with delete modal intensity) */}
        <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative p-6 space-y-5">
          {/* HEADER */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white dark:text-white">
                Upload Files
              </h2>

              <p className="text-xs text-slate-400">
                Securely upload and manage your cloud files
              </p>
            </div>

            <button
              onClick={handleClose}
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-slate-300 hover:bg-white/15 transition"
            >
              ✕
            </button>
          </div>

          {/* UPLOAD AREA */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              relative overflow-hidden rounded-xl border border-dashed transition-all
              ${
                isDragging
                  ? "border-blue-500 bg-blue-500/10 scale-[1.01]"
                  : "border-white/10 bg-white/10"
              }
            `}
          >
            <input
              type="file"
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.txt,.mp4"
            />

            <div className="flex flex-col items-center justify-center text-center px-6 py-14 space-y-4">
              {/* ICON */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl animate-pulse" />

                <div
                  className={`
                    relative flex h-24 w-24 items-center justify-center rounded-2xl
                    bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500
                    text-5xl shadow-lg
                    transition-transform
                    ${isDragging ? "scale-110 rotate-6" : ""}
                  `}
                >
                  {file ? "📄" : "☁️"}
                </div>

                <div className="absolute -bottom-2 -right-2 h-10 w-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-lg">
                  {file ? "✨" : "⬆️"}
                </div>
              </div>

              {/* CONTENT */}
              {file ? (
                <div className="w-full max-w-md">
                  <div className="rounded-xl border border-white/10 bg-white/10 p-4 space-y-2">
                    <p className="truncate text-sm font-semibold text-blue-400">
                      {file.name}
                    </p>

                    <div className="flex justify-center gap-2 flex-wrap">
                      <span className="text-[11px] px-2 py-1 rounded-full bg-blue-500/10 text-blue-300">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>

                      <span className="text-[11px] px-2 py-1 rounded-full bg-white/10 text-slate-400">
                        {file.type || "FILE"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-white">
                    Drag & Drop Files
                  </h3>

                  <p className="text-xs text-slate-400 max-w-md">
                    Upload images, videos, PDFs, documents, and text files
                    securely to your CloudDrop storage.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {["PNG", "JPG", "PDF", "DOCX", "TXT", "MP4"].map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-3 py-1 rounded-xl border border-white/10 bg-white/10 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ACTIONS (matched with delete modal) */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              disabled={uploading}
              className="flex-1 h-10 rounded-xl border border-white/10 bg-white/10 text-sm text-slate-200 hover:bg-white/15 transition"
            >
              Cancel
            </button>

            <button
              disabled={!file || uploading}
              onClick={handleUpload}
              className={`
                flex-1 h-10 rounded-xl text-sm font-semibold text-white transition
                ${
                  !file || uploading
                    ? "bg-slate-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-[1.02]"
                }
              `}
            >
              {uploading ? "Uploading..." : "Start Upload"}
            </button>
          </div>

          {/* FOOTER */}
          <p className="text-center text-[10px] text-slate-500">
            CloudDrop • Secure Cloud Storage Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
