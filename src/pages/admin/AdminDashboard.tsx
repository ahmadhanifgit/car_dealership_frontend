import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Car as CarIcon, DollarSign, TrendingUp, Eye, Plus, ArrowRight, CircleDollarSign } from 'lucide-react';
import { useCars } from '@/contexts/CarContext';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/common/Feedback';
import { Button } from '@/components/common/Button';
import { formatCurrency, formatMileage, formatRelative } from '@/lib/format';

export function AdminDashboard() {
  const { cars } = useCars();
  const { user } = useAuth();

  const stats = useMemo(() => {
    const total = cars.length;
    const available = cars.filter((c) => c.status === 'available').length;
    const sold = cars.filter((c) => c.status === 'sold').length;
    const reserved = cars.filter((c) => c.status === 'reserved').length;
    const inventoryValue = cars.reduce((s, c) => s + c.price, 0);
    const featured = cars.filter((c) => c.featured).length;
    return { total, available, sold, reserved, inventoryValue, featured };
  }, [cars]);

  const recent = useMemo(() => [...cars].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 5), [cars]);

  const cards = [
    { label: 'Total vehicles', value: stats.total, icon: <CarIcon className="h-5 w-5" />, tone: 'bg-ink-950 text-gold-400' },
    { label: 'Inventory value', value: formatCurrency(stats.inventoryValue), icon: <DollarSign className="h-5 w-5" />, tone: 'bg-success-600 text-white' },
    { label: 'Available now', value: stats.available, icon: <TrendingUp className="h-5 w-5" />, tone: 'bg-blue-600 text-white' },
    { label: 'Featured', value: stats.featured, icon: <Eye className="h-5 w-5" />, tone: 'bg-gold-400 text-ink-950' },
  ];

  return (
    <>
      <Helmet><title>Dashboard — Marque Admin</title></Helmet>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-950">Dashboard</h1>
          <p className="text-sm text-ink-500">Welcome back, {user?.name}. Here's your inventory at a glance.</p>
        </div>
        <Link to="/admin/cars/new"><Button leftIcon={<Plus className="h-4 w-4" />}>Add car</Button></Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-5">
            <div className="flex items-center justify-between">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.tone}`}>{c.icon}</span>
            </div>
            <p className="mt-4 font-display text-2xl font-bold text-ink-950">{c.value}</p>
            <p className="text-xs uppercase tracking-wider text-ink-400">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
            <h2 className="font-display text-base font-semibold text-ink-900">Recently added</h2>
            <Link to="/admin/cars" className="flex items-center gap-1 text-sm font-semibold text-gold-600">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="divide-y divide-ink-100">
            {recent.map((c) => (
              <Link key={c.id} to={`/admin/cars/${c.id}`} className="flex items-center gap-4 px-5 py-3 hover:bg-ink-50">
                <img src={c.images[0]} alt="" className="h-12 w-16 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-900">{c.brand} {c.model}</p>
                  <p className="text-xs text-ink-400">{c.year} · {formatMileage(c.mileage)} · {formatRelative(c.createdAt)}</p>
                </div>
                <span className="text-sm font-semibold text-ink-900">{formatCurrency(c.price)}</span>
                <Badge tone={c.status === 'available' ? 'success' : c.status === 'sold' ? 'neutral' : 'warning'}>{c.status}</Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-display text-base font-semibold text-ink-900">Status breakdown</h2>
          <div className="mt-4 space-y-3">
            {[
              { label: 'Available', value: stats.available, tone: 'bg-success-500' },
              { label: 'Reserved', value: stats.reserved, tone: 'bg-warning-500' },
              { label: 'Sold', value: stats.sold, tone: 'bg-ink-400' },
            ].map((s) => {
              const pct = stats.total ? (s.value / stats.total) * 100 : 0;
              return (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-600">{s.label}</span>
                    <span className="font-semibold text-ink-900">{s.value}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-100">
                    <div className={`h-full rounded-full ${s.tone}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 rounded-xl bg-ink-50 p-4">
            <div className="flex items-center gap-2 text-sm text-ink-700"><CircleDollarSign className="h-4 w-4 text-gold-600" /> Avg. vehicle price</div>
            <p className="mt-1 font-display text-2xl font-bold text-ink-950">{formatCurrency(Math.round(stats.inventoryValue / Math.max(1, stats.total)))}</p>
          </div>
        </div>
      </div>
    </>
  );
}
