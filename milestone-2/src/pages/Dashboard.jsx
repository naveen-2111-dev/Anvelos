import { StatCards } from '../components/dashboard/StatCards';
import { ChartsRow } from '../components/dashboard/ChartsRow';
import { EmployeeTable } from '../components/dashboard/EmployeeTable';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-xl transition-colors shadow-md shadow-brand-500/20 flex items-center gap-2">
            <i className="ph ph-download-simple text-lg"></i>
            Download Report
          </button>
        </div>
      </div>

      <StatCards />
      <ChartsRow />
      <EmployeeTable />
    </div>
  );
}
