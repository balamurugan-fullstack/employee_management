import { BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EMPLOYEE_DEPARTMENTS } from '../utils/employeeUtils';

const chartColors = ['#2563EB', '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#0F172A', '#64748B', '#93C5FD'];

export default function AnalyticsSection({ employees }) {
  const departmentData = EMPLOYEE_DEPARTMENTS.map((department) => ({
    name: department,
    count: employees.filter((employee) => employee.department === department).length,
  })).filter((item) => item.count > 0);

  const statusData = [
    { name: 'Active', value: employees.filter((employee) => employee.status === 'Active').length },
    { name: 'Inactive', value: employees.filter((employee) => employee.status === 'Inactive').length },
  ];

  const monthlyData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    return {
      month: date.toLocaleString('en', { month: 'short' }),
      count: employees.filter((employee) => employee.joiningDate?.slice(0, 7) === key).length,
    };
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Department-wise Employees</h3>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <PieChart size={18} className="text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Status Distribution</h3>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={3}>
                <Cell fill="#2563EB" />
                <Cell fill="#10B981" />
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-slate-700" />
          <h3 className="text-lg font-semibold text-slate-900">Monthly Joined Employees</h3>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
