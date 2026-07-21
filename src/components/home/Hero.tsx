import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search, ChevronRight, Star } from 'lucide-react';
import { BRANDS, BODY_TYPES, PRICE_BOUNDS } from '@/constants';
import { Select } from '@/components/common/Field';
import { Button } from '@/components/common/Button';

export function Hero() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const brandOptions = BRANDS.map((b) => ({ value: b.name, label: b.name }));
  const bodyOptions = BODY_TYPES.map((b) => ({ value: b, label: b }));
  const priceOptions = [
    { value: '30000', label: 'Up to $30,000' },
    { value: '50000', label: 'Up to $50,000' },
    { value: '80000', label: 'Up to $80,000' },
    { value: '120000', label: 'Up to $120,000' },
    { value: String(PRICE_BOUNDS.max), label: 'No limit' },
  ];

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set('brand', brand);
    if (bodyType) params.set('bodyType', bodyType);
    if (maxPrice) params.set('maxPrice', maxPrice);
    navigate(`/inventory?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
        <div className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-30" />
      </div>

      <div className="container-px relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <span className="eyebrow text-gold-400">
            <span className="h-px w-8 bg-gold-400" /> Now delivering nationwide
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Find the car that <span className="text-gold-400">moves you</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-200">
            A curated inventory of luxury and performance vehicles — each inspected, priced transparently, and ready to drive home.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-ink-300">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />)}
            </div>
            <span>4.9/5 from 2,400+ owners</span>
          </div>
        </div>

        <form
          onSubmit={onSearch}
          className="mt-10 grid gap-3 rounded-2xl border border-white/10 bg-ink-900/70 p-3 backdrop-blur-md sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end"
        >
          <Select
            label="Brand"
            options={brandOptions}
            placeholder="Any brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border-white/10 bg-ink-800 text-white"
          />
          <Select
            label="Body type"
            options={bodyOptions}
            placeholder="Any type"
            value={bodyType}
            onChange={(e) => setBodyType(e.target.value)}
            className="border-white/10 bg-ink-800 text-white"
          />
          <Select
            label="Max price"
            options={priceOptions}
            placeholder="Any price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border-white/10 bg-ink-800 text-white"
          />
          <Button type="submit" size="lg" leftIcon={<Search className="h-4 w-4" />}>Search</Button>
        </form>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-300">
          <span className="text-ink-400">Popular:</span>
          {['BMW M4', 'Tesla Model S', 'Porsche 911', 'Mercedes GLE'].map((t) => (
            <button
              key={t}
              onClick={() => navigate(`/inventory?search=${encodeURIComponent(t)}`)}
              className="inline-flex items-center gap-1 hover:text-gold-300"
            >
              {t} <ChevronRight className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
