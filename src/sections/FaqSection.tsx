import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FaqSection: React.FC = () => {
  const { language, faqs } = useApp();
  const isArabic = language === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#F5F4F0] text-[#0B0B0B] py-28 md:py-36 border-b border-[#DDDAD4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Title & Prompt */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-bold text-[#D71920]">09 // CLARITY & ANSWERS</span>
                <div className="h-[1px] w-8 bg-[#DDDAD4]" />
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0B0B0B]">
                {isArabic ? 'الأسئلة' : 'FREQUENT'}<br />
                <span className="text-[#0B0B0B] font-light">
                  {isArabic ? 'الشائعة.' : 'QUESTIONS.'}
                </span>
              </h2>
            </div>

            <p className="text-sm text-[#737373] leading-relaxed">
              {isArabic
                ? 'إجابات مباشرة وشفافة حول أهم التساؤلات المتعلقة بإجراءات الأسنان التجميلية والعلاجية.'
                : 'Direct, candid insights into modern protocols, procedural timelines, and biological care.'}
            </p>

            <div className="p-5 rounded-2xl bg-white border border-[#DDDAD4] space-y-2">
              <span className="text-xs font-bold text-[#0B0B0B] block">
                {isArabic ? 'لديك سؤال خاص بحالتك؟' : 'Have a clinical question?'}
              </span>
              <p className="text-xs text-[#737373]">
                {isArabic
                  ? 'يسعدنا الرد على استفسارك مباشرة عبر الواتساب في أي وقت.'
                  : 'Connect directly with our clinical care team on WhatsApp.'}
              </p>
              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noreferrer"
                className="inline-block pt-1 text-xs font-bold text-[#D71920] hover:underline"
              >
                {isArabic ? 'تواصل عبر الواتساب ◄' : 'Chat on WhatsApp ◄'}
              </a>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                    isOpen ? 'bg-white border-[#D71920] shadow-sm' : 'bg-white/80 border-[#DDDAD4] hover:bg-white'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left rtl:text-right p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-[#0B0B0B]">
                      {isArabic ? faq.questionAr : faq.questionEn}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-[#D71920] text-white' : 'bg-[#F5F4F0] text-[#0B0B0B]'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 border-t border-[#F5F4F0] text-sm text-[#525252] leading-relaxed">
                          {isArabic ? faq.answerAr : faq.answerEn}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
