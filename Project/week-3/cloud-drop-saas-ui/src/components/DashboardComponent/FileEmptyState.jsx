const FileEmptyState = ({ onUploadClick }) => {
  return (
    <div className="col-span-full w-full flex items-center justify-center px-4 py-6">

      {/* CARD WRAPPER */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-xl">

        {/* ================= LEFT SECTION ================= */}
        <div className="relative flex flex-col items-center justify-center p-8 sm:p-10">

          {/* BACKGROUND GLOWS */}
          <div className="absolute top-10 left-10 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-52 h-52 bg-blue-600/10 rounded-full blur-3xl" />

          {/* MAIN ICON BOX */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center rounded-2xl bg-white/10 border border-white/10">

            {/* SVG CLOUD */}
            <svg
              className="w-16 h-16 text-cyan-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20 17.5A4.5 4.5 0 0 0 18 9h-1.26A8 8 0 1 0 4 16.3" />
              <path d="M12 13v8" />
              <path d="M8 17l4-4 4 4" />
            </svg>

          </div>

          {/* SMALL LABEL */}
          <p className="mt-6 text-xs text-slate-400">
            Cloud storage ready
          </p>

        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="flex flex-col justify-center p-6 sm:p-10">

          {/* TITLE */}
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Your CloudDrop is empty
          </h3>

          {/* DESCRIPTION */}
          <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
            Start uploading files to securely store, manage and access them
            anywhere. Your workspace will appear here once you upload your first file.
          </p>

          {/* FEATURES */}
          <div className="mt-5 space-y-2 text-xs text-slate-300">
            <p>• Secure cloud storage</p>
            <p>• Access anywhere</p>
            <p>• Fast file management</p>
          </div>

          {/* CTA */}
          <button
            onClick={onUploadClick}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-500/20 transition hover:-translate-y-0.5 active:scale-95"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 17.5A4.5 4.5 0 0 0 18 9h-1.26A8 8 0 1 0 4 16.3" />
            </svg>

            Upload First File
          </button>

          {/* FOOTER */}
          <p className="mt-4 text-[10px] text-slate-500">
            CloudDrop • Secure Storage System
          </p>

        </div>
      </div>
    </div>
  );
};

export default FileEmptyState;