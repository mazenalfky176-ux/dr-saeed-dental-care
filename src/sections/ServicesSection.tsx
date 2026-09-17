import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Shield, Activity, Sun, Layers, Hammer, Maximize2, Smile, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceItem } from '../types';

export const ServicesSection: React.FC = () => {
  const { language, direction, services, setSelectedService, setCursorText } = useApp();
  const isArabic = language === 'ar';

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5' };
    switch (iconName) {
      case 'Hammer': return <Hammer {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Maximize2': return <Maximize2 {...props} />;
      case 'Smile': return <Smile {...props} />;
      default: return <CheckCircle2 {...props} />;
    }
  };

  return (
    <section id="services" className="bg-[#F5F4F0] text-[#0B0B0B] py-28 md:py-36 border-b border-[#DDDAD4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#DDDAD4]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold text-[#D71920]">03 // COMPREHENSIVE EXPERTISE</span>
              <div className="h-[1px] w-8 bg-[#DDDAD4]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0B0B0B]">
              {isArabic ? 'خدمات' : 'DENTAL'}<br />
              <span className="text-[#0B0B0B] font-light">
                {isArabic ? 'الأسنان المتطورة' : 'SERVICES.'}
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm md:text-base text-[#737373] max-w-sm">
            {isArabic
              ? 'خدمات مصممة بعناية لتناسب احتياجات كل مريض بأحدث التقنيات وأفضل الخامات.'
              : 'Treatment designed around you with microscopic accuracy and biocompatible elegance.'}
          </p>
        </div>

        {/* 9 Interactive Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              onMouseEnter={() => setCursorText(isArabic ? 'استكشف' : 'EXPLORE')}
              onMouseLeave={() => setCursorText('')}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer bg-white rounded-2xl p-7 border border-[#DDDAD4] hover:border-[#D71920] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent line reveal on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D71920] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rtl:origin-right" />

              <div>
                {/* Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-[#A8A8A8] group-hover:text-[#D71920] transition-colors">
                    {service.number}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#F5F4F0] text-[#0B0B0B] group-hover:bg-[#D71920] group-hover:text-white transition-colors flex items-center justify-center">
                    {renderIcon(service.icon)}
                  </div>
                </div>

                {/* Title (English & Arabic) */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B0B0B] mb-1 group-hover:text-[#D71920] transition-colors">
                  {isArabic ? service.nameAr : service.nameEn}
                </h3>
                <span className="text-xs text-[#A8A8A8] font-medium block mb-4">
                  {isArabic ? service.nameEn : service.nameAr}
                </span>

                {/* Description */}
                <p className="text-sm text-[#525252] line-clamp-3 leading-relaxed">
                  {isArabic ? service.shortDescAr : service.shortDescEn}
                </p>
              </div>

              {/* Bottom Arrow & Details Prompt */}
              <div className="pt-6 mt-6 border-t border-[#F5F4F0] flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0B0B] group-hover:text-[#D71920] transition-colors">
                  {isArabic ? 'تفاصيل الإجراء' : 'EXPLORE PROCEDURE'}
                </span>
                <div className="w-8 h-8 rounded-full border border-[#DDDAD4] flex items-center justify-center group-hover:border-[#D71920] group-hover:bg-[#D71920] group-hover:text-white transition-all">
                  <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
