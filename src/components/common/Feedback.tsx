import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { classNames } from '@/lib/format';

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-xs text-ink-400" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-ink-900"><Home className="h-3.5 w-3.5" /></Link>
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5" />
          {c.to ? (
            <Link to={c.to} className={classNames('hover:text-ink-900', i === items.length - 1 && 'text-ink-700')}>{c.label}</Link>
          ) : (
            <span className={classNames(i === items.length - 1 && 'text-ink-700')}>{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

const statusStyles: Record<string, string> = {
  available: 'bg-success-100 text-success-700',
  reserved: 'bg-warning-100 text-warning-600',
  sold: 'bg-ink-100 text-ink-500',
  new: 'bg-gold-100 text-gold-700',
  contacted: 'bg-blue-100 text-blue-700',
  closed: 'bg-ink-100 text-ink-500',
};

export function Badge({ children, tone = 'neutral', className }: { children: React.ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'error' | 'gold' | 'info' | keyof typeof statusStyles; className?: string }) {
  const map: Record<string, string> = {
    neutral: 'bg-ink-100 text-ink-700',
    success: 'bg-success-100 text-success-700',
    warning: 'bg-warning-100 text-warning-600',
    error: 'bg-crimson-100 text-crimson-700',
    gold: 'bg-gold-100 text-gold-700',
    info: 'bg-blue-100 text-blue-700',
    ...statusStyles,
  };
  return <span className={classNames('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold', map[tone] || map.neutral, className)}>{children}</span>;
}

export function Loader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-400">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-gold-400" />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-[16/10]" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-4 w-1/3 rounded" />
        <div className="skeleton h-5 w-2/3 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-7 w-16 rounded-full" />
          <div className="skeleton h-7 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon?: React.ReactNode; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 px-6 py-16 text-center">
      {icon && <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink-400 shadow-soft">{icon}</div>}
      <h3 className="font-display text-lg font-semibold text-ink-900">{title}</h3>
      {description && <p className="mt-1 max-w-md text-sm text-ink-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-crimson-100 bg-crimson-50 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-crimson-100 text-crimson-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <h3 className="font-display text-lg font-semibold text-crimson-700">Something went wrong</h3>
      <p className="mt-1 max-w-md text-sm text-crimson-600">{message}</p>
      {onRetry && <button onClick={onRetry} className="btn-dark mt-6">Try again</button>}
    </div>
  );
}

export function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const windowed = pages.filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === totalPages);
  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-full px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 disabled:opacity-40"
      >
        Prev
      </button>
      {windowed.map((p, i) => {
        const prev = windowed[i - 1];
        const showEllipsis = prev && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {showEllipsis && <span className="px-1 text-ink-300">…</span>}
            <button
              onClick={() => onChange(p)}
              className={classNames(
                'h-9 w-9 rounded-full text-sm font-semibold transition-colors',
                p === page ? 'bg-ink-950 text-white' : 'text-ink-600 hover:bg-ink-50',
              )}
            >
              {p}
            </button>
          </span>
        );
      })}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-full px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}
