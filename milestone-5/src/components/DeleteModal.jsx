import React from 'react';

const DeleteModal = ({ product, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-scale-in text-center p-10">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
          <i className="ph-bold ph-trash text-4xl"></i>
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">Delete Product?</h2>
        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10">
          Are you sure you want to remove <span className="text-slate-900 font-bold">"{product?.title}"</span>? This action is permanent and cannot be reversed.
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-rose-200"
          >
            Yes, Confirm Delete
          </button>
          <button 
            onClick={onCancel}
            className="w-full text-slate-400 py-3 rounded-xl font-bold hover:text-slate-600 hover:bg-slate-50 transition-all"
          >
            Cancel and Keep
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
