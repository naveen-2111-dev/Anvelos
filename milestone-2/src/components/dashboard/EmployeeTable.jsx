export function EmployeeTable() {
  const employees = [
    {
      name: 'Justin Lipshutz',
      avatar: 'https://i.pravatar.cc/150?u=justin',
      department: 'Marketing',
      age: 22,
      discipline: '100%',
      status: 'Permanent',
      statusClass: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
    },
    {
      name: 'Marcus Culhane',
      avatar: 'https://i.pravatar.cc/150?u=marcus',
      department: 'Finance',
      age: 24,
      discipline: '95%',
      status: 'Contract',
      statusClass: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400'
    },
    {
      name: 'Leo Stanton',
      avatar: 'https://i.pravatar.cc/150?u=leo',
      department: 'R&D',
      age: 28,
      discipline: '89%',
      status: 'Permanent',
      statusClass: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
    }
  ];

  return (
    <div className="bg-white dark:bg-[var(--color-dark-surface)] border border-slate-100 dark:border-[var(--color-dark-border)] rounded-2xl shadow-sm overflow-hidden transition-colors duration-300">
      <div className="px-6 py-5 border-b border-slate-100 dark:border-[var(--color-dark-border)] flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Employee Status</h2>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-[#252525] rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
            <i className="ph ph-funnel"></i> Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-[#252525]/50 border-b border-slate-100 dark:border-[var(--color-dark-border)] text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              <th className="px-6 py-4">Employee Name</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Age</th>
              <th className="px-6 py-4">Discipline</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-[var(--color-dark-border)]">
            {employees.map((emp, idx) => (
              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#252525]/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={emp.avatar} className="w-8 h-8 rounded-full object-cover" alt="avatar"/>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{emp.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{emp.department}</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{emp.age}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200">
                  {emp.discipline}
                  <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: emp.discipline }}></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${emp.statusClass}`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
