import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Gauge, Fuel, Cog, Calendar, Zap, Users, DoorOpen, Palette, CheckCircle2,
  Heart, GitCompare, ShieldCheck, Star, ChevronRight, ArrowLeft,
} from 'lucide-react';
import { useCars } from '@/contexts/CarContext';
import { getCarBySlug } from '@/data/cars';
import { carService } from '@/services';
import type { Car } from '@/types';
import { CarGallery } from '@/components/cards/CarGallery';
import { InquiryForm } from '@/components/cards/InquiryForm';
import { CarCard } from '@/components/cards/CarCard';
import { Breadcrumb, Badge, Loader } from '@/components/common/Feedback';
import { Button } from '@/components/common/Button';
import { classNames, formatCurrency, formatMileage, estimateMonthly } from '@/lib/format';
import { CONTACT_INFO } from '@/constants';
import toast from 'react-hot-toast';

export function CarDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { cars, isFavorite, toggleFavorite, inCompare, toggleCompare } = useCars();
  const [car, setCar] = useState<Car | undefined>(getCarBySlug(slug || ''));
  const [related, setRelated] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const found = getCarBySlug(slug || '');
    setCar(found);
    if (found) {
      carService.getRelated(found.slug, 3).then(setRelated).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) return <div className="container-px py-20"><Loader label="Loading vehicle…" /></div>;
  if (!car) {
    return (
      <div className="container-px py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-ink-900">Vehicle not found</h1>
        <p className="mt-2 text-ink-500">The car you are looking for may have been sold or moved.</p>
        <Link to="/inventory" className="btn-dark mt-6">Back to inventory</Link>
      </div>
    );
  }

  const fav = isFavorite(car.id);
  const cmp = inCompare(car.id);
  const monthly = estimateMonthly(car.price);

  const specs = [
    { icon: <Gauge className="h-4 w-4" />, label: 'Mileage', value: formatMileage(car.mileage) },
    { icon: <Fuel className="h-4 w-4" />, label: 'Fuel', value: car.fuelType },
    { icon: <Cog className="h-4 w-4" />, label: 'Transmission', value: car.transmission },
    { icon: <Calendar className="h-4 w-4" />, label: 'Year', value: String(car.year) },
    { icon: <Zap className="h-4 w-4" />, label: 'Power', value: `${car.horsepower} hp` },
    { icon: <Gauge className="h-4 w-4" />, label: '0–60 mph', value: `${car.acceleration} s` },
    { icon: <Zap className="h-4 w-4" />, label: 'Top speed', value: `${car.topSpeed} mph` },
    { icon: <Users className="h-4 w-4" />, label: 'Seats', value: String(car.seats) },
    { icon: <DoorOpen className="h-4 w-4" />, label: 'Doors', value: String(car.doors) },
    { icon: <Cog className="h-4 w-4" />, label: 'Drivetrain', value: car.drivetrain },
    { icon: <Fuel className="h-4 w-4" />, label: 'Engine', value: car.engineSize > 0 ? `${car.engineSize}L` : 'Electric' },
    { icon: <Palette className="h-4 w-4" />, label: 'Exterior', value: car.color },
  ];

  return (
    <>
      <Helmet>
        <title>{car.brand} {car.model} {car.year} — Marque Motors</title>
        <meta name="description" content={`${car.year} ${car.brand} ${car.model} — ${formatMileage(car.mileage)}, ${car.horsepower} hp, ${formatCurrency(car.price)}.`} />
      </Helmet>

      <div className="container-px py-6">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumb items={[
            { label: 'Inventory', to: '/inventory' },
            { label: `${car.brand} ${car.model}` },
          ]} />
          <Link to="/inventory" className="flex items-center gap-1 text-sm text-ink-500 hover:text-ink-900">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </div>

      <div className="container-px pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <CarGallery images={car.images} alt={`${car.brand} ${car.model}`} />
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge tone="gold">{car.condition}</Badge>
              <Badge tone="neutral">{car.bodyType}</Badge>
              {car.status !== 'available' && <Badge tone={car.status === 'sold' ? 'neutral' : 'warning'}>{car.status}</Badge>}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">{car.brand} · {car.year}</p>
              <h1 className="mt-1 font-display text-3xl font-bold text-ink-950">{car.model}</h1>
              <div className="mt-2 flex items-center gap-2 text-sm text-ink-500">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />)}
                </div>
                <span>4.9 · 38 test drives</span>
              </div>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="font-display text-3xl font-bold text-ink-950">{formatCurrency(car.price)}</p>
                  <p className="text-xs text-ink-400">Est. {formatCurrency(monthly)}/mo @ 5.9% APR</p>
                </div>
                <span className="text-xs font-medium text-success-600">Great price</span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => { toggleFavorite(car.id); toast.success(fav ? 'Removed from favorites' : 'Added to favorites'); }}
                  className={classNames('flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors', fav ? 'border-crimson-200 bg-crimson-50 text-crimson-600' : 'border-ink-200 text-ink-700 hover:border-ink-400')}
                >
                  <Heart className={classNames('h-4 w-4', fav && 'fill-current')} /> {fav ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={() => { toggleCompare(car.id); toast.success(cmp ? 'Removed from compare' : 'Added to compare'); }}
                  className={classNames('flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors', cmp ? 'border-gold-300 bg-gold-50 text-gold-700' : 'border-ink-200 text-ink-700 hover:border-ink-400')}
                >
                  <GitCompare className="h-4 w-4" /> Compare
                </button>
              </div>

              <div className="mt-5 border-t border-ink-100 pt-5">
                <div className="flex items-center gap-2 text-sm text-ink-600">
                  <ShieldCheck className="h-4 w-4 text-success-600" /> 150-point inspection passed · 7-day return
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-ink-100 pt-5 text-sm">
                <a href={`tel:${CONTACT_INFO.phone}`} className="rounded-xl bg-ink-50 px-3 py-2.5 text-center font-medium text-ink-800 hover:bg-ink-100">{CONTACT_INFO.phone}</a>
                <Link to="/contact" className="rounded-xl bg-ink-950 px-3 py-2.5 text-center font-medium text-white hover:bg-ink-800">Chat with us</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-950">Overview</h2>
            <p className="mt-3 leading-relaxed text-ink-600">{car.description}</p>

            <h3 className="mt-8 font-display text-lg font-semibold text-ink-900">Specifications</h3>
            <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-ink-100 bg-ink-100 sm:grid-cols-2">
              {specs.map((s) => (
                <div key={s.label} className="flex items-center gap-3 bg-white px-4 py-3">
                  <span className="text-gold-500">{s.icon}</span>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-ink-400">{s.label}</p>
                    <p className="text-sm font-semibold text-ink-900">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-8 font-display text-lg font-semibold text-ink-900">Features & options</h3>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {car.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-ink-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success-600" /> {f}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold text-ink-900">Inquire about this car</h3>
              <p className="mt-1 text-sm text-ink-500">Book a test drive, request more info, or get financing — all in one form.</p>
              <div className="mt-5"><InquiryForm car={car} /></div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold text-ink-950">More from {car.brand}</h2>
              <Link to={`/inventory?brand=${encodeURIComponent(car.brand)}`} className="flex items-center gap-1 text-sm font-semibold text-gold-600">
                See all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => <CarCard key={c.id} car={c} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
