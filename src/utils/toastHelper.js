import { toast } from 'react-hot-toast';

export function showSuccess(message, opts = {}) {
  try {
    console.log('toastHelper: success', message);
    if (typeof window !== 'undefined') {
      try { window.dispatchEvent(new CustomEvent('app:toast', { detail: { type: 'success', message } })); } catch (e) {}
    }
  } catch (e) {}
  return toast.success(message, { duration: 5000, ...opts });
}

export function showError(message, opts = {}) {
  try {
    console.error('toastHelper: error', message);
    if (typeof window !== 'undefined') {
      try { window.dispatchEvent(new CustomEvent('app:toast', { detail: { type: 'error', message } })); } catch (e) {}
    }
  } catch (e) {}
  return toast.error(message, { duration: 5000, ...opts });
}

export default { showSuccess, showError };
