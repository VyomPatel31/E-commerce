import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // auto-remove after 3s
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast UI (bottom-right corner) */}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              marginBottom: "10px",
              padding: "12px 16px",
              borderRadius: "8px",
              background:
                toast.type === "success"
                  ? "green"
                  : toast.type === "error"
                  ? "red"
                  : "gray",
              color: "white",
              minWidth: "200px",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
