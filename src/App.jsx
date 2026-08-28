import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { OfflineProvider } from './context/OfflineContext';
import { HealthDataProvider, useHealthData } from './context/HealthDataContext';
import { Navbar } from './components/common/Navbar';
import { OfflineStatusBar } from './components/common/OfflineStatusBar';
import { Footer } from './components/common/Footer';
import { TeleconsultationHub } from './components/teleconsultation/TeleconsultationHub';
import { EpidemicRadar } from './components/epidemic/EpidemicRadar';
import { MaternalChildHub } from './components/maternal/MaternalChildHub';
import { ChatbotSection } from './components/chatbot/ChatbotSection';
import { ChatbotWidget } from './components/chatbot/ChatbotWidget';

const AppContent = () => {
  const { activeTab } = useHealthData();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Offline Alert & Sync Bar */}
      <OfflineStatusBar />

      {/* Main App Content View Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'teleconsult' && <TeleconsultationHub />}
        {activeTab === 'epidemic' && <EpidemicRadar />}
        {activeTab === 'maternal' && <MaternalChildHub />}
        {activeTab === 'chatbot' && <ChatbotSection />}
      </main>

      {/* Floating Chat Assistant Widget */}
      <ChatbotWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <OfflineProvider>
        <HealthDataProvider>
          <AppContent />
        </HealthDataProvider>
      </OfflineProvider>
    </LanguageProvider>
  );
}
