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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl p-4">
      {/* Modal */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[36px] border border-white/10 bg-white dark:bg-slate-900 shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* Content */}
        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">
                Upload Files
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Securely upload and manage your cloud files
              </p>
            </div>

            {/* Close */}
            <button
              onClick={handleClose}
              className="flex items-center justify-center h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              ✕
            </button>
          </div>

          {/* Upload Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              relative overflow-hidden rounded-[32px] border-2 border-dashed transition-all duration-300
              ${
                isDragging
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 scale-[1.01]"
                  : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-400"
              }
            `}
          >
            {/* Hidden Input */}
            <input
              type="file"
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx,.txt,.mp4"
            />

            {/* Inner */}
            <div className="relative flex flex-col items-center justify-center px-8 py-16">
              {/* Animated Icon */}
              <div className="relative mb-8">
                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl animate-pulse" />

                {/* Main Icon */}
                <div
                  className={`
                    relative flex h-28 w-28 items-center justify-center rounded-[32px]
                    bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500
                    text-6xl shadow-2xl shadow-blue-500/30
                    transition-transform duration-300
                    ${isDragging ? "scale-110 rotate-6" : ""}
                  `}
                >
                  {file ? "📄" : "☁️"}
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl text-xl">
                  {file ? "✨" : "⬆️"}
                </div>
              </div>

              {/* File Info */}
              {file ? (
                <div className="w-full max-w-md text-center">
                  <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-lg">
                    <p className="truncate text-lg font-black text-blue-600 dark:text-blue-400">
                      {file.name}
                    </p>

                    <div className="mt-3 flex items-center justify-center gap-2">
                      <span className="rounded-full bg-blue-100 dark:bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>

                      <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-bold text-slate-500">
                        {file.type || "FILE"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Heading */}
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                    Drag & Drop Files
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-md text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    Upload images, videos, PDFs, documents, and text files
                    securely to your CloudDrop storage.
                  </p>

                  {/* Supported Types */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    {["PNG", "JPG", "PDF", "DOCX", "TXT", "MP4"].map((type) => (
                      <span
                        key={type}
                        className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex gap-4">
            {/* Cancel */}
            <button
              onClick={handleClose}
              disabled={uploading}
              className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-4 font-bold text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"
            >
              Cancel
            </button>

            {/* Upload */}
            <button
              disabled={!file || uploading}
              onClick={handleUpload}
              className={`
                flex-1 rounded-2xl px-6 py-4 font-bold text-white shadow-2xl transition-all duration-300
                ${
                  !file || uploading
                    ? "cursor-not-allowed bg-slate-300 dark:bg-slate-700"
                    : "bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-95"
                }
              `}
            >
              {uploading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Uploading...
                </div>
              ) : (
                "Start Upload"
              )}
            </button>
          </div>

          {/* Footer Hint */}
          <p className="mt-5 text-center text-xs font-medium text-slate-400 dark:text-slate-500">
            CloudDrop • Secure Cloud Storage Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
