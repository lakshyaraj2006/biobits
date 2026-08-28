import React, { useState } from 'react';
import { Bot, X, MessageSquare, Sparkles } from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';
import { useLanguage } from '../../context/LanguageContext';

export const ChatbotWidget = () => {
  const { activeTab, setActiveTab } = useHealthData();
  const { t } = useLanguage();

  if (activeTab === 'chatbot') return null; // Don't show floating button if already on chatbot tab

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => setActiveTab('chatbot')}
        className="group flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-emerald-700/40 hover:scale-105 active:scale-95 transition-all ring-4 ring-emerald-400/20"
        title="Open AI Health Assistant"
        aria-label="Open BioBits Swasthya Saathi"
      >
        <div className="relative">
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full border-2 border-emerald-700"></span>
        </div>
        <div className="hidden sm:block text-left">
          <span className="text-xs font-extrabold block leading-tight">
            Swasthya Saathi AI
          </span>
          <span className="text-[10px] text-emerald-200 block font-medium">
            24/7 Health Assistant
          </span>
        </div>
      </button>
    </div>
  );
};
