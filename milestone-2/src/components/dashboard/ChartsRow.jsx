export function ChartsRow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      
      <div className="lg:col-span-2 bg-white dark:bg-[var(--color-dark-surface)] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-[var(--color-dark-border)] transition-colors duration-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Job Statistics</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Showing Job Viewed and Applied</p>
          </div>
          <select className="bg-slate-50 dark:bg-[#252525] border border-slate-200 dark:border-slate-800 text-sm rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 outline-none">
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
        
        <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 relative px-2">
          <div className="absolute left-0 top-0 bottom-0 w-full flex flex-col justify-between text-xs text-slate-400 pointer-events-none z-0">
            <div className="border-b border-slate-100 dark:border-slate-800/50 w-full h-0"></div>
            <div className="border-b border-slate-100 dark:border-slate-800/50 w-full h-0"></div>
            <div className="border-b border-slate-100 dark:border-slate-800/50 w-full h-0"></div>
            <div className="border-b border-slate-100 dark:border-slate-800/50 w-full h-0"></div>
            <div className="border-b border-slate-100 dark:border-slate-800/50 w-full h-0"></div>
          </div>
          
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-2 z-10 w-full group">
              <div className="flex items-end gap-1 sm:gap-2 w-full justify-center h-48">
                <div className="w-1/3 sm:w-6 bg-brand-500 rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${40 + Math.random() * 40}%` }}></div>
                <div className="w-1/3 sm:w-6 bg-slate-200 dark:bg-slate-700 rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${20 + Math.random() * 30}%` }}></div>
              </div>
              <span className="text-xs text-slate-500 font-medium">{day}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-50 dark:border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-500"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Job Viewed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Job Applied</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[var(--color-dark-surface)] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-[var(--color-dark-border)] transition-colors duration-300">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Employee Composition</h2>
        
        <div className="flex flex-col items-center justify-center relative py-4">
          <div className="w-48 h-48 rounded-full border-[16px] border-brand-500 border-t-slate-100 border-l-slate-100 dark:border-t-slate-800 dark:border-l-slate-800 flex items-center justify-center transform rotate-45">
            <div className="transform -rotate-45 text-center">
              <span className="block text-3xl font-bold text-slate-900 dark:text-white">856</span>
              <span className="text-sm text-slate-500">Total</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#252525]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 rounded bg-brand-500"></div>
              <div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Male</div>
                <div className="text-xs text-slate-500">45%</div>
              </div>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">385</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#252525]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 rounded bg-slate-300 dark:bg-slate-600"></div>
              <div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Female</div>
                <div className="text-xs text-slate-500">55%</div>
              </div>
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-white">471</span>
          </div>
        </div>
      </div>
    </div>
  );
}
