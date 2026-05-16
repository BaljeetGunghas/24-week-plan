const FileSkeleton = ({ viewMode = "grid" }) => {
  if (viewMode === "table") {
    return (
      <div className="rounded-xl border border-white/10 overflow-hidden animate-pulse">
        {/* ROW */}
        <div className="grid grid-cols-[40px_1fr_120px_160px] gap-2 items-center p-2 bg-white/5">
          {/* ICON */}
          <div className="w-8 h-8 rounded bg-white/10" />

          {/* NAME */}
          <div className="h-3 w-3/4 bg-white/10 rounded" />

          {/* SIZE */}
          <div className="h-3 w-16 bg-white/10 rounded" />

          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <div className="w-7 h-7 rounded bg-white/10" />
            <div className="w-7 h-7 rounded bg-white/10" />
            <div className="w-7 h-7 rounded bg-white/10" />
            <div className="w-7 h-7 rounded bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  // GRID SKELETON
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-xl
        border
        border-white/10
        bg-white/10
        p-3
        animate-pulse
      "
    >
      {/* IMAGE AREA */}
      <div className="aspect-[4/3] bg-white/10 rounded-lg mb-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.8s_infinite]" />
      </div>

      {/* TITLE */}
      <div className="h-3 w-3/4 bg-white/10 rounded mb-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.8s_infinite]" />
      </div>

      {/* SIZE */}
      <div className="h-2 w-1/3 bg-white/10 rounded relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.8s_infinite]" />
      </div>
    </div>
  );
};

export default FileSkeleton;
