import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import type { Car } from '@/types';
import { CarCard } from '@/components/cards/CarCard';

export function FeaturedCarousel({ cars }: { cars: Car[] }) {
  if (cars.length === 0) return null;
  return (
    <section className="container-px py-16 sm:py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="eyebrow"><span className="h-px w-8 bg-gold-500" /> Hand-picked</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-950 sm:text-4xl">Featured vehicles</h2>
          <p className="mt-2 max-w-xl text-ink-500">A rotating selection of our most-requested cars, freshly inspected and ready to drive.</p>
        </div>
        <Link to="/inventory" className="hidden items-center gap-1 text-sm font-semibold text-gold-600 hover:text-gold-700 sm:inline-flex">
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1.1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: true }}
          className="!px-1 !pb-12"
        >
          {cars.map((car) => (
            <SwiperSlide key={car.id} className="!h-auto">
              <CarCard car={car} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link to="/inventory" className="btn-ghost">View all inventory</Link>
      </div>
    </section>
  );
}
