import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../translations/translations';
import { speakText, stopSpeech } from '../utils/speechUtils';

const LanguageContext = createContext();

/*
 * Some legacy components in the prototype contain literal English labels
 * instead of calling t(). Keep those features intact, but make the existing
 * translation dictionary apply to those labels as well. This bridge only
 * replaces exact text/placeholder/title matches that already exist in the
 * English translation dictionary, so it cannot invent or alter application
 * behaviour.
 */
const translateRenderedUi = (lang) => {
  if (typeof document === 'undefined') return () => {};

  const source = TRANSLATIONS.en || {};
  const target = TRANSLATIONS[lang] || source;
  if (lang === 'en') return () => {};

  const dictionary = new Map();
  Object.keys(source).forEach((key) => {
    const english = source[key];
    const localized = target[key];
    if (typeof english === 'string' && typeof localized === 'string' && english && localized && english !== localized) {
      dictionary.set(english.trim(), localized);
    }
  });

  if (!dictionary.size) return () => {};

  const translateNode = (node) => {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    const parent = node.parentElement;
    if (!parent) return;
    const tag = parent.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA') return;

    const original = node.nodeValue || '';
    const trimmed = original.trim();
    if (!trimmed || !dictionary.has(trimmed)) return;

    const localized = dictionary.get(trimmed);
    const leading = original.match(/^\\s*/)?.[0] || '';
    const trailing = original.match(/\\s*$/)?.[0] || '';
    node.nodeValue = `${leading}${localized}${trailing}`;
  };

  const translateElementAttributes = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
    ['placeholder', 'title', 'aria-label'].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value) return;
      const localized = dictionary.get(value.trim());
      if (localized) element.setAttribute(attribute, localized);
    });
  };

  const translateTree = (root) => {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root !== document.body) return;

    translateElementAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let current;
    while ((current = walker.nextNode())) nodes.push(current);
    nodes.forEach(translateNode);
  };

  translateTree(document.body);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => translateTree(node));
      if (mutation.type === 'characterData') translateNode(mutation.target);
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  return () => observer.disconnect();
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('biobits_lang') || 'en';
  });
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    localStorage.setItem('biobits_lang', currentLang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLang;
    }
    return translateRenderedUi(currentLang);
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
