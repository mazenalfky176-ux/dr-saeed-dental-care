import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { initialFeaturedTreatments } from '../data/initialData';

export const FeaturedTreatmentsSection: React.FC = () => {
  const { language, direction, openBookingWithTreatment, setCursorText } = useApp();
  const isArabic = language === 'ar';
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (directionOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === 'rtl' ? -directionOffset : directionOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-[#0B0B0B] text-white py-28 md:py-36 border-b border-[#171717] relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-[#D71920]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#171717]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold text-[#D71920]">04 // CLINICAL SHOWCASE</span>
              <div className="h-[1px] w-8 bg-[#262626]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white">
              {isArabic ? 'العلاجات' : 'FEATURED'}<br />
              <span className="text-[#F5F4F0] font-light">
                {isArabic ? 'المميزة' : 'TREATMENTS.'}
              </span>
            </h2>
          </div>

          {/* Navigation Arrows for scroll container */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => scroll(-400)}
              className="w-12 h-12 rounded-full border border-[#262626] bg-[#171717] hover:border-[#D71920] flex items-center justify-center text-white transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              onClick={() => scroll(400)}
              className="w-12 h-12 rounded-full border border-[#262626] bg-[#171717] hover:border-[#D71920] flex items-center justify-center text-white transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar px-6 sm:px-8 max-w-7xl mx-auto scroll-smooth pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {initialFeaturedTreatments.map((treatment, idx) => (
          <div
            key={treatment.id}
            onMouseEnter={() => setCursorText(isArabic ? 'احجز' : 'BOOK')}
            onMouseLeave={() => setCursorText('')}
            className="flex-none w-[300px] sm:w-[380px] md:w-[440px] group relative rounded-2xl overflow-hidden bg-[#121212] border border-[#262626] hover:border-[#D71920] transition-all duration-300 shadow-xl"
          >
            {/* Visual Panel */}
            <div className="h-80 sm:h-96 relative overflow-hidden bg-[#171717]">
              <img
                src={treatment.image}
                alt={treatment.titleEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/40 to-transparent" />

              {/* Number Badge */}
              <div className="absolute top-5 left-5 bg-[#0B0B0B]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-white border border-white/10">
                0{idx + 1}
              </div>
            </div>

            {/* Content Bottom */}
            <div className="p-6 bg-[#0B0B0B]">
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#D71920] transition-colors">
                {isArabic ? treatment.titleAr : treatment.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-[#A8A8A8] mb-6 font-light">
                {isArabic ? treatment.taglineAr : treatment.taglineEn}
              </p>

              <button
                onClick={() => openBookingWithTreatment(treatment.titleEn)}
                className="w-full py-3 bg-[#171717] group-hover:bg-[#D71920] text-white text-xs font-semibold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <span>{isArabic ? 'طلب استشارة' : 'CONSULT ON THIS'}</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
