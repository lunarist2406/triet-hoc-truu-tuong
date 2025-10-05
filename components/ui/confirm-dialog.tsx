"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: "warning" | "danger" | "info" | "success";
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "warning",
  confirmText = "Xác nhận",
  cancelText = "Hủy",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "danger":
        return <XCircle className="h-6 w-6 text-red-500" />;
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "info":
        return <Info className="h-6 w-6 text-blue-500" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getButtonStyle = () => {
    switch (type) {
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "success":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "info":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      default:
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-background border border-border rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-start gap-4">
          {getIcon()}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {title}
            </h3>
            <p className="text-muted-foreground mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={onClose} className="px-4 py-2">
                {cancelText}
              </Button>
              <Button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`px-4 py-2 ${getButtonStyle()}`}
              >
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
