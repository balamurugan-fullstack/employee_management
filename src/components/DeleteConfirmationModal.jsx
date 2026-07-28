import { memo, useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

function DeleteConfirmationModal({ employee, isOpen, isDeleting = false, onClose, onConfirm }) {
  const titleRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      previousActiveElementRef.current?.focus();
      return;
    }

    previousActiveElementRef.current = document.activeElement;
    const focusTimer = window.setTimeout(() => {
      titleRef.current?.focus();
    }, 0);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-rose-50 p-3 text-rose-600">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 ref={titleRef} tabIndex={-1} className="text-lg font-semibold text-slate-900">Delete employee?</h3>
            <p className="text-sm text-slate-500">This action cannot be undone.</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-600">
          This will remove <span className="font-semibold text-slate-900">{employee.name}</span> from the employee directory and any related records in this employee workspace.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" disabled={isDeleting}>
            Cancel
          </button>
          <button type="button" onClick={() => onConfirm(employee.id)} className="cursor-pointer rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-400" disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(DeleteConfirmationModal);
