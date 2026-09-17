import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactSection: React.FC = () => {
  const { language, clinicContact, direction } = useApp();
  const isArabic = language === 'ar';

  return (
    <section id="contact" className="bg-[#FFFFFF] text-[#0B0B0B] py-28 md:py-36 border-b border-[#DDDAD4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#DDDAD4]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold text-[#D71920]">11 // CLINIC & LOCATION</span>
              <div className="h-[1px] w-8 bg-[#DDDAD4]" />
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0B0B0B]">
              {isArabic ? 'تواصل' : 'GET IN'}<br />
              <span className="text-[#0B0B0B] font-light">
                {isArabic ? 'معنا.' : 'TOUCH.'}
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm md:text-base text-[#737373] max-w-sm">
            {isArabic
              ? 'مكتب الاستقبال وفريق الرعاية الطبية جاهزون للإجابة عن استفساراتكم وترتيب زيارتكم.'
              : 'Our private concierge and clinical reception are dedicated to your comfort and peace of mind.'}
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address */}
            <div className="p-6 rounded-2xl bg-[#F5F4F0] border border-[#DDDAD4] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DDDAD4] flex items-center justify-center text-[#D71920] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-1">
                  {isArabic ? 'عنوان العيادة' : 'CLINIC ADDRESS'}
                </span>
                <span className="text-base font-bold text-[#0B0B0B]">
                  {isArabic ? clinicContact.addressAr : clinicContact.addressEn}
                </span>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#F5F4F0] border border-[#DDDAD4] flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#DDDAD4] flex items-center justify-center text-[#D71920] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#737373] block mb-1">
                    {isArabic ? 'الهاتف' : 'PHONE'}
                  </span>
                  <span className="text-sm font-bold text-[#0B0B0B]">
                    {clinicContact.phone}
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#F5F4F0] border border-[#DDDAD4] flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#DDDAD4] flex items-center justify-center text-[#D71920] shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#737373] block mb-1">
                    {isArabic ? 'واتساب' : 'WHATSAPP'}
                  </span>
                  <span className="text-sm font-bold text-[#0B0B0B]">
                    {clinicContact.whatsapp}
                  </span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 rounded-2xl bg-[#F5F4F0] border border-[#DDDAD4] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DDDAD4] flex items-center justify-center text-[#D71920] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-1">
                  {isArabic ? 'البريد الإلكتروني' : 'EMAIL INQUIRIES'}
                </span>
                <span className="text-base font-bold text-[#0B0B0B]">
                  {clinicContact.email}
                </span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-6 rounded-2xl bg-[#F5F4F0] border border-[#DDDAD4] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DDDAD4] flex items-center justify-center text-[#D71920] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#737373] block mb-1">
                  {isArabic ? 'مواعيد العمل' : 'WORKING HOURS'}
                </span>
                <span className="text-sm font-bold text-[#0B0B0B]">
                  {isArabic ? clinicContact.workingHoursAr : clinicContact.workingHoursEn}
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="p-4 rounded-2xl bg-[#F5F4F0] border border-[#DDDAD4] flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#737373]">
                {isArabic ? 'تابعنا على وسائل التواصل' : 'FOLLOW CLINIC'}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={clinicContact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-[#DDDAD4] flex items-center justify-center text-[#0B0B0B] hover:text-[#D71920] hover:border-[#D71920] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={clinicContact.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-[#DDDAD4] flex items-center justify-center text-[#0B0B0B] hover:text-[#D71920] hover:border-[#D71920] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder (Ready for Google Maps) (7 cols) */}
          <div className="lg:col-span-7 bg-[#171717] rounded-3xl overflow-hidden border border-[#262626] relative min-h-[420px] flex flex-col justify-between p-8 text-white">
            {/* Top map overlay */}
            <div className="flex items-center justify-between z-10">
              <div className="bg-[#0B0B0B]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D71920] animate-ping" />
                <span className="text-xs font-mono font-bold tracking-wider">
                  {isArabic ? 'موقع العيادة المعتمد' : 'GOOGLE MAPS EMBED READY'}
                </span>
              </div>
              <span className="text-xs font-mono text-[#A8A8A8] hidden sm:block">
                LAT / LNG READY
              </span>
            </div>

            {/* Stylized Architectural Map Canvas Simulation */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border border-[#D71920]/40 animate-ping" />
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#D71920] flex items-center justify-center text-white shadow-2xl">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Bottom Map Card */}
            <div className="bg-[#0B0B0B]/90 backdrop-blur-md p-6 rounded-2xl border border-white/10 z-10 max-w-md space-y-2">
              <span className="text-xs font-mono text-[#D71920] uppercase tracking-widest block">
                {isArabic ? 'الموقع الجغرافي' : 'PHYSICAL PRACTICE'}
              </span>
              <h4 className="text-lg font-bold text-white">
                {isArabic ? 'عيادة د. سعيد المغلاني لطب وتجميل الأسنان' : 'Dr. Saeed Elmaghlany Dental Clinic'}
              </h4>
              <p className="text-xs text-[#A8A8A8]">
                {isArabic ? clinicContact.addressAr : clinicContact.addressEn}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert(isArabic ? 'سيتم ربط خرائط جوجل مع العنوان الفعلي للعيادة فور تزويده.' : 'Google Maps integration ready. Location will be pinpointed upon clinic address input.')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#D71920] transition-colors"
                >
                  <span>{isArabic ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${direction === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
