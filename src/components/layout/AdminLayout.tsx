import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Car as CarIcon, LayoutDashboard, LogOut, Menu, PlusCircle, UserCircle, X, Bell,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { classNames, initials } from '@/lib/format';
import { ADMIN_NAV } from '@/constants';

const ICONS: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-4.5 w-4.5" />,
  Car: <CarIcon className="h-4.5 w-4.5" />,
  PlusCircle: <PlusCircle className="h-4.5 w-4.5" />,
  UserCircle: <UserCircle className="h-4.5 w-4.5" />,
};

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-ink-50">
      <div className="flex">
        <aside
          className={classNames(
            'fixed inset-y-0 left-0 z-40 w-64 transform bg-ink-950 text-ink-100 transition-transform lg:translate-x-0 lg:static',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-400 font-display text-base font-bold text-ink-950">M</div>
              <span className="font-display text-base font-bold text-white">Marque Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="text-ink-400 lg:hidden"><X className="h-5 w-5" /></button>
          </div>
          <nav className="space-y-1 px-3 py-4">
            {ADMIN_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  classNames(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive ? 'bg-gold-400 text-ink-950' : 'text-ink-300 hover:bg-white/5 hover:text-white',
                  )
                }
              >
                {ICONS[item.icon]}
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-3">
            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-300 hover:bg-white/5 hover:text-white">
              <LogOut className="h-4.5 w-4.5" /> Sign out
            </button>
          </div>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 z-30 bg-ink-950/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-100 bg-white/90 px-4 backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-ink-700 hover:bg-ink-50 lg:hidden">
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-xs text-ink-400">Welcome back,</p>
                <p className="text-sm font-semibold text-ink-900">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative rounded-full p-2 text-ink-600 hover:bg-ink-50" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-crimson-500" />
              </button>
              <Link to="/admin/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-950 text-xs font-bold text-gold-400" aria-label="Profile">
                {user ? initials(user.name) : 'A'}
              </Link>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
