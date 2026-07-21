import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Mail, Phone, Twitter, Youtube, Clock } from 'lucide-react';
import { CONTACT_INFO, SOCIALS, NAV_LINKS } from '@/constants';
import { BRANDS } from '@/constants';

export function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-200">
      <div className="container-px grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white font-display text-lg font-bold text-ink-950">M</div>
            <span className="font-display text-lg font-bold text-white">Marque Motors</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-ink-300">
            A curated inventory of luxury and performance vehicles, backed by transparent pricing and a 150-point inspection on every certified car.
          </p>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-200 hover:border-gold-400 hover:text-gold-300 transition-colors"
                aria-label={s.label}
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-ink-300 hover:text-white link-underline">{l.label}</Link></li>
            ))}
            <li><Link to="/inventory" className="text-ink-300 hover:text-white link-underline">All inventory</Link></li>
            <li><Link to="/admin" className="text-ink-300 hover:text-white link-underline">Admin portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400">Brands</h4>
          <ul className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm">
            {BRANDS.slice(0, 8).map((b) => (
              <li key={b.name}>
                <Link to={`/inventory?brand=${encodeURIComponent(b.name)}`} className="text-ink-300 hover:text-white link-underline">{b.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" /><span className="text-ink-300">{CONTACT_INFO.address}</span></li>
            <li className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" /><a href={`tel:${CONTACT_INFO.phone}`} className="text-ink-300 hover:text-white">{CONTACT_INFO.phone}</a></li>
            <li className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" /><a href={`mailto:${CONTACT_INFO.email}`} className="text-ink-300 hover:text-white">{CONTACT_INFO.email}</a></li>
            <li className="flex gap-3"><Clock className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" /><span className="text-ink-300">{CONTACT_INFO.hours}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Marque Motors. All rights reserved.</p>
          <p className="flex gap-4">
            <span className="hover:text-ink-200 cursor-pointer">Privacy</span>
            <span className="hover:text-ink-200 cursor-pointer">Terms</span>
            <span className="hover:text-ink-200 cursor-pointer">Sitemap</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const map: Record<string, React.ReactNode> = {
    Instagram: <Instagram className="h-4 w-4" />,
    Facebook: <Facebook className="h-4 w-4" />,
    Youtube: <Youtube className="h-4 w-4" />,
    Twitter: <Twitter className="h-4 w-4" />,
  };
  return <>{map[name] || null}</>;
}
