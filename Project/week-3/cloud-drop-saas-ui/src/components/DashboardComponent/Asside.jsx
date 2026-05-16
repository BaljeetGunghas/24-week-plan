import { useDispatch, useSelector } from "react-redux";
import { getTokenKey } from "../../utils/constant";
import { logoutActionReducer } from "../../redux/slice/authSlice";

const Asside = ({ activeTab, setActiveTab, loading, closeSidebar }) => {
  const { usedBytes, maxBytes, percentage } = useSelector(
    (state) => state.stats
  );

  const dispatch = useDispatch();

  const usedMB = (usedBytes / 1024 / 1024).toFixed(2);
  const maxMB = (maxBytes / 1024 / 1024).toFixed(0);

  const handleLogout = () => {
    dispatch(logoutActionReducer());
  };

  const navItems = [
    { label: "My Files", icon: "☁️" },
    { label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside
      className="
        relative flex h-screen w-[260px]
        flex-col overflow-hidden
        border-r border-white/10
        bg-white/10 backdrop-blur-2xl
        p-4
        shadow-2xl
      "
    >
      {/* BACKGROUND */}
      <div className="absolute -top-24 -left-20 h-52 w-52 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col">

        {/* ================= LOGO (SMALLER) ================= */}
        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-cyan-500 blur-lg opacity-30" />

              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg">
                ☁️
              </div>
            </div>

            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                CloudDrop
              </h1>
              <p className="text-[10px] text-slate-400">
                Cloud Storage
              </p>
            </div>
          </div>

          <button
            onClick={closeSidebar}
            className="lg:hidden w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {/* ================= NAV (COMPACT) ================= */}
        <nav className="space-y-2">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.label;

            return (
              <button
                key={tab.label}
                onClick={() => {
                  setActiveTab(tab.label);
                  closeSidebar?.();
                }}
                className={`
                  flex w-full items-center gap-3
                  rounded-xl px-3 py-2.5
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "text-slate-300 hover:bg-white/10"
                  }
                `}
              >
                <div
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-lg text-sm
                    ${isActive ? "bg-white/15" : "bg-white/10"}
                  `}
                >
                  {tab.icon}
                </div>

                <span className="text-xs font-medium">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ================= STORAGE (COMPACT) ================= */}
        <div className="mt-auto mb-4">

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 animate-pulse">
              <div className="h-3 w-20 bg-white/10 rounded mb-3" />
              <div className="h-2 w-full bg-white/10 rounded" />
            </div>
          ) : (
            <div className="relative rounded-2xl border border-white/10 bg-white/10 p-4">

              <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-cyan-500/10 blur-2xl" />

              <div className="relative">

                <div className="flex items-center justify-between mb-3">

                  <div>
                    <p className="text-[10px] uppercase text-slate-400">
                      Storage
                    </p>
                    <p className="text-lg font-bold text-white">
                      {percentage}%
                    </p>
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm">
                    ☁️
                  </div>

                </div>

                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                  <span>{usedMB} MB</span>
                  <span>{maxMB} MB</span>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* ================= USER (COMPACT) ================= */}
        <div className="border-t border-white/10 pt-4">

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-lg">
              👤
            </div>

            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-semibold text-white">
                {getTokenKey("name") || "User"}
              </p>
              <p className="text-[10px] text-slate-400">
                Pro Member
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="h-8 w-8 rounded-lg bg-white/10 text-xs hover:bg-red-500 transition"
            >
              ⎋
            </button>

          </div>

        </div>

      </div>
    </aside>
  );
};

export default Asside;