'use client'

import React from 'react';
import { useToast } from "@/app/context/ToastContext";
import { ToastContainer } from "./ui/Toast";

export default function ToastContainerWrapper() {
  const { toasts, hideToast } = useToast();
  return <ToastContainer toasts={toasts} onClose={hideToast} />;
} 