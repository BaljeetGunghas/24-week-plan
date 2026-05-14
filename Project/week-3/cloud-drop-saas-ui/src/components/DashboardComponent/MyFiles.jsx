import { useState } from "react";
import { formatFileSize } from "../../utils/constant";
import DeleteConfirmModal from "./DeleteConfirmModal";
import FileSkeleton from "./FileSkeleton";
import FileEmptyState from "./FileEmptyState";
import { useSelector } from "react-redux";
import NoFileFound from "./NoFileFound";

const MyFiles = ({
  onUploadClick,
  searchQuery,
  handleClearSearch,
  lastFileRef, // ✅ NEW (for infinite scroll)
}) => {
  const { files, loading } = useSelector((state) => state.files);

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    file: null,
  });

  const getFileIcon = (type = "") => {
    if (type.includes("image")) return "🖼️";
    if (type.includes("pdf")) return "📕";
    if (type.includes("word")) return "📘";
    return "📄";
  };

  const openDeleteModal = (file) => {
    setDeleteModal({
      open: true,
      file,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      open: false,
      file: null,
    });
  };

  const hasFiles = files?.length > 0;
  const hasSearch = searchQuery?.length > 0;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* LOADING */}
        {loading &&
          Array(8)
            .fill(0)
            .map((_, i) => <FileSkeleton key={i} />)}

        {/* FILES */}
        {!loading &&
          hasFiles &&
          files.map((file, index) => {
            const isImage = file?.type?.startsWith("image/");
            const isVideo = file?.type?.startsWith("video/");
            const isPDF = file?.type === "application/pdf";

            const isText =
              file?.type === "text/plain" || file?.name?.endsWith(".txt");

            const isDoc =
              file?.type?.includes("word") ||
              file?.type?.includes("document") ||
              file?.name?.endsWith(".doc") ||
              file?.name?.endsWith(".docx");

            return (
              <div
                key={file._id}
                ref={index === files.length - 1 ? lastFileRef : null}
                className="group relative bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* PREVIEW */}
                <div className="relative aspect-video mb-4 rounded-2xl overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                  {isImage ? (
                    <img
                      src={file.fileUrl}
                      alt={file.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : isVideo ? (
                    <div className="relative w-full h-full">
                      <video
                        src={file.fileUrl}
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                          ▶️
                        </div>
                      </div>
                    </div>
                  ) : isPDF ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 dark:bg-red-950/20">
                      <div className="text-5xl">📕</div>
                      <p className="text-xs font-bold text-red-500 mt-2">
                        PDF FILE
                      </p>
                    </div>
                  ) : isDoc ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-950/20">
                      <div className="text-5xl">📘</div>
                      <p className="text-xs font-bold text-blue-500 mt-2">
                        DOC FILE
                      </p>
                    </div>
                  ) : isText ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
                      <div className="text-5xl">📄</div>
                      <p className="text-xs font-bold">TEXT FILE</p>
                    </div>
                  ) : (
                    <div className="text-5xl">{getFileIcon(file?.type)}</div>
                  )}

                  {/* badge */}
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-[10px] rounded-lg">
                    {file?.type?.split("/")?.[1] || "file"}
                  </div>
                </div>

                {/* INFO */}
                <div className="px-2">
                  <h4 className="font-bold truncate" title={file.name}>
                    {file.name}
                  </h4>

                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>{formatFileSize(file.size)}</span>

                    <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    className="p-2 bg-white/90 rounded-xl"
                  >
                    👁️
                  </a>

                  <button
                    onClick={() => openDeleteModal(file)}
                    className="p-2 bg-white/90 rounded-xl text-red-500"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}

        {/* EMPTY STATES */}
        {!loading && !hasFiles && hasSearch && (
          <NoFileFound
            message={`No results for "${searchQuery}"`}
            onReset={searchQuery ? handleClearSearch : null}
          />
        )}

        {!loading && !hasFiles && !hasSearch && (
          <FileEmptyState onUploadClick={onUploadClick} />
        )}
      </div>

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
