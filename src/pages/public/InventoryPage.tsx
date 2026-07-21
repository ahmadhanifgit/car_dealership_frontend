import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, Rows3, SlidersHorizontal, X } from 'lucide-react';
import { useCars } from '@/contexts/CarContext';
import { CarCard } from '@/components/cards/CarCard';
import { FilterBar, ActiveFilterChips } from '@/components/common/FilterBar';
import { Select } from '@/components/common/Field';
import { Pagination, EmptyState, SkeletonCard } from '@/components/common/Feedback';
import { SORT_OPTIONS, PAGE_SIZE, BODY_TYPES, FUEL_TYPES } from '@/constants';
import type { CarFilters, SortKey, BodyType, FuelType } from '@/types';
import { classNames } from '@/lib/format';
import { CARS } from '@/data/cars';

const emptyFilters: CarFilters = {};

export function InventoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cars, favorites } = useCars();
  const [filters, setFilters] = useState<CarFilters>(emptyFilters);
  const [sort, setSort] = useState<SortKey>('newest');
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const next: CarFilters = {};
    const s = searchParams.get('search'); if (s) next.search = s;
    const b = searchParams.get('brand'); if (b) next.brand = b;
    const bt = searchParams.get('bodyType'); if (bt && BODY_TYPES.includes(bt as BodyType)) next.bodyType = bt as BodyType;
    const ft = searchParams.get('fuelType'); if (ft && FUEL_TYPES.includes(ft as FuelType)) next.fuelType = ft as FuelType;
    const minP = searchParams.get('minPrice'); if (minP) next.minPrice = Number(minP);
    const maxP = searchParams.get('maxPrice'); if (maxP) next.maxPrice = Number(maxP);
    const favOnly = searchParams.get('favorites'); if (favOnly === '1') { /* handled below */ }
    setFilters(next);
    setPage(1);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [searchParams]);

  const favOnly = searchParams.get('favorites') === '1';

  const filtered = useMemo(() => {
    let list = cars.filter((c) => {
      if (favOnly && !favorites.includes(c.id)) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!`${c.brand} ${c.model} ${c.year} ${c.bodyType}`.toLowerCase().includes(q)) return false;
      }
      if (filters.brand && c.brand !== filters.brand) return false;
      if (filters.bodyType && c.bodyType !== filters.bodyType) return false;
      if (filters.fuelType && c.fuelType !== filters.fuelType) return false;
      if (filters.transmission && c.transmission !== filters.transmission) return false;
      if (filters.drivetrain && c.drivetrain !== filters.drivetrain) return false;
      if (filters.condition && c.condition !== filters.condition) return false;
      if (filters.minPrice != null && c.price < filters.minPrice) return false;
      if (filters.maxPrice != null && c.price > filters.maxPrice) return false;
      if (filters.minYear != null && c.year < filters.minYear) return false;
      if (filters.maxYear != null && c.year > filters.maxYear) return false;
      if (filters.minMileage != null && c.mileage < filters.minMileage) return false;
      if (filters.maxMileage != null && c.mileage > filters.maxMileage) return false;
      return true;
    });
    const sorted = [...list];
    switch (sort) {
      case 'price_asc': sorted.sort((a, b) => a.price - b.price); break;
      case 'price_desc': sorted.sort((a, b) => b.price - a.price); break;
      case 'year_desc': sorted.sort((a, b) => b.year - a.year); break;
      case 'mileage_asc': sorted.sort((a, b) => a.mileage - b.mileage); break;
      case 'horsepower_desc': sorted.sort((a, b) => b.horsepower - a.horsepower); break;
      default: sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return sorted;
  }, [cars, filters, sort, favOnly, favorites]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateFilters = (next: CarFilters) => {
    setFilters(next);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    ['brand', 'bodyType', 'fuelType', 'minPrice', 'maxPrice', 'minYear', 'maxYear', 'search'].forEach((k) => params.delete(k));
    Object.entries(next).forEach(([k, v]) => { if (v != null && v !== '') params.set(k, String(v)); });
    setSearchParams(params, { replace: true });
  };

  const reset = () => { setFilters(emptyFilters); setPage(1); setSearchParams({}, { replace: true }); };
  const removeFilter = (key: keyof CarFilters) => updateFilters({ ...filters, [key]: undefined });

  return (
    <>
      <Helmet>
        <title>Inventory — Marque Motors</title>
        <meta name="description" content="Browse our full inventory of luxury and performance vehicles." />
      </Helmet>

      <section className="border-b border-ink-100 bg-ink-50/50">
        <div className="container-px py-10">
          <span className="eyebrow"><span className="h-px w-8 bg-gold-500" /> {CARS.length} vehicles in stock</span>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink-950 sm:text-4xl">Browse inventory</h1>
          <p className="mt-2 max-w-xl text-ink-500">Filter by brand, body type, price, and more. Save favorites and compare up to three cars side by side.</p>
        </div>
      </section>

      <div className="container-px py-8">
        <div className="flex gap-8">
          <FilterBar filters={filters} onChange={updateFilters} onReset={reset} resultCount={filtered.length} />

          <div className="flex-1 min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <p className="text-sm text-ink-600"><span className="font-semibold text-ink-900">{filtered.length}</span> results{favOnly && ' · favorites'}</p>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value as SortKey); setPage(1); }}
                  options={SORT_OPTIONS.map((s) => ({ value: s.key, label: s.label }))}
                  className="!w-48 !py-2"
                />
                <div className="hidden items-center rounded-full border border-ink-200 p-0.5 sm:flex">
                  {(['grid', 'list'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={classNames('flex h-8 w-8 items-center justify-center rounded-full transition-colors', view === v ? 'bg-ink-950 text-white' : 'text-ink-500 hover:text-ink-900')}
                      aria-label={`${v} view`}
                    >
                      {v === 'grid' ? <LayoutGrid className="h-4 w-4" /> : <Rows3 className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-5"><ActiveFilterChips filters={filters} onRemove={removeFilter} onReset={reset} /></div>

            {loading ? (
              <div className={view === 'grid' ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : pageItems.length === 0 ? (
              <EmptyState
                icon={<X className="h-6 w-6" />}
                title="No vehicles match your filters"
                description="Try widening your price range, clearing a filter, or browsing all inventory."
                action={<button onClick={reset} className="btn-dark">Clear filters</button>}
              />
            ) : view === 'grid' ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {pageItems.map((car) => <CarCard key={car.id} car={car} />)}
              </div>
            ) : (
              <div className="space-y-4">
                {pageItems.map((car) => <CarCard key={car.id} car={car} view="list" />)}
              </div>
            )}

            {!loading && pageItems.length > 0 && (
              <div className="mt-10">
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
