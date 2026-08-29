import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';

export const ChatbotWidget = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/chatbot') return null; // Don't show floating button if already on chatbot route

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => navigate('/chatbot')}
        className="group flex items-center gap-2.5 bg-gradient-to-r from-brand-primary to-brand-deep hover:from-brand-deep hover:to-stone-900 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-rose-950/40 hover:scale-105 active:scale-95 transition-all ring-4 ring-rose-400/20"
        title="Open AI Health Assistant"
        aria-label="Open Sahay Saathi"
      >
        <div className="relative">
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-300 rounded-full border-2 border-brand-primary"></span>
        </div>
        <div className="hidden sm:block text-left">
          <span className="text-xs font-extrabold block leading-tight">
            Sahay Saathi AI
          </span>
          <span className="text-[10px] text-rose-200 block font-medium">
            24/7 Health Assistant
          </span>
        </div>
      </button>
    </div>
  );
};
