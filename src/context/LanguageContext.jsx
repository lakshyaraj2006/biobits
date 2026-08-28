import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../translations/translations';
import { speakText, stopSpeech } from '../utils/speechUtils';

const LanguageContext = createContext();

/*
 * The prototype contains a mixture of translated t() labels and legacy
 * literal English UI labels. Exact dictionary matches handle complete
 * sentences; this fallback glossary handles common standalone UI words and
 * short labels that are not yet keys in translations.js. It deliberately
 * leaves product names, abbreviations, numbers and medical codes intact.
 */
const UI_WORDS = {
  hi: {
    home:'होम', coordination:'समन्वय', network:'नेटवर्क', healthcare:'स्वास्थ्य सेवा', health:'स्वास्थ्य', rural:'ग्रामीण', citizen:'नागरिक', patient:'मरीज', patients:'मरीज', doctor:'डॉक्टर', doctors:'डॉक्टर', worker:'कार्यकर्ता', officer:'अधिकारी', emergency:'आपातकाल', alert:'चेतावनी', alerts:'चेतावनियां', warning:'चेतावनी', online:'ऑनलाइन', offline:'ऑफ़लाइन', synced:'सिंक किया गया', sync:'सिंक', menu:'मेनू', close:'बंद करें', open:'खोलें', save:'सहेजें', cancel:'रद्द करें', search:'खोजें', view:'देखें', submit:'जमा करें', send:'भेजें', request:'अनुरोध', requested:'अनुरोध किया गया', match:'मिलान', new:'नया', case:'केस', cases:'केस', file:'फाइल', history:'इतिहास', details:'विवरण', status:'स्थिति', available:'उपलब्ध', unavailable:'अनुपलब्ध', confirmed:'पुष्ट', pending:'लंबित', completed:'पूरा', complete:'पूरा करें', required:'आवश्यक', blood:'रक्त', group:'समूह', bank:'बैंक', banks:'बैंक', donor:'दाता', donors:'दाता', village:'गांव', cluster:'क्षेत्र', location:'स्थान', distance:'दूरी', time:'समय', today:'आज', tomorrow:'कल', now:'अभी', morning:'सुबह', evening:'शाम', health:'स्वास्थ्य', medical:'चिकित्सा', medicine:'दवा', medicines:'दवाएं', prescription:'पर्चा', symptoms:'लक्षण', symptom:'लक्षण', temperature:'तापमान', pressure:'दबाव', oxygen:'ऑक्सीजन', fever:'बुखार', water:'पानी', testing:'जांच', test:'जांच', kit:'किट', kits:'किट', child:'बच्चा', children:'बच्चे', maternal:'मातृ', pregnancy:'गर्भावस्था', pregnant:'गर्भवती', mother:'माता', mothers:'माताएं', vaccine:'टीका', vaccines:'टीके', immunization:'टीकाकरण', reminder:'अनुस्मारक', reminders:'अनुस्मारक', growth:'विकास', monitor:'निगरानी', monitoring:'निगरानी', radar:'राडार', outbreak:'प्रकोप', epidemic:'महामारी', critical:'गंभीर', urgent:'अति-आवश्यक', routine:'सामान्य', attention:'ध्यान', safe:'सुरक्षित', normal:'सामान्य', danger:'खतरा', warning:'चेतावनी', response:'प्रतिक्रिया', protocol:'प्रोटोकॉल', community:'समुदाय', official:'आधिकारिक', government:'सरकारी', local:'स्थानीय', verified:'सत्यापित', information:'जानकारी', language:'भाषा', audio:'ऑडियो', listen:'सुनें', menu:'मेनू', role:'भूमिका', name:'नाम', age:'उम्र', gender:'लिंग', phone:'मोबाइल नंबर', mobile:'मोबाइल', number:'संख्या', online:'ऑनलाइन', active:'सक्रिय', inactive:'निष्क्रिय', loading:'लोड हो रहा है', checking:'जांच हो रही है', success:'सफल', failed:'विफल', error:'त्रुटि', retry:'फिर प्रयास करें', yes:'हां', no:'नहीं', and:'और', or:'या', with:'के साथ', from:'से', to:'तक', for:'के लिए', in:'में', at:'पर', of:'का', the:'', a:'', an:'', your:'आपका', my:'मेरा', our:'हमारा', you:'आप', we:'हम', ask:'पूछें', question:'सवाल', questions:'सवाल', help:'मदद', support:'सहायता', emergency:'आपातकाल', call:'कॉल करें', immediately:'तुरंत', report:'रिपोर्ट', reported:'रिपोर्ट किया गया', read:'पढ़ें', write:'लिखें', create:'बनाएं', update:'अपडेट करें', delete:'हटाएं', select:'चुनें', selected:'चयनित', choose:'चुनें', back:'वापस', next:'आगे', previous:'पिछला', continue:'जारी रखें', finish:'समाप्त करें', dashboard:'डैशबोर्ड', coordination:'समन्वय', access:'पहुंच', public:'सार्वजनिक', private:'निजी', privacy:'गोपनीयता', protected:'सुरक्षित', direct:'सीधा', digital:'डिजिटल', central:'केंद्रीय', server:'सर्वर', data:'डेटा', live:'लाइव', latest:'नवीनतम', first:'पहला', second:'दूसरा', primary:'प्राथमिक', secondary:'द्वितीयक', maternal:'मातृ', child:'शिशु', saathi:'साथी'
  },
  bn: {
    home:'হোম', coordination:'সমন্বয়', network:'নেটওয়ার্ক', healthcare:'স্বাস্থ্য পরিষেবা', health:'স্বাস্থ্য', rural:'গ্রামীণ', citizen:'নাগরিক', patient:'রোগী', patients:'রোগীরা', doctor:'ডাক্তার', doctors:'ডাক্তাররা', worker:'কর্মী', officer:'কর্মকর্তা', emergency:'জরুরি অবস্থা', alert:'সতর্কতা', alerts:'সতর্কতাগুলি', warning:'সতর্কবার্তা', online:'অনলাইন', offline:'অফলাইন', synced:'সিঙ্ক হয়েছে', sync:'সিঙ্ক', menu:'মেনু', close:'বন্ধ করুন', open:'খুলুন', save:'সংরক্ষণ করুন', cancel:'বাতিল করুন', search:'খুঁজুন', view:'দেখুন', submit:'জমা দিন', send:'পাঠান', request:'অনুরোধ', requested:'অনুরোধ করা হয়েছে', match:'মিল', new:'নতুন', case:'কেস', cases:'কেসগুলি', file:'ফাইল', history:'ইতিহাস', details:'বিবরণ', status:'অবস্থা', available:'উপলব্ধ', unavailable:'অনুপলব্ধ', confirmed:'নিশ্চিত', pending:'অপেক্ষমাণ', completed:'সম্পন্ন', complete:'সম্পন্ন করুন', required:'প্রয়োজনীয়', blood:'রক্ত', group:'গ্রুপ', bank:'ব্যাঙ্ক', banks:'ব্যাঙ্কগুলি', donor:'দাতা', donors:'দাতারা', village:'গ্রাম', cluster:'এলাকা', location:'অবস্থান', distance:'দূরত্ব', time:'সময়', today:'আজ', tomorrow:'আগামীকাল', now:'এখন', morning:'সকাল', evening:'সন্ধ্যা', medical:'চিকিৎসা', medicine:'ওষুধ', medicines:'ওষুধগুলি', prescription:'প্রেসক্রিপশন', symptoms:'উপসর্গ', symptom:'উপসর্গ', temperature:'তাপমাত্রা', pressure:'চাপ', oxygen:'অক্সিজেন', fever:'জ্বর', water:'জল', testing:'পরীক্ষা', test:'পরীক্ষা', kit:'কিট', kits:'কিটগুলি', child:'শিশু', children:'শিশুরা', maternal:'মাতৃ', pregnancy:'গর্ভাবস্থা', pregnant:'গর্ভবতী', mother:'মা', mothers:'মায়েরা', vaccine:'টিকা', vaccines:'টিকাগুলি', immunization:'টিকাকরণ', reminder:'অনুস্মারক', reminders:'অনুস্মারকগুলি', growth:'বৃদ্ধি', monitor:'নজরদারি', monitoring:'নজরদারি', radar:'রাডার', outbreak:'প্রাদুর্ভাব', epidemic:'মহামারী', critical:'সংকটজনক', urgent:'জরুরি', routine:'সাধারণ', attention:'মনোযোগ', safe:'নিরাপদ', normal:'স্বাভাবিক', danger:'বিপদ', response:'প্রতিক্রিয়া', protocol:'প্রোটোকল', community:'সম্প্রদায়', official:'সরকারি', government:'সরকারি', local:'স্থানীয়', verified:'যাচাইকৃত', information:'তথ্য', language:'ভাষা', audio:'অডিও', listen:'শুনুন', role:'ভূমিকা', name:'নাম', age:'বয়স', gender:'লিঙ্গ', phone:'মোবাইল নম্বর', mobile:'মোবাইল', number:'নম্বর', active:'সক্রিয়', inactive:'নিষ্ক্রিয়', loading:'লোড হচ্ছে', checking:'পরীক্ষা করা হচ্ছে', success:'সফল', failed:'ব্যর্থ', error:'ত্রুটি', retry:'আবার চেষ্টা করুন', yes:'হ্যাঁ', no:'না', and:'এবং', or:'অথবা', with:'সহ', from:'থেকে', to:'পর্যন্ত', for:'জন্য', in:'মধ্যে', at:'এ', of:'এর', the:'', a:'', an:'', your:'আপনার', my:'আমার', our:'আমাদের', you:'আপনি', we:'আমরা', ask:'জিজ্ঞাসা করুন', question:'প্রশ্ন', questions:'প্রশ্নগুলি', help:'সাহায্য', support:'সহায়তা', call:'কল করুন', immediately:'অবিলম্বে', report:'রিপোর্ট', reported:'রিপোর্ট করা হয়েছে', read:'পড়ুন', write:'লিখুন', create:'তৈরি করুন', update:'আপডেট করুন', delete:'মুছে ফেলুন', select:'নির্বাচন করুন', selected:'নির্বাচিত', choose:'বেছে নিন', back:'ফিরে যান', next:'পরবর্তী', previous:'পূর্ববর্তী', continue:'চালিয়ে যান', finish:'শেষ করুন', dashboard:'ড্যাশবোর্ড', access:'অ্যাক্সেস', public:'সর্বজনীন', private:'ব্যক্তিগত', privacy:'গোপনীয়তা', protected:'সুরক্ষিত', direct:'সরাসরি', digital:'ডিজিটাল', central:'কেন্দ্রীয়', server:'সার্ভার', data:'ডেটা', live:'লাইভ', latest:'সর্বশেষ', first:'প্রথম', second:'দ্বিতীয়', primary:'প্রাথমিক', secondary:'দ্বিতীয়', saathi:'সাথী'
  }
};

