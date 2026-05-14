import { useDispatch } from "react-redux";
import { updateFilesLoadingActionReducer } from "../../redux/slice/fileSlice";

const NoFileFound = ({ message, onReset }) => {
  const dispatch = useDispatch();

  return (
    <div className="col-span-full flex items-center justify-center py-16 px-4">
      {/* Card */}
      <div className="relative overflow-hidden w-full max-w-xl rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-indigo-500/10">
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Content */}
        <div className="relative flex flex-col items-center text-center px-8 py-14">
          {/* Animated Cloud Icon */}
          <div className="relative mb-8">
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl animate-pulse" />

            {/* Main Circle */}
            <div className="relative flex items-center justify-center h-28 w-28 rounded-[30px] bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 shadow-2xl shadow-indigo-500/30">
              {/* Icon */}
              <div className="text-5xl animate-bounce">☁️</div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-2 -right-2 flex items-center justify-center h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-xl">
              🔍
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">
            No Files Found
          </h2>

          {/* Message */}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {message ||
              "We couldn't find any files matching your search. Try different keywords or reset the search to explore all uploaded files."}
          </p>

          {/* Decorative Dots */}
          <div className="mt-6 flex gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" />
            <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:150ms]" />
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:300ms]" />
          </div>

          {/* Reset Button */}
          {onReset && (
            <button
              onClick={() => {
                dispatch(updateFilesLoadingActionReducer(true));
                onReset();
              }}
              className="group mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-7 py-3 text-sm font-bold text-white shadow-xl shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-indigo-500/50 active:scale-95"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 transition-transform duration-700 group-hover:translate-x-[200%]" />

              {/* Button Content */}
              <div className="relative flex items-center gap-2">
                <span className="text-lg transition-transform duration-300 group-hover:rotate-180">
                  ↻
                </span>

                <span>Reset Search</span>
              </div>
            </button>
          )}

          {/* Small Hint */}
          <p className="mt-6 text-xs font-medium text-slate-400 dark:text-slate-500">
            CloudDrop • Secure File Storage
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoFileFound;
