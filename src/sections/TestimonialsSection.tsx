import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TestimonialsSection: React.FC = () => {
  const { language, testimonials, direction } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isArabic = language === 'ar';

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section id="reviews" className="bg-[#FFFFFF] text-[#0B0B0B] py-28 md:py-36 border-b border-[#DDDAD4] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#DDDAD4]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold text-[#D71920]">08 // PATIENT EXPERIENCES</span>
              <div className="h-[1px] w-8 bg-[#DDDAD4]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0B0B0B]">
              {isArabic ? 'آراء' : 'WHAT OUR'}<br />
              <span className="text-[#0B0B0B] font-light">
                {isArabic ? 'مرضانا.' : 'PATIENTS SAY.'}
              </span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs text-[#737373] bg-[#F5F4F0] px-3.5 py-2 rounded-lg border border-[#DDDAD4]">
            <Info className="w-4 h-4 text-[#D71920] shrink-0" />
            <span>
              {isArabic
                ? 'نماذج استرشادية لآراء المرضى قابلة للإدارة والإضافة من لوحة التحكم.'
                : 'Demonstration patient feedback. Real verified reviews are manageable in Admin.'}
            </span>
          </div>
        </div>

        {/* Testimonial Stage */}
        <div className="bg-[#F5F4F0] rounded-3xl p-8 sm:p-14 border border-[#DDDAD4] relative overflow-hidden">
          <div className="absolute top-6 right-8 text-[#DDDAD4] opacity-40">
            <Quote className="w-24 h-24" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 max-w-3xl space-y-6"
            >
              {/* 5 Stars */}
              <div className="flex items-center gap-1 text-[#D71920]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Review Quote */}
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-[#0B0B0B] leading-relaxed italic">
                "{isArabic ? current.reviewAr : current.reviewEn}"
              </p>

              {/* Patient Info */}
              <div className="pt-4 flex items-center justify-between border-t border-[#DDDAD4]">
                <div>
                  <h4 className="text-lg font-bold text-[#0B0B0B]">
                    {isArabic ? current.patientNameAr : current.patientNameEn}
                  </h4>
                  <span className="text-xs text-[#737373] font-medium">
                    {isArabic ? current.treatmentAr : current.treatmentEn}
                  </span>
                </div>

                {current.isDemo && (
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] bg-white px-2.5 py-1 rounded-full border border-[#DDDAD4]">
                    DEMO REVIEW
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="mt-8 pt-6 flex items-center justify-between border-t border-[#DDDAD4]/80">
            <div className="text-xs font-mono text-[#737373]">
              0{currentIndex + 1} / 0{testimonials.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-full bg-white border border-[#DDDAD4] hover:border-[#D71920] flex items-center justify-center text-[#0B0B0B] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-full bg-white border border-[#DDDAD4] hover:border-[#D71920] flex items-center justify-center text-[#0B0B0B] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
