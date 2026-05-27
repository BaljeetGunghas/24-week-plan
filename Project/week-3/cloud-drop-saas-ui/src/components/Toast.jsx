import { useEffect, useState } from "react";

const toastStyles = {
  success: {
    accent: "bg-emerald-500",
    ring: "ring-emerald-500/20",
  },
  error: {
    accent: "bg-red-500",
    ring: "ring-red-500/20",
  },
  warning: {
    accent: "bg-amber-500",
    ring: "ring-amber-500/20",
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
    setTimeout(() => onRemove(toast.id), 200);
  };

  useEffect(() => {
    const timer = setTimeout(handleClose, 4000);
    return () => clearTimeout(timer);
  }, []);

  const style = toastStyles[toast.type] || toastStyles.success;

  return (
    <div
      className={`
        relative w-[340px] overflow-hidden rounded-2xl

        /* 🔥 KEY FIX: light glass on dark background */
        bg-white/90 dark:bg-white/95

        backdrop-blur-xl
        border border-black/5
        shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]

        transition-all duration-300 ease-out
        ${closing ? "translate-x-full opacity-0 scale-95" : "translate-x-0 opacity-100 scale-100"}
      `}
    >
      {/* accent bar */}
      <div className={`absolute left-0 top-0 h-full w-1 ${style.accent}`} />

      {/* soft highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />

      <div className="relative flex gap-3 p-4">

        {/* icon */}
        <div
          className={`
            flex h-10 w-10 items-center justify-center
            rounded-xl text-sm font-bold text-white
            ${style.accent}
            shadow-md
          `}
        >
          {icons[toast.type]}
        </div>

        {/* text */}
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900 capitalize">
            {toast.type}
          </p>

          <p className="text-sm text-slate-600 mt-0.5 leading-snug">
            {toast.message}
          </p>
        </div>

        {/* close */}
        <button
          onClick={handleClose}
          className="text-slate-400 hover:text-slate-700 transition"
        >
          ✕
        </button>
      </div>

      {/* progress */}
      <div className="h-[3px] w-full bg-black/10">
        <div
          className={`h-full ${style.accent} animate-[toastShrink_4s_linear_forwards]`}
        />
      </div>
    </div>
  );
};

export default Toast;