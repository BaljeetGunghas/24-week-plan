// utils/ui.js

export const ui = {
  page: "h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden",
  // ======================
  // TYPOGRAPHY SYSTEM
  // ======================
  text: {
    h1: "text-2xl sm:text-3xl font-bold",
    h2: "text-xl sm:text-2xl font-bold",
    h3: "text-lg sm:text-xl font-semibold",

    body: "text-sm sm:text-base",
    small: "text-xs sm:text-sm",
    muted: "text-xs sm:text-sm text-slate-400",
  },

  // ======================
  // SPACING SYSTEM
  // ======================
  spacing: {
    page: "px-4 sm:px-6 lg:px-8 py-6 sm:py-10",
    section: "p-4 sm:p-6",
    card: "p-4 sm:p-6",
    form: "space-y-4 sm:space-y-5",
  },

  // ======================
  // LAYOUT SYSTEM (NEW)
  // replaces max-w-md, width, etc.
  // ======================
  layout: {
    center: "flex items-center justify-center",
    page: "min-h-screen flex items-center justify-center px-4 sm:px-6",
    container: "w-full max-w-sm sm:max-w-md lg:max-w-lg",
    full: "w-full",
  },

  // ======================
  // SIZE SYSTEM (NEW)
  // replaces w-20 h-20, etc.
  // ======================
  size: {
    iconSm: "w-6 h-6 text-xl",
    iconMd: "w-10 h-10 text-2xl",
    iconLg: "w-14 h-14 sm:w-16 sm:h-16 text-3xl sm:text-4xl",

    avatarSm: "w-8 h-8",
    avatarMd: "w-12 h-12",
    avatarLg: "w-16 h-16",
  },

  // ======================
  // RADIUS SYSTEM
  // ======================
  radius: {
    card: "rounded-2xl",
    button: "rounded-xl",
    input: "rounded-xl sm:rounded-2xl",
  },

  // ======================
  // BUTTON SYSTEM
  // ======================
  button: {
    primary:
      "w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold transition hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",

    secondary:
      "w-full px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/15 transition",

    ghost: "px-3 py-2 rounded-xl text-cyan-400 hover:text-cyan-300 transition",
  },

  // ======================
  // INPUT SYSTEM (NEW IMPORTANT)
  // ======================
  input: {
    base: "w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#111827]/80 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition",

    label: "block text-xs sm:text-sm text-slate-300 mb-2",

    error: "text-xs text-red-400 mt-1",
  },

  // ======================
  // CARD SYSTEM (NEW)
  // ======================
  card: {
    base: "w-full bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl",
  },

  // ======================
  // ICON SYSTEM
  // ======================
  icon: {
    sm: "text-lg sm:text-xl",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
  },

  // ======================
  // DIVIDER
  // ======================
  divider: {
    line: "h-px bg-slate-700",
    text: "text-xs sm:text-sm text-slate-500",
  },
};
