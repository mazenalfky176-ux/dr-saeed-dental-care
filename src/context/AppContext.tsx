import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  DoctorProfile,
  ServiceItem,
  CaseStudy,
  Testimonial,
  FaqItem,
  ClinicContact,
  WebsiteStats,
  AppointmentRequest,
  WebsiteContent,
  AppointmentStatus,
} from '../types';
import {
  initialDoctorProfile,
  initialServices,
  initialCaseStudies,
  initialStatistics,
  initialTestimonials,
  initialFaqs,
  initialClinicContact,
  initialWebsiteContent,
  initialAppointments,
} from '../data/initialData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  direction: 'rtl' | 'ltr';
  activeView: 'home' | 'admin';
  setActiveView: (view: 'home' | 'admin') => void;
  
  // Modals
  selectedService: ServiceItem | null;
  setSelectedService: (service: ServiceItem | null) => void;
  selectedCase: CaseStudy | null;
  setSelectedCase: (caseStudy: CaseStudy | null) => void;
  isBioOpen: boolean;
  setIsBioOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  prefilledTreatment: string;
  setPrefilledTreatment: (treatment: string) => void;
  openBookingWithTreatment: (treatment: string) => void;

  // Cursor state
  cursorText: string;
  setCursorText: (text: string) => void;

  // Managed Data
  doctorProfile: DoctorProfile;
  updateDoctorProfile: (profile: Partial<DoctorProfile>) => void;
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id' | 'number'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  caseStudies: CaseStudy[];
  addCaseStudy: (caseStudy: Omit<CaseStudy, 'id' | 'caseNumber'>) => void;
  updateCaseStudy: (id: string, caseStudy: Partial<CaseStudy>) => void;
  deleteCaseStudy: (id: string) => void;
  statistics: WebsiteStats;
  updateStatistics: (stats: Partial<WebsiteStats>) => void;
  testimonials: Testimonial[];
  addTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  faqs: FaqItem[];
  updateFaq: (id: string, faq: Partial<FaqItem>) => void;
  clinicContact: ClinicContact;
  updateClinicContact: (contact: Partial<ClinicContact>) => void;
  websiteContent: WebsiteContent;
  updateWebsiteContent: (content: Partial<WebsiteContent>) => void;

  // Appointments
  appointments: AppointmentRequest[];
  submitAppointment: (appointment: Omit<AppointmentRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  updateAppointmentNotes: (id: string, notes: string) => void;
  deleteAppointment: (id: string) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'drelmaghlany_lang',
  DOCTOR: 'drelmaghlany_doctor',
  SERVICES: 'drelmaghlany_services',
  CASES: 'drelmaghlany_cases',
  STATS: 'drelmaghlany_stats',
  TESTIMONIALS: 'drelmaghlany_testimonials',
  FAQS: 'drelmaghlany_faqs',
  CONTACT: 'drelmaghlany_contact',
  CONTENT: 'drelmaghlany_content',
  APPOINTMENTS: 'drelmaghlany_appointments',
  ADMIN_AUTH: 'drelmaghlany_admin_auth',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default language is Arabic
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return saved === 'en' ? 'en' : 'ar';
  });

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    localStorage.setItem(STORAGE_KEYS.LANG, language);
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // View state
  const [activeView, setActiveView] = useState<'home' | 'admin'>('home');

  // Modals state
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [prefilledTreatment, setPrefilledTreatment] = useState('');

  // Cursor state
  const [cursorText, setCursorText] = useState('');

  const openBookingWithTreatment = (treatment: string) => {
    setPrefilledTreatment(treatment);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingModalOpen(true);
    }
  };

  // Managed Data with LocalStorage Persistence
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DOCTOR);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.photoUrl || parsed.photoUrl.includes('unsplash') || parsed.photoUrl.includes('placeholder')) {
          parsed.photoUrl = initialDoctorProfile.photoUrl;
        }
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return initialDoctorProfile;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (saved) {
      try {
        const parsed: ServiceItem[] = JSON.parse(saved);
        const filtered = parsed.filter((s) => s.id !== 'dental-implants' && s.id !== 'orthodontics');
        if (filtered.length > 0) return filtered;
      } catch (e) {
        console.error(e);
      }
    }
    return initialServices;
  });

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CASES);
    return saved ? JSON.parse(saved) : initialCaseStudies;
  });

  const [statistics, setStatistics] = useState<WebsiteStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : initialStatistics;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
    return saved ? JSON.parse(saved) : initialFaqs;
  });

  const [clinicContact, setClinicContact] = useState<ClinicContact>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTACT);
    return saved ? JSON.parse(saved) : initialClinicContact;
  });

  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTENT);
    return saved ? JSON.parse(saved) : initialWebsiteContent;
  });

  const [appointments, setAppointments] = useState<AppointmentRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // Sync back to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCTOR, JSON.stringify(doctorProfile));
  }, [doctorProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(caseStudies));
  }, [caseStudies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(statistics));
  }, [statistics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(clinicContact));
  }, [clinicContact]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(websiteContent));
  }, [websiteContent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  // Actions
  const updateDoctorProfile = (updated: Partial<DoctorProfile>) => {
    setDoctorProfile((prev) => ({ ...prev, ...updated }));
  };

  const addService = (newServiceData: Omit<ServiceItem, 'id' | 'number'>) => {
    const num = (services.length + 1).toString().padStart(2, '0');
    const newService: ServiceItem = {
      ...newServiceData,
      id: `service-${Date.now()}`,
      number: num,
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addCaseStudy = (newCaseData: Omit<CaseStudy, 'id' | 'caseNumber'>) => {
    const num = `CASE ${(caseStudies.length + 1).toString().padStart(2, '0')}`;
    const newCase: CaseStudy = {
      ...newCaseData,
      id: `case-${Date.now()}`,
      caseNumber: num,
    };
    setCaseStudies((prev) => [...prev, newCase]);
  };

  const updateCaseStudy = (id: string, updated: Partial<CaseStudy>) => {
    setCaseStudies((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteCaseStudy = (id: string) => {
    setCaseStudies((prev) => prev.filter((c) => c.id !== id));
  };

  const updateStatistics = (stats: Partial<WebsiteStats>) => {
    setStatistics((prev) => ({ ...prev, ...stats }));
  };

  const addTestimonial = (t: Omit<Testimonial, 'id'>) => {
    const newT: Testimonial = {
      ...t,
      id: `t-${Date.now()}`,
    };
    setTestimonials((prev) => [newT, ...prev]);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const updateFaq = (id: string, updated: Partial<FaqItem>) => {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
  };

  const updateClinicContact = (contact: Partial<ClinicContact>) => {
    setClinicContact((prev) => ({ ...prev, ...contact }));
  };

  const updateWebsiteContent = (content: Partial<WebsiteContent>) => {
    setWebsiteContent((prev) => ({ ...prev, ...content }));
  };

  const submitAppointment = (data: Omit<AppointmentRequest, 'id' | 'status' | 'createdAt'>) => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newAppointment: AppointmentRequest = {
      ...data,
      id: `apt-${Date.now()}`,
      status: 'New',
      createdAt: formatted,
    };
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const updateAppointmentNotes = (id: string, notes: string) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, notes } : a)));
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const loginAdmin = (pass: string) => {
    // Public portfolio builds must not contain hardcoded administrative credentials.
    // Set VITE_ADMIN_PASSWORD in a private deployment environment to enable the dashboard.
    const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (configuredPassword && pass === configuredPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  const resetToDefaults = () => {
    setDoctorProfile(initialDoctorProfile);
    setServices(initialServices);
    setCaseStudies(initialCaseStudies);
    setStatistics(initialStatistics);
    setTestimonials(initialTestimonials);
    setFaqs(initialFaqs);
    setClinicContact(initialClinicContact);
    setWebsiteContent(initialWebsiteContent);
    setAppointments(initialAppointments);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        direction,
        activeView,
        setActiveView,
        selectedService,
        setSelectedService,
        selectedCase,
        setSelectedCase,
        isBioOpen,
        setIsBioOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        prefilledTreatment,
        setPrefilledTreatment,
        openBookingWithTreatment,
        cursorText,
        setCursorText,
        doctorProfile,
        updateDoctorProfile,
        services,
        addService,
        updateService,
        deleteService,
        caseStudies,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        statistics,
        updateStatistics,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        faqs,
        updateFaq,
        clinicContact,
        updateClinicContact,
        websiteContent,
        updateWebsiteContent,
        appointments,
        submitAppointment,
        updateAppointmentStatus,
        updateAppointmentNotes,
        deleteAppointment,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
