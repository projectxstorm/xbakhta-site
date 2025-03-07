'use client'

import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Toast as ToastType, ToastType as ToastTypeEnum } from '@/app/context/ToastContext';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

// Get icon based on toast type
const getIcon = (type: ToastTypeEnum) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-white" />;
    case 'error':
      return <AlertCircle className="h-5 w-5 text-white" />;
    case 'info':
      return <Info className="h-5 w-5 text-white" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-white" />;
    default:
      return <Info className="h-5 w-5 text-white" />;
  }
};

// Get background color based on toast type
const getBackgroundColor = (type: ToastTypeEnum) => {
  switch (type) {
    case 'success':
      return 'bg-green-600';
    case 'error':
      return 'bg-red-600';
    case 'info':
      return 'bg-blue-600';
    case 'warning':
      return 'bg-yellow-600';
    default:
      return 'bg-blue-600';
  }
};

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle close
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(toast.id);
    }, 300); // Match transition duration
  };
  
  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 flex items-center shadow-lg rounded-lg
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        ${getBackgroundColor(toast.type)}
      `}
    >
      <div className="flex items-center p-3">
        <div className="flex-shrink-0 mr-2">
          {getIcon(toast.type)}
        </div>
        <div className="ml-3 mr-7 text-white">
          {toast.message}
        </div>
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 text-white/60 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Container component that displays multiple toasts
export const ToastContainer: React.FC<{
  toasts: ToastType[];
  onClose: (id: string) => void;
}> = ({ toasts, onClose }) => {
  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}; 