import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Shield, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { language, setLanguage, direction, openBookingWithTreatment, activeView, setActiveView } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const isArabic = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple spy
      const sections = ['hero', 'about', 'services', 'cases', 'technology', 'reviews', 'faq', 'contact'];
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'about', labelEn: 'About', labelAr: 'عن الدكتور' },
    { id: 'services', labelEn: 'Services', labelAr: 'الخدمات' },
    { id: 'cases', labelEn: 'Cases', labelAr: 'الحالات' },
    { id: 'technology', labelEn: 'Technology', labelAr: 'التكنولوجيا' },
    { id: 'reviews', labelEn: 'Reviews', labelAr: 'آراء المرضى' },
    { id: 'faq', labelEn: 'FAQ', labelAr: 'الأسئلة الشائعة' },
    { id: 'contact', labelEn: 'Contact', labelAr: 'تواصل معنا' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#0B0B0B]/85 backdrop-blur-md border-b border-[#171717]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-[#D71920] font-bold text-sm tracking-widest group-hover:border-[#D71920] transition-colors">
              SE
            </div>
            <div>
              <span className="block text-sm md:text-base font-bold tracking-tight text-white group-hover:text-[#F5F4F0] transition-colors">
                {isArabic ? 'د. سعيد المغلاني' : 'Dr. Saeed Elmaghlany'}
              </span>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[#A8A8A8]">
                {isArabic ? 'طب وتجميل الأسنان' : 'Dental Care'}
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xs uppercase tracking-widest transition-all relative py-1 focus:outline-none ${
                    isActive ? 'text-white font-semibold' : 'text-[#A8A8A8] hover:text-[#F5F4F0]'
                  }`}
                >
                  {isArabic ? item.labelAr : item.labelEn}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D71920]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Lang Switcher + Admin Shortcut + CTA */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#171717] rounded-full p-1 border border-[#262626]">
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-colors ${
                  isArabic ? 'bg-[#D71920] text-white shadow-sm' : 'text-[#A8A8A8] hover:text-white'
                }`}
                title="العربية"
              >
                AR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-colors ${
                  !isArabic ? 'bg-[#D71920] text-white shadow-sm' : 'text-[#A8A8A8] hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Admin Portal Shortcut */}
            <button
              onClick={() => setActiveView(activeView === 'admin' ? 'home' : 'admin')}
              className={`p-2 rounded-full border transition-colors ${
                activeView === 'admin'
                  ? 'bg-[#D71920] text-white border-[#D71920]'
                  : 'bg-[#171717] text-[#A8A8A8] border-[#262626] hover:text-white hover:border-[#A8A8A8]'
              }`}
              title={activeView === 'admin' ? (isArabic ? 'العودة للموقع' : 'View Website') : (isArabic ? 'لوحة التحكم' : 'Admin Portal')}
            >
              <Shield className="w-3.5 h-3.5" />
            </button>

            {/* CTA Button */}
            <button
              onClick={() => openBookingWithTreatment('General Consultation')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#D71920] hover:bg-[#b5141a] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-transform active:scale-95 shadow-md shadow-red-950/40"
            >
              <span>{isArabic ? 'احجز موعدك' : 'BOOK APPOINTMENT'}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-full bg-[#171717] text-white border border-[#262626]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-[#0B0B0B] flex flex-col justify-between p-8 text-[#F5F4F0]"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b border-[#171717] pb-6">
              <div>
                <span className="font-bold text-lg text-white">
                  {isArabic ? 'د. سعيد المغلاني' : 'Dr. Saeed Elmaghlany'}
                </span>
                <span className="block text-[11px] text-[#A8A8A8] tracking-widest">
                  {isArabic ? 'طب وتجميل الأسنان' : 'DENTAL CARE'}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-white hover:border-[#D71920] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-4 py-8">
              {navLinks.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left rtl:text-right group flex items-baseline justify-between py-2 border-b border-[#171717]/60"
                >
                  <span className="text-2xl sm:text-3xl font-light text-[#F5F4F0] group-hover:text-[#D71920] transition-colors">
                    {isArabic ? item.labelAr : item.labelEn}
                  </span>
                  <span className="text-xs font-mono text-[#A8A8A8]">0{idx + 1}</span>
                </motion.button>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="space-y-4 pt-4 border-t border-[#171717]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingWithTreatment('General Consultation');
                }}
                className="w-full py-3.5 bg-[#D71920] text-white font-semibold text-center rounded-full flex items-center justify-center gap-2"
              >
                <span>{isArabic ? 'احجز موعدك الآن' : 'BOOK APPOINTMENT'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-[#A8A8A8]">
                <span>WhatsApp: +20 100 000 0000</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveView('admin');
                  }}
                  className="underline hover:text-white"
                >
                  {isArabic ? 'دخول الأدمن' : 'Admin Portal'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
