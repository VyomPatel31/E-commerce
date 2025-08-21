import React from "react";

function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
      {message}
      <button onClick={onClose} className="ml-3">✖</button>
    </div>
  );
}

export default Toast;
