import { Edit3, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/employeeUtils';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden max-h-[480px] overflow-x-auto md:block">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur">
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
            {employees.map((employee, index) => (
              <tr key={employee.id} className={`align-middle transition hover:bg-slate-50 ${index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
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
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${employee.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-600">{formatDate(employee.joiningDate)}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => onEdit(employee)} className="cursor-pointer rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700" aria-label={`Edit ${employee.name}`} title={`Edit ${employee.name}`}>
                      <Edit3 size={16} />
                    </button>
                    <button type="button" onClick={() => onDelete(employee)} className="cursor-pointer rounded-lg border border-rose-200 p-2 text-rose-600 transition hover:bg-rose-50" aria-label={`Delete ${employee.name}`} title={`Delete ${employee.name}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 p-2 md:hidden">
        {employees.map((employee) => (
          <div key={employee.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
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
              <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${employee.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                {employee.status}
              </span>
            </div>

            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Department</span>
                <span className="font-medium text-slate-700">{employee.department}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Role</span>
                <span className="font-medium text-slate-700">{employee.designation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Joined</span>
                <span className="font-medium text-slate-700">{formatDate(employee.joiningDate)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button type="button" onClick={() => onEdit(employee)} className="flex-1 cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700" aria-label={`Edit ${employee.name}`}>
                Edit
              </button>
              <button type="button" onClick={() => onDelete(employee)} className="flex-1 cursor-pointer rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700" aria-label={`Delete ${employee.name}`}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
