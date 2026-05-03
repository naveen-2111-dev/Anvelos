export function StatCards() {
  const stats = [
    {
      title: 'Total Employees',
      value: '856',
      subtitle: 'Employee',
      change: '+10.0%',
      isPositive: true,
      icon: 'ph-users-three',
      iconBg: 'bg-brand-50 dark:bg-brand-500/10',
      iconColor: 'text-brand-500'
    },
    {
      title: 'Job View',
      value: '3,342',
      subtitle: 'Viewers',
      change: '+22.0%',
      isPositive: true,
      icon: 'ph-briefcase',
      iconBg: 'bg-blue-50 dark:bg-blue-500/10',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Job Applied',
      value: '77',
      subtitle: 'Applicants',
      change: '+12.0%',
      isPositive: true,
      icon: 'ph-file-text',
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
      iconColor: 'text-emerald-500'
    },
    {
      title: 'Resigned Employees',
      value: '17',
      subtitle: 'Employee',
      change: '-7.0%',
      isPositive: false,
      icon: 'ph-user-minus',
      iconBg: 'bg-rose-50 dark:bg-rose-500/10',
      iconColor: 'text-rose-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white dark:bg-[var(--color-dark-surface)] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-[var(--color-dark-border)] transition-colors duration-300 hover:shadow-md flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{stat.title}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</span>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500">{stat.subtitle}</span>
            </div>
            <div className={`w-12 h-12 rounded-full ${stat.iconBg} flex items-center justify-center ${stat.iconColor}`}>
              <i className={`ph-fill ${stat.icon} text-2xl`}></i>
            </div>
          </div>
          
          <div className="mt-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${stat.isPositive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
              <i className={`ph-bold ${stat.isPositive ? 'ph-trend-up' : 'ph-trend-down'}`}></i> {stat.change}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">Update July 16, 2023</span>
          </div>
        </div>
      ))}
    </div>
  );
}
