import { Helmet } from 'react-helmet-async';
import { useCars } from '@/contexts/CarContext';
import { Hero } from '@/components/home/Hero';
import { FeaturedCarousel } from '@/components/home/FeaturedCarousel';
import { BrandsGrid } from '@/components/cards/FeatureCard';
import { WhyUs, CTA } from '@/components/home/WhyUs';
import { Testimonials } from '@/components/home/Testimonials';
import { StatsStrip, FinancingCTA, FAQ } from '@/components/home/Sections';

export function HomePage() {
  const { cars } = useCars();
  const featured = cars.filter((c) => c.featured).slice(0, 8);

  return (
    <>
      <Helmet>
        <title>Marque Motors — Luxury & Performance Cars</title>
        <meta name="description" content="Browse a curated inventory of luxury and performance cars. Inspected, transparently priced, and ready to drive." />
      </Helmet>
      <Hero />
      <StatsStrip />
      <FeaturedCarousel cars={featured} />
      <WhyUs />
      <FinancingCTA />
      <section className="container-px py-16 sm:py-20">
        <div className="text-center">
          <span className="eyebrow justify-center"><span className="h-px w-8 bg-gold-500" /> Brands we carry</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-950 sm:text-4xl">15 marques, one standard</h2>
        </div>
        <div className="mt-10"><BrandsGrid /></div>
      </section>
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
