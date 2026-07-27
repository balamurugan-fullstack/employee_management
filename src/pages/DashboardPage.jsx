import { Briefcase, Users, Building2, CalendarDays } from 'lucide-react';

const cards = [
  { title: 'Total Employees', value: '128', icon: Users, tone: 'bg-slate-900 text-white' },
  { title: 'Active Employees', value: '116', icon: Briefcase, tone: 'bg-slate-100 text-slate-700' },
  { title: 'Departments', value: '8', icon: Building2, tone: 'bg-slate-100 text-slate-700' },
  { title: 'Joined This Month', value: '14', icon: CalendarDays, tone: 'bg-slate-100 text-slate-700' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, icon: Icon, tone }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`inline-flex rounded-xl p-2 ${tone}`}>
              <Icon size={18} />
            </div>
            <p className="mt-4 text-sm text-slate-500">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Employee Directory</h3>
            <p className="text-sm text-slate-500">Search, filter, and manage records.</p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
          Employee table and analytics will be added in the next feature.
        </div>
      </div>
    </div>
  );
}
