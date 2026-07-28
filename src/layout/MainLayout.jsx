import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const contentRef = useRef(null);

  const handleLogout = useCallback(() => {
    logout();
    toast.success('You have been logged out.');
    navigate('/login');
  }, [logout, navigate]);

  const scrollToSection = useCallback((targetId) => {
    const container = contentRef.current;
    const target = document.getElementById(targetId);

    if (target && container) {
      const offsetTop = target.offsetTop - 96;
      container.scrollTo({ top: Math.max(0, offsetTop), behavior: 'smooth' });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    const container = contentRef.current;
    const sectionIds = navItems.map((item) => item.targetId);
    const sectionElements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (!container || !sectionElements.length) {
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
      { root: container, threshold: [0.3, 0.6], rootMargin: '-20% 0px -40% 0px' },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const sidebarLinks = useMemo(
    () =>
      navItems.map(({ label, targetId, icon: Icon }) => {
        const isActive = activeSection === targetId;

        return (
          <button
            key={targetId}
            type="button"
            onClick={() => scrollToSection(targetId)}
            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'border-blue-200 bg-blue-50 text-blue-700 shadow-sm'
                : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        );
      }),
    [activeSection, scrollToSection],
  );

  return (
    <div className="h-screen overflow-hidden bg-slate-50 text-slate-800">
      {mobileMenuOpen ? <button type="button" className="fixed inset-0 z-30 bg-slate-900/40 md:hidden" aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)} /> : null}

      <div className="flex h-screen w-full overflow-hidden">
        <aside className={`fixed left-0 top-0 z-40 flex h-screen w-72 max-w-[85vw] shrink-0 flex-col border-r border-slate-200 bg-white px-5 py-5 shadow-xl transition-transform duration-200 md:static md:translate-x-0 md:shadow-none ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
            {sidebarLinks}
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-left text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900"
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

        <main className="flex min-h-screen flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-20 flex flex-shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-3 py-3 shadow-sm backdrop-blur sm:px-4 md:px-6">
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

          <div ref={contentRef} className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-3 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
