"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
     position="top-center"   // ✅ Center of screen
      autoClose={4000}        // ✅ Close in 2 seconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />
  );
}
