import { useState } from "react";
import { loginApi, registerApi } from "../api/auth";
import { useToast } from "../../context/ToastContext";
import { useDispatch } from "react-redux";
import {
  loginActionReducer,
  updateUserProfileReducer,
} from "../redux/slice/authSlice";
import { getTokenKey } from "../utils/constant";

const Auth = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (isLogin) {
        response = await loginApi(formData);
        toast.success("Welcome back to CloudDrop ☁️");
      } else {
        response = await registerApi(formData);
        toast.success("CloudDrop account created 🚀");
      }

      dispatch(
        loginActionReducer({
          token: response?.token,
        }),
      );

      dispatch(
        updateUserProfileReducer({
          name: getTokenKey("name"),
          email: getTokenKey("email"),
        }),
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Authentication failed");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex bg-[#0B1120] relative overflow-hidden">
      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute top-[-150px] left-[-150px] w-[420px] h-[420px] bg-cyan-500/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-180px] right-[-150px] w-[460px] h-[460px] bg-blue-600/15 rounded-full blur-3xl animate-pulse" />

      {/* ================= ANIMATED MAIN CLOUDS ================= */}
      <div className="absolute top-10 left-10 text-white text-8xl opacity-[0.05] animate-[float_8s_ease-in-out_infinite]">
        ☁️
      </div>

      <div className="absolute bottom-10 right-10 text-white text-7xl opacity-[0.06] animate-[float_10s_ease-in-out_infinite]">
        ☁️
      </div>

      {/* ================= NEW CLOUD FLOW SYSTEM ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* soft diagonal cloud trail */}
        <div className="absolute top-1/4 left-1/4 text-white text-6xl opacity-[0.03] animate-[float_12s_ease-in-out_infinite]">
          ☁️
        </div>

        <div className="absolute top-1/2 left-1/3 text-white text-5xl opacity-[0.04] animate-[float_14s_ease-in-out_infinite]">
          ☁️
        </div>

        <div className="absolute bottom-1/3 right-1/3 text-white text-6xl opacity-[0.03] animate-[float_16s_ease-in-out_infinite]">
          ☁️
        </div>
      </div>

      {/* ================= LEFT SECTION ================= */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 relative">
        <div className="max-w-md text-center relative z-10">
          <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-xl shadow-cyan-500/30 mb-6">
            <span className="text-4xl">☁️</span>
          </div>

          <h1 className="text-4xl font-bold text-white tracking-tight">
            CloudDrop
          </h1>

          <p className="text-slate-400 mt-4 text-sm leading-relaxed">
            Store, access, and manage your files securely in the cloud. Simple.
            Fast. Reliable storage for everything that matters.
          </p>

          <div className="mt-8 flex justify-center gap-2 text-white/10 text-4xl">
            ☁️ → ☁️ → ☁️
          </div>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 relative z-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-6">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 mb-3">
              <span className="text-2xl">☁️</span>
            </div>
            <h1 className="text-xl font-bold text-white">CloudDrop</h1>
          </div>

          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-7 shadow-2xl shadow-black/40">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                {isLogin ? "Sign In" : "Create Account"}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                {isLogin
                  ? "Access your cloud workspace"
                  : "Start your journey with secure storage"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-xs text-slate-300 mb-1 block">
                    Username
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl bg-[#111827]/80 border border-slate-700 text-white text-sm"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-slate-300 mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-[#111827]/80 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl bg-[#111827]/80 border border-slate-700 text-white text-sm"
                />
              </div>

              <button
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold"
              >
                {loading
                  ? "Loading..."
                  : isLogin
                    ? "Sign In"
                    : "Create Account"}
              </button>
            </form>

            <div className="text-center mt-5">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-cyan-400"
              >
                {isLogin
                  ? "New here? Create an account"
                  : "Already have an account?"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ANIMATION KEYFRAME ================= */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default Auth;
