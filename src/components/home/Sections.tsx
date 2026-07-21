import { useState } from 'react';
import { ChevronDown, Calculator, TrendingDown } from 'lucide-react';
import { FAQS, STATS } from '@/constants';
import { estimateMonthly, formatCurrency, range } from '@/lib/format';
import { motion, AnimatePresence } from 'framer-motion';

export function StatsStrip() {
  return (
    <section className="border-y border-ink-100 bg-white">
      <div className="container-px grid grid-cols-2 divide-x divide-ink-100 py-8 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="px-4 text-center">
            <p className="font-display text-3xl font-bold text-ink-950 sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-ink-400">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FinancingCTA() {
  const [price, setPrice] = useState(6500000);
  const [down, setDown] = useState(10);
  const [term, setTerm] = useState(60);
  const apr = 5.9;
  const monthly = estimateMonthly(price, apr, term, down / 100);

  return (
    <section className="container-px py-16 sm:py-20">
      <div className="overflow-hidden rounded-3xl bg-ink-950 text-white">
        <div className="grid lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <span className="eyebrow text-gold-400"><span className="h-px w-8 bg-gold-400" /> Financing</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Estimate your monthly payment</h2>
            <p className="mt-3 max-w-md text-ink-300">
              Pre-qualify in minutes with rates from 12 competing lenders. A soft pull will not affect your credit score.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-ink-200">
              {['Rates as low as 4.9% APR', 'Terms from 24 to 84 months', 'No prepayment penalties'].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-gold-400" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-12 lg:border-l lg:border-t-0">
            <div className="flex items-center gap-2 text-sm text-ink-200"><Calculator className="h-4 w-4 text-gold-400" /> Payment calculator</div>
            <div className="mt-6 space-y-6">
              <SliderField label="Vehicle price" value={price} min={15000} max={200000} step={1000} onChange={setPrice} format={formatCurrency} />
              <SliderField label="Down payment" value={down} min={0} max={40} step={1} onChange={setDown} format={(v) => `${v}%`} />
              <SliderField label="Term" value={term} min={24} max={84} step={12} onChange={setTerm} format={(v) => `${v} mo`} />
            </div>
            <div className="mt-8 flex items-end justify-between rounded-2xl bg-gold-400 p-5 text-ink-950">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Estimated monthly</p>
                <p className="font-display text-3xl font-bold">{formatCurrency(monthly)}<span className="text-base font-medium">/mo</span></p>
              </div>
              <p className="text-right text-[11px] leading-tight opacity-70">@ {apr}% APR<br />subject to credit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderField({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-ink-200">{label}</span>
        <span className="font-semibold text-white">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-gold-400"
      />
      <div className="mt-1 flex justify-between text-[10px] text-ink-400">
        <span>{format(min)}</span><span>{format(max)}</span>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container-px py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="eyebrow justify-center"><span className="h-px w-8 bg-gold-500" /> Questions</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-950 sm:text-4xl">Frequently asked</h2>
        </div>
        <div className="mt-8 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-ink-900">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-ink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-ink-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { range };
