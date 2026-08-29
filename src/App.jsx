import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { OfflineProvider } from './context/OfflineContext';
import { HealthDataProvider } from './context/HealthDataContext';
import { Navbar } from './components/common/Navbar';
import { OfflineStatusBar } from './components/common/OfflineStatusBar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { TeleconsultationHub } from './components/teleconsultation/TeleconsultationHub';
import { EpidemicRadar } from './components/epidemic/EpidemicRadar';
import { MaternalChildHub } from './components/maternal/MaternalChildHub';
import { ChatbotSection } from './components/chatbot/ChatbotSection';
import { ChatbotWidget } from './components/chatbot/ChatbotWidget';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-bg selection:bg-brand-primary selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Offline Alert & Sync Bar */}
      <OfflineStatusBar />

      {/* Main Routed Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teleconsult" element={<TeleconsultationHub />} />
          <Route path="/epidemic" element={<EpidemicRadar />} />
          <Route path="/maternal-child" element={<MaternalChildHub />} />
          <Route path="/chatbot" element={<ChatbotSection />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Floating 1-Tap AI Chat Assistant Widget */}
      <ChatbotWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <OfflineProvider>
          <HealthDataProvider>
            <AppLayout />
          </HealthDataProvider>
        </OfflineProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
