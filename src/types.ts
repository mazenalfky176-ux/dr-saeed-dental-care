export type Language = 'ar' | 'en';

export interface DoctorProfile {
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  degreeEn: string;
  degreeAr: string;
  universityEn: string;
  universityAr: string;
  experienceEn: string;
  experienceAr: string;
  certificationsEn: string;
  certificationsAr: string;
  specializationEn: string;
  specializationAr: string;
  bioEn: string;
  bioAr: string;
  photoUrl: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  nameEn: string;
  nameAr: string;
  shortDescEn: string;
  shortDescAr: string;
  fullDescEn: string;
  fullDescAr: string;
  durationEn: string;
  durationAr: string;
  sessionsEn?: string;
  sessionsAr?: string;
  candidateEn: string;
  candidateAr: string;
  benefitsEn: string[];
  benefitsAr: string[];
  icon: string;
}

export interface CaseStudy {
  id: string;
  caseNumber: string;
  titleEn: string;
  titleAr: string;
  treatmentEn: string;
  treatmentAr: string;
  beforeImage: string;
  afterImage: string;
  overviewEn: string;
  overviewAr: string;
  doctorNotesEn: string;
  doctorNotesAr: string;
  durationEn?: string;
  durationAr?: string;
  materialsEn?: string;
  materialsAr?: string;
  isPlaceholder?: boolean;
}

export interface TechnologyItem {
  id: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  featureEn: string;
  featureAr: string;
  icon: string;
}

export interface JourneyStep {
  number: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  durationEn: string;
  durationAr: string;
}

export interface Testimonial {
  id: string;
  patientNameEn: string;
  patientNameAr: string;
  treatmentEn: string;
  treatmentAr: string;
  rating: number;
  reviewEn: string;
  reviewAr: string;
  isDemo?: boolean;
}

export type TestimonialItem = Testimonial;

export interface FaqItem {
  id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export interface ClinicContact {
  addressEn: string;
  addressAr: string;
  phone: string;
  whatsapp: string;
  email: string;
  workingHoursEn: string;
  workingHoursAr: string;
  instagramUrl: string;
  facebookUrl: string;
}

export interface WebsiteStats {
  patientsCount: string;
  yearsExperience: string;
  casesCount: string;
  servicesCount: string;
}

export type AppointmentStatus = 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface AppointmentRequest {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: AppointmentStatus;
  createdAt: string;
  notes?: string;
}

export interface WebsiteContent {
  heroTitleEn: string;
  heroTitleAr: string;
  heroSubtitleEn: string;
  heroSubtitleAr: string;
  philosophyTitleEn: string;
  philosophyTitleAr: string;
  philosophyDescEn: string;
  philosophyDescAr: string;
}
