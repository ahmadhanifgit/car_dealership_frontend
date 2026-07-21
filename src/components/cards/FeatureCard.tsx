import { Link } from 'react-router-dom';
import { ShieldCheck, BadgePercent, Banknote, RotateCcw, Truck, Headset, Circle, type LucideIcon } from 'lucide-react';
import { BRANDS, FEATURES_GRID } from '@/constants';
import { CARS } from '@/data/cars';
import { classNames } from '@/lib/format';

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck, BadgePercent, Banknote, RotateCcw, Truck, Headset,
};

export function FeatureCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  const Ico = ICON_MAP[icon] || Circle;
  return (
    <div className="card group p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-950 text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-ink-950">
        <Ico className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-ink-900">{title}</h3>
      <p className="mt-1.5 text-sm text-ink-500">{text}</p>
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES_GRID.map((f) => (
        <FeatureCard key={f.title} {...f} />
      ))}
    </div>
  );
}

const BRAND_TONES: Record<string, string> = {
  BMW: 'from-blue-500/10', Porsche: 'from-crimson-500/10', Tesla: 'from-ink-900/10',
  'Mercedes-Benz': 'from-ink-700/10', Audi: 'from-crimson-600/10', Lexus: 'from-neutral-400/10',
};

export function BrandCard({ name }: { name: string }) {
  const count = CARS.filter((c) => c.brand === name).length;
  const tone = BRAND_TONES[name] || 'from-gold-400/10';
  return (
    <Link
      to={`/inventory?brand=${encodeURIComponent(name)}`}
      className="group relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl border border-ink-100 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className={classNames('absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100', tone)} />
      <span className="relative font-display text-2xl font-bold tracking-tight text-ink-900">{name}</span>
      <span className="relative mt-1 text-xs text-ink-400">{count} vehicle{count !== 1 ? 's' : ''}</span>
    </Link>
  );
}

export function BrandsGrid() {
  const top = BRANDS.slice(0, 12);
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {top.map((b) => <BrandCard key={b.name} name={b.name} />)}
    </div>
  );
}
