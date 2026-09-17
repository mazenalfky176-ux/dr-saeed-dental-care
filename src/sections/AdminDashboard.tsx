import React, { useState } from 'react';
import { motion } from 'motion/react';
import demoSmileBefore from '../assets/images/demo-smile-before.svg';
import demoSmileAfter from '../assets/images/demo-smile-after.svg';
import {
  Lock,
  LogOut,
  User,
  List,
  Sparkles,
  MessageSquare,
  HelpCircle,
  CalendarCheck,
  PhoneCall,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  ExternalLink,
  Shield,
  Upload,
  ImageIcon,
  GraduationCap,
  Award,
  Briefcase,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { initialDoctorProfile } from '../data/initialData';
import { AppointmentRequest, CaseStudy, ServiceItem, Testimonial, FaqItem } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    language,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    doctorProfile,
    updateDoctorProfile,
    services,
    updateServices,
    caseStudies,
    updateCaseStudies,
    testimonials,
    updateTestimonials,
    faqs,
    updateFaqs,
    appointments,
    updateAppointmentStatus,
    deleteAppointment,
    clinicContact,
    updateClinicContact,
    resetToDefaults,
    setActiveView,
  } = useApp();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'appointments' | 'doctor' | 'services' | 'cases' | 'testimonials' | 'faq' | 'contact'
  >('appointments');

  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Local state copies for active editing
  const [docForm, setDocForm] = useState(doctorProfile);
  const [contactForm, setContactForm] = useState(clinicContact);
  const [servicesList, setServicesList] = useState(services);
  const [casesList, setCasesList] = useState(caseStudies);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const [faqsList, setFaqsList] = useState(faqs);

  const [appointmentFilter, setAppointmentFilter] = useState<
    'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'
  >('all');

  const triggerNotify = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(pinInput)) {
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  // 1. PIN Lock Screen if not logged in
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center p-6 select-none pt-24">
        <div className="w-full max-w-md bg-[#141414] border border-[#262626] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#D71920]" />

          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#1C1C1C] border border-white/10 flex items-center justify-center text-[#D71920] mx-auto shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {language === 'ar' ? 'بوابة إدارة العيادة' : 'Clinical Admin Portal'}
            </h2>
            <p className="text-xs text-[#A8A8A8]">
              {language === 'ar'
                ? 'لوحة تحكم خاصة بدكتور سعيد المغلاني وإدارة المحتوى والمواعيد.'
                : 'Enter your clinical security PIN to manage patient bookings and site records.'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-2">
                {language === 'ar' ? 'الرمز السري الخاص بالنشر' : 'Private deployment security PIN'}
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="••••"
                className={`w-full px-4 py-3.5 bg-[#0B0B0B] rounded-xl border text-center text-xl tracking-widest text-white focus:outline-none transition-colors ${
                  pinError ? 'border-[#D71920]' : 'border-[#262626] focus:border-white'
                }`}
                autoFocus
              />
              {pinError && (
                <span className="text-[11px] text-[#D71920] mt-1.5 block text-center">
                  {language === 'ar' ? 'الرمز السري غير صحيح.' : 'Incorrect security PIN.'}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#D71920] hover:bg-[#b5141a] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95"
            >
              {language === 'ar' ? 'دخول لوحة التحكم' : 'UNLOCK DASHBOARD'}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setActiveView('home')}
                className="text-xs text-[#737373] hover:text-white transition-colors"
              >
                {language === 'ar' ? '◄ العودة إلى الموقع الرئيسي' : '◄ Return to Website'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Filtered appointments
  const filteredAppointments = appointments.filter((app) => {
    if (appointmentFilter === 'all') return true;
    return app.status === appointmentFilter;
  });

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pt-24 pb-20 select-none">
      {/* Save Notification Toast */}
      {saveNotification && (
        <div className="fixed bottom-8 right-8 z-[9999] bg-[#171717] border border-[#D71920] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs">
          <CheckCircle className="w-4 h-4 text-[#D71920]" />
          <span>{saveNotification}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Admin Bar Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#262626] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D71920] flex items-center justify-center text-white font-bold text-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>{language === 'ar' ? 'لوحة تحكم د. سعيد المغلاني' : 'Dr. Saeed Elmaghlany Admin'}</span>
                <span className="text-[10px] font-mono bg-[#171717] px-2 py-0.5 rounded text-[#D71920] border border-white/10">
                  LIVE
                </span>
              </h1>
              <span className="text-xs text-[#A8A8A8]">
                {language === 'ar'
                  ? 'إدارة الحجوزات والمحتوى والخدمات مع الحفظ التلقائي'
                  : 'Manage bookings, editorial content & clinical data with live persistence'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('home')}
              className="px-4 py-2 rounded-lg bg-[#171717] border border-[#262626] hover:border-white text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'معاينة الموقع' : 'View Website'}</span>
            </button>

            <button
              onClick={() => {
                if (confirm(language === 'ar' ? 'هل تود استعادة البيانات النموذجية الافتراضية؟' : 'Restore initial clinical demo data?')) {
                  resetToDefaults();
                  triggerNotify(language === 'ar' ? 'تمت استعادة البيانات الافتراضية' : 'Default data restored');
                  setDocForm(doctorProfile);
                  setContactForm(clinicContact);
                }
              }}
              className="px-3 py-2 rounded-lg bg-[#171717] border border-[#262626] hover:text-[#D71920] text-xs text-[#A8A8A8] flex items-center gap-1.5"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'ar' ? 'استعادة' : 'Reset'}</span>
            </button>

            <button
              onClick={adminLogout}
              className="px-4 py-2 rounded-lg bg-[#D71920]/20 hover:bg-[#D71920] text-[#D71920] hover:text-white border border-[#D71920]/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'خروج' : 'Lock'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-5 border-b border-[#1A1A1A] no-scrollbar">
          {[
            { id: 'appointments', labelEn: 'Bookings', labelAr: 'المواعيد والحجوزات', icon: CalendarCheck, count: appointments.length },
            { id: 'doctor', labelEn: 'Doctor Profile', labelAr: 'بيانات الطبيب', icon: User },
            { id: 'services', labelEn: 'Services', labelAr: 'الخدمات', icon: List, count: services.length },
            { id: 'cases', labelEn: 'Cases (Before/After)', labelAr: 'حالات قبل وبعد', icon: Sparkles, count: caseStudies.length },
            { id: 'testimonials', labelEn: 'Testimonials', labelAr: 'آراء المرضى', icon: MessageSquare, count: testimonials.length },
            { id: 'faq', labelEn: 'FAQ Editor', labelAr: 'الأسئلة الشائعة', icon: HelpCircle, count: faqs.length },
            { id: 'contact', labelEn: 'Clinic Contact', labelAr: 'بيانات التواصل', icon: PhoneCall },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#D71920] text-white shadow-lg'
                    : 'bg-[#141414] text-[#A8A8A8] hover:text-white hover:bg-[#1F1F1F] border border-[#262626]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? tab.labelAr : tab.labelEn}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isActive ? 'bg-black/40 text-white' : 'bg-[#262626] text-[#A8A8A8]'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Bookings / Appointments Management */}
        {activeTab === 'appointments' && (
          <div className="pt-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {language === 'ar' ? 'سجل طلبات الحجز المباشرة' : 'Live Appointment Requests'}
                </h3>
                <p className="text-xs text-[#A8A8A8]">
                  {language === 'ar'
                    ? 'الطلبات المرسلة من المرضى عبر نموذج الحجز بالموقع.'
                    : 'Requests submitted by patients through the appointment booking form.'}
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-[#141414] p-1 rounded-xl border border-[#262626]">
                {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setAppointmentFilter(status)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                      appointmentFilter === status
                        ? 'bg-[#262626] text-white'
                        : 'text-[#737373] hover:text-[#A8A8A8]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Table / Cards */}
            {filteredAppointments.length === 0 ? (
              <div className="bg-[#141414] rounded-2xl border border-[#262626] p-12 text-center text-[#737373] space-y-2">
                <CalendarCheck className="w-10 h-10 mx-auto text-[#262626]" />
                <p className="text-sm">
                  {language === 'ar' ? 'لا توجد طلبات حجز مطابقة لهذا التصنيف.' : 'No appointment requests found in this filter.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredAppointments.map((app) => (
                  <div
                    key={app.id}
                    className="bg-[#141414] border border-[#262626] rounded-2xl p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
                        <span className="text-xs font-mono text-[#D71920]">
                          {app.preferredDate} • {app.preferredTime}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                            app.status === 'confirmed'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : app.status === 'completed'
                              ? 'bg-blue-950 text-blue-400 border border-blue-800'
                              : app.status === 'cancelled'
                              ? 'bg-red-950 text-red-400 border border-red-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>

                      <div className="pt-3 space-y-1">
                        <h4 className="text-base font-bold text-white">{app.patientName}</h4>
                        <div className="text-xs text-[#A8A8A8] space-y-0.5 font-mono">
                          <div>📞 {app.phone}</div>
                          {app.email && <div>✉ {app.email}</div>}
                          <div className="text-[#D71920] font-sans font-semibold pt-1">
                            🦷 {app.treatment}
                          </div>
                        </div>

                        {app.message && (
                          <div className="mt-3 p-2.5 rounded-lg bg-[#0B0B0B] text-xs text-[#A8A8A8] italic border border-white/5">
                            "{app.message}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-[#262626] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateAppointmentStatus(app.id, 'confirmed')}
                          className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-800 text-emerald-400 border border-emerald-800"
                          title="Confirm Appointment"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateAppointmentStatus(app.id, 'completed')}
                          className="p-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-800 text-blue-400 border border-blue-800"
                          title="Mark Completed"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateAppointmentStatus(app.id, 'cancelled')}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-800 text-red-400 border border-red-800"
                          title="Cancel"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => deleteAppointment(app.id)}
                        className="p-1.5 rounded-lg text-[#525252] hover:text-red-400 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Doctor Profile */}
        {activeTab === 'doctor' && (
          <div className="pt-8 max-w-5xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-[#D71920]" />
                  <span>{language === 'ar' ? 'تعديل وتعبئة بيانات د. سعيد المغلاني' : 'Doctor Profile & Clinical Credentials'}</span>
                </h3>
                <p className="text-xs text-[#A8A8A8] mt-1">
                  {language === 'ar'
                    ? 'يمكنك هنا ملء وتعديل كافة بيانات الطبيب (الاسم، اللقب، الشهادات، الجامعة، والنبذة) ورفع أو تغيير الصورة مع حفظ فوري.'
                    : 'Fill in and customize doctor biographical details, academic degrees, clinic titles, and portrait photo.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDocForm({
                      ...initialDoctorProfile,
                      photoUrl: initialDoctorProfile.photoUrl,
                    });
                    triggerNotify(language === 'ar' ? 'تم استرجاع الصورة والبيانات الافتراضية' : 'Default photo and profile restored');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] text-xs font-semibold text-[#A8A8A8] hover:text-white border border-[#2B2B2B] flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'استعادة صورة د. سعيد الرسمية' : 'Reset Official Portrait'}</span>
                </button>
              </div>
            </div>

            {/* Live Preview & Photo Management Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#141414] border border-[#262626] rounded-2xl p-6 sm:p-8 items-start">
              {/* Left/Top: Portrait Preview with Upload Control */}
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A8A8A8] block">
                  {language === 'ar' ? 'معاينة صورة وهوية الطبيب' : 'DOCTOR PORTRAIT PREVIEW'}
                </span>

                <div className="relative rounded-2xl overflow-hidden border border-[#333] bg-[#0A0A0A] aspect-[4/5] shadow-xl group">
                  <img
                    src={docForm.photoUrl || initialDoctorProfile.photoUrl}
                    alt={docForm.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <span className="text-[10px] font-mono tracking-widest text-[#D71920] uppercase block">
                      {language === 'ar' ? (docForm.titleAr || 'طبيب أسنان') : (docForm.titleEn || 'Dentist')}
                    </span>
                    <span className="text-base font-bold block truncate">
                      {language === 'ar' ? (docForm.nameAr || 'د. سعيد المغلاني') : (docForm.nameEn || 'Dr. Saeed Elmaghlany')}
                    </span>
                    <span className="text-[11px] text-[#A8A8A8] block truncate">
                      {language === 'ar' ? (docForm.specializationAr || 'تجميل وترميم الأسنان') : (docForm.specializationEn || 'Aesthetic Dentistry')}
                    </span>
                  </div>
                </div>

                {/* Upload Action / URL input */}
                <div className="space-y-3 pt-2">
                  <label className="w-full py-2.5 px-4 rounded-xl bg-[#1C1C1C] hover:bg-[#262626] border border-[#333] hover:border-[#D71920] text-xs font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm">
                    <Upload className="w-4 h-4 text-[#D71920]" />
                    <span>{language === 'ar' ? 'رفع صورة جديدة من جهازك' : 'Upload Image from Computer'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            const result = uploadEvent.target?.result as string;
                            if (result) {
                              setDocForm({ ...docForm, photoUrl: result });
                              triggerNotify(language === 'ar' ? 'تم اختيار الصورة الجديدة' : 'New image loaded');
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#737373] mb-1">
                      {language === 'ar' ? 'أو أدخل رابط الصورة مباشرة (URL):' : 'Or enter direct image URL:'}
                    </label>
                    <input
                      type="text"
                      value={docForm.photoUrl}
                      onChange={(e) => setDocForm({ ...docForm, photoUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920] font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Comprehensive Bilingual Fields */}
              <div className="lg:col-span-8 space-y-5">
                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5">
                      {language === 'ar' ? 'اسم الطبيب (بالعربية) *' : 'Doctor Name (Arabic) *'}
                    </label>
                    <input
                      type="text"
                      value={docForm.nameAr}
                      onChange={(e) => setDocForm({ ...docForm, nameAr: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0B0B] rounded-xl border border-[#262626] text-sm text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="د. سعيد المغلاني"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5">
                      {language === 'ar' ? 'اسم الطبيب (بالإنجليزية) *' : 'Doctor Name (English) *'}
                    </label>
                    <input
                      type="text"
                      value={docForm.nameEn}
                      onChange={(e) => setDocForm({ ...docForm, nameEn: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0B0B] rounded-xl border border-[#262626] text-sm text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="Dr. Saeed Elmaghlany"
                    />
                  </div>
                </div>

                {/* Clinical Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5">
                      {language === 'ar' ? 'اللقب المهني (بالعربية)' : 'Professional Title (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={docForm.titleAr}
                      onChange={(e) => setDocForm({ ...docForm, titleAr: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="طبيب أسنان متخصص في تجميل وترميم الأسنان"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5">
                      {language === 'ar' ? 'اللقب المهني (بالإنجليزية)' : 'Professional Title (English)'}
                    </label>
                    <input
                      type="text"
                      value={docForm.titleEn}
                      onChange={(e) => setDocForm({ ...docForm, titleEn: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="Restorative & Cosmetic Dentist"
                    />
                  </div>
                </div>

                {/* Specialization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5">
                      {language === 'ar' ? 'التخصص الدقيق (بالعربية)' : 'Sub-Specialization (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={docForm.specializationAr}
                      onChange={(e) => setDocForm({ ...docForm, specializationAr: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="الترميم التجميلي والعدسات الخزفية"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5">
                      {language === 'ar' ? 'التخصص الدقيق (بالإنجليزية)' : 'Sub-Specialization (English)'}
                    </label>
                    <input
                      type="text"
                      value={docForm.specializationEn}
                      onChange={(e) => setDocForm({ ...docForm, specializationEn: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="Aesthetic Restorations & Veneers"
                    />
                  </div>
                </div>

                {/* Academic Degree */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#D71920]" />
                      <span>{language === 'ar' ? 'الدرجة العلمية (بالعربية)' : 'Academic Degree (Arabic)'}</span>
                    </label>
                    <input
                      type="text"
                      value={docForm.degreeAr}
                      onChange={(e) => setDocForm({ ...docForm, degreeAr: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="بكالوريوس طب وجراحة الفم والأسنان"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#D71920]" />
                      <span>{language === 'ar' ? 'الدرجة العلمية (بالإنجليزية)' : 'Academic Degree (English)'}</span>
                    </label>
                    <input
                      type="text"
                      value={docForm.degreeEn}
                      onChange={(e) => setDocForm({ ...docForm, degreeEn: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="Bachelor of Dental Surgery (BDS)"
                    />
                  </div>
                </div>

                {/* University */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#D71920]" />
                      <span>{language === 'ar' ? 'الجامعة (بالعربية)' : 'University (Arabic)'}</span>
                    </label>
                    <input
                      type="text"
                      value={docForm.universityAr}
                      onChange={(e) => setDocForm({ ...docForm, universityAr: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="جامعة القاهرة - كلية طب الأسنان"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#D71920]" />
                      <span>{language === 'ar' ? 'الجامعة (بالإنجليزية)' : 'University (English)'}</span>
                    </label>
                    <input
                      type="text"
                      value={docForm.universityEn}
                      onChange={(e) => setDocForm({ ...docForm, universityEn: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="Faculty of Oral and Dental Medicine"
                    />
                  </div>
                </div>

                {/* Experience & Certifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#D71920]" />
                      <span>{language === 'ar' ? 'سنوات الخبرة (بالعربية)' : 'Years of Experience (Arabic)'}</span>
                    </label>
                    <input
                      type="text"
                      value={docForm.experienceAr}
                      onChange={(e) => setDocForm({ ...docForm, experienceAr: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="أكثر من ١٠ سنوات خبرة سريرية"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#D71920]" />
                      <span>{language === 'ar' ? 'سنوات الخبرة (بالإنجليزية)' : 'Years of Experience (English)'}</span>
                    </label>
                    <input
                      type="text"
                      value={docForm.experienceEn}
                      onChange={(e) => setDocForm({ ...docForm, experienceEn: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="10+ Years of Clinical Practice"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5">
                      {language === 'ar' ? 'الشهادات والاعتمادات (بالعربية)' : 'Certifications (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={docForm.certificationsAr}
                      onChange={(e) => setDocForm({ ...docForm, certificationsAr: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="عضو الجمعية الدولية لتجميل الأسنان"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5">
                      {language === 'ar' ? 'الشهادات والاعتمادات (بالإنجليزية)' : 'Certifications (English)'}
                    </label>
                    <input
                      type="text"
                      value={docForm.certificationsEn}
                      onChange={(e) => setDocForm({ ...docForm, certificationsEn: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920]"
                      placeholder="Member of AACD & Biomimetic Restorative Society"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5">
                      {language === 'ar' ? 'النبذة السريرية (بالعربية)' : 'Doctor Bio (Arabic)'}
                    </label>
                    <textarea
                      rows={4}
                      value={docForm.bioAr}
                      onChange={(e) => setDocForm({ ...docForm, bioAr: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920] leading-relaxed"
                      placeholder="اكتب نبذة عن رؤية ونهج الدكتور العلاجي..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1.5">
                      {language === 'ar' ? 'النبذة السريرية (بالإنجليزية)' : 'Doctor Bio (English)'}
                    </label>
                    <textarea
                      rows={4}
                      value={docForm.bioEn}
                      onChange={(e) => setDocForm({ ...docForm, bioEn: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white focus:outline-none focus:border-[#D71920] leading-relaxed"
                      placeholder="Write doctor philosophy and background..."
                    />
                  </div>
                </div>

                {/* Save CTA */}
                <div className="pt-4 flex items-center justify-between border-t border-[#262626]">
                  <span className="text-xs text-[#737373]">
                    {language === 'ar' ? 'سيتم تطبيق التعديلات فوراً على كافة أقسام الموقع' : 'Changes apply immediately across all website sections'}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      updateDoctorProfile(docForm);
                      triggerNotify(language === 'ar' ? 'تم حفظ بيانات الدكتور بنجاح واستعراضها بالموقع' : 'Doctor profile successfully saved and updated on website');
                    }}
                    className="px-7 py-3 bg-[#D71920] hover:bg-[#b5141a] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg shadow-red-950/40 active:scale-95 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>{language === 'ar' ? 'حفظ البيانات وتحديث الموقع' : 'SAVE & UPDATE WEBSITE'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Services Manager */}
        {activeTab === 'services' && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {language === 'ar' ? 'إدارة باقات وخدمات الأسنان' : 'Manage Dental Services'}
                </h3>
                <p className="text-xs text-[#A8A8A8]">
                  {language === 'ar' ? 'إضافة وتعديل الخدمات المعروضة بالموقع.' : 'Add, edit or update clinical procedures.'}
                </p>
              </div>

              <button
                onClick={() => {
                  const newService: ServiceItem = {
                    id: `srv-${Date.now()}`,
                    number: `0${servicesList.length + 1}`,
                    nameEn: 'New Dental Service',
                    nameAr: 'خدمة سنية جديدة',
                    shortDescEn: 'Procedure description and patient benefits.',
                    shortDescAr: 'وصف الإجراء الطبي والفوائد السريرية للمريض.',
                    fullDescEn: 'Comprehensive explanation of clinical methodology.',
                    fullDescAr: 'شرح مفصل لخطوات العلاج وتفاصيل الرعاية.',
                    benefitsEn: ['Biocompatible material', 'Long-lasting'],
                    benefitsAr: ['خامات متوافقة حيوياً', 'نتائج طويلة الأمد'],
                    durationEn: '1-2 Visits',
                    durationAr: 'جلسة إلى جلستين',
                    sessionsEn: '1-2 Visits',
                    sessionsAr: 'جلسة إلى جلستين',
                    candidateEn: 'Suitable for all eligible adult patients.',
                    candidateAr: 'مناسب لجميع المرضى البالغين المؤهلين.',
                    icon: 'Sparkles',
                  };
                  const updated = [...servicesList, newService];
                  setServicesList(updated);
                  updateServices(updated);
                  triggerNotify('New service added');
                }}
                className="px-4 py-2 bg-[#D71920] text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'ar' ? 'إضافة خدمة' : 'Add Service'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesList.map((service, idx) => (
                <div key={service.id} className="bg-[#141414] border border-[#262626] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#D71920]">
                      #{service.number}
                    </span>
                    <button
                      onClick={() => {
                        const updated = servicesList.filter((s) => s.id !== service.id);
                        setServicesList(updated);
                        updateServices(updated);
                        triggerNotify('Service removed');
                      }}
                      className="text-xs text-[#525252] hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={service.nameEn}
                      onChange={(e) => {
                        const copy = [...servicesList];
                        copy[idx].nameEn = e.target.value;
                        setServicesList(copy);
                        updateServices(copy);
                      }}
                      className="px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-white"
                      placeholder="Name (En)"
                    />
                    <input
                      type="text"
                      value={service.nameAr}
                      onChange={(e) => {
                        const copy = [...servicesList];
                        copy[idx].nameAr = e.target.value;
                        setServicesList(copy);
                        updateServices(copy);
                      }}
                      className="px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-white"
                      placeholder="الاسم (عربي)"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={service.shortDescEn}
                    onChange={(e) => {
                      const copy = [...servicesList];
                      copy[idx].shortDescEn = e.target.value;
                      setServicesList(copy);
                      updateServices(copy);
                    }}
                    className="w-full px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-[#A8A8A8]"
                    placeholder="Short description"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Before / After Cases */}
        {activeTab === 'cases' && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {language === 'ar' ? 'إدارة حالات قبل وبعد (Before & After)' : 'Case Studies & Transformations'}
                </h3>
                <p className="text-xs text-[#A8A8A8]">
                  {language === 'ar'
                    ? 'رفع وتعديل روابط صور الحالات السريرية وملاحظات الطبيب.'
                    : 'Manage before/after image URLs, clinical notes, and treatment details.'}
                </p>
              </div>

              <button
                onClick={() => {
                  const newCase: CaseStudy = {
                    id: `case-${Date.now()}`,
                    caseNumber: `CASE 0${casesList.length + 1}`,
                    titleEn: 'Smile Reconstruction',
                    titleAr: 'إعادة بناء الابتسامة',
                    treatmentEn: 'Veneers & Aesthetics',
                    treatmentAr: 'فينير وتجميل الأسنان',
                    beforeImage: demoSmileBefore,
                    afterImage: demoSmileAfter,
                    overviewEn: 'Bespoke smile design crafted with precision.',
                    overviewAr: 'تصميم ابتسامة متناسقة يعكس ملامح الوجه الطبيعية.',
                    doctorNotesEn: 'Preserved natural biological structure.',
                    doctorNotesAr: 'تم الحفاظ على طبقة المينا الطبيعية بالكامل.',
                    materialsEn: 'Lithium Disilicate',
                    materialsAr: 'إيماكس عالي الشفافية',
                    durationEn: '2 Weeks',
                    durationAr: 'أسبوعان',
                  };
                  const updated = [...casesList, newCase];
                  setCasesList(updated);
                  updateCaseStudies(updated);
                  triggerNotify('New case study added');
                }}
                className="px-4 py-2 bg-[#D71920] text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'ar' ? 'إضافة حالة' : 'Add Case'}</span>
              </button>
            </div>

            <div className="space-y-4">
              {casesList.map((cs, idx) => (
                <div key={cs.id} className="bg-[#141414] border border-[#262626] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#D71920]">{cs.caseNumber}</span>
                    <button
                      onClick={() => {
                        const updated = casesList.filter((c) => c.id !== cs.id);
                        setCasesList(updated);
                        updateCaseStudies(updated);
                        triggerNotify('Case removed');
                      }}
                      className="text-xs text-[#525252] hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#737373] uppercase mb-1">Title (En)</label>
                      <input
                        type="text"
                        value={cs.titleEn}
                        onChange={(e) => {
                          const copy = [...casesList];
                          copy[idx].titleEn = e.target.value;
                          setCasesList(copy);
                          updateCaseStudies(copy);
                        }}
                        className="w-full px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#737373] uppercase mb-1">العنوان (عربي)</label>
                      <input
                        type="text"
                        value={cs.titleAr}
                        onChange={(e) => {
                          const copy = [...casesList];
                          copy[idx].titleAr = e.target.value;
                          setCasesList(copy);
                          updateCaseStudies(copy);
                        }}
                        className="w-full px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-[#737373] uppercase mb-1">Before Image URL</label>
                      <input
                        type="text"
                        value={cs.beforeImage}
                        onChange={(e) => {
                          const copy = [...casesList];
                          copy[idx].beforeImage = e.target.value;
                          setCasesList(copy);
                          updateCaseStudies(copy);
                        }}
                        className="w-full px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-[#737373] uppercase mb-1">After Image URL</label>
                      <input
                        type="text"
                        value={cs.afterImage}
                        onChange={(e) => {
                          const copy = [...casesList];
                          copy[idx].afterImage = e.target.value;
                          setCasesList(copy);
                          updateCaseStudies(copy);
                        }}
                        className="w-full px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Testimonials */}
        {activeTab === 'testimonials' && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {language === 'ar' ? 'إدارة آراء وتقييمات المرضى' : 'Patient Testimonials'}
                </h3>
                <p className="text-xs text-[#A8A8A8]">
                  {language === 'ar' ? 'إضافة آراء مرضى حقيقيين واستبدال النماذج الاسترشادية.' : 'Add real patient testimonials and reviews.'}
                </p>
              </div>

              <button
                onClick={() => {
                  const newT: Testimonial = {
                    id: `rev-${Date.now()}`,
                    patientNameEn: 'Verified Patient',
                    patientNameAr: 'مريض موثق',
                    treatmentEn: 'Veneers Consultation',
                    treatmentAr: 'استشارة وتجميل أسنان',
                    rating: 5,
                    reviewEn: 'Dr. Saeed is exceptional. The attention to detail is unmatched.',
                    reviewAr: 'دكتور سعيد قمة في الذوق والمهارة والاهتمام بأدق تفاصيل الابتسامة.',
                    isDemo: false,
                  };
                  const updated = [...testimonialsList, newT];
                  setTestimonialsList(updated);
                  updateTestimonials(updated);
                  triggerNotify('Review added');
                }}
                className="px-4 py-2 bg-[#D71920] text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'ar' ? 'إضافة تقييم' : 'Add Review'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonialsList.map((t, idx) => (
                <div key={t.id} className="bg-[#141414] border border-[#262626] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#D71920]">★★★★★ ({t.rating}/5)</span>
                    <button
                      onClick={() => {
                        const updated = testimonialsList.filter((item) => item.id !== t.id);
                        setTestimonialsList(updated);
                        updateTestimonials(updated);
                        triggerNotify('Review removed');
                      }}
                      className="text-xs text-[#525252] hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={t.patientNameEn}
                      onChange={(e) => {
                        const copy = [...testimonialsList];
                        copy[idx].patientNameEn = e.target.value;
                        setTestimonialsList(copy);
                        updateTestimonials(copy);
                      }}
                      className="px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-white"
                      placeholder="Patient (En)"
                    />
                    <input
                      type="text"
                      value={t.patientNameAr}
                      onChange={(e) => {
                        const copy = [...testimonialsList];
                        copy[idx].patientNameAr = e.target.value;
                        setTestimonialsList(copy);
                        updateTestimonials(copy);
                      }}
                      className="px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-white"
                      placeholder="اسم المريض (عربي)"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={t.reviewEn}
                    onChange={(e) => {
                      const copy = [...testimonialsList];
                      copy[idx].reviewEn = e.target.value;
                      setTestimonialsList(copy);
                      updateTestimonials(copy);
                    }}
                    className="w-full px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-[#A8A8A8]"
                    placeholder="Review text"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: FAQ Editor */}
        {activeTab === 'faq' && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {language === 'ar' ? 'إدارة الأسئلة الشائعة (FAQ)' : 'Frequently Asked Questions'}
                </h3>
                <p className="text-xs text-[#A8A8A8]">
                  {language === 'ar' ? 'إضافة وتعديل الأسئلة والأجوبة.' : 'Manage accordion questions and answers.'}
                </p>
              </div>

              <button
                onClick={() => {
                  const newFaq: FaqItem = {
                    id: `faq-${Date.now()}`,
                    questionEn: 'What payment plans are available?',
                    questionAr: 'ما هي خيارات السداد المتاحة؟',
                    answerEn: 'Flexible clinical arrangements and digital payments are supported.',
                    answerAr: 'نوفر خيارات دفع مرنة وتسهيلات تناسب مختلف الإجراءات.',
                  };
                  const updated = [...faqsList, newFaq];
                  setFaqsList(updated);
                  updateFaqs(updated);
                  triggerNotify('FAQ added');
                }}
                className="px-4 py-2 bg-[#D71920] text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'ar' ? 'إضافة سؤال' : 'Add FAQ'}</span>
              </button>
            </div>

            <div className="space-y-4">
              {faqsList.map((faq, idx) => (
                <div key={faq.id} className="bg-[#141414] border border-[#262626] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#D71920]">QUESTION 0{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = faqsList.filter((f) => f.id !== faq.id);
                        setFaqsList(updated);
                        updateFaqs(updated);
                        triggerNotify('FAQ removed');
                      }}
                      className="text-xs text-[#525252] hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={faq.questionEn}
                    onChange={(e) => {
                      const copy = [...faqsList];
                      copy[idx].questionEn = e.target.value;
                      setFaqsList(copy);
                      updateFaqs(copy);
                    }}
                    className="w-full px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-white font-bold"
                    placeholder="Question (En)"
                  />
                  <textarea
                    rows={2}
                    value={faq.answerEn}
                    onChange={(e) => {
                      const copy = [...faqsList];
                      copy[idx].answerEn = e.target.value;
                      setFaqsList(copy);
                      updateFaqs(copy);
                    }}
                    className="w-full px-3 py-1.5 bg-[#0B0B0B] rounded-lg border border-[#262626] text-xs text-[#A8A8A8]"
                    placeholder="Answer (En)"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Clinic Contact & Socials */}
        {activeTab === 'contact' && (
          <div className="pt-8 max-w-3xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">
                {language === 'ar' ? 'تعديل بيانات التواصل والعيادة' : 'Clinic Contact & Locations'}
              </h3>
              <p className="text-xs text-[#A8A8A8]">
                {language === 'ar'
                  ? 'قم بتحديث عنوان العيادة، رقم الهاتف، الواتساب، والروابط.'
                  : 'Update clinic phone number, WhatsApp link, physical address, and hours.'}
              </p>
            </div>

            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1">
                    Phone [Phone Placeholder]
                  </label>
                  <input
                    type="text"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1">
                    WhatsApp [WhatsApp Placeholder]
                  </label>
                  <input
                    type="text"
                    value={contactForm.whatsapp}
                    onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1">
                  Email [Email Placeholder]
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1">
                    Address (English)
                  </label>
                  <input
                    type="text"
                    value={contactForm.addressEn}
                    onChange={(e) => setContactForm({ ...contactForm, addressEn: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1">
                    العنوان (بالعربية)
                  </label>
                  <input
                    type="text"
                    value={contactForm.addressAr}
                    onChange={(e) => setContactForm({ ...contactForm, addressAr: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1">
                    Working Hours (English)
                  </label>
                  <input
                    type="text"
                    value={contactForm.workingHoursEn}
                    onChange={(e) => setContactForm({ ...contactForm, workingHoursEn: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A8A8A8] mb-1">
                    مواعيد العمل (بالعربية)
                  </label>
                  <input
                    type="text"
                    value={contactForm.workingHoursAr}
                    onChange={(e) => setContactForm({ ...contactForm, workingHoursAr: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0B0B0B] rounded-xl border border-[#262626] text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => {
                    updateClinicContact(contactForm);
                    triggerNotify(language === 'ar' ? 'تم تحديث بيانات التواصل' : 'Contact info updated');
                  }}
                  className="px-6 py-3 bg-[#D71920] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{language === 'ar' ? 'حفظ البيانات' : 'SAVE CONTACT DETAILS'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
