import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../translations/translations';
import { speakText, stopSpeech } from '../utils/speechUtils';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('biobits_lang') || 'en';
  });
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    localStorage.setItem('biobits_lang', currentLang);
  }, [currentLang]);

  const t = (key, fallback = '') => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || fallback || key;
  };

  const speak = (text) => {
    setIsAudioPlaying(true);
    speakText(
      text,
      currentLang,
      () => setIsAudioPlaying(true),
      () => setIsAudioPlaying(false)
    );
  };

  const stop = () => {
    stopSpeech();
    setIsAudioPlaying(false);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLanguage: setCurrentLang,
        languages: LANGUAGES,
        t,
        speak,
        stopSpeech: stop,
        isAudioPlaying,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
