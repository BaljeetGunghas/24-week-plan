import { useEffect, useState } from "react";

const toastStyles = {
  success: {
    container:
      "border-emerald-200/60 bg-white/90 dark:bg-slate-900/90 dark:border-emerald-500/10",
    icon: "bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-emerald-500/30",
    progress: "from-emerald-500 to-green-500",
  },

  error: {
    container:
      "border-red-200/60 bg-white/90 dark:bg-slate-900/90 dark:border-red-500/10",
    icon: "bg-gradient-to-br from-red-500 to-rose-500 text-white shadow-red-500/30",
    progress: "from-red-500 to-rose-500",
  },

  warning: {
    container:
      "border-amber-200/60 bg-white/90 dark:bg-slate-900/90 dark:border-amber-500/10",
    icon: "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-amber-500/30",
    progress: "from-amber-500 to-orange-500",
  },
};

const icons = {
  success: "✓",
  error: "✕",
  warning: "!",
};

const Toast = ({ toast, onRemove }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const currentStyle = toastStyles[toast.type] || toastStyles.success;

  return (
    <div
      className={`
        relative overflow-hidden rounded-[24px] border backdrop-blur-xl shadow-2xl
        transition-all duration-300 ease-out
        ${currentStyle.container}
        ${
          closing
            ? "translate-x-full opacity-0 scale-95"
            : "translate-x-0 opacity-100 scale-100"
        }
      `}
    >
      {/* Glow */}
      <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl" />

      {/* Content */}
      <div className="relative flex items-start gap-4 p-4">
        {/* Icon */}
        <div
          className={`
            flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black shadow-xl
            ${currentStyle.icon}
          `}
        >
          {icons[toast.type]}
        </div>

        {/* Message */}
        <div className="flex-1 pr-2">
          <p className="text-sm font-black text-slate-800 dark:text-white capitalize">
            {toast.type}
          </p>

          <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {toast.message}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="
            flex h-8 w-8 items-center justify-center rounded-xl
            text-slate-400 transition-all
            hover:bg-slate-100 hover:text-slate-700
            dark:hover:bg-slate-800 dark:hover:text-white
          "
        >
          ✕
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`
            h-full bg-gradient-to-r ${currentStyle.progress}
            animate-[toastShrink_5s_linear_forwards]
          `}
        />
      </div>
    </div>
  );
};

export default Toast;
