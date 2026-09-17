import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const StatisticsSection: React.FC = () => {
  const { language, statistics } = useApp();
  const isArabic = language === 'ar';

  const statsList = [
    {
      value: statistics.patientsCount,
      labelEn: 'Happy Patients',
      labelAr: 'مريض سعيد',
      subEn: 'Custom smile designs',
      subAr: 'ابتسامات مصممة بعناية',
    },
    {
      value: statistics.yearsExperience,
      labelEn: 'Years Experience',
      labelAr: 'سنوات من الخبرة',
      subEn: 'Dedicated to precision',
      subAr: 'تفانٍ في الدقة والإتقان',
    },
    {
      value: statistics.casesCount,
      labelEn: 'Completed Cases',
      labelAr: 'حالة مكتملة بنجاح',
      subEn: 'Documented excellence',
      subAr: 'نتائج سريرية موثقة',
    },
    {
      value: statistics.servicesCount,
      labelEn: 'Specialized Services',
      labelAr: 'خدمة سنية متخصصة',
      subEn: 'All under one roof',
      subAr: 'رعاية شاملة تحت سقف واحد',
    },
  ];

  return (
    <section className="bg-[#0B0B0B] text-white py-24 md:py-32 border-b border-[#171717] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-2 border-l rtl:border-l-0 rtl:border-r border-[#262626] pl-6 rtl:pl-0 rtl:pr-6"
            >
              <div className="text-4xl sm:text-6xl md:text-7xl font-mono font-black text-white tracking-tighter flex items-baseline">
                <span>{item.value}</span>
                <span className="text-sm font-sans font-bold text-[#D71920] ml-1">*</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-[#F5F4F0] tracking-tight">
                {isArabic ? item.labelAr : item.labelEn}
              </div>
              <div className="text-xs text-[#A8A8A8] font-light">
                {isArabic ? item.subAr : item.subEn}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[#171717] text-right rtl:text-left text-[11px] font-mono text-[#525252]">
          * {isArabic ? 'أرقام نموذجية قابلة للتعديل والتوثيق من لوحة تحكم الطبيب' : 'Clinical demonstration placeholders editable via Admin portal'}
        </div>
      </div>
    </section>
  );
};
