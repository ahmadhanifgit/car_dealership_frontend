import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GitCompare, X } from 'lucide-react';
import { useCars } from '@/contexts/CarContext';
import { formatCurrency } from '@/lib/format';

export function CompareBar() {
  const { compare, cars, toggleCompare, clearCompare } = useCars();
  const navigate = useNavigate();
  const items = compare.map((id) => cars.find((c) => c.id === id)).filter(Boolean).slice(0, 3);

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed inset-x-0 bottom-0 z-40"
        >
          <div className="mx-auto mb-4 max-w-5xl rounded-2xl border border-ink-100 bg-white/95 p-3 shadow-lift backdrop-blur-md sm:mx-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-500">
                <GitCompare className="h-4 w-4 text-gold-500" /> Compare
              </div>
              <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
                {items.map((c) => c && (
                  <div key={c.id} className="flex shrink-0 items-center gap-2 rounded-xl bg-ink-50 p-2 pr-3">
                    <img src={c.images[0]} alt="" className="h-10 w-14 rounded-lg object-cover" />
                    <div className="leading-tight">
                      <p className="text-xs font-semibold text-ink-900">{c.brand} {c.model}</p>
                      <p className="text-[11px] text-ink-500">{formatCurrency(c.price)}</p>
                    </div>
                    <button onClick={() => toggleCompare(c.id)} className="text-ink-400 hover:text-crimson-600" aria-label="Remove">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {Array.from({ length: 3 - items.length }).map((_, i) => (
                  <div key={i} className="flex h-14 w-32 shrink-0 items-center justify-center rounded-xl border border-dashed border-ink-200 text-xs text-ink-300">
                    Add a car
                  </div>
                ))}
              </div>
              <button onClick={clearCompare} className="hidden text-xs text-ink-500 hover:text-ink-900 sm:block">Clear</button>
              <button
                disabled={items.length < 2}
                onClick={() => navigate(`/compare?ids=${items.map((c) => c!.id).join(',')}`)}
                className="btn-primary !px-4 !py-2 !text-xs disabled:opacity-40"
              >
                Compare {items.length}/3
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
