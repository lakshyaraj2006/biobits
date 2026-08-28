// Speech synthesis utility for vernacular audio readouts across rural Indian languages

const LANG_VOICE_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  mr: 'mr-IN',
  or: 'hi-IN', // Odia fallback to Indian accent Hindi voice if or-IN not available
};

let currentUtterance = null;

export const speakText = (text, lang = 'en', onStart = null, onEnd = null) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported by this browser.');
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!text || text.trim() === '') {
    if (onEnd) onEnd();
    return;
  }

  const cleanText = text.replace(/[*_#`[\]()]/g, '').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  currentUtterance = utterance;

  const targetLang = LANG_VOICE_MAP[lang] || 'en-IN';
  utterance.lang = targetLang;
  utterance.rate = 0.92; // Slightly relaxed rate for rural comprehension
  utterance.pitch = 1.0;

  // Try to find a matching voice
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang === targetLang || v.lang.startsWith(lang));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.error('Speech synthesis error:', e);
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
};

export const isSpeaking = () => {
  return 'speechSynthesis' in window && window.speechSynthesis.speaking;
};
