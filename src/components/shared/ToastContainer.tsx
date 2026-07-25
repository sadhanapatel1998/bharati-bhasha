'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let bgClass = 'bg-gray-900 text-white';
        let icon = <Info className="w-5 h-5 text-blue-400" />;

        if (toast.type === 'success') {
          bgClass = 'bg-[#1A1414] text-white border-l-4 border-[#2E8B57]';
          icon = <CheckCircle className="w-5 h-5 text-[#2E8B57]" />;
        } else if (toast.type === 'warning') {
          bgClass = 'bg-[#1A1414] text-white border-l-4 border-[#C79A2D]';
          icon = <AlertCircle className="w-5 h-5 text-[#C79A2D]" />;
        } else if (toast.type === 'error') {
          bgClass = 'bg-[#1A1414] text-white border-l-4 border-[#7B1E1E]';
          icon = <XCircle className="w-5 h-5 text-[#7B1E1E]" />;
        }

        return (
          <div
            key={toast.id}
            className={`${bgClass} p-4 rounded-2xl shadow-2xl flex items-start gap-3 pointer-events-auto border border-white/10 animate-in slide-in-from-bottom-5 duration-200`}
          >
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 text-xs font-medium leading-relaxed">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
