import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServiceDetailModal: React.FC = () => {
  const { selectedService, setSelectedService, language, direction, openBookingWithTreatment } = useApp();
  const isArabic = language === 'ar';

  if (!selectedService) return null;

  const handleBook = () => {
    const treatmentName = isArabic ? selectedService.nameAr : selectedService.nameEn;
    setSelectedService(null);
    openBookingWithTreatment(treatmentName);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedService(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#FFFFFF] text-[#0B0B0B] rounded-3xl overflow-hidden shadow-2xl border border-[#DDDAD4] z-10 flex flex-col max-h-[90vh]"
        >
          {/* Top Bar */}
          <div className="p-6 sm:p-8 bg-[#F5F4F0] border-b border-[#DDDAD4] flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#D71920]">
                  SERVICE {selectedService.number}
                </span>
                <span className="text-xs text-[#737373]">// CLINICAL PROTOCOL</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0B0B0B]">
                {isArabic ? selectedService.nameAr : selectedService.nameEn}
              </h3>
              <span className="text-xs text-[#737373] font-mono">
                {isArabic ? selectedService.nameEn : selectedService.nameAr}
              </span>
            </div>

            <button
              onClick={() => setSelectedService(null)}
              className="w-9 h-9 rounded-full bg-white border border-[#DDDAD4] flex items-center justify-center text-[#0B0B0B] hover:text-[#D71920] hover:border-[#D71920] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#737373] mb-2">
                {isArabic ? 'نظرة عامة على الإجراء' : 'CLINICAL OVERVIEW'}
              </h4>
              <p className="text-base text-[#525252] leading-relaxed">
                {isArabic ? selectedService.fullDescAr : selectedService.fullDescEn}
              </p>
            </div>

            {/* Key Benefits */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#737373] mb-3">
                {isArabic ? 'المزايا والنتائج المتوقعة' : 'KEY CLINICAL ADVANTAGES'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(isArabic ? selectedService.benefitsAr : selectedService.benefitsEn).map((benefit, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#F5F4F0] border border-[#DDDAD4] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D71920] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-[#0B0B0B]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment Timeline & Sessions */}
            <div className="p-4 rounded-xl bg-[#0B0B0B] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#D71920]" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8A8A8] block">
                    {isArabic ? 'مدة العلاج المتوقعة' : 'ESTIMATED TIMELINE'}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {isArabic ? selectedService.sessionsAr : selectedService.sessionsEn}
                  </span>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-[#D71920] hidden sm:block" />
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="p-6 bg-[#F5F4F0] border-t border-[#DDDAD4] flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="text-xs font-semibold text-[#737373] hover:text-[#0B0B0B] transition-colors"
            >
              {isArabic ? 'إغلاق' : 'Close'}
            </button>

            <button
              type="button"
              onClick={handleBook}
              className="px-6 py-3 bg-[#D71920] hover:bg-[#b5141a] text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span>{isArabic ? 'حجز هذا الإجراء الآن' : 'BOOK THIS TREATMENT'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
