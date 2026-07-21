import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Heart, Menu, Phone, Search as SearchIcon, X } from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO } from '@/constants';
import { useCars } from '@/contexts/CarContext';
import { classNames } from '@/lib/format';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useCars();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/inventory?search=${encodeURIComponent(query)}`);
  };

  return (
    <header
      className={classNames(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-soft' : 'bg-white',
      )}
    >
      <div className="hidden border-b border-ink-100 bg-ink-950 text-ink-100 md:block">
        <div className="container-px flex h-9 items-center justify-between text-xs">
          <p className="text-ink-200">{CONTACT_INFO.hours}</p>
          <div className="flex items-center gap-5">
            <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-1.5 hover:text-gold-300">
              <Phone className="h-3.5 w-3.5" /> {CONTACT_INFO.phone}
            </a>
            <Link to="/admin" className="text-ink-300 hover:text-gold-300">Admin</Link>
          </div>
        </div>
      </div>

      <div className="container-px flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950 font-display text-lg font-bold text-gold-400">M</div>
          <div className="leading-none">
            <span className="block font-display text-lg font-bold tracking-tight text-ink-950">Marque Motors</span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-ink-400">Luxury & Performance</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                classNames(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-ink-950 text-white' : 'text-ink-700 hover:bg-ink-50',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <form onSubmit={onSearch} className="hidden items-center md:flex">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cars…"
                className="w-44 rounded-full border border-ink-200 bg-white py-2 pl-9 pr-3 text-sm placeholder-ink-300 focus:w-56 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 transition-all"
              />
            </div>
          </form>
          <Link
            to="/inventory?favorites=1"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 hover:border-ink-900 hover:bg-ink-950 hover:text-white transition-colors"
            aria-label="Favorites"
          >
            <Heart className="h-4.5 w-4.5" />
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-crimson-500 px-1 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-100 bg-white lg:hidden">
          <div className="container-px space-y-1 py-4">
            <form onSubmit={onSearch} className="mb-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cars…"
                  className="w-full rounded-full border border-ink-200 py-2.5 pl-9 pr-3 text-sm"
                />
              </div>
            </form>
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  classNames('block rounded-xl px-4 py-3 text-sm font-medium', isActive ? 'bg-ink-950 text-white' : 'text-ink-700 hover:bg-ink-50')
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
