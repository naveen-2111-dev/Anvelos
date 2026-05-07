import React, { useState, useEffect, useRef } from 'react';

const Modal = ({ title, value = '', onSave, onClose }) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(inputValue.length, inputValue.length);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      setError(true);
      inputRef.current.focus();
      return;
    }
    onSave(trimmedValue);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-2 text-slate-800">{title}</h2>
          <p className="text-slate-500 mb-8 text-sm">Enter the details for your task below.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="task-input" className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] px-1">Task Description</label>
              <input 
                ref={inputRef}
                type="text" 
                id="task-input" 
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setError(false);
                }}
                placeholder="e.g. Design sync with team" 
                className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-700 ${
                  error ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
                }`}
                autoComplete="off"
              />
              {error && (
                <p className="text-rose-500 text-xs px-1 flex items-center gap-1 animate-fade-in">
                  <i className="ph-bold ph-warning-circle"></i>
                  Please enter a task description
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 px-6 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
              <button type="submit" className="flex-1 btn-primary py-3.5 justify-center">Save Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
