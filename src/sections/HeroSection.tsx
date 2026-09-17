import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDown, Sparkles, ChevronDown, Camera, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { language, direction, doctorProfile, updateDoctorProfile, websiteContent, openBookingWithTreatment, setCursorText } = useApp();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [justUploaded, setJustUploaded] = useState(false);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  const isArabic = language === 'ar';

  const handleHeroPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateDoctorProfile({ ...doctorProfile, photoUrl: result });
          setJustUploaded(true);
          setTimeout(() => setJustUploaded(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDiscover = () => {
    document.getElementById('marquee')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#0B0B0B] text-[#F5F4F0] flex flex-col justify-between pt-28 md:pt-32 pb-12 overflow-hidden select-none"
    >
      {/* Background architectural ambient glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D71920]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#FFFFFF]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Decorative vertical grid line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#171717] pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Editorial Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#D71920]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#A8A8A8] font-mono">
            {isArabic ? 'د. سعيد المغلاني • طب وتجميل الأسنان' : 'DR. SAEED ELMAGHLANY • DENTAL CARE'}
          </span>
          <div className="h-[1px] w-12 bg-[#262626] hidden sm:block" />
        </motion.div>

        {/* Main Grid: Headline & Doctor Portrait Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (or Right in RTL): Oversized Typography & CTAs */}
          <div className="lg:col-span-7 z-10 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] text-white">
                {isArabic ? (
                  <>
                    <span>ابتسامتك...</span>
                    <br />
                    <span className="text-[#F5F4F0] font-light">بشكل يليق بك</span>
                  </>
                ) : (
                  <>
                    <span>YOUR SMILE.</span>
                    <br />
                    <span className="text-[#F5F4F0] font-light">REIMAGINED.</span>
                  </>
                )}
              </h1>
            </motion.div>

            {/* Thin animated red accent rule */}
            <div className="w-24 h-[2px] bg-[#D71920]" />

            {/* Secondary Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-[#A8A8A8] max-w-xl font-light leading-relaxed"
            >
              {isArabic ? websiteContent.heroSubtitleAr : websiteContent.heroSubtitleEn}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => openBookingWithTreatment('General Consultation')}
                className="group px-7 py-3.5 bg-[#D71920] hover:bg-[#b5141a] text-white text-sm font-semibold rounded-full flex items-center gap-2.5 transition-all duration-300 shadow-xl shadow-red-950/40 hover:shadow-red-900/60 active:scale-95"
              >
                <span>{isArabic ? 'احجز موعدك' : 'BOOK APPOINTMENT'}</span>
                <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
              </button>

              <button
                onClick={scrollToServices}
                className="px-7 py-3.5 bg-[#171717] hover:bg-[#262626] border border-[#262626] hover:border-[#A8A8A8] text-[#F5F4F0] text-sm font-medium rounded-full transition-colors duration-200"
              >
                {isArabic ? 'اكتشف خدماتنا' : 'EXPLORE TREATMENTS'}
              </button>
            </motion.div>

            {/* Quick credentials teaser */}
            <div className="pt-4 flex items-center gap-6 text-xs text-[#A8A8A8] font-mono border-t border-[#171717]">
              <div>
                <span className="text-white font-bold block text-sm">3D CAD/CAM</span>
                <span>{isArabic ? 'تقنيات رقمية فائقة' : 'Guided Precision'}</span>
              </div>
              <div className="w-[1px] h-6 bg-[#262626]" />
              <div>
                <span className="text-white font-bold block text-sm">100% Biocompatible</span>
                <span>{isArabic ? 'خامات أوروبية معتمدة' : 'Natural Enamel'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Doctor Portrait integrated elegantly into the composition */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)`,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="relative w-full max-w-md lg:max-w-none"
              onMouseEnter={() => setCursorText(isArabic ? 'د. سعيد' : 'DR. SAEED')}
              onMouseLeave={() => setCursorText('')}
            >
              {/* Subtle back decorative frame - non-rectangular organic overlap */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#D71920]/20 via-transparent to-white/5 rounded-3xl -z-10 blur-xl opacity-60" />

              {/* Portrait Container with editorial mask */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#262626] bg-[#121212] shadow-2xl group">
                <motion.img
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  src={doctorProfile.photoUrl}
                  alt={doctorProfile.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[580px] filter contrast-[1.02] brightness-95"
                />

                {/* Instant Change Photo Button right on the image */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      heroFileInputRef.current?.click();
                    }}
                    title={isArabic ? 'تغيير صورة الدكتور (رفع صورتك الحقيقية من جهازك)' : 'Change doctor photo (Upload real photo from device)'}
                    className="px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/20 hover:border-[#D71920] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xl active:scale-95"
                  >
                    {justUploaded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{isArabic ? 'تم تحديث الصورة!' : 'Updated!'}</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-3.5 h-3.5 text-[#D71920]" />
                        <span>{isArabic ? 'تغيير صورة الدكتور' : 'Upload Real Photo'}</span>
                      </>
                    )}
                  </button>
                  <input
                    ref={heroFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleHeroPhotoUpload}
                  />
                </div>

                {/* Ambient dark gradient overlay to anchor typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-75 pointer-events-none" />

                {/* Corner signature tag */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0B0B0B]/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#D71920] font-semibold block">
                      {isArabic ? 'العيادة التخصصية' : 'CLINICAL DIRECTOR'}
                    </span>
                    <span className="text-sm font-bold text-white block">
                      {isArabic ? doctorProfile.nameAr : doctorProfile.nameEn}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#171717] flex items-center justify-center text-[#D71920] border border-white/10">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Red accent floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 bg-[#0B0B0B] border border-[#262626] text-white px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider shadow-xl hidden sm:flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#D71920]" />
                <span>E.max & Guided 3D</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll to discover indicator */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-8 flex items-center justify-between border-t border-[#171717]/60">
        <button
          onClick={scrollToDiscover}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#A8A8A8] hover:text-white transition-colors group"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-7 h-7 rounded-full border border-[#262626] flex items-center justify-center group-hover:border-[#D71920]"
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#D71920]" />
          </motion.div>
          <span>{isArabic ? 'مرر للاستكشاف' : 'SCROLL TO DISCOVER'}</span>
        </button>

        <div className="text-xs text-[#A8A8A8] font-mono hidden md:block">
          CAIRO / ALEXANDRIA • CLINICAL EXCELLENCE
        </div>
      </div>
    </section>
  );
};
