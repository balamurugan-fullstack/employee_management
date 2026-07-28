import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes';
import './App.css';

function App() {
  // Runtime instrumentation: detect full page unloads/reloads and form submissions
  // Temporary debug helpers that emit DOM events and console logs for troubleshooting.
  if (typeof window !== 'undefined') {
    try {
      // Track last user interaction to help identify unload cause
      window.__lastUserAction = { type: null, target: null, time: null };
      window.addEventListener('click', (e) => {
        window.__lastUserAction = { type: 'click', target: e.target && (e.target.id || e.target.tagName || e.target.className), time: Date.now() };
      }, { capture: true });
      window.addEventListener('keydown', (e) => {
        window.__lastUserAction = { type: 'keydown', key: e.key, time: Date.now() };
      }, { capture: true });

      window.addEventListener('beforeunload', (e) => {
        try {
          window.dispatchEvent(new CustomEvent('app:unload', { detail: { type: 'beforeunload', lastUserAction: window.__lastUserAction } }));
        } catch (err) {}
        console.warn('App: beforeunload fired', window.__lastUserAction);
      });

      window.addEventListener('unload', (e) => {
        try { window.dispatchEvent(new CustomEvent('app:unload', { detail: { type: 'unload', lastUserAction: window.__lastUserAction } })); } catch (err) {}
        console.warn('App: unload fired', window.__lastUserAction);
      });

      // Prevent native form submission to avoid full page reloads in all environments.
      document.addEventListener('submit', (e) => {
        try { window.dispatchEvent(new CustomEvent('app:dom-submit', { detail: { target: e.target && (e.target.id || e.target.tagName) } })); } catch (err) {}
        console.log('App: dom submit (capture) - preventing native submit', e.target);
        try { e.preventDefault(); } catch (err) {}
      }, { capture: true });
    } catch (e) {
      // ignore instrumentation errors
    }
  }
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        containerStyle={{ top: '72px' }}
        toastOptions={{
          duration: 5000,
          className: 'rounded-2xl border border-slate-200 bg-white shadow-lg',
          success: {
            className: 'border-emerald-200 bg-emerald-50 text-emerald-800',
          },
          error: {
            className: 'border-rose-200 bg-rose-50 text-rose-800',
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
