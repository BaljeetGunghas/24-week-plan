import { useDispatch, useSelector } from "react-redux";
import { updateThemeReducer } from "../redux/slice/authSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.auth.theme);

  const darkMode = theme === "dark";

  const toggleTheme = () => {
    dispatch(updateThemeReducer());
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-lg
        bg-gray-100 text-black
        dark:bg-gray-700 dark:text-white
        hover:bg-gray-200 dark:hover:bg-gray-600
        transition-colors
      "
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle;