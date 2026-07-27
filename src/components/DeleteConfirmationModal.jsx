import { AlertTriangle } from 'lucide-react';

export default function DeleteConfirmationModal({ employee, isOpen, onClose, onConfirm }) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-rose-50 p-3 text-rose-600">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Delete employee?</h3>
            <p className="text-sm text-slate-500">This action cannot be undone.</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-600">
          This will remove <span className="font-semibold text-slate-900">{employee.name}</span> from the employee directory and any related records in this employee workspace.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
          <button type="button" onClick={() => onConfirm(employee.id)} className="cursor-pointer rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700">Delete</button>
        </div>
      </div>
    </div>
  );
}
