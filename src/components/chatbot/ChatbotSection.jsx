import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Send,
  Sparkles,
  User
} from 'lucide-react';
import { getQuickPrompts, findBotResponse } from '../../data/chatbotKnowledge';
import { useLanguage } from '../../context/LanguageContext';
import { useHealthData } from '../../context/HealthDataContext';
import { AudioVoiceButton } from '../common/AudioVoiceButton';

export const ChatbotSection = () => {
  const { t, currentLang } = useLanguage();
  const { setIsNewCaseModalOpen } = useHealthData();
  const navigate = useNavigate();

  const initialBotWelcome = findBotResponse('', currentLang);

  const [messages, setMessages] = useState([
    {
      id: 'msg-0',
      sender: 'bot',
      title: initialBotWelcome.title,
      content: initialBotWelcome.content,
      action: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Update initial welcome message when language changes if no conversation happened yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'bot') {
      const localizedWelcome = findBotResponse('', currentLang);
      setMessages([
        {
          id: 'msg-0',
          sender: 'bot',
          title: localizedWelcome.title,
          content: localizedWelcome.content,
          action: null,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [currentLang]);

  const quickPrompts = getQuickPrompts(currentLang);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (queryText = null) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate instant yet realistic AI reasoning delay (450ms)
    setTimeout(() => {
      const botResponse = findBotResponse(textToSend, currentLang);
      const newBotMsg = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        title: botResponse.title,
        severity: botResponse.severity,
        content: botResponse.content,
        action: botResponse.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action) => {
    if (!action) return;
    if (action.type === 'navigate') {
      if (action.value === 'teleconsult_new') {
        navigate('/teleconsult');
        setIsNewCaseModalOpen(true);
      } else if (action.value === 'epidemic') {
        navigate('/epidemic');
      } else if (action.value === 'maternal_mom' || action.value === 'maternal_child') {
        navigate('/maternal-child');
      }
    } else if (action.type === 'call') {
      window.location.href = `tel:${action.value}`;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-brand-deep via-[#5c0d24] to-stone-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-rose-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-rose-200 text-xs font-bold border border-brand-primary/30">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span>{t('offlineDecisionTreeBanner', '100% Offline Standalone AI • Diagnostic First-Aid Decision Trees')}</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t('chatTitle', 'Sahay Saathi (Health Assistant)')}
            </h2>
            <AudioVoiceButton
              text={`${t('chatTitle')}. ${t('chatSubtitle')}`}
              size="md"
              className="bg-white/20 text-white border-white/30"
            />
          </div>

          <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-medium">
            {t(
              'chatSubtitle',
              '24/7 Vernacular Health & Emergency Assistant. Provides life-saving first-aid protocols, triage advice, and easy app navigation for rural families.'
            )}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-xs space-y-1 self-start text-left shrink-0">
          <span className="font-bold text-rose-300 block">🚑 {t('call108Direct', 'Emergency Helplines')}:</span>
          <p className="text-[11px] text-white">{t('pathwayEmergency', 'Ambulance')}: <strong>108</strong></p>
          <p className="text-[11px] text-white">{t('pathwayDoctor', 'Health Helpline')}: <strong>104</strong></p>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-3xl border border-cream-border shadow-sm overflow-hidden flex flex-col h-[650px]">
        
        {/* Quick Emergency Topic Chips Bar */}
        <div className="bg-cream-panel border-b border-cream-border p-3 sm:p-4 overflow-x-auto text-left">
          <div className="flex items-center gap-2 text-xs text-text-muted font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span>{t('quickPromptsLabel', 'Quick Rural Health Questions & Emergency Chips')}:</span>
          </div>
          <div className="flex gap-2 min-w-max pb-1">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt.query)}
                className="px-3.5 py-1.5 rounded-xl bg-white text-text-dark hover:text-brand-primary hover:bg-rose-50 border border-cream-border hover:border-brand-primary/40 text-xs font-bold transition-all shadow-2xs hover:shadow-xs whitespace-nowrap"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-cream-bg/30">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm ${
                    isBot
                      ? 'bg-brand-primary ring-2 ring-rose-400/20'
                      : 'bg-stone-800'
                  }`}
                >
                  {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-xl rounded-3xl p-4 sm:p-5 shadow-sm space-y-2.5 text-left ${
                    isBot
                      ? 'bg-white border border-cream-border text-text-dark'
                      : 'bg-brand-primary text-white'
                  }`}
                >
                  {/* Bot Message Header */}
                  {isBot && (
                    <div className="flex items-center justify-between border-b border-cream-border/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-text-dark">
                          {msg.title || t('appTitle', 'Sahay Saathi')}
                        </span>
                        {msg.severity && (
                          <span className="bg-rose-50 text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-100">
                            {msg.severity}
                          </span>
                        )}
                      </div>
                      <AudioVoiceButton text={`${msg.title}. ${msg.content}`} size="sm" />
                    </div>
                  )}

                  {/* Body Content with formatted line breaks */}
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {msg.content}
                  </div>

                  {/* Optional Action Button */}
                  {msg.action && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleActionClick(msg.action)}
                        className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-deep text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
                      >
                        <span>{msg.action.label}</span>
                      </button>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div
                    className={`text-[10px] ${
                      isBot ? 'text-text-muted' : 'text-rose-200 text-right'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-brand-primary flex items-center justify-center text-white shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-cream-border rounded-2xl px-4 py-3 shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-cream-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={t('chatPlaceholder', 'Ask about symptoms, first-aid, vaccines or doctor consultation...')}
              className="flex-1 px-4 py-3 rounded-2xl border border-cream-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary bg-[#fdfbf7] font-medium text-text-dark placeholder-stone-400"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="flex items-center gap-1.5 bg-brand-primary hover:bg-brand-deep text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t('chatSend', 'Ask Saathi')}</span>
            </button>
          </form>

          <p className="text-[10px] text-text-muted text-center mt-2">
            {t(
              'emergencyDisclaimer',
              'Sahay Saathi AI provides offline first-aid & triage decision support. In critical life-threatening emergency, call 108 immediately.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
