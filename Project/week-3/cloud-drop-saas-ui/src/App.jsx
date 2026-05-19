import "./App.css";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { ToastProvider } from "../context/ToastContext";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const { isAuthenticated, theme } = useSelector((state) => state.auth);

  const darkMode = theme === "dark";

  // Sync theme globally
  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen">
      <ToastProvider>
        {isAuthenticated ? <Dashboard /> : <Auth />}
      </ToastProvider>
    </div>
  );
}

export default App;