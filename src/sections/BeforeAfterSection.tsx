import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sliders, Info, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CaseStudy } from '../types';

export const BeforeAfterSection: React.FC = () => {
  const { language, direction, caseStudies, setSelectedCase, setCursorText } = useApp();
  const isArabic = language === 'ar';

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase: CaseStudy = caseStudies[activeCaseIndex] || caseStudies[0];

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleSliderMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  return (
    <section id="cases" className="bg-[#FFFFFF] text-[#0B0B0B] py-28 md:py-36 border-b border-[#DDDAD4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#DDDAD4]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold text-[#D71920]">05 // CLINICAL RESULTS</span>
              <div className="h-[1px] w-8 bg-[#DDDAD4]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0B0B0B]">
              {isArabic ? 'حالات حقيقية.' : 'REAL CASES.'}<br />
              <span className="text-[#0B0B0B] font-light">
                {isArabic ? 'وابتسامات مختلفة.' : 'REAL SMILES.'}
              </span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs text-[#737373] bg-[#F5F4F0] px-3.5 py-2 rounded-lg border border-[#DDDAD4] max-w-md">
            <Info className="w-4 h-4 text-[#D71920] shrink-0" />
            <span>
              {isArabic
                ? 'حالات توضيحية تجريبية — يمكن لإدارة العيادة إضافة واستبدال الحالات الحقيقية للدكتور من لوحة التحكم.'
                : 'Demonstration clinical cases — Real patient transformations can be managed and uploaded via Admin.'}
            </span>
          </div>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-8 no-scrollbar">
          {caseStudies.map((caseItem, idx) => (
            <button
              key={caseItem.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                activeCaseIndex === idx
                  ? 'bg-[#0B0B0B] text-white shadow-md'
                  : 'bg-[#F5F4F0] text-[#737373] hover:text-[#0B0B0B] hover:bg-[#EAE8E2] border border-[#DDDAD4]'
              }`}
            >
              <span className="font-mono text-[#D71920]">{caseItem.caseNumber}</span>
              <span>{isArabic ? caseItem.titleAr : caseItem.titleEn}</span>
            </button>
          ))}
        </div>

        {/* Main Comparison Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Comparison Slider (Left 8 cols) */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => {
                setIsDragging(false);
                setCursorText('');
              }}
              onMouseEnter={() => setCursorText(isArabic ? 'اسحب للمقارنة' : 'DRAG')}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#DDDAD4] bg-[#0B0B0B] select-none cursor-ew-resize"
            >
              {/* After Image (Base) */}
              <img
                src={currentCase.afterImage}
                alt="After Transformation"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute top-4 right-4 bg-[#0B0B0B]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-white border border-white/10 z-10">
                {isArabic ? 'بعد النتيجة (AFTER)' : 'AFTER'}
              </div>

              {/* Before Image (Clipped Overlay) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentCase.beforeImage}
                  alt="Before Transformation"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
                />
                <div className="absolute top-4 left-4 bg-[#0B0B0B]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-white border border-white/10">
                  {isArabic ? 'قبل العلاج (BEFORE)' : 'BEFORE'}
                </div>
              </div>

              {/* Draggable Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-2xl flex items-center justify-center pointer-events-none z-20"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#D71920] border-2 border-white shadow-xl flex items-center justify-center text-white">
                  <Sliders className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#737373] mt-3 px-1 font-mono">
              <span>{isArabic ? '◄ اسحب المؤشر لعرض قبل / بعد' : '◄ DRAG SLIDER TO REVEAL BEFORE / AFTER'}</span>
              <span>{currentCase.durationEn}</span>
            </div>
          </div>

          {/* Case Detail Card (Right 4 cols) */}
          <div className="lg:col-span-4 bg-[#F5F4F0] p-6 sm:p-8 rounded-2xl border border-[#DDDAD4] space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#D71920] block mb-1">
                {currentCase.caseNumber}
              </span>
              <h3 className="text-2xl font-bold text-[#0B0B0B]">
                {isArabic ? currentCase.titleAr : currentCase.titleEn}
              </h3>
              <span className="text-sm font-semibold text-[#525252] block mt-1">
                {isArabic ? currentCase.treatmentAr : currentCase.treatmentEn}
              </span>
            </div>

            <p className="text-sm text-[#525252] leading-relaxed">
              {isArabic ? currentCase.overviewAr : currentCase.overviewEn}
            </p>

            <div className="bg-white p-4 rounded-xl border border-[#DDDAD4] text-xs text-[#737373] italic">
              <span className="font-bold text-[#0B0B0B] not-italic block mb-1">
                {isArabic ? 'ملاحظات الطبيب:' : "Doctor's Clinical Notes:"}
              </span>
              {isArabic ? currentCase.doctorNotesAr : currentCase.doctorNotesEn}
            </div>

            <button
              onClick={() => setSelectedCase(currentCase)}
              className="w-full py-3.5 bg-[#0B0B0B] hover:bg-[#1f1f1f] text-white text-xs font-semibold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-colors shadow-md active:scale-95"
            >
              <Eye className="w-4 h-4 text-[#D71920]" />
              <span>{isArabic ? 'عرض تفاصيل الحالة بالكامل' : 'VIEW FULL CASE STUDY'}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
