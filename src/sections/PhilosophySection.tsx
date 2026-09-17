import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export const PhilosophySection: React.FC = () => {
  const { language, websiteContent } = useApp();
  const isArabic = language === 'ar';

  return (
    <section className="bg-[#F5F4F0] text-[#0B0B0B] py-28 md:py-36 border-b border-[#DDDAD4] relative overflow-hidden">
      {/* Editorial watermark typography */}
      <div className="absolute -top-10 -right-20 text-[180px] md:text-[280px] font-black text-black/[0.03] select-none pointer-events-none leading-none">
        ETHOS
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Section Number & Eyebrow */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#D71920]">01 // PHILOSOPHY</span>
              <div className="h-[1px] w-10 bg-[#DDDAD4]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-[#0B0B0B]">
              {isArabic ? (
                <>
                  طب أسنان<br />
                  <span className="text-[#D71920]">بتفاصيل</span> تصنع الفرق.
                </>
              ) : (
                <>
                  DENTISTRY<br />
                  WITH <span className="text-[#D71920]">PURPOSE.</span>
                </>
              )}
            </h2>
            <div className="w-16 h-[2px] bg-[#D71920] mt-4" />
          </div>

          {/* Editorial Paragraph with highlighted words */}
          <div className="lg:col-span-8 lg:pt-6 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl font-light leading-relaxed text-[#171717] tracking-tight"
            >
              {isArabic ? (
                <>
                  طب الأسنان المميز لا يقتصر على علاج الأسنان فقط، بل يبدأ بـ{' '}
                  <span className="font-semibold text-[#0B0B0B] underline decoration-[#D71920] decoration-2 underline-offset-8">
                    فهم المريض
                  </span>
                  ، والحفاظ على{' '}
                  <span className="font-semibold text-[#0B0B0B]">
                    الجمال الطبيعي
                  </span>
                  ، والوصول إلى نتيجة مصممة خصيصاً لكل{' '}
                  <span className="text-[#D71920] font-bold">ابتسامة</span>.
                </>
              ) : (
                <>
                  Great dentistry is not only about treating teeth. It is about{' '}
                  <span className="font-semibold text-[#0B0B0B] underline decoration-[#D71920] decoration-2 underline-offset-8">
                    understanding the patient
                  </span>
                  , preserving{' '}
                  <span className="font-semibold text-[#0B0B0B]">
                    natural beauty
                  </span>
                  , and creating results designed specifically for every{' '}
                  <span className="text-[#D71920] font-bold">smile</span>.
                </>
              )}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#DDDAD4]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#A8A8A8] block mb-1">
                  {isArabic ? 'المنهجية السريرية' : 'CLINICAL ETHOS'}
                </span>
                <span className="text-sm font-semibold text-[#0B0B0B]">
                  {isArabic ? 'الحفاظ البيولوجي على بنية السن' : 'Minimal Enamel Reduction'}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#A8A8A8] block mb-1">
                  {isArabic ? 'الدقة الهندسية' : 'PRECISION CRAFT'}
                </span>
                <span className="text-sm font-semibold text-[#0B0B0B]">
                  {isArabic ? 'محاكاة ثلاثية الأبعاد مسبقة' : 'Predictable 3D Simulation'}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#A8A8A8] block mb-1">
                  {isArabic ? 'الخامات المستخدمة' : 'MATERIALS'}
                </span>
                <span className="text-sm font-semibold text-[#0B0B0B]">
                  {isArabic ? 'خزف عالي النقاء وخالٍ من المعادن' : '100% Metal-Free Ceramics'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
