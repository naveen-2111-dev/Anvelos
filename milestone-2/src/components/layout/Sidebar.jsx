import { NavLink } from 'react-router-dom';

export function Sidebar({ isOpen, onClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors ${
      isActive
        ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
    }`;

  const bottomLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
      isActive
        ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10'
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
    }`;

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 bg-white dark:bg-[var(--color-dark-surface)] border-r border-slate-100 dark:border-[var(--color-dark-border)] flex flex-col shadow-2xl lg:shadow-none`}
      >
        <div className="pt-6 pb-4 px-6">
          <div className="flex items-center gap-3 text-brand-500">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Circle Soft</span>
          </div>
        </div>

        <div className="px-6 pb-6 border-b border-slate-100 dark:border-[var(--color-dark-border)]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#252525] border border-slate-100 dark:border-slate-800">
            <img src="https://i.pravatar.cc/150?u=gavano" alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col items-start overflow-hidden">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate w-full">Gavano</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate w-full">HR Manager</span>
            </div>
            <button className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <i className="ph-bold ph-caret-up-down"></i>
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          <NavLink to="/" className={linkClass}>
            <i className="ph ph-squares-four text-xl"></i> Dashboard
          </NavLink>
          <NavLink to="/finance" className={linkClass}>
            <i className="ph ph-wallet text-xl"></i> Finance
          </NavLink>
          <NavLink to="/employees" className={linkClass}>
            <i className="ph ph-users text-xl"></i> Employees
          </NavLink>
          <NavLink to="/company" className={linkClass}>
            <i className="ph ph-buildings text-xl"></i> Company
          </NavLink>
          <NavLink to="/candidate" className={linkClass}>
            <i className="ph ph-user-plus text-xl"></i> Candidate
          </NavLink>
          <NavLink to="/calendar" className={linkClass}>
            <i className="ph ph-calendar-blank text-xl"></i> Calendar
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-[var(--color-dark-border)] space-y-1">
          <NavLink to="/profile" className={bottomLinkClass}>
            <i className="ph ph-user-circle text-xl"></i> Profile
          </NavLink>
          <NavLink to="/settings" className={bottomLinkClass}>
            <i className="ph ph-gear text-xl"></i> Setting
          </NavLink>
        </div>
      </aside>
    </>
  );
}
