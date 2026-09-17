import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { PhilosophySection } from './sections/PhilosophySection';
import { AboutDoctorSection } from './sections/AboutDoctorSection';
import { ServicesSection } from './sections/ServicesSection';
import { FeaturedTreatmentsSection } from './sections/FeaturedTreatmentsSection';
import { BeforeAfterSection } from './sections/BeforeAfterSection';
import { StatisticsSection } from './sections/StatisticsSection';
import { TechnologySection } from './sections/TechnologySection';
import { PatientJourneySection } from './sections/PatientJourneySection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FaqSection } from './sections/FaqSection';
import { BookingSection } from './sections/BookingSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { CaseDetailModal } from './components/CaseDetailModal';
import { DoctorBioModal } from './components/DoctorBioModal';
import { AdminDashboard } from './sections/AdminDashboard';

const MainLayout: React.FC = () => {
  const { activeView } = useApp();
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F4F0] relative selection:bg-[#D71920] selection:text-white">
      {/* Cinematic Initial Preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Luxury Custom Cursor (Desktop) */}
      <CustomCursor />

      {/* Global Modals */}
      <ServiceDetailModal />
      <CaseDetailModal />
      <DoctorBioModal />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Area */}
      {activeView === 'admin' ? (
        <AdminDashboard />
      ) : (
        <main>
          <HeroSection />
          <MarqueeSection />
          <PhilosophySection />
          <AboutDoctorSection />
          <ServicesSection />
          <FeaturedTreatmentsSection />
          <BeforeAfterSection />
          <StatisticsSection />
          <TechnologySection />
          <PatientJourneySection />
          <TestimonialsSection />
          <FaqSection />
          <BookingSection />
          <ContactSection />
          <Footer />
        </main>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
