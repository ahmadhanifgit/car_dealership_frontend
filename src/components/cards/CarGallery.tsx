import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Car } from '@/types';

export function CarGallery({ images, alt }: { images: string[]; alt: string }) {
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);
  return (
    <div className="select-none">
      <div className="relative overflow-hidden rounded-2xl bg-ink-100">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          navigation={{ prevEl: '.gallery-prev', nextEl: '.gallery-next' }}
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : undefined }}
          loop
          className="!rounded-2xl"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="aspect-[16/10] w-full">
                <img src={src} alt={`${alt} — view ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="gallery-prev absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-soft hover:bg-white" aria-label="Previous">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="gallery-next absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-soft hover:bg-white" aria-label="Next">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-3">
        <Swiper
          modules={[Thumbs, FreeMode]}
          onSwiper={setThumbs}
          slidesPerView={4}
          spaceBetween={10}
          freeMode
          watchSlidesProgress
          className="!p-0.5"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i} className="!w-24 cursor-pointer overflow-hidden rounded-lg border-2 border-transparent bg-ink-100 transition-colors [&.swiper-slide-thumb-active]:border-gold-400">
              <div className="aspect-[4/3]"><img src={src} alt="" className="h-full w-full object-cover" loading="lazy" /></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
