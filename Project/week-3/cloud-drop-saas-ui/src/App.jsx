import "./App.css";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { ToastProvider } from "../context/ToastContext";
import { useSelector } from "react-redux";


function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      <ToastProvider>
        {isAuthenticated ? <Dashboard /> : <Auth />}
      </ToastProvider>
    </>
  );
}

export default App;
