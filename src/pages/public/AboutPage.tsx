import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Award, Heart, Users, Wrench, ArrowRight } from 'lucide-react';
import { STATS, FEATURES_GRID } from '@/constants';
import { FeatureCard } from '@/components/cards/FeatureCard';

export function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Marque Motors</title>
        <meta name="description" content="Marque Motors is a curated luxury and performance car dealership built on transparency, inspection, and concierge service." />
      </Helmet>

      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 to-ink-950/50" />
        </div>
        <div className="container-px relative py-20 sm:py-28">
          <span className="eyebrow text-gold-400"><span className="h-px w-8 bg-gold-400" /> Our story</span>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold sm:text-5xl">We sell cars the way we'd want to buy them.</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-200">Founded in 2014, Marque Motors started as a three-person shop with a simple belief: buying a car should feel as good as driving one.</p>
        </div>
      </section>

      <section className="container-px py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl">
            <img src="https://images.pexels.com/photos/3954571/pexels-photo-3954571.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Showroom" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-ink-950">A dealership without the dealership experience</h2>
            <p className="mt-4 text-ink-600">No haggling, no hidden fees, no upsells you do not need. Every vehicle is inspected, every price is transparent, and every customer gets a single dedicated advisor from inquiry to delivery.</p>
            <p className="mt-3 text-ink-600">We carry 15 marques across new, certified pre-owned, and used inventory — from daily drivers to weekend exotics. Our 12-bay service center handles reconditioning in-house, which is why our CPO cars feel newer than the mileage suggests.</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { icon: <Award className="h-5 w-5" />, label: '150-point inspection' },
                { icon: <Wrench className="h-5 w-5" />, label: 'In-house service center' },
                { icon: <Heart className="h-5 w-5" />, label: '7-day return policy' },
                { icon: <Users className="h-5 w-5" />, label: 'Dedicated advisor' },
              ].map((v) => (
                <div key={v.label} className="flex items-center gap-3 rounded-xl border border-ink-100 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950 text-gold-400">{v.icon}</span>
                  <span className="text-sm font-medium text-ink-800">{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink-100 bg-ink-50/50">
        <div className="container-px grid grid-cols-2 divide-x divide-ink-100 py-10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-4 text-center">
              <p className="font-display text-3xl font-bold text-ink-950 sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ink-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center"><span className="h-px w-8 bg-gold-500" /> What sets us apart</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-950">Built on trust, not pressure</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES_GRID.map((f) => <FeatureCard key={f.title} {...f} />)}
        </div>
      </section>

      <section className="container-px pb-20">
        <div className="rounded-3xl bg-ink-950 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-display text-3xl font-bold">Come see for yourself</h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-300">Visit our showroom in San Francisco, or browse the full inventory online.</p>
          <Link to="/inventory" className="btn-primary mt-6">Browse inventory <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
