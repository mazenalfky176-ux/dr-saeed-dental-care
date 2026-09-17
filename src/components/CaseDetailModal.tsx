import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowRight, Sparkles, Layers, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CaseDetailModal: React.FC = () => {
  const { selectedCase, setSelectedCase, language, direction, openBookingWithTreatment } = useApp();
  const isArabic = language === 'ar';

  if (!selectedCase) return null;

  const handleBook = () => {
    const treatment = isArabic ? selectedCase.treatmentAr : selectedCase.treatmentEn;
    setSelectedCase(null);
    openBookingWithTreatment(treatment);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCase(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-[#FFFFFF] text-[#0B0B0B] rounded-3xl overflow-hidden shadow-2xl border border-[#DDDAD4] z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-[#0B0B0B] text-white border-b border-[#1F1F1F] flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#D71920]">
                  {selectedCase.caseNumber}
                </span>
                <span className="text-xs text-[#A8A8A8]">// CLINICAL DOCUMENTATION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {isArabic ? selectedCase.titleAr : selectedCase.titleEn}
              </h3>
              <span className="text-xs text-[#D71920] font-mono">
                {isArabic ? selectedCase.treatmentAr : selectedCase.treatmentEn}
              </span>
            </div>

            <button
              onClick={() => setSelectedCase(null)}
              className="w-9 h-9 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-white hover:border-[#D71920] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Side by Side Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-[#DDDAD4] bg-[#F5F4F0] relative">
                <img
                  src={selectedCase.beforeImage}
                  alt="Before"
                  referrerPolicy="no-referrer"
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded-md text-[11px] font-mono text-white">
                  {isArabic ? 'قبل العلاج' : 'BEFORE'}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#D71920] bg-[#F5F4F0] relative">
                <img
                  src={selectedCase.afterImage}
                  alt="After"
                  referrerPolicy="no-referrer"
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#D71920] px-2.5 py-1 rounded-md text-[11px] font-mono text-white font-bold">
                  {isArabic ? 'النتيجة النهائية' : 'AFTER'}
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#737373]">
                {isArabic ? 'وصف الحالة والخطة العلاجية' : 'CLINICAL OVERVIEW'}
              </h4>
              <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
                {isArabic ? selectedCase.overviewAr : selectedCase.overviewEn}
              </p>
            </div>

            {/* Treatment Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F5F4F0] border border-[#DDDAD4] space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#737373] uppercase">
                  <Layers className="w-3.5 h-3.5 text-[#D71920]" />
                  <span>{isArabic ? 'الخامات المستخدمة' : 'MATERIALS'}</span>
                </div>
                <span className="text-sm font-semibold text-[#0B0B0B] block">
                  {isArabic ? selectedCase.materialsAr : selectedCase.materialsEn}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F4F0] border border-[#DDDAD4] space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#737373] uppercase">
                  <Clock className="w-3.5 h-3.5 text-[#D71920]" />
                  <span>{isArabic ? 'المدة الزمنية الإجمالية' : 'TREATMENT DURATION'}</span>
                </div>
                <span className="text-sm font-semibold text-[#0B0B0B] block">
                  {isArabic ? selectedCase.durationAr : selectedCase.durationEn}
                </span>
              </div>
            </div>

            {/* Doctor Notes Callout */}
            <div className="p-5 rounded-2xl bg-[#F5F4F0] border border-[#DDDAD4] space-y-1.5">
              <span className="text-xs font-bold text-[#0B0B0B] block">
                {isArabic ? 'رأي د. سعيد المغلاني السريري:' : "Doctor's Assessment:"}
              </span>
              <p className="text-xs sm:text-sm text-[#525252] italic leading-relaxed">
                "{isArabic ? selectedCase.doctorNotesAr : selectedCase.doctorNotesEn}"
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-[#F5F4F0] border-t border-[#DDDAD4] flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setSelectedCase(null)}
              className="text-xs font-semibold text-[#737373] hover:text-[#0B0B0B]"
            >
              {isArabic ? 'إغلاق' : 'Close'}
            </button>

            <button
              type="button"
              onClick={handleBook}
              className="px-6 py-3 bg-[#D71920] hover:bg-[#b5141a] text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center gap-2 shadow-md active:scale-95"
            >
              <span>{isArabic ? 'طلب استشارة لحالة مماثلة' : 'CONSULT ON SIMILAR CASE'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
