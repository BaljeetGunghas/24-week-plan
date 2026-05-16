import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { formatFileSize } from "../../utils/constant";

import DeleteConfirmModal from "./DeleteConfirmModal";
import FileSkeleton from "./FileSkeleton";
import FileEmptyState from "./FileEmptyState";
import NoFileFound from "./NoFileFound";

import { Eye, Download, Copy, Trash2, LayoutGrid, List } from "lucide-react";

const MyFiles = ({
  onUploadClick,
  searchQuery,
  handleClearSearch,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const { files, loading } = useSelector((state) => state.files);

  const [viewMode, setViewMode] = useState("grid");
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    file: null,
  });

  const hasFiles = files?.length > 0;
  const hasSearch = searchQuery?.length > 0;

  const openDeleteModal = (file) => setDeleteModal({ open: true, file });

  const closeDeleteModal = () => setDeleteModal({ open: false, file: null });

  const copyLink = async (url) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // fallback for HTTP / older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const getTypeStyle = (type = "") => {
    if (type.includes("image")) return "bg-cyan-500/10 text-cyan-300";
    if (type.includes("video")) return "bg-purple-500/10 text-purple-300";
    if (type.includes("pdf")) return "bg-red-500/10 text-red-300";
    if (type.includes("word")) return "bg-blue-500/10 text-blue-300";
    if (type.includes("zip")) return "bg-yellow-500/10 text-yellow-300";
    return "bg-white/10 text-slate-300";
  };

  const renderPreview = (file) => {
    const type = file?.type;

    if (type?.startsWith("image/")) {
      return (
        <img
          src={file.fileUrl}
          className="w-full h-full max-h-25 object-cover"
          loading="lazy"
        />
      );
    }

    if (type?.startsWith("video/")) {
      return (
        <div className="relative w-full max-h-25 bg-black flex items-center justify-center">
          <video
            src={file.fileUrl}
            className="w-full h-full object-cover"
            muted
          />
          <span className="absolute text-white text-xl">▶</span>
        </div>
      );
    }

    if (type?.includes("pdf")) return <span>📕</span>;
    if (type?.includes("word")) return <span>📘</span>;
    if (type?.includes("zip")) return <span>🗜️</span>;

    return <span>📄</span>;
  };

  const downloadFile = (url, name) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${
              viewMode === "grid"
                ? "bg-cyan-500/20 text-cyan-300"
                : "bg-white/10 text-slate-400"
            }`}
          >
            <LayoutGrid size={16} />
          </button>

          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-lg ${
              viewMode === "table"
                ? "bg-cyan-500/20 text-cyan-300"
                : "bg-white/10 text-slate-400"
            }`}
          >
            <List size={16} />
          </button>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex gap-1 bg-white/10 p-1 rounded-lg">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`px-2 text-[11px] rounded ${
                  currentPage === i + 1
                    ? "bg-cyan-500 text-white"
                    : "text-slate-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* EMPTY STATES */}
      {!loading && !hasFiles && hasSearch && (
        <NoFileFound
          message={`No results for "${searchQuery}"`}
          onReset={handleClearSearch}
        />
      )}

      {!loading && !hasFiles && !hasSearch && (
        <FileEmptyState onUploadClick={onUploadClick} />
      )}

      {/* LOADING */}
      {loading && (
        <>
          {/* GRID LOADING */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <FileSkeleton key={i} viewMode="grid" />
                ))}
            </div>
          )}

          {/* TABLE LOADING */}
          {viewMode === "table" && (
            <div className="space-y-2">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <FileSkeleton key={i} viewMode="table" />
                ))}
            </div>
          )}
        </>
      )}

      {/* GRID VIEW */}
      <AnimatePresence mode="wait">
        {!loading && hasFiles && viewMode === "grid" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {files.map((file) => (
              <div
                key={file._id}
                className="group rounded-xl border border-white/10 bg-white/10 overflow-hidden flex flex-col transition hover:shadow-lg hover:border-white/20"
              >
                {/* PREVIEW */}
                <div className="aspect-[4/2] bg-[#0f172a] flex items-center justify-center relative">
                  {renderPreview(file)}

                  {/* TYPE BADGE */}
                  <div
                    className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-md ${getTypeStyle(
                      file.type,
                    )}`}
                  >
                    {file.type?.split("/")[1] || "file"}
                  </div>
                </div>

                {/* INFO */}
                <div className="p-2 flex flex-col">
                  <p className="text-xs text-white truncate">{file.name}</p>
                  <p className="text-[10px] text-slate-400">
                    {formatFileSize(file.size)}
                  </p>

                  {/* ACTIONS */}
                  <div className="mt-2 flex items-center justify-between opacity-90 group-hover:opacity-100 transition">
                    <button
                      onClick={() => window.open(file.fileUrl)}
                      className="p-1.5 hover:bg-white/10 rounded-md"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      className="p-1.5 hover:bg-white/10 rounded-md"
                      onClick={() => downloadFile(file.fileUrl, file.name)}
                    >
                      <Download size={16} />
                    </button>

                    <button
                      onClick={() => copyLink(file.fileUrl)}
                      className="p-1.5 hover:bg-white/10 rounded-md"
                    >
                      <Copy size={16} />
                    </button>

                    <button
                      onClick={() => openDeleteModal(file)}
                      className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TABLE VIEW */}
      {!loading && hasFiles && viewMode === "table" && (
        <div className="rounded-xl border border-white/10 overflow-hidden">
          {/* HEADER */}
          <div className="grid grid-cols-[40px_1fr_120px_160px] gap-2 p-2 bg-white/10 text-[11px] text-slate-300">
            <div></div>
            <div>Name</div>
            <div>Size</div>
            <div className="text-right">Actions</div>
          </div>

          {/* ROWS */}
          {files.map((file) => (
            <div
              key={file._id}
              className="grid grid-cols-[40px_1fr_120px_160px] gap-2 items-center p-2 border-t border-white/10 hover:bg-white/5 transition"
            >
              {/* ICON */}
              <div className="w-8 h-8 flex items-center justify-center bg-[#111827] rounded">
                {renderPreview(file)}
              </div>

              {/* NAME */}
              <div className="min-w-0">
                <p className="text-xs text-white truncate">{file.name}</p>
              </div>

              {/* SIZE */}
              <div className="text-[11px] text-slate-400">
                {formatFileSize(file.size)}
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => window.open(file.fileUrl)}
                  className="p-1.5 rounded-md hover:bg-white/10"
                  title="View"
                >
                  <Eye size={14} />
                </button>

                <button
                  onClick={() => copyLink(file.fileUrl)}
                  className="p-1.5 rounded-md hover:bg-white/10"
                  title="Copy"
                >
                  <Copy size={14} />
                </button>

                <a
                  href={file.fileUrl}
                  download
                  className="p-1.5 rounded-md hover:bg-white/10"
                  title="Download"
                >
                  <Download size={14} />
                </a>

                <button
                  onClick={() => openDeleteModal(file)}
                  className="p-1.5 rounded-md hover:bg-red-500/20 text-red-400"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DELETE MODAL */}
      <DeleteConfirmModal
        isOpen={deleteModal.open}
        onClose={closeDeleteModal}
        file={deleteModal.file}
      />
    </>
  );
};

export default MyFiles;
