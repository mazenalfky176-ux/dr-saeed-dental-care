import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { initialJourneySteps } from '../data/initialData';

export const PatientJourneySection: React.FC = () => {
  const { language } = useApp();
  const isArabic = language === 'ar';
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-[#F5F4F0] text-[#0B0B0B] py-28 md:py-36 border-b border-[#DDDAD4] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#DDDAD4]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold text-[#D71920]">07 // STEP BY STEP</span>
              <div className="h-[1px] w-8 bg-[#DDDAD4]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0B0B0B]">
              {isArabic ? 'رحلتك' : 'YOUR'}<br />
              <span className="text-[#0B0B0B] font-light">
                {isArabic ? 'معنا.' : 'JOURNEY.'}
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm md:text-base text-[#737373] max-w-sm">
            {isArabic
              ? 'تجربة علاجية مريحة وشفافة تم التخطيط لكل تفاصيلها لراحتك وثقتك.'
              : 'A seamless, structured pathway prioritizing your comfort and exceptional aesthetic outcomes.'}
          </p>
        </div>

        {/* Interactive Step Timeline */}
        <div className="relative">
          {/* Connecting Line (Horizontal on desktop) */}
          <div className="hidden lg:block absolute top-7 left-8 right-8 h-[2px] bg-[#DDDAD4]">
            <motion.div
              className="h-full bg-[#D71920]"
              animate={{ width: `${(activeStep / (initialJourneySteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {initialJourneySteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              const isPast = activeStep >= idx;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#D71920] shadow-xl ring-1 ring-[#D71920]'
                      : 'bg-white/60 border-[#DDDAD4] hover:bg-white hover:border-[#A8A8A8]'
                  }`}
                >
                  <div>
                    {/* Step Circle & Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                          isSelected
                            ? 'bg-[#D71920] text-white shadow-md'
                            : isPast
                            ? 'bg-[#0B0B0B] text-white'
                            : 'bg-[#EAE8E2] text-[#737373]'
                        }`}
                      >
                        {step.number}
                      </div>

                      <span className="text-[11px] font-mono text-[#737373]">
                        {isArabic ? step.durationAr : step.durationEn}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0B0B0B] mb-2">
                      {isArabic ? step.titleAr : step.titleEn}
                    </h3>
                    <p className="text-xs text-[#525252] leading-relaxed">
                      {isArabic ? step.descAr : step.descEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F5F4F0] flex items-center justify-between text-[11px] font-semibold text-[#D71920]">
                    <span>{isSelected ? (isArabic ? 'المرحلة النشطة' : 'Active Stage') : (isArabic ? 'اضغط للعرض' : 'Click to view')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
