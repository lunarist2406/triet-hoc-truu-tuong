"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)", // Xanh dương nhạt gradient
          color: "#1565c0", // Xanh dương đậm cho text
          border: "1px solid #90caf9", // Viền xanh dương nhạt
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
          marginTop: "80px", // Dịch xuống dưới header
          zIndex: 9999, // Đảm bảo hiển thị trên cùng
          boxShadow: "0 4px 12px rgba(33, 150, 243, 0.2)", // Shadow xanh dương nhạt
        },
        success: {
          iconTheme: {
            primary: "#2e7d32", // Xanh lá đậm cho success
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#d32f2f", // Đỏ đậm cho error
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
