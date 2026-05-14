const FileSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 animate-pulse">
    {/* Preview Area */}
    <div className="aspect-video mb-4 rounded-2xl bg-slate-200 dark:bg-slate-700" />
    {/* Text Area */}
    <div className="px-2 space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4" />
      <div className="flex justify-between">
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-1/4" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-1/4" />
      </div>
    </div>
  </div>
);

export default FileSkeleton;
