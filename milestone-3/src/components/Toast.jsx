import React from 'react';

const Toast = ({ message, type = 'success' }) => {
  const isError = type === 'error';

  return (
    <div className="fixed top-8 right-8 z-50 flex flex-col gap-2">
      <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in border backdrop-blur-md ${
        isError 
        ? 'bg-rose-50/90 border-rose-100 text-rose-600' 
        : 'bg-emerald-50/90 border-emerald-100 text-emerald-600'
      }`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isError ? 'bg-rose-100' : 'bg-emerald-100'
        }`}>
          <i className={`ph-bold ${isError ? 'ph-x' : 'ph-check'} text-lg`}></i>
        </div>
        <span className="font-bold tracking-tight">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
