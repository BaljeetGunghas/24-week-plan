import { useState } from "react";
import { loginApi, registerApi } from "../api/auth";
import { useToast } from "../../context/ToastContext";
import { useDispatch } from "react-redux";
import { loginActionReducer } from "../redux/slice/authSlice";
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
        toast.success("Login successful 🎉");
      } else {
        response = await registerApi(formData);
        toast.success("Account created 🎉");
      }
      dispatch(
        loginActionReducer({
          token: response?.token,
          username: getTokenKey("name"),
        }),
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Authentication failed");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const type = e.target.name;
    const val = e.target.value;

    setFormData((prev) => {
      return { ...prev, [type]: val };
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Username
              </label>
              <input
                type="text"
                name="name"
                className="w-full mt-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Enter your name"
                value={formData?.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="name@company.com"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => handleChange(e)}
              name="password"
              value={formData.password}
            />
          </div>

          <button
            type="submit"
            className="d-flex flex-row gap-10 align-middle w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={
              formData.email.trim() === "" ||
              formData.password.trim() === "" ||
              (!isLogin && formData.name.trim() === "") ||
              loading
            }
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Get Started"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
