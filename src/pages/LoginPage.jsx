import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setError('');

    try {
      await login(form);
      toast.success('Welcome back. You are now signed in.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
      toast.error(err.message || 'Unable to sign in.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-slate-900 p-3 text-white">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Secure Access</p>
            <h1 className="text-2xl font-semibold text-slate-900">Employee Portal</h1>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none ring-0 transition focus:border-slate-400"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-3 pr-10 outline-none ring-0 transition focus:border-slate-400"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-500 transition hover:text-slate-900"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error ? <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p> : null}

          <button type="submit" className="w-full cursor-pointer rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