const PROTECTED = /^(Sahay|AI|SIH|PS\s*\d+|PHC|ANC|UIP|WHO|SMS|SpO2|BPM|e-RaktKosh|API|24\/7|108|112|[A-Z]{2,})$/;

const translateUnknownText = (text, lang) => {
  if (!text || lang === 'en') return text;
  const words = UI_WORDS[lang];
  if (!words) return text;

  // Prefer phrase-level replacements for common UI phrases before word-level fallback.
  const phrases = lang === 'hi' ? {
    'Open Radar':'राडार खोलें', 'Listen in audio':'ऑडियो में सुनें', 'Search & Coordinate Blood':'रक्त खोजें और समन्वय करें', 'Blood Coordination':'रक्त समन्वय', 'Search Verified Blood Bank Inventories':'सत्यापित रक्त बैंक भंडार खोजें', 'Required Blood Group':'आवश्यक रक्त समूह', 'Request Match':'मिलान का अनुरोध करें', 'Match Requested Successfully':'मिलान का अनुरोध सफलतापूर्वक भेजा गया', 'New Search':'नई खोज', 'Checking e-RaktKosh Registry...':'e-RaktKosh रजिस्ट्री की जांच हो रही है...', 'Sahay Integrated Blood Network':'सहाय एकीकृत रक्त नेटवर्क', 'Rural Healthcare Coordination Network':'ग्रामीण स्वास्थ्य समन्वय नेटवर्क', 'OUTBREAK WATCH':'प्रकोप निगरानी', 'Online & Synced':'ऑनलाइन और सिंक किया गया', 'Rural Citizen':'ग्रामीण नागरिक'
  } : {
    'Open Radar':'রাডার খুলুন', 'Listen in audio':'অডিওতে শুনুন', 'Search & Coordinate Blood':'রক্ত খুঁজুন ও সমন্বয় করুন', 'Blood Coordination':'রক্ত সমন্বয়', 'Search Verified Blood Bank Inventories':'যাচাইকৃত রক্ত ব্যাঙ্কের মজুত খুঁজুন', 'Required Blood Group':'প্রয়োজনীয় রক্তের গ্রুপ', 'Request Match':'মিলের জন্য অনুরোধ করুন', 'Match Requested Successfully':'মিলের অনুরোধ সফল হয়েছে', 'New Search':'নতুন অনুসন্ধান', 'Checking e-RaktKosh Registry...':'e-RaktKosh রেজিস্ট্রি পরীক্ষা করা হচ্ছে...', 'Sahay Integrated Blood Network':'সহায় সমন্বিত রক্ত নেটওয়ার্ক', 'Rural Healthcare Coordination Network':'গ্রামীণ স্বাস্থ্য সমন্বয় নেটওয়ার্ক', 'OUTBREAK WATCH':'প্রাদুর্ভাব নজরদারি', 'Online & Synced':'অনলাইন ও সিঙ্ক হয়েছে', 'Rural Citizen':'গ্রামীণ নাগরিক'
  };
  let result = text;
  Object.entries(phrases).forEach(([from, to]) => { result = result.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), to); });
  if (result !== text) return result;

  return text.replace(/\b[A-Za-z][A-Za-z'-]*\b/g, (token) => {
    if (PROTECTED.test(token)) return token;
    const key = token.toLowerCase();
    return Object.prototype.hasOwnProperty.call(words, key) ? words[key] : token;
  });
};

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

  const translateTextValue = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return value;
    if (dictionary.has(trimmed)) return dictionary.get(trimmed);
    return translateUnknownText(trimmed, lang);
  };

  const translateNode = (node) => {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    const parent = node.parentElement;
    if (!parent) return;
    const tag = parent.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA') return;
    const original = node.nodeValue || '';
    const localized = translateTextValue(original);
    if (localized === original.trim() || !localized) return;
    const leading = original.match(/^\s*/)?.[0] || '';
    const trailing = original.match(/\s*$/)?.[0] || '';
    node.nodeValue = `${leading}${localized}${trailing}`;
  };

  const translateElementAttributes = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
    ['placeholder', 'title', 'aria-label'].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value) return;
      const trimmed = value.trim();
      const localized = dictionary.get(trimmed) || translateUnknownText(trimmed, lang);
      if (localized && localized !== trimmed) element.setAttribute(attribute, localized);
    });
  };

  const translateTree = (root) => {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) { translateNode(root); return; }
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
      if (mutation.type === 'attributes') translateElementAttributes(mutation.target);
    });
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label'] });
  return () => observer.disconnect();
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('biobits_lang') || 'en');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    localStorage.setItem('biobits_lang', currentLang);
    if (typeof document !== 'undefined') document.documentElement.lang = currentLang;
    return translateRenderedUi(currentLang);
  }, [currentLang]);

  const t = (key, fallback = '') => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || fallback || translateUnknownText(key, currentLang) || key;
  };

  const speak = (text) => {
    setIsAudioPlaying(true);
    speakText(text, currentLang, () => setIsAudioPlaying(true), () => setIsAudioPlaying(false));
  };

  const stop = () => { stopSpeech(); setIsAudioPlaying(false); };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage: setCurrentLang, languages: LANGUAGES, t, speak, stopSpeech: stop, isAudioPlaying }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
