import React from 'react';
import { ArrowUp, Instagram, Facebook, MessageSquare, Shield, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { language, clinicContact, setActiveView } = useApp();
  const isArabic = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'hero', labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'about', labelEn: 'About Doctor', labelAr: 'عن الدكتور' },
    { id: 'services', labelEn: 'Services', labelAr: 'الخدمات السنية' },
    { id: 'cases', labelEn: 'Before & After', labelAr: 'حالات قبل وبعد' },
    { id: 'technology', labelEn: 'Digital Tech', labelAr: 'التكنولوجيا' },
    { id: 'reviews', labelEn: 'Reviews', labelAr: 'آراء المرضى' },
    { id: 'faq', labelEn: 'FAQ', labelAr: 'الأسئلة الشائعة' },
    { id: 'booking', labelEn: 'Book Appointment', labelAr: 'حجز موعد' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0B0B] text-white pt-24 pb-12 border-t border-[#171717] relative overflow-hidden select-none">
      {/* Massive Background Watermark */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16 overflow-hidden">
        <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#141414] leading-none select-none pointer-events-none whitespace-nowrap">
          DR. SAEED ELMAGHLANY
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1A1A1A]">
          {/* Col 1: Brand & Emergency (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-[#D71920] font-bold text-sm">
                SE
              </div>
              <div>
                <span className="block text-base font-bold text-white">
                  {isArabic ? 'د. سعيد المغلاني' : 'Dr. Saeed Elmaghlany'}
                </span>
                <span className="block text-[11px] tracking-[0.2em] uppercase text-[#A8A8A8]">
                  {isArabic ? 'طب وتجميل الأسنان' : 'DENTAL CARE'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A8A8A8] leading-relaxed max-w-sm">
              {isArabic
                ? 'عيادة تخصصية تقدم أعلى معايير طب وتجميل الأسنان بأحدث تقنيات التصميم الرقمي ثلاثي الأبعاد.'
                : 'Bespoke restorative dentistry, clinical precision, and patient-centered aesthetic excellence.'}
            </p>

            {/* Emergency Hotline */}
            <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D71920] block">
                  {isArabic ? 'طوارئ الأسنان' : 'DENTAL EMERGENCY'}
                </span>
                <span className="text-sm font-bold text-white">
                  {clinicContact.phone}
                </span>
              </div>
              <a
                href={`tel:${clinicContact.phone}`}
                className="w-8 h-8 rounded-full bg-[#D71920] flex items-center justify-center text-white"
                aria-label="Call emergency hotline"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A8A8A8] block">
              {isArabic ? 'روابط الوصول السريع' : 'INDEX'}
            </span>
            <ul className="space-y-2.5">
              {navLinks.slice(0, 5).map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-xs text-[#A8A8A8] hover:text-white transition-colors"
                  >
                    {isArabic ? l.labelAr : l.labelEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Treatments (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A8A8A8] block">
              {isArabic ? 'أبرز الإجراءات' : 'TREATMENTS'}
            </span>
            <ul className="space-y-2.5 text-xs text-[#A8A8A8]">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => scrollTo('services')}>
                {isArabic ? 'ابتسامة هوليود' : 'Hollywood Smile'}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => scrollTo('services')}>
                {isArabic ? 'الترميم وتجميل الأسنان' : 'Restorative Dentistry'}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => scrollTo('services')}>
                {isArabic ? 'فينير الأسنان' : 'Porcelain Veneers'}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => scrollTo('services')}>
                {isArabic ? 'تبييض الأسنان' : 'Laser Whitening'}
              </li>
            </ul>
          </div>

          {/* Col 4: Working hours & socials (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A8A8A8] block">
              {isArabic ? 'ساعات العمل' : 'HOURS'}
            </span>
            <p className="text-xs text-white font-mono leading-relaxed">
              {isArabic ? clinicContact.workingHoursAr : clinicContact.workingHoursEn}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={clinicContact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-white hover:border-[#D71920] hover:text-[#D71920] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={clinicContact.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-white hover:border-[#D71920] hover:text-[#D71920] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${clinicContact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-white hover:border-[#D71920] hover:text-[#D71920] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#525252]">
          <div>
            {isArabic
              ? 'جميع الحقوق محفوظة © 2026 د. سعيد المغلاني لطب وتجميل الأسنان.'
              : '© 2026 Dr. Saeed Elmaghlany. All clinical rights reserved.'}
          </div>

          <div className="flex items-center gap-6">
            {/* Subtle Admin Entrance */}
            <button
              onClick={() => setActiveView('admin')}
              className="flex items-center gap-1 text-[#525252] hover:text-[#A8A8A8] transition-colors text-[11px]"
              title={isArabic ? 'لوحة تحكم الطبيب' : 'Doctor Admin Portal'}
            >
              <Shield className="w-3.5 h-3.5 text-[#D71920]" />
              <span>{isArabic ? 'بوابة الإدارة' : 'Admin Portal'}</span>
            </button>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#A8A8A8] hover:text-white transition-colors"
            >
              <span>{isArabic ? 'للأعلى' : 'TOP'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
