import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, Calendar, Clock, User, Phone, Mail, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BookingSection: React.FC = () => {
  const { language, services, clinicContact, submitAppointment, prefilledTreatment } = useApp();
  const isArabic = language === 'ar';

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    treatment: '',
    preferredDate: '',
    preferredTime: '11:00 AM',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledTreatment) {
      setFormData((prev) => ({ ...prev, treatment: prefilledTreatment }));
    }
  }, [prefilledTreatment]);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.patientName.trim()) {
      err.patientName = isArabic ? 'يرجى كتابة الاسم بالكامل' : 'Full name is required';
    }
    if (!formData.phone.trim()) {
      err.phone = isArabic ? 'يرجى إدخال رقم الهاتف' : 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      err.phone = isArabic ? 'رقم الهاتف غير صالح' : 'Valid phone number required';
    }
    if (!formData.treatment) {
      err.treatment = isArabic ? 'يرجى اختيار الخدمة المطلوبة' : 'Please select a treatment';
    }
    if (!formData.preferredDate) {
      err.preferredDate = isArabic ? 'يرجى تحديد التاريخ المناسب' : 'Please select preferred date';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    submitAppointment({
      patientName: formData.patientName,
      phone: formData.phone,
      email: formData.email,
      treatment: formData.treatment,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      message: formData.message,
    });

    setIsSubmitted(true);
  };

  const openWhatsAppBooking = () => {
    const cleanNum = clinicContact.whatsapp.replace(/[^0-9]/g, '');
    const text = isArabic
      ? `مرحباً، أود حجز موعد استشارة مع د. سعيد المغلاني بخصوص: ${formData.treatment || 'طب وتجميل الأسنان'}.`
      : `Hello, I would like to book a consultation with Dr. Saeed Elmaghlany regarding: ${formData.treatment || 'Dental Consultation'}.`;
    window.open(`https://wa.me/${cleanNum || '201000000000'}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '01:00 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM',
    '07:30 PM',
    '09:00 PM',
  ];

  return (
    <section id="booking" className="bg-[#FFFFFF] text-[#0B0B0B] py-28 md:py-36 border-b border-[#DDDAD4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Title & Concierge Callout */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-bold text-[#D71920]">10 // PRIVATE RESERVATION</span>
                <div className="h-[1px] w-8 bg-[#DDDAD4]" />
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0B0B0B]">
                {isArabic ? 'احجز' : 'BOOK'}<br />
                <span className="text-[#0B0B0B] font-light">
                  {isArabic ? 'موعدك.' : 'YOUR VISIT.'}
                </span>
              </h2>
            </div>

            <p className="text-sm md:text-base text-[#525252] leading-relaxed">
              {isArabic
                ? 'استمتع بتجربة فندقية راقية واستشارة سريرية متأنية مع د. سعيد المغلاني. نضمن لك موعداً فردياً بدون أي انتظار.'
                : 'Experience an exclusive clinical consultation with Dr. Saeed Elmaghlany in an atmosphere of tranquility and focus.'}
            </p>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-4 space-y-3">
              <button
                type="button"
                onClick={openWhatsAppBooking}
                className="w-full py-3.5 px-6 rounded-full bg-[#171717] hover:bg-[#0B0B0B] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{isArabic ? 'احجز مباشرة عبر واتساب' : 'BOOK VIA WHATSAPP'}</span>
              </button>

              <div className="flex items-center gap-3 text-xs text-[#737373] px-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isArabic ? 'الاستجابة خلال دقائق في أوقات العمل' : 'Average response time: < 15 mins'}</span>
              </div>
            </div>

            {/* Clinic Ethics Badge */}
            <div className="bg-[#F5F4F0] p-6 rounded-2xl border border-[#DDDAD4] space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D71920] block">
                {isArabic ? 'ضمان الخصوصية' : 'CONFIDENTIALITY'}
              </span>
              <p className="text-xs text-[#737373] leading-relaxed">
                {isArabic
                  ? 'بياناتك الطبية واستفساراتك تعامل بأعلى درجات السرية والخصوصية الطبية المعتمدة.'
                  : 'All clinical requests and dental histories are encrypted and protected under doctor-patient confidentiality.'}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-[#F5F4F0] p-8 sm:p-12 rounded-3xl border border-[#DDDAD4] shadow-sm">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#D71920] text-white flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D71920] block mb-2">
                    CONFIRMATION #ELM-{Math.floor(1000 + Math.random() * 9000)}
                  </span>
                  <h3 className="text-3xl font-bold text-[#0B0B0B]">
                    {isArabic ? 'تم إرسال طلب الحجز بنجاح.' : 'APPOINTMENT REQUEST RECEIVED.'}
                  </h3>
                  <p className="text-sm text-[#525252] mt-3 max-w-md mx-auto">
                    {isArabic
                      ? `شكراً لك ${formData.patientName}. سيتواصل معك فريق العيادة خلال وقت قصير لتأكيد موعد الاستشارة النهائي.`
                      : `Thank you, ${formData.patientName}. Our concierge team will reach out via phone or WhatsApp shortly to confirm your slot.`}
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        patientName: '',
                        phone: '',
                        email: '',
                        treatment: '',
                        preferredDate: '',
                        preferredTime: '11:00 AM',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#0B0B0B] text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    {isArabic ? 'حجز موعد آخر' : 'BOOK ANOTHER APPOINTMENT'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      {isArabic ? 'الاسم بالكامل *' : 'Full Name *'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        placeholder={isArabic ? 'اكتب اسمك الكامل' : 'Your full name'}
                        className={`w-full px-4 py-3 bg-white rounded-xl border text-sm text-[#0B0B0B] placeholder:text-[#A8A8A8] focus:outline-none transition-colors ${
                          errors.patientName ? 'border-[#D71920] bg-red-50/20' : 'border-[#DDDAD4] focus:border-[#0B0B0B]'
                        }`}
                      />
                      <User className="w-4 h-4 text-[#A8A8A8] absolute right-3.5 rtl:right-auto rtl:left-3.5 top-3.5" />
                    </div>
                    {errors.patientName && <span className="text-[11px] text-[#D71920] mt-1 block">{errors.patientName}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      {isArabic ? 'رقم الهاتف *' : 'Phone Number *'}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+20 ..."
                        className={`w-full px-4 py-3 bg-white rounded-xl border text-sm text-[#0B0B0B] placeholder:text-[#A8A8A8] focus:outline-none transition-colors ${
                          errors.phone ? 'border-[#D71920] bg-red-50/20' : 'border-[#DDDAD4] focus:border-[#0B0B0B]'
                        }`}
                      />
                      <Phone className="w-4 h-4 text-[#A8A8A8] absolute right-3.5 rtl:right-auto rtl:left-3.5 top-3.5" />
                    </div>
                    {errors.phone && <span className="text-[11px] text-[#D71920] mt-1 block">{errors.phone}</span>}
                  </div>
                </div>

                {/* Email & Treatment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 bg-white rounded-xl border border-[#DDDAD4] focus:border-[#0B0B0B] text-sm text-[#0B0B0B] placeholder:text-[#A8A8A8] focus:outline-none transition-colors"
                      />
                      <Mail className="w-4 h-4 text-[#A8A8A8] absolute right-3.5 rtl:right-auto rtl:left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      {isArabic ? 'اختر الخدمة *' : 'Select Treatment *'}
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className={`w-full px-4 py-3 bg-white rounded-xl border text-sm text-[#0B0B0B] focus:outline-none transition-colors ${
                        errors.treatment ? 'border-[#D71920] bg-red-50/20' : 'border-[#DDDAD4] focus:border-[#0B0B0B]'
                      }`}
                    >
                      <option value="">{isArabic ? '-- اختر الإجراء --' : '-- Choose Service --'}</option>
                      {services.map((s) => (
                        <option key={s.id} value={isArabic ? s.nameAr : s.nameEn}>
                          {isArabic ? s.nameAr : s.nameEn}
                        </option>
                      ))}
                      <option value={isArabic ? 'استشارة عامة' : 'General Consultation'}>
                        {isArabic ? 'استشارة عامة وفحص شامل' : 'General Consultation'}
                      </option>
                    </select>
                    {errors.treatment && <span className="text-[11px] text-[#D71920] mt-1 block">{errors.treatment}</span>}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      {isArabic ? 'التاريخ المناسب *' : 'Preferred Date *'}
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 bg-white rounded-xl border text-sm text-[#0B0B0B] focus:outline-none transition-colors ${
                          errors.preferredDate ? 'border-[#D71920] bg-red-50/20' : 'border-[#DDDAD4] focus:border-[#0B0B0B]'
                        }`}
                      />
                    </div>
                    {errors.preferredDate && <span className="text-[11px] text-[#D71920] mt-1 block">{errors.preferredDate}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                      {isArabic ? 'الوقت المناسب' : 'Preferred Time'}
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-[#DDDAD4] focus:border-[#0B0B0B] text-sm text-[#0B0B0B] focus:outline-none transition-colors"
                    >
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider mb-2">
                    {isArabic ? 'رسالتك أو ملاحظاتك الطبية' : 'Message / Specific Goals'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isArabic ? 'اكتب أي تفاصيل ترغب بإطلاع الدكتور عليها مسبقاً...' : 'Describe any concerns or smile goals...'}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#DDDAD4] focus:border-[#0B0B0B] text-sm text-[#0B0B0B] placeholder:text-[#A8A8A8] focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#D71920] hover:bg-[#b5141a] text-white font-bold text-sm tracking-wider uppercase rounded-full transition-all duration-200 shadow-xl shadow-red-950/20 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isArabic ? 'تأكيد إرسال طلب الحجز' : 'CONFIRM APPOINTMENT REQUEST'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
