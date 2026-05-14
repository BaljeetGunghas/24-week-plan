import { createContext, useContext, useState, useRef } from "react";
import ToastContainer from "../src/components/ToastContainer";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const nextToastId = useRef(0);

  const addToast = ({ type = "success", message }) => {
    const id = nextToastId.current++;

    setToasts((prev) => [...prev, { id, type, message }]);

    // auto remove after 5s
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // shortcut methods
  const toast = {
    success: (msg) => addToast({ type: "success", message: msg }),
    error: (msg) => addToast({ type: "error", message: msg }),
    warning: (msg) => addToast({ type: "warning", message: msg }),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Global UI */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);
