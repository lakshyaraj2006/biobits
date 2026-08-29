import React from 'react';
import { PhoneCall, Heart, Shield, Database } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1c1917] text-stone-300 pt-10 pb-8 mt-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Emergency Helpline Strip */}
        <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 sm:p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 animate-bounce text-rose-500" />
              <span>National Rural Health Emergency Helplines (24x7 Toll-Free)</span>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Tap any helpline number to initiate emergency phone call from your mobile device.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="tel:108"
              className="flex items-center gap-2 bg-brand-primary hover:bg-brand-deep text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <span>🚑 108 Emergency Ambulance</span>
            </a>
            <a
              href="tel:104"
              className="flex items-center gap-2 bg-stone-700 hover:bg-stone-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <span>🩺 104 Health Helpline</span>
            </a>
            <a
              href="tel:1098"
              className="flex items-center gap-2 bg-stone-700 hover:bg-stone-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <span>👶 1098 Childline India</span>
            </a>
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-800">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-primary flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="text-lg font-extrabold text-white">
                Sahay <span className="text-brand-light text-sm font-semibold opacity-70">Coordination Network</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-lg">
              Serving as the coordination layer between family and the health ecosystem in India. Providing verified facility routing, local Sahay Mitra support, emergency transport alignment, and offline-first case history.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] text-stone-400">
              <span className="flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-brand-primary" />
                Offline-First Data Storage
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-brand-primary" />
                ABDM & NHM Data Privacy
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">Core Coordination Services</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="hover:text-brand-primary transition-colors cursor-pointer">• Emergency Routing & Operators</li>
              <li className="hover:text-brand-primary transition-colors cursor-pointer">• Verified Hospitals & Live Status</li>
              <li className="hover:text-brand-primary transition-colors cursor-pointer">• Community Blood & e-RaktKosh</li>
              <li className="hover:text-brand-primary transition-colors cursor-pointer">• Sahay Mitra Local Face</li>
              <li className="hover:text-brand-primary transition-colors cursor-pointer">• Primary Care Guidance & Doctor Queue</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">Hackathon Details</h4>
            <div className="bg-stone-900/60 p-3.5 rounded-xl border border-stone-800 text-xs space-y-1.5">
              <p className="text-brand-primary font-bold">Smart India Hackathon (SIH)</p>
              <p className="text-stone-300 font-medium">Problem Statement: 133</p>
              <p className="text-stone-400 text-[11px]">Theme: MedTech</p>
              <p className="text-rose-300 font-semibold pt-1">Designed by: Team BioBits</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Sahay Network. Designed for Smart India Hackathon. Made for rural healthcare coordination in India.</p>
          <div className="flex items-center gap-2 text-stone-400">
            <span>Built with React & Tailwind CSS</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-brand-primary">
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              For Indian Villages
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
