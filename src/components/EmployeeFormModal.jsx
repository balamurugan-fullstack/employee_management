import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { EMPLOYEE_DEPARTMENTS } from '../utils/employeeUtils';

const initialForm = {
  name: '',
  email: '',
  department: EMPLOYEE_DEPARTMENTS[0],
  designation: '',
  status: 'Active',
  joiningDate: '',
};

export default function EmployeeFormModal({ employee, isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        email: employee.email,
        department: employee.department,
        designation: employee.designation,
        status: employee.status,
        joiningDate: employee.joiningDate,
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Employee name is required.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please provide a valid email address.';
    }

    if (!form.designation.trim()) {
      nextErrors.designation = 'Designation is required.';
    }

    if (!form.joiningDate) {
      nextErrors.joiningDate = 'Joining date is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      designation: form.designation.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Employee</p>
            <h3 className="text-xl font-semibold text-slate-900">{employee ? 'Edit Employee' : 'Add Employee'}</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">Employee Name</label>
            <input id="name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className={`w-full rounded-xl border px-3 py-3 outline-none focus:border-slate-400 ${errors.name ? 'border-rose-300 bg-rose-50' : 'border-slate-200'}`} />
            {errors.name ? <p className="mt-2 text-sm text-rose-600">{errors.name}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} className={`w-full rounded-xl border px-3 py-3 outline-none focus:border-slate-400 ${errors.email ? 'border-rose-300 bg-rose-50' : 'border-slate-200'}`} />
            {errors.email ? <p className="mt-2 text-sm text-rose-600">{errors.email}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="designation">Designation</label>
            <input id="designation" value={form.designation} onChange={(event) => setForm((current) => ({ ...current, designation: event.target.value }))} className={`w-full rounded-xl border px-3 py-3 outline-none focus:border-slate-400 ${errors.designation ? 'border-rose-300 bg-rose-50' : 'border-slate-200'}`} />
            {errors.designation ? <p className="mt-2 text-sm text-rose-600">{errors.designation}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="department">Department</label>
            <select id="department" value={form.department} onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-slate-400">
              {EMPLOYEE_DEPARTMENTS.map((department) => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="status">Status</label>
            <select id="status" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))} className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-slate-400">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="joiningDate">Joining Date</label>
            <input id="joiningDate" type="date" value={form.joiningDate} onChange={(event) => setForm((current) => ({ ...current, joiningDate: event.target.value }))} className={`w-full rounded-xl border px-3 py-3 outline-none focus:border-slate-400 ${errors.joiningDate ? 'border-rose-300 bg-rose-50' : 'border-slate-200'}`} />
            {errors.joiningDate ? <p className="mt-2 text-sm text-rose-600">{errors.joiningDate}</p> : null}
          </div>

          <div className="md:col-span-2 mt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">Save Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}
