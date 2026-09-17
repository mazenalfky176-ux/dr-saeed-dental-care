import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ScanFace, Cpu, Camera, Compass, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { initialTechnology } from '../data/initialData';

export const TechnologySection: React.FC = () => {
  const { language, setCursorText } = useApp();
  const [selectedTech, setSelectedTech] = useState(initialTechnology[0]);
  const isArabic = language === 'ar';

  const getIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6' };
    switch (iconName) {
      case 'ScanFace': return <ScanFace {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Camera': return <Camera {...props} />;
      case 'Compass': return <Compass {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  return (
    <section id="technology" className="bg-[#121212] text-white py-28 md:py-36 border-b border-[#1E1E1E] relative overflow-hidden">
      {/* Subtle architectural background lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#262626]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold text-[#D71920]">06 // ADVANCED PROTOCOLS</span>
              <div className="h-[1px] w-8 bg-[#262626]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white">
              {isArabic ? 'الدقة' : 'PRECISION'}<br />
              <span className="text-white font-light">
                {isArabic ? 'تلتقي بالتكنولوجيا.' : 'MEETS TECHNOLOGY.'}
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm md:text-base text-[#A8A8A8] max-w-sm">
            {isArabic
              ? 'أحدث التجهيزات الرقمية العالمية لضمان أعلى مستويات الأمان والدقة والراحة لكل مريض.'
              : 'Sub-millimeter predictability powered by 3D computational diagnostics and micro-surgical standards.'}
          </p>
        </div>

        {/* Technology Interactive List & Visual Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tech list (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {initialTechnology.map((tech) => {
              const isActive = selectedTech.id === tech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  onMouseEnter={() => setCursorText(isArabic ? 'عرض' : 'SELECT')}
                  onMouseLeave={() => setCursorText('')}
                  className={`w-full text-left rtl:text-right p-5 rounded-xl border transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#1C1C1C] border-[#D71920] shadow-lg'
                      : 'bg-[#171717] border-[#262626] hover:border-[#A8A8A8] hover:bg-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#D71920] text-white' : 'bg-[#262626] text-[#A8A8A8] group-hover:text-white'
                      }`}
                    >
                      {getIcon(tech.icon)}
                    </div>
                    <div>
                      <span className="text-base font-bold block text-white">
                        {isArabic ? tech.nameAr : tech.nameEn}
                      </span>
                      <span className="text-xs text-[#A8A8A8] block">
                        {isArabic ? tech.nameEn : tech.nameAr}
                      </span>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'text-[#D71920]' : 'text-[#525252]'}`}>
                    <ChevronRight className={`w-4 h-4 rtl:rotate-180 ${isActive ? 'translate-x-1 rtl:-translate-x-1' : ''} transition-transform`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tech Spotlight (Right 7 cols) */}
          <div className="lg:col-span-7 bg-[#171717] border border-[#262626] rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Top red laser accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D71920] to-transparent" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#262626] border border-white/10 flex items-center justify-center text-[#D71920]">
                  {getIcon(selectedTech.icon)}
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D71920] bg-[#0B0B0B] px-3.5 py-1.5 rounded-full border border-white/10">
                  CLINICAL PROTOCOL
                </span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {isArabic ? selectedTech.nameAr : selectedTech.nameEn}
                </h3>
                <span className="text-sm font-mono text-[#A8A8A8] block">
                  {isArabic ? selectedTech.nameEn : selectedTech.nameAr}
                </span>
              </div>

              <p className="text-base sm:text-lg text-[#D4D4D4] leading-relaxed font-light">
                {isArabic ? selectedTech.descAr : selectedTech.descEn}
              </p>
            </div>

            {/* Feature Callout Box */}
            <div className="mt-8 pt-6 border-t border-[#262626]">
              <div className="bg-[#0B0B0B] p-5 rounded-xl border border-white/10 flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#D71920] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase font-mono text-[#A8A8A8] block">
                    {isArabic ? 'الميزة التنافسية للتقنية' : 'BENCHMARK ADVANTAGE'}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {isArabic ? selectedTech.featureAr : selectedTech.featureEn}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
