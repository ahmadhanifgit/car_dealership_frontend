import { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { Drawer } from '@/components/common/Overlay';
import { Button } from '@/components/common/Button';
import { Select } from '@/components/common/Field';
import { BRANDS, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS, DRIVETRAINS, CONDITIONS, PRICE_BOUNDS, YEAR_BOUNDS, MILEAGE_BOUNDS } from '@/constants';
import type { CarFilters } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/format';
import { classNames } from '@/lib/format';

interface Props {
  filters: CarFilters;
  onChange: (next: CarFilters) => void;
  onReset: () => void;
  resultCount: number;
}

function RangeInputs({ label, min, max, step, minVal, maxVal, onChange, format }: { label: string; min: number; max: number; step: number; minVal?: number | null; maxVal?: number | null; onChange: (min: number | null, max: number | null) => void; format: (v: number) => string }) {
  return (
    <div>
      <p className="field-label">{label}</p>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          placeholder="Min"
          value={minVal ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value), maxVal ?? null)}
          className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30"
        />
        <span className="text-ink-300">—</span>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          placeholder="Max"
          value={maxVal ?? ''}
          onChange={(e) => onChange(minVal ?? null, e.target.value === '' ? null : Number(e.target.value))}
          className="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30"
        />
      </div>
      {(minVal != null || maxVal != null) && (
        <p className="mt-1 text-[11px] text-ink-400">
          {minVal != null ? format(minVal) : format(min)} – {maxVal != null ? format(maxVal) : format(max)}
        </p>
      )}
    </div>
  );
}

function FilterGroup({ title, options, value, onChange }: { title: string; options: { value: string; label: string }[]; value: string | null; onChange: (v: string | null) => void }) {
  return (
    <div>
      <p className="field-label">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              onClick={() => onChange(active ? null : o.value)}
              className={classNames(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                active ? 'border-ink-950 bg-ink-950 text-white' : 'border-ink-200 text-ink-700 hover:border-ink-400',
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FilterBar({ filters, onChange, onReset, resultCount }: Props) {
  const [open, setOpen] = useState(false);

  const set = (patch: Partial<CarFilters>) => onChange({ ...filters, ...patch });

  const content = (
    <div className="space-y-6">
      <FilterGroup title="Brand" options={BRANDS.map((b) => ({ value: b.name, label: b.name }))} value={filters.brand ?? null} onChange={(v) => set({ brand: v })} />
      <FilterGroup title="Body type" options={BODY_TYPES.map((b) => ({ value: b, label: b }))} value={filters.bodyType ?? null} onChange={(v) => set({ bodyType: v as CarFilters['bodyType'] })} />
      <FilterGroup title="Fuel" options={FUEL_TYPES.map((f) => ({ value: f, label: f }))} value={filters.fuelType ?? null} onChange={(v) => set({ fuelType: v as CarFilters['fuelType'] })} />
      <FilterGroup title="Transmission" options={TRANSMISSIONS.map((t) => ({ value: t, label: t }))} value={filters.transmission ?? null} onChange={(v) => set({ transmission: v as CarFilters['transmission'] })} />
      <FilterGroup title="Drivetrain" options={DRIVETRAINS.map((d) => ({ value: d, label: d }))} value={filters.drivetrain ?? null} onChange={(v) => set({ drivetrain: v as CarFilters['drivetrain'] })} />
      <FilterGroup title="Condition" options={CONDITIONS.map((c) => ({ value: c, label: c }))} value={filters.condition ?? null} onChange={(v) => set({ condition: v as CarFilters['condition'] })} />
      <RangeInputs label="Price" min={PRICE_BOUNDS.min} max={PRICE_BOUNDS.max} step={1000000} minVal={filters.minPrice} maxVal={filters.maxPrice} onChange={(mn, mx) => set({ minPrice: mn, maxPrice: mx })} format={formatCurrency} />
      <RangeInputs label="Year" min={YEAR_BOUNDS.min} max={YEAR_BOUNDS.max} step={1} minVal={filters.minYear} maxVal={filters.maxYear} onChange={(mn, mx) => set({ minYear: mn, maxYear: mx })} format={String} />
      <RangeInputs label="Mileage" min={MILEAGE_BOUNDS.min} max={MILEAGE_BOUNDS.max} step={1000} minVal={filters.minMileage} maxVal={filters.maxMileage} onChange={(mn, mx) => set({ minMileage: mn, maxMileage: mx })} format={formatNumber} />
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-ink-900">Filters</h3>
            <button onClick={onReset} className="flex items-center gap-1 text-xs text-ink-500 hover:text-ink-900"><RotateCcw className="h-3 w-3" /> Reset</button>
          </div>
          {content}
        </div>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="btn-ghost !py-2.5 lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" /> Filters
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} title="Filters" footer={
        <div className="flex gap-3">
          <Button variant="subtle" fullWidth onClick={onReset}>Reset</Button>
          <Button fullWidth onClick={() => setOpen(false)}>Show {resultCount} results</Button>
        </div>
      }>
        {content}
      </Drawer>
    </>
  );
}

export function ActiveFilterChips({ filters, onRemove, onReset }: { filters: CarFilters; onRemove: (key: keyof CarFilters) => void; onReset: () => void }) {
  const chips: { key: keyof CarFilters; label: string }[] = [];
  if (filters.brand) chips.push({ key: 'brand', label: filters.brand });
  if (filters.bodyType) chips.push({ key: 'bodyType', label: filters.bodyType });
  if (filters.fuelType) chips.push({ key: 'fuelType', label: filters.fuelType });
  if (filters.transmission) chips.push({ key: 'transmission', label: filters.transmission });
  if (filters.drivetrain) chips.push({ key: 'drivetrain', label: filters.drivetrain });
  if (filters.condition) chips.push({ key: 'condition', label: filters.condition });
  if (filters.minPrice != null) chips.push({ key: 'minPrice', label: `Min ${formatCurrency(filters.minPrice)}` });
  if (filters.maxPrice != null) chips.push({ key: 'maxPrice', label: `Max ${formatCurrency(filters.maxPrice)}` });
  if (filters.minYear != null) chips.push({ key: 'minYear', label: `From ${filters.minYear}` });
  if (filters.maxYear != null) chips.push({ key: 'maxYear', label: `To ${filters.maxYear}` });
  if (filters.featured) chips.push({ key: 'featured', label: 'Featured only' });

  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button key={c.key} onClick={() => onRemove(c.key)} className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-3 py-1 text-xs font-medium text-white hover:bg-ink-800">
          {c.label} <X className="h-3 w-3" />
        </button>
      ))}
      <button onClick={onReset} className="text-xs text-ink-500 hover:text-ink-900 underline">Clear all</button>
    </div>
  );
}
