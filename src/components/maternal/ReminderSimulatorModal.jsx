import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  PhoneCall,
  Send,
  CheckCircle2,
  Sparkles,
  Volume2,
  Calendar,
  Heart
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { AudioVoiceButton } from '../common/AudioVoiceButton';

export const ReminderSimulatorModal = ({ recipient, isOpen, onClose }) => {
  const { currentLang, t } = useLanguage();
  const [channel, setChannel] = useState('sms'); // 'sms' | 'whatsapp' | 'call'
  const [isSent, setIsSent] = useState(false);

  if (!isOpen || !recipient) return null;

  const isMother = Boolean(recipient.lmpDate);

  const smsText = isMother
    ? `Namaste ${recipient.name} ji! Your ANC-3 Pregnancy Checkup is due on 30-Aug at Rampur Sub-Centre. Please carry your MCP Card and take your daily Iron tablet after dinner. - ASHA Health Team, BioBits.`
    : `Namaste ${recipient.motherName} ji! Baby ${recipient.name}'s Pentavalent-3 & Rotavirus-3 vaccine is due today at Rampur Anganwadi. Vaccines protect your baby from 5 deadly diseases. - BioBits Health Mission.`;

  const voiceCallScript = isMother
    ? `Namaste ${recipient.name} ji, this is an automated reminder from your village Primary Health Centre. Your upcoming prenatal health checkup is due this week. Please visit your ASHA worker for blood pressure and hemoglobin testing.`
    : `Namaste ${recipient.motherName} ji. Baby ${recipient.name}'s essential immunization doses are scheduled for today. Please visit the Anganwadi centre with your child immunization card.`;

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10">
              <MessageSquare className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Dispatch Vernacular Health Reminder
              </h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                To: {recipient.name} ({recipient.phone || '+91 98765 43210'})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Channel Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Select Reminder Delivery Channel:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setChannel('sms')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  channel === 'sms'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>💬 Vernacular SMS</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel('whatsapp')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  channel === 'whatsapp'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>📱 WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setChannel('call')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  channel === 'call'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>📞 Automated IVR Call</span>
              </button>
            </div>
          </div>

          {/* Simulated Message Preview Phone Mockup */}
          <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-b border-slate-200 pb-2">
              <span>Preview: {channel.toUpperCase()} Message</span>
              <AudioVoiceButton
                text={channel === 'call' ? voiceCallScript : smsText}
                label="Listen Audio"
                size="sm"
              />
            </div>

            {channel === 'call' ? (
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>Automated Voice Call (Dialing +91 {recipient.phone?.slice(-10)})</span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed italic bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                  "{voiceCallScript}"
                </p>
                <span className="text-[10px] text-slate-500 block">
                  Plays in patient's selected local dialect (Hindi / Bengali / Odia / Telugu / Tamil / Marathi).
                </span>
              </div>
            ) : (
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800">
                  <span>From: NHM-BioBits Health</span>
                  <span className="text-[10px] text-slate-400">Just Now</span>
                </div>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {smsText}
                </p>
                <div className="text-right text-[10px] text-slate-400">
                  ✓✓ Delivered
                </div>
              </div>
            )}
          </div>

          {/* Success state banner if dispatched */}
          {isSent && (
            <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Reminder dispatched successfully to {recipient.phone}!</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            {t('cancel', 'Cancel')}
          </button>

          <button
            onClick={handleSend}
            disabled={isSent}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md shadow-emerald-600/30 hover:opacity-95 transition-opacity"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSent ? 'Sending...' : 'Send Reminder Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
