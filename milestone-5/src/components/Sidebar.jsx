import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#F9FAFB] min-h-screen flex flex-col border-r border-border">
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <i className="ph-bold ph-package text-white"></i>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Stockly</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-2">
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all group font-medium">
          <i className="ph ph-house text-xl"></i>
          <span className="text-sm">Home</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#F3F4F6] text-slate-900 font-semibold shadow-sm">
          <i className="ph-bold ph-package text-xl"></i>
          <span className="text-sm">Products</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all group font-medium">
          <i className="ph ph-users text-xl"></i>
          <span className="text-sm">Customers</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all group font-medium">
          <i className="ph ph-chart-pie-slice text-xl"></i>
          <span className="text-sm">Analytics</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all group font-medium">
          <i className="ph ph-gear text-xl"></i>
          <span className="text-sm">Settings</span>
        </a>
      </nav>

      <div className="p-4 mt-auto border-t border-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">Admin User</p>
            <p className="text-xs text-slate-500 truncate">admin@stockly.com</p>
          </div>
          <i className="ph ph-sign-out text-slate-400 ml-auto cursor-pointer hover:text-slate-600 transition-colors"></i>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
