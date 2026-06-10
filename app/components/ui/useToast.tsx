"use client";

import { useState, useCallback } from "react";

export type ToastVariant = "default" | "destructive";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const toast = useCallback(
    ({ title, description, variant = "default" }: Omit<Toast, "id">) => {
      const id = generateId();
      setToasts((prev) => [...prev, { id, title, description, variant }] );

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  return { toasts, toast };
};
