import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus, Search, Pencil, Trash2, ArrowUpDown, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCars } from '@/contexts/CarContext';
import { carService } from '@/services';
import { Button } from '@/components/common/Button';
import { Input, Select } from '@/components/common/Field';
import { Badge, EmptyState, Pagination } from '@/components/common/Feedback';
import { Modal } from '@/components/common/Overlay';
import { formatCurrency, formatMileage, formatDate } from '@/lib/format';
import type { Car, CarStatus } from '@/types';

const STATUS_FILTERS: { value: 'all' | CarStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'available', label: 'Available' },
  { value: 'reserved', label: 'Reserved' },
  { value: 'sold', label: 'Sold' },
];

export function AdminCarsList() {
  const { cars, refresh } = useCars();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | CarStatus>('all');
  const [sortKey, setSortKey] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState<Car | null>(null);
  const [deleting, setDeleting] = useState(false);

  const pageSize = 8;
  const filtered = useMemo(() => {
    let list = cars.filter((c) => {
      if (status !== 'all' && c.status !== status) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!`${c.brand} ${c.model} ${c.year}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    if (sortKey === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortKey === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    else list = [...list].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return list;
  }, [cars, query, status, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await carService.remove(toDelete.id);
      await refresh();
      toast.success('Vehicle deleted');
      setToDelete(null);
    } catch {
      toast.error('Could not delete vehicle');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Helmet><title>Inventory — Marque Admin</title></Helmet>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-950">Inventory</h1>
          <p className="text-sm text-ink-500">{cars.length} vehicles · manage listings, status, and pricing</p>
        </div>
        <Link to="/admin/cars/new"><Button leftIcon={<Plus className="h-4 w-4" />}>Add car</Button></Link>
      </div>

      <div className="mt-6 card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search by brand, model, year…"
              className="w-full rounded-xl border border-ink-200 py-2.5 pl-9 pr-3 text-sm focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30"
            />
          </div>
          <div className="flex items-center gap-1 rounded-full border border-ink-200 p-0.5">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s.value}
                onClick={() => { setStatus(s.value); setPage(1); }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${status === s.value ? 'bg-ink-950 text-white' : 'text-ink-600 hover:text-ink-900'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-ink-400" />
            <Select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as typeof sortKey)}
              options={[
                { value: 'newest', label: 'Newest' },
                { value: 'price_asc', label: 'Price ↑' },
                { value: 'price_desc', label: 'Price ↓' },
              ]}
              className="!w-36 !py-2"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 card overflow-hidden">
        {pageItems.length === 0 ? (
          <div className="p-6"><EmptyState icon={<Search className="h-6 w-6" />} title="No vehicles found" description="Adjust your search or filters, or add a new vehicle." action={<Link to="/admin/cars/new"><Button>Add car</Button></Link>} /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-ink-100 bg-ink-50/50 text-left text-xs uppercase tracking-wider text-ink-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Vehicle</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Mileage</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Added</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {pageItems.map((c) => (
                  <tr key={c.id} className="hover:bg-ink-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={c.images[0]} alt="" className="h-10 w-14 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold text-ink-900">{c.brand} {c.model}</p>
                          <p className="text-xs text-ink-400">{c.year} · {c.bodyType} · {c.condition}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink-900">{formatCurrency(c.price)}</td>
                    <td className="px-4 py-3 text-ink-600">{formatMileage(c.mileage)}</td>
                    <td className="px-4 py-3"><Badge tone={c.status === 'available' ? 'success' : c.status === 'sold' ? 'neutral' : 'warning'}>{c.status}</Badge></td>
                    <td className="px-4 py-3 text-ink-500">{formatDate(c.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link to={`/cars/${c.slug}`} className="rounded-lg p-2 text-ink-500 hover:bg-ink-100 hover:text-ink-900" aria-label="View"><Eye className="h-4 w-4" /></Link>
                        <Link to={`/admin/cars/${c.id}`} className="rounded-lg p-2 text-ink-500 hover:bg-ink-100 hover:text-ink-900" aria-label="Edit"><Pencil className="h-4 w-4" /></Link>
                        <button onClick={() => setToDelete(c)} className="rounded-lg p-2 text-ink-500 hover:bg-crimson-50 hover:text-crimson-600" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {filtered.length > pageSize && (
          <div className="border-t border-ink-100 p-4"><Pagination page={page} totalPages={totalPages} onChange={setPage} /></div>
        )}
      </div>

      <Modal
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        title="Delete vehicle?"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="subtle" onClick={() => setToDelete(null)}>Cancel</Button>
            <Button variant="danger" loading={deleting} onClick={confirmDelete}>Delete</Button>
          </div>
        }
      >
        <p className="text-sm text-ink-600">
          You're about to permanently delete <span className="font-semibold text-ink-900">{toDelete?.brand} {toDelete?.model} {toDelete?.year}</span>. This action cannot be undone.
        </p>
      </Modal>
    </>
  );
}
