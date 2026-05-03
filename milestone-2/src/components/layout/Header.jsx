import { useTheme } from '../../contexts/ThemeContext';

export function Header({ onToggleSidebar }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-transparent z-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <i className="ph ph-list text-2xl"></i>
        </button>

        <div className="hidden sm:flex items-center bg-white dark:bg-[var(--color-dark-surface)] rounded-full px-5 py-2.5 w-72 shadow-sm transition-colors border border-slate-100 dark:border-transparent focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
          <i className="ph ph-magnifying-glass text-slate-400 text-lg"></i>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-full text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[var(--color-dark-surface)] shadow-sm text-slate-500 hover:text-brand-500 dark:text-slate-400 transition-colors focus:outline-none"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? (
            <i className="ph ph-sun text-xl"></i>
          ) : (
            <i className="ph ph-moon text-xl"></i>
          )}
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[var(--color-dark-surface)] shadow-sm text-slate-500 hover:text-brand-500 dark:text-slate-400 transition-colors relative focus:outline-none">
          <i className="ph ph-bell text-xl"></i>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[var(--color-dark-surface)]"></span>
        </button>
      </div>
    </header>
  );
}
