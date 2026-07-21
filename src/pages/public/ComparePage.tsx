import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Check, X, GitCompare } from 'lucide-react';
import { useCars } from '@/contexts/CarContext';
import { EmptyState } from '@/components/common/Feedback';
import { formatCurrency, formatMileage } from '@/lib/format';
import type { Car } from '@/types';

const ROWS: { key: string; label: string; get: (c: Car) => string | number }[] = [
  { key: 'price', label: 'Price', get: (c) => formatCurrency(c.price) },
  { key: 'year', label: 'Year', get: (c) => c.year },
  { key: 'mileage', label: 'Mileage', get: (c) => formatMileage(c.mileage) },
  { key: 'bodyType', label: 'Body type', get: (c) => c.bodyType },
  { key: 'fuelType', label: 'Fuel', get: (c) => c.fuelType },
  { key: 'transmission', label: 'Transmission', get: (c) => c.transmission },
  { key: 'drivetrain', label: 'Drivetrain', get: (c) => c.drivetrain },
  { key: 'horsepower', label: 'Horsepower', get: (c) => `${c.horsepower} hp` },
  { key: 'acceleration', label: '0–60 mph', get: (c) => `${c.acceleration} s` },
  { key: 'topSpeed', label: 'Top speed', get: (c) => `${c.topSpeed} mph` },
  { key: 'engine', label: 'Engine', get: (c) => (c.engineSize > 0 ? `${c.engineSize}L` : 'Electric') },
  { key: 'seats', label: 'Seats', get: (c) => c.seats },
  { key: 'condition', label: 'Condition', get: (c) => c.condition },
  { key: 'color', label: 'Exterior', get: (c) => c.color },
];

export function ComparePage() {
  const [params] = useSearchParams();
  const { cars } = useCars();
  const ids = params.get('ids')?.split(',').filter(Boolean) || [];
  const items = ids.map((id) => cars.find((c) => c.id === id)).filter(Boolean) as Car[];

  return (
    <>
      <Helmet><title>Compare — Marque Motors</title></Helmet>
      <div className="container-px py-10">
        <span className="eyebrow"><span className="h-px w-8 bg-gold-500" /> Side by side</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink-950 sm:text-4xl">Compare vehicles</h1>
        <p className="mt-2 text-ink-500">Compare up to three cars across price, performance, and specifications.</p>

        {items.length < 2 ? (
          <div className="mt-8">
            <EmptyState
              icon={<GitCompare className="h-6 w-6" />}
              title="Add at least two cars to compare"
              description="Open any car and tap the compare icon. Your selections appear here."
            />
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-40 p-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-400">Vehicle</th>
                  {items.map((c) => (
                    <th key={c.id} className="p-3 text-left">
                      <div className="overflow-hidden rounded-xl border border-ink-100">
                        <img src={c.images[0]} alt="" className="aspect-[16/10] w-full object-cover" />
                      </div>
                      <p className="mt-2 font-display text-sm font-bold text-ink-900">{c.brand} {c.model}</p>
                      <p className="text-xs text-ink-400">{c.year}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, ri) => (
                  <tr key={row.key} className={ri % 2 ? 'bg-ink-50/50' : ''}>
                    <td className="p-3 text-sm font-medium text-ink-600">{row.label}</td>
                    {items.map((c) => (
                      <td key={c.id} className="p-3 text-sm font-semibold text-ink-900">{row.get(c)}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-3 text-sm font-medium text-ink-600">Features</td>
                  {items.map((c) => (
                    <td key={c.id} className="p-3 text-xs text-ink-600">
                      <div className="flex flex-wrap gap-1">
                        {c.features.slice(0, 6).map((f) => (
                          <span key={f} className="inline-flex items-center gap-1 rounded-full bg-success-100 px-2 py-0.5 text-success-700">
                            <Check className="h-3 w-3" /> {f}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
