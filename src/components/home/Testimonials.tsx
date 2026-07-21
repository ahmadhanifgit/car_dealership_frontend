import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { TESTIMONIALS } from '@/constants';

export function Testimonials() {
  return (
    <section className="bg-ink-50 py-16 sm:py-20">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center"><span className="h-px w-8 bg-gold-500" /> What owners say</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-950 sm:text-4xl">Trusted by 2,400+ drivers</h2>
          <p className="mt-2 text-ink-500">Real reviews from real buyers — no paid placements, no incentives.</p>
        </div>
        <div className="mt-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            className="!px-1 !pb-12"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id} className="!h-auto">
                <figure className="card flex h-full flex-col p-6">
                  <Quote className="h-7 w-7 text-gold-400" />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">"{t.text}"</blockquote>
                  <div className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
                    <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                    <div className="flex-1">
                      <figcaption className="text-sm font-semibold text-ink-900">{t.name}</figcaption>
                      <p className="text-xs text-ink-400">{t.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={i < t.rating ? 'h-3.5 w-3.5 fill-gold-400 text-gold-400' : 'h-3.5 w-3.5 text-ink-200'} />
                      ))}
                    </div>
                  </div>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
