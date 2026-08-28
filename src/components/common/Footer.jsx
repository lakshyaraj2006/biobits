import React from 'react';
import { PhoneCall, Heart, Shield, Sparkles, Database, FileCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 pb-8 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Emergency Helpline Strip */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>National Rural Health Emergency Helplines (24x7 Toll-Free)</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Tap any helpline number to initiate emergency phone call from your mobile device.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="tel:108"
              className="flex items-center gap-2 bg-rose-600/90 hover:bg-rose-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <span>🚑 108 Emergency Ambulance</span>
            </a>
            <a
              href="tel:104"
              className="flex items-center gap-2 bg-emerald-700/90 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <span>🩺 104 Health Helpline</span>
            </a>
            <a
              href="tel:1098"
              className="flex items-center gap-2 bg-sky-700/90 hover:bg-sky-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <span>👶 1098 Childline India</span>
            </a>
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                BB
              </div>
              <span className="text-lg font-extrabold text-white">
                Bio<span className="text-emerald-400">Bits</span> Swasthya
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Empowering rural and underserved populations across India with store-and-forward asynchronous teleconsultation, real-time syndromic epidemic surveillance, maternal ANC tracking, and multilingual layman-accessible health assistance.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                Offline-First Local Storage Engine
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                ABDM & NHM Data Privacy
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Core Capabilities</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">• Asynchronous Teleconsultation</li>
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">• Village Epidemic Early-Warning</li>
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">• Janani & Shishu Immunization</li>
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">• BioBits Saathi Vernacular AI</li>
              <li className="hover:text-emerald-300 transition-colors cursor-pointer">• 7 Indian Languages with Voice</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Hackathon Details</h4>
            <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 text-xs space-y-1.5">
              <p className="text-emerald-400 font-bold">Smart India Hackathon (SIH)</p>
              <p className="text-slate-300 font-medium">Problem Statement: 133</p>
              <p className="text-slate-400 text-[11px]">Theme: MedTech</p>
              <p className="text-teal-300 font-semibold pt-1">Designed by: Team BioBits</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 BioBits Swasthya. Designed for Smart India Hackathon. Made for rural healthcare access in India.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Built with React & Tailwind CSS</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              For Indian Villages
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
