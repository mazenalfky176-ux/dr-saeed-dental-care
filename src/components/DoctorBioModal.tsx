import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, GraduationCap, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DoctorBioModal: React.FC = () => {
  const { isBioOpen, setIsBioOpen, doctorProfile, language, openBookingWithTreatment } = useApp();
  const isArabic = language === 'ar';

  if (!isBioOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsBioOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#FFFFFF] text-[#0B0B0B] rounded-3xl overflow-hidden shadow-2xl border border-[#DDDAD4] z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 bg-[#0B0B0B] text-white border-b border-[#1F1F1F] flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                src={doctorProfile.photoUrl}
                alt={doctorProfile.nameEn}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#D71920]"
              />
              <div>
                <span className="text-xs font-mono text-[#D71920] uppercase tracking-widest block">
                  {isArabic ? 'السيرة السريرية' : 'CLINICAL PROFILE'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {isArabic ? doctorProfile.nameAr : doctorProfile.nameEn}
                </h3>
                <span className="text-xs text-[#A8A8A8]">
                  {isArabic ? doctorProfile.titleAr : doctorProfile.titleEn}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsBioOpen(false)}
              className="w-9 h-9 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-white hover:border-[#D71920] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#737373] mb-2">
                {isArabic ? 'الرؤية والنهج المهني' : 'PRACTICE ETHOS & PHILOSOPHY'}
              </h4>
              <p className="text-base text-[#525252] leading-relaxed">
                {isArabic ? doctorProfile.bioAr : doctorProfile.bioEn}
              </p>
            </div>

            {/* Academic Credentials Placeholders */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#737373] mb-3">
                {isArabic ? 'المؤهلات والاعتمادات الرسمية' : 'ACCREDITATIONS & BACKGROUND'}
              </h4>
              <div className="space-y-2.5">
                <div className="p-4 rounded-xl bg-[#F5F4F0] border border-[#DDDAD4] flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-[#D71920] shrink-0" />
                  <div>
                    <span className="text-xs text-[#737373] block">{isArabic ? 'الدرجة والجامعة' : 'Degree & University'}</span>
                    <span className="text-sm font-semibold text-[#0B0B0B]">
                      {isArabic ? `${doctorProfile.degreeAr} - ${doctorProfile.universityAr}` : `${doctorProfile.degreeEn} - ${doctorProfile.universityEn}`}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F5F4F0] border border-[#DDDAD4] flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#D71920] shrink-0" />
                  <div>
                    <span className="text-xs text-[#737373] block">{isArabic ? 'الشهادات المعتمدة' : 'Accreditations'}</span>
                    <span className="text-sm font-semibold text-[#0B0B0B]">
                      {isArabic ? doctorProfile.certificationsAr : doctorProfile.certificationsEn}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F5F4F0] border border-[#DDDAD4] flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#D71920] shrink-0" />
                  <div>
                    <span className="text-xs text-[#737373] block">{isArabic ? 'الخبرة السريرية' : 'Clinical Experience'}</span>
                    <span className="text-sm font-semibold text-[#0B0B0B]">
                      {isArabic ? doctorProfile.experienceAr : doctorProfile.experienceEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-[#F5F4F0] border-t border-[#DDDAD4] flex items-center justify-between">
            <button
              onClick={() => setIsBioOpen(false)}
              className="text-xs font-semibold text-[#737373] hover:text-[#0B0B0B]"
            >
              {isArabic ? 'إغلاق' : 'Close'}
            </button>

            <button
              onClick={() => {
                setIsBioOpen(false);
                openBookingWithTreatment('Consultation with Dr. Saeed');
              }}
              className="px-6 py-3 bg-[#D71920] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md"
            >
              {isArabic ? 'حجز موعد استشارة شخصية' : 'BOOK DIRECT CONSULTATION'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
