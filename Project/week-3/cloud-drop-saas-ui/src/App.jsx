import "./App.css";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { ToastProvider } from "../context/ToastContext";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className=" w-full bg-[#030712] text-white">
      <ToastProvider>
        {isAuthenticated ? <Dashboard /> : <Auth />}
      </ToastProvider>
    </div>
  );
}

export default App;
