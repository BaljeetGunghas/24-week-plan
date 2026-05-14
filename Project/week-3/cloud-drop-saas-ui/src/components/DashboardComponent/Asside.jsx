import { useDispatch, useSelector } from "react-redux";
import { getTokenKey } from "../../utils/constant";
import { logoutActionReducer } from "../../redux/slice/authSlice";

const Asside = ({ activeTab, setActiveTab, loading }) => {
  const { usedBytes, maxBytes, percentage } = useSelector(
    (state) => state.stats,
  );

  const dispatch = useDispatch();

  // Storage Values
  const usedMB = (usedBytes / 1024 / 1024).toFixed(2);

  const maxMB = (maxBytes / 1024 / 1024).toFixed(0);

  const handleLogout = () => {
    dispatch(logoutActionReducer());
  };

  const navItems = [
    {
      label: "My Files",
      icon: "☁️",
    },
    {
      label: "Settings",
      icon: "⚙️",
    },
  ];

  return (
    <aside className="fixed flex h-full w-96 flex-col overflow-hidden border-r border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Logo */}
        <div className="mb-12 flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-blue-500 blur-xl opacity-30" />

            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-black text-white shadow-2xl shadow-blue-500/30">
              ☁️
            </div>
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-3xl font-black tracking-tight text-transparent">
              CloudDrop
            </h1>

            <p className="text-xs font-semibold tracking-wide text-slate-400">
              Secure Cloud Storage
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.label;

            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`
                  group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl px-5 py-4 text-left font-bold transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20"
                      : "text-slate-600 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-800/60"
                  }
                `}
              >
                {/* Active Glow */}
                {isActive && <div className="absolute inset-0 bg-white/10" />}

                {/* Icon */}
                <div
                  className={`
                    relative flex h-11 w-11 items-center justify-center rounded-xl text-lg transition-all
                    ${
                      isActive
                        ? "bg-white/15"
                        : "bg-slate-100 dark:bg-slate-800"
                    }
                  `}
                >
                  {tab.icon}
                </div>

                {/* Text */}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Storage Card */}
        <div className="mt-auto mb-6">
          {loading ? (
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/60 p-5 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60 animate-pulse">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>

              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>

              <div className="mt-4 h-3 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/70 p-5 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
              {/* Glow */}
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                      Storage
                    </p>

                    <p className="mt-1 text-lg font-black text-slate-800 dark:text-white">
                      {percentage}%
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{usedMB} MB used</span>

                  <span>{maxMB} MB total</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Section */}
        <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
          <div className="flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white/70 p-4 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-xl ">
                👤
              </div>
            </div>

            {/* User Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-slate-800 dark:text-white">
                {getTokenKey("name") || "User"}
              </p>

              <p className="mt-1 text-xs font-medium text-slate-400">
                Pro Cloud Member
              </p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="Logout"
              className="
                group flex h-12 w-12 items-center justify-center rounded-2xl
                bg-slate-100 text-slate-500 transition-all duration-300
                hover:bg-red-500 hover:text-white hover:shadow-xl hover:shadow-red-500/20
                dark:bg-slate-800
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M9 12h12l-3 -3" />
                <path d="M18 15l3 -3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Asside;
