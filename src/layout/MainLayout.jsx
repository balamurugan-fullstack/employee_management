import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Employees', to: '/employees', icon: Users },
];

export default function MainLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-white px-5 py-5 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between lg:block">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">HRMS</p>
              <h1 className="mt-2 text-xl font-semibold text-slate-900">Employee Hub</h1>
            </div>
            <button className="rounded-lg border border-slate-200 p-2 text-slate-600 lg:hidden" type="button" aria-label="Toggle menu">
              <Menu size={18} />
            </button>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
            <p className="mt-1 text-sm text-slate-600">{user?.role}</p>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
            <div>
              <p className="text-sm font-medium text-slate-500">Welcome back</p>
              <h2 className="text-lg font-semibold text-slate-900">{user?.name}</h2>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </header>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
