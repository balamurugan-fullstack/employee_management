import { Edit3, Trash2, Briefcase } from 'lucide-react';
import { formatDate } from '../utils/employeeUtils';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Employee</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Department</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Designation</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Joining Date</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {employees.map((employee) => (
              <tr key={employee.id} className="align-middle">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                      {employee.name
                        .split(' ')
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{employee.name}</p>
                      <p className="text-sm text-slate-500">{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-600">{employee.department}</td>
                <td className="px-4 py-4 text-slate-600">{employee.designation}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${employee.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-600">{formatDate(employee.joiningDate)}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => onEdit(employee)} className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100" aria-label={`Edit ${employee.name}`}>
                      <Edit3 size={16} />
                    </button>
                    <button type="button" onClick={() => onDelete(employee)} className="rounded-lg border border-rose-200 p-2 text-rose-600 transition hover:bg-rose-50" aria-label={`Delete ${employee.name}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
