import { Link } from 'react-router-dom';
import { Gauge, Fuel, Calendar, Heart, GitCompare, Zap } from 'lucide-react';
import type { Car } from '@/types';
import { Badge } from '@/components/common/Feedback';
import { useCars } from '@/contexts/CarContext';
import { classNames, formatCurrency, formatMileage, estimateMonthly } from '@/lib/format';
import toast from 'react-hot-toast';

interface Props {
  car: Car;
  view?: 'grid' | 'list';
}

export function CarCard({ car, view = 'grid' }: Props) {
  const { isFavorite, toggleFavorite, inCompare, toggleCompare, compare } = useCars();
  const fav = isFavorite(car.id);
  const cmp = inCompare(car.id);

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(car.id);
    toast.success(fav ? 'Removed from favorites' : 'Added to favorites');
  };
  const handleCmp = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleCompare(car.id);
    toast.success(cmp ? 'Removed from compare' : compare.length >= 3 ? 'Compare full — oldest replaced' : 'Added to compare');
  };

  if (view === 'list') {
    return (
      <Link to={`/cars/${car.slug}`} className="card group flex flex-col sm:flex-row overflow-hidden transition-all hover:shadow-lift">
        <div className="relative aspect-[16/10] sm:aspect-auto sm:w-72 shrink-0 overflow-hidden bg-ink-100">
          <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          {car.featured && <span className="absolute left-3 top-3"><Badge tone="gold">Featured</Badge></span>}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">{car.brand} · {car.year}</p>
              <h3 className="mt-0.5 font-display text-xl font-semibold text-ink-900">{car.model}</h3>
            </div>
            <div className="flex gap-1.5">
              <CardIconButton active={fav} onClick={handleFav} label="Favorite"><Heart className={classNames('h-4 w-4', fav && 'fill-current')} /></CardIconButton>
              <CardIconButton active={cmp} onClick={handleCmp} label="Compare"><GitCompare className="h-4 w-4" /></CardIconButton>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-600">
            <Spec icon={<Gauge className="h-4 w-4" />} label={formatMileage(car.mileage)} />
            <Spec icon={<Fuel className="h-4 w-4" />} label={car.fuelType} />
            <Spec icon={<Calendar className="h-4 w-4" />} label={String(car.year)} />
            <Spec icon={<Zap className="h-4 w-4" />} label={`${car.horsepower} hp`} />
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-ink-500">{car.description}</p>
          <div className="mt-auto flex items-end justify-between pt-4">
            <div>
              <p className="font-display text-2xl font-bold text-ink-950">{formatCurrency(car.price)}</p>
              <p className="text-xs text-ink-400">Est. {formatCurrency(estimateMonthly(car.price))}/mo</p>
            </div>
            <span className="text-sm font-semibold text-gold-600 group-hover:translate-x-1 transition-transform">View details →</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/cars/${car.slug}`} className="card group flex flex-col overflow-hidden transition-all hover:shadow-lift hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
        <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute left-3 top-3 flex gap-2">
          {car.featured && <Badge tone="gold">Featured</Badge>}
          {car.status !== 'available' && <Badge tone={car.status === 'sold' ? 'neutral' : 'warning'}>{car.status}</Badge>}
        </div>
        <div className="absolute right-3 top-3 flex gap-1.5">
          <CardIconButton active={fav} onClick={handleFav} label="Favorite"><Heart className={classNames('h-4 w-4', fav && 'fill-current')} /></CardIconButton>
          <CardIconButton active={cmp} onClick={handleCmp} label="Compare"><GitCompare className="h-4 w-4" /></CardIconButton>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/70 to-transparent p-3">
          <div className="flex gap-2">
            <Badge tone="neutral" className="bg-white/15 text-white backdrop-blur">{car.bodyType}</Badge>
            <Badge tone="neutral" className="bg-white/15 text-white backdrop-blur">{car.transmission}</Badge>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">{car.brand} · {car.year}</p>
        <h3 className="mt-0.5 font-display text-lg font-semibold text-ink-900">{car.model}</h3>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-ink-600">
          <Spec icon={<Gauge className="h-3.5 w-3.5" />} label={formatMileage(car.mileage)} />
          <Spec icon={<Fuel className="h-3.5 w-3.5" />} label={car.fuelType} />
          <Spec icon={<Zap className="h-3.5 w-3.5" />} label={`${car.horsepower} hp`} />
          <Spec icon={<Calendar className="h-3.5 w-3.5" />} label={String(car.year)} />
        </div>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="font-display text-xl font-bold text-ink-950">{formatCurrency(car.price)}</p>
            <p className="text-[11px] text-ink-400">Est. {formatCurrency(estimateMonthly(car.price))}/mo</p>
          </div>
          <span className="text-xs font-semibold text-gold-600">View →</span>
        </div>
      </div>
    </Link>
  );
}

function CardIconButton({ children, active, onClick, label }: { children: React.ReactNode; active?: boolean; onClick: (e: React.MouseEvent) => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={classNames(
        'flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors',
        active ? 'bg-gold-400 text-ink-950' : 'bg-white/85 text-ink-700 hover:bg-white',
      )}
    >
      {children}
    </button>
  );
}

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <span className="flex items-center gap-1.5"><span className="text-ink-400">{icon}</span>{label}</span>;
}
