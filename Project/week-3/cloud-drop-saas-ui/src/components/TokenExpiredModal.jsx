import { useDispatch, useSelector } from "react-redux";
import { logoutActionReducer, updateISTokenExpiredReducer } from "../redux/slice/authSlice";

const TokenExpiredModal = () => {
  const dispatch = useDispatch();
  const { isTokenExpired } = useSelector((state) => state.auth);

  const handleSessionExpired = () => {
    dispatch(updateISTokenExpiredReducer(false));
    dispatch(logoutActionReducer());
  };

  if (!isTokenExpired) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-2xl">

      {/* ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.12),transparent_55%)]" />

      {/* MODAL */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10
        bg-white/5 backdrop-blur-3xl shadow-[0_0_60px_rgba(0,0,0,0.6)]">

        {/* glass highlight */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />

        {/* soft blobs */}
        <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative p-7 space-y-6">

          {/* HEADER */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-white tracking-wide">
              Session Expired
            </h2>
            <p className="text-sm text-slate-300/80">
              Your session has expired. Please log in again to continue.
            </p>
          </div>

          {/* ICON */}
          <div className="flex justify-center">
            <div className="relative">

              <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-2xl" />

              <div className="relative flex h-20 w-20 items-center justify-center
                rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
                shadow-inner text-3xl">
                🔒
              </div>

              <div className="absolute -bottom-2 -right-2 h-7 w-7 flex items-center justify-center
                rounded-lg bg-yellow-500/10 border border-yellow-400/30 text-yellow-300 text-xs">
                !
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-center">
            <p className="text-sm text-slate-200">
              Your authentication token is no longer valid
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Please log in again to restore access to your dashboard.
            </p>
          </div>

          {/* ACTION */}
          <button
            onClick={handleSessionExpired}
            className="w-full h-11 rounded-2xl font-medium text-white
              bg-gradient-to-r from-blue-500 to-cyan-500
              shadow-lg shadow-blue-500/20
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-200"
          >
            Continue to Login
          </button>

          {/* FOOTER */}
          <p className="text-center text-[10px] text-slate-500">
            CloudDrop • Secure Cloud Storage Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenExpiredModal;