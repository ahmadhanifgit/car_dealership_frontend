import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { FEATURES_GRID } from '@/constants';
import { FeatureCard } from '@/components/cards/FeatureCard';

export function WhyUs() {
  return (
    <section className="container-px py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow justify-center"><span className="h-px w-8 bg-gold-500" /> Why Marque</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-ink-950 sm:text-4xl">Buying a car should feel easy</h2>
        <p className="mt-3 text-ink-500">We obsess over the details so you can focus on the drive. Every step is transparent, every car is inspected, every deal is straightforward.</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES_GRID.map((f) => <FeatureCard key={f.title} {...f} />)}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="container-px py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 to-ink-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <div className="absolute inset-0 bg-grid-dark bg-[size:48px_48px] opacity-20" />
        <div className="relative">
          <ShieldCheck className="mx-auto h-10 w-10 text-gold-400" />
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Ready to find your next car?</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-200">Browse 50+ inspected vehicles, schedule a test drive, or get pre-qualified in minutes.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/inventory" className="btn-primary">
              Browse inventory <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost border-white/20 text-white hover:bg-white/10 hover:border-white">
              Talk to a concierge
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
