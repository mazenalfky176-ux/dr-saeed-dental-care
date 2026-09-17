import React from 'react';
import { useApp } from '../context/AppContext';

export const MarqueeSection: React.FC = () => {
  const { language } = useApp();
  const isArabic = language === 'ar';

  const itemsEn = ['PRECISION', 'CARE', 'CONFIDENCE', 'TECHNOLOGY', 'NATURAL RESULTS', 'BESPOKE AESTHETICS'];
  const itemsAr = ['دقة', 'عناية', 'ثقة', 'تكنولوجيا', 'نتائج طبيعية', 'تصميم متفرد'];

  const items = isArabic ? itemsAr : itemsEn;

  return (
    <div id="marquee" className="bg-[#121212] border-y border-[#1E1E1E] py-5 overflow-hidden select-none">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((word, index) => (
          <div key={index} className="flex items-center mx-6 sm:mx-8">
            <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#F5F4F0] hover:text-[#D71920] transition-colors">
              {word}
            </span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#D71920] ml-6 sm:ml-8" />
          </div>
        ))}
      </div>
    </div>
  );
};
