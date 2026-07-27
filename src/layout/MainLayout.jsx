import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

const navItems = [
  { label: 'Dashboard', targetId: 'dashboard', icon: LayoutDashboard },
  { label: 'Employee List', targetId: 'employee-list', icon: Users },
  { label: 'Analytics', targetId: 'analytics', icon: BarChart3 },
];

export default function MainLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.targetId);
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sectionElements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { threshold: [0.3, 0.6], rootMargin: '-20% 0px -40% 0px' },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out.');
    navigate('/login');
  };

  const scrollToSection = (targetId) => {
    const target = document.getElementById(targetId);

    if (target) {
      const topOffset = 90;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {mobileMenuOpen ? <button type="button" className="fixed inset-0 z-30 bg-slate-900/40 md:hidden" aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)} /> : null}

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col overflow-x-hidden md:flex-row">
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] border-r border-slate-200 bg-white px-5 py-5 shadow-xl transition-transform duration-200 md:sticky md:top-0 md:h-screen md:w-72 md:translate-x-0 md:shadow-none ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between md:block">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">HRMS</p>
              <h1 className="mt-2 text-xl font-semibold text-slate-900">Employee Hub</h1>
            </div>
            <button className="cursor-pointer rounded-lg border border-slate-200 p-2 text-slate-600 md:hidden" type="button" aria-label="Toggle menu" onClick={() => setMobileMenuOpen((open) => !open)}>
              <X size={18} />
            </button>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map(({ label, targetId, icon: Icon }) => {
              const isActive = activeSection === targetId;

              return (
                <button
                  key={targetId}
                  type="button"
                  onClick={() => scrollToSection(targetId)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
                    isActive
                      ? 'border-blue-200 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-transparent text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
            <p className="mt-1 text-sm text-slate-600">{user?.role}</p>
          </div>
        </aside>

        <main className="flex-1 p-2 sm:p-3 md:p-6 lg:p-8">
          <header className="sticky top-0 z-20 mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 shadow-sm backdrop-blur sm:px-4 md:mb-6 md:px-6">
            <div className="flex items-center gap-3">
              <button className="cursor-pointer rounded-xl border border-slate-200 p-2 text-slate-600 md:hidden" type="button" aria-label="Open navigation menu" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={18} />
              </button>
              <div className="rounded-2xl bg-blue-600 p-2.5 text-white">
                <LayoutDashboard size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Employee Management</p>
                <h2 className="text-lg font-semibold text-slate-900">{user?.name}</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="hidden cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 md:inline-flex"
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
