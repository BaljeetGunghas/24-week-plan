
const FileEmptyState = ({onUploadClick}) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center">
    <div className="w-64 h-64 bg-blue-50 dark:bg-blue-500/5 rounded-full flex items-center justify-center mb-8 relative">
      <span className="text-8xl animate-bounce">📂</span>
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center text-2xl">
        ❓
      </div>
    </div>
    <h3 className="text-2xl font-black mb-2">No files discovered</h3>
    <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 font-medium">
      It looks like your cloud is empty. Start by uploading your first image, video, or document!
    </p>
    <button
      onClick={onUploadClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1"
    >
      + Upload My First File
    </button>
  </div>
  )
}

export default FileEmptyState