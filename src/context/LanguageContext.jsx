import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../translations/translations';
import { speakText, stopSpeech } from '../utils/speechUtils';

const LanguageContext = createContext();

// Dynamic phrases and common medical / UI glossaries across all 7 supported languages
const DYNAMIC_GLOSSARY = {
  hi: {
    // Triage & Status
    'Emergency': 'आपातकालीन',
    'Urgent': 'अति-आवश्यक',
    'Routine': 'सामान्य',
    'pending': 'समीक्षा बाकी',
    'reviewed': 'समीक्षा पूर्ण',
    'Safe': 'सुरक्षित',
    'Watch': 'निगरानी में',
    'Alert': 'चेतावनी',
    'High': 'उच्च',
    'Medium': 'मध्यम',
    'Normal': 'सामान्य',
    'Overdue': 'छूट गया',
    'Due Today': 'आज का समय',
    'Completed': 'पूर्ण',

    // Symptoms
    'High Fever (3 Days)': 'तेज बुखार (3 दिन)',
    'Joint Pain': 'जोड़ों का दर्द',
    'Red Skin Rashes': 'त्वचा पर लाल दाने',
    'Extreme Weakness': 'अत्यधिक कमजोरी',
    'Severe Watery Diarrhea (6 episodes)': 'गंभीर पानी जैसे दस्त (6 बार)',
    'Vomiting': 'उल्टी',
    'Dry Tongue': 'सूखी जीभ',
    'Mild Cramps': 'हल्के मरोड़ / दर्द',
    'Bilateral Pedal Edema (Foot swelling)': 'पैरों में सूजन (एडिमा)',
    'Morning Headache': 'सुबह का सिरदर्द',
    'Fatigue': 'थकान व सुस्ती',
    'Skin Rash / Redness (त्वचा पर दाने)': 'त्वचा पर लाल दाने / खुजली',
    'High Fever (तेज बुखार)': 'तेज बुखार',
    'Loose Stools / Diarrhea (दस्त)': 'पानी जैसे पतले दस्त',
    'Vomiting (उल्टी)': 'उल्टी / जी मिचलाना',
    'Severe Joint Pain (जोड़ों का दर्द)': 'जोड़ों में गंभीर दर्द',
    'Cough & Cold (खांसी व जुकाम)': 'खांसी व जुकाम',
    'Shortness of Breath (सांस लेने में तकलीफ)': 'सांस लेने में तकलीफ',
    'Severe Headache (सिरदर्द)': 'तेज सिरदर्द',
    'Abdominal Cramps (पेट दर्द)': 'पेट दर्द व मरोड़',
    'Eye Redness / Itching (आंखें लाल होना)': 'आंखें लाल होना व खुजली',
    'Foot / Hand Swelling (सूजन)': 'हाथ-पैरों में सूजन',
    'Extreme Weakness (कमजोरी)': 'अत्यधिक कमजोरी व चक्कर',

    // Body Areas
    'Whole Body / Fever': 'पूरा शरीर / बुखार',
    'Stomach & Gut': 'पेट व पाचन तंत्र',
    'Skin & Limbs': 'त्वचा व हाथ-पैर',
    'Chest & Breathing': 'छाती व सांस',
    'Head, Eyes, Throat': 'सिर, आंखें व गला',
    'Maternal / Pregnancy': 'मातृ / गर्भावस्था',

    // Common Phrases
    'Male': 'पुरुष',
    'Female': 'महिला',
    'Other': 'अन्य',
    'Years': 'वर्ष',
    'Yrs': 'वर्ष',
    'Months': 'महीने',
    'Weeks': 'सप्ताह',
    'Days': 'दिन',
    'Beds': 'बेड',
    'Beds Available': 'बेड उपलब्ध',
    'Government-linked': 'सरकारी मान्यता प्राप्त',
    'Sahay Checked': 'सहाय द्वारा जाँचा गया',
    'Community Verified': 'समुदाय सत्यापित',
    'Recently Confirmed': 'हाल ही में पुष्ट',
    'Emergency Capable': 'आपातकाल सक्षम',
    'Confirmed 4 min ago': '4 मिनट पहले पुष्ट',
    'Confirmed 22 min ago': '22 मिनट पहले पुष्ट',
    'Updated 2 hours ago': '2 घंटे पहले अपडेट',
    'Confirmed 10 min ago (e-RaktKosh Direct API)': '10 मिनट पहले पुष्ट (e-RaktKosh लाइव API)',
    'Checked 1 hour ago': '1 घंटे पहले जाँचा गया',
    'Available Now': 'अभी उपलब्ध',
    'Available (Evening Only)': 'उपलब्ध (केवल शाम)',
    'Rampur Sub-District Hospital': 'रामपुर उप-जिला अस्पताल',
    'Kalyanpur Community Health Centre (CHC)': 'कल्याणपुर सामुदायिक स्वास्थ्य केंद्र (CHC)',
    'MGM Central Hospital': 'MGM सेंट्रल अस्पताल',
    'Rampur Sub-District Blood Bank': 'रामपुर उप-जिला रक्त बैंक',
    'Kalyanpur CHC Storage Facility': 'कल्याणपुर CHC रक्त भंडारण',
  },

  bn: {
    // Triage & Status
    'Emergency': 'জরুরি অবস্থা',
    'Urgent': 'বিশেষ প্রয়োজনীয়',
    'Routine': 'সাধারণ',
    'pending': 'অপেক্ষমাণ',
    'reviewed': 'সম্পন্ন',
    'Safe': 'নিরাপদ',
    'Watch': 'নজরদারিতে',
    'Alert': 'সতর্কতা',
    'High': 'উচ্চ',
    'Medium': 'মাঝারি',
    'Normal': 'স্বাভাবিক',
    'Overdue': 'দেরি হয়ে গেছে',
    'Due Today': 'আজকে প্রযোজ্য',
    'Completed': 'সম্পন্ন',

    // Symptoms
    'High Fever (3 Days)': 'তীব্র জ্বর (৩ দিন)',
    'Joint Pain': 'গাঁটে ব্যথা',
    'Red Skin Rashes': 'ত্বকে লাল ফুসকুড়ি',
    'Extreme Weakness': 'চরম দুর্বলতা',
    'Severe Watery Diarrhea (6 episodes)': 'তীব্র পাতলা পায়খানা (৬ বার)',
    'Vomiting': 'বমি',
    'Dry Tongue': 'শুকনো জিভ',
    'Mild Cramps': 'হালকা পেট মোচড়ানো',
    'Bilateral Pedal Edema (Foot swelling)': 'পায়ে ফোলাভাব',
    'Morning Headache': 'সকালে মাথা ব্যথা',
    'Fatigue': 'ক্লান্তিভাব',
    'Skin Rash / Redness (ত্বचा पर दाने)': 'ত্বকে ফুসকুড়ি বা লালচে ভাব',
    'High Fever (तेज बुखार)': 'তীব্র জ্বর',
    'Loose Stools / Diarrhea (दस्त)': 'পাতলা পায়খানা বা ডায়রিয়া',
    'Vomiting (उल्टी)': 'বমি ভাব বা বমি',
    'Severe Joint Pain (जोड़ों का दर्द)': 'তীব্র গাঁটে ব্যথা',
    'Cough & Cold (खांसी व जुकाम)': 'কাশি ও সর্দি',
    'Shortness of Breath (सांस लेने में तकलीफ)': 'শ্বাসকষ্ট',
    'Severe Headache (सिरदर्द)': 'তীব্র মাথা ব্যথা',
    'Abdominal Cramps (पेट दर्द)': 'পেট ব্যথা ও মোচড়',
    'Eye Redness / Itching (आंखें लाल होना)': 'চোখ লাল হওয়া ও চুলকানি',
    'Foot / Hand Swelling (सूजन)': 'হাত-পা ফোলা',
    'Extreme Weakness (कमजोरी)': 'চরম দুর্বলতা',

    // Body Areas
    'Whole Body / Fever': 'পুরো শরীর / জ্বর',
    'Stomach & Gut': 'পেট ও পরিপাকতন্ত্র',
    'Skin & Limbs': 'ত্বক ও হাত-পা',
    'Chest & Breathing': 'বুক ও শ্বাসপ্রশ্বাস',
    'Head, Eyes, Throat': 'মাথা, চোখ ও গলা',
    'Maternal / Pregnancy': 'মাতৃ / গর্ভাবস্থা',

    // Common Phrases
    'Male': 'পুরুষ',
    'Female': 'মহিলা',
    'Other': 'অন্যান্য',
    'Years': 'বছর',
    'Yrs': 'বছর',
    'Months': 'মাস',
    'Weeks': 'সপ্তাহ',
    'Days': 'দিন',
    'Beds': 'বেড',
    'Beds Available': 'বেড উপলব্ধ',
    'Government-linked': 'সরকারি অনুমোদনপ্রাপ্ত',
    'Sahay Checked': 'সহায় দ্বারা পরীক্ষিত',
    'Community Verified': 'সামাজিক স্তরে যাচাইকৃত',
    'Recently Confirmed': 'সম্প্রতি নিশ্চিত',
    'Emergency Capable': 'জরুরি চিকিৎসা সক্ষম',
    'Confirmed 4 min ago': '৪ মিনিট আগে নিশ্চিত',
    'Confirmed 22 min ago': '২২ মিনিট আগে নিশ্চিত',
    'Updated 2 hours ago': '২ ঘণ্টা আগে আপডেট',
    'Confirmed 10 min ago (e-RaktKosh Direct API)': '১০ মিনিট আগে নিশ্চিত (e-RaktKosh লাইভ API)',
    'Checked 1 hour ago': '১ ঘণ্টা আগে পরীক্ষিত',
    'Available Now': 'এখন উপলব্ধ',
    'Available (Evening Only)': 'উপলব্ধ (শুধু সন্ধ্যায়)',
    'Rampur Sub-District Hospital': 'রামপুর মহকুমা হাসপাতাল',
    'Kalyanpur Community Health Centre (CHC)': 'কল্যাণপুর ব্লক প্রাথমিক স্বাস্থ্য কেন্দ্র (CHC)',
    'MGM Central Hospital': 'এমজিএম সেন্ট্রাল হাসপাতাল',
    'Rampur Sub-District Blood Bank': 'রামপুর মহকুমা ব্লাড ব্যাঙ্ক',
    'Kalyanpur CHC Storage Facility': 'কল্যাণপুর সিএইচসি রক্ত মজুত',
  },

  or: {
    // Triage & Status
    'Emergency': 'ଜରୁରୀକାଳୀନ',
    'Urgent': 'ଅତ୍ୟାବଶ୍ୟକ',
    'Routine': 'ସାଧାରଣ',
    'pending': 'ଯାଞ୍ଚ ବାକି',
    'reviewed': 'ସମ୍ପୂର୍ଣ୍ଣ',
    'Safe': 'ସୁରକ୍ଷିତ',
    'Watch': 'ନିରୀକ୍ଷଣରେ',
    'Alert': 'ସତର୍କତା',
    'High': 'ଉଚ୍ଚ',
    'Medium': 'ମଧ୍ୟମ',
    'Normal': 'ସାଧାରଣ',
    'Overdue': 'ଡେରି ହୋଇଛି',
    'Due Today': 'ଆଜି ଦେୟ',
    'Completed': 'ସମ୍ପୂର୍ଣ୍ଣ',

    // Symptoms
    'High Fever (3 Days)': 'ପ୍ରବଳ ଜ୍ୱର (୩ ଦିନ)',
    'Joint Pain': 'ଗଣ୍ଠି ବିନ୍ଧା',
    'Red Skin Rashes': 'ଚର୍ମରେ ନାଲି ଦାଗ',
    'Extreme Weakness': 'ଅତ୍ୟଧିକ ଦୁର୍ବଳତା',
    'Severe Watery Diarrhea (6 episodes)': 'ତୀବ୍ର ଝାଡ଼ା (୬ ଥର)',
    'Vomiting': 'ବାନ୍ତି',
    'Dry Tongue': 'ଶୁଖିଲା ଜିଭ',
    'Mild Cramps': 'ପେଟ କାମୁଡ଼ିବା',
    'Bilateral Pedal Edema (Foot swelling)': 'ଗୋଡ଼ ଫୁଲିବା',
    'Morning Headache': 'ସକାଳ ମୁଣ୍ଡବିନ୍ଧା',
    'Fatigue': 'କ୍ଲାନ୍ତି',
    'Skin Rash / Redness (त्वचा पर दाने)': 'ଚର୍ମରେ ନାଲି ଦାଗ ଓ କୁଣ୍ଡେଇ ହେବା',
    'High Fever (तेज बुखार)': 'ପ୍ରବଳ ଜ୍ୱର',
    'Loose Stools / Diarrhea (दस्त)': 'ପତଳା ଝାଡ଼ା କିମ୍ବା ହଇଜା',
    'Vomiting (उल्टी)': 'ବାନ୍ତି ହେବା',
    'Severe Joint Pain (जोड़ों का दर्द)': 'ପ୍ରବଳ ଗଣ୍ଠି ବିନ୍ଧା',
    'Cough & Cold (खांसी व जुकाम)': 'କାଶ ଓ ଥଣ୍ଡା',
    'Shortness of Breath (सांस लेने में तकलीफ)': 'ଶ୍ୱାସକ୍ରିୟାରେ କଷ୍ଟ',
    'Severe Headache (सिरदर्द)': 'ପ୍ରବଳ ମୁଣ୍ଡ ବିନ୍ଧା',
    'Abdominal Cramps (पेट दर्द)': 'ପେଟ ବିନ୍ଧା ଓ କାମୁଡ଼ିବା',
    'Eye Redness / Itching (आंखें लाल होना)': 'ଆଖି ନାଲି ପଡ଼ିବା ଓ କୁଣ୍ଡେଇ ହେବା',
    'Foot / Hand Swelling (सूजन)': 'ହାତ-ଗୋଡ଼ ଫୁଲିବା',
    'Extreme Weakness (कमजोरी)': 'ଅତ୍ୟଧିକ ଦୁର୍ବଳତା',

    // Body Areas
    'Whole Body / Fever': 'ସମ୍ପୂର୍ଣ୍ଣ ଶରୀର / ଜ୍ୱର',
    'Stomach & Gut': 'ପେଟ ଓ ହଜମ ତନ୍ତ୍ର',
    'Skin & Limbs': 'ଚର୍ମ ଓ ହାତଗୋଡ଼',
    'Chest & Breathing': 'ଛାତି ଓ ଶ୍ୱାସକ୍ରିୟା',
    'Head, Eyes, Throat': 'ମୁଣ୍ଡ, ଆଖି ଓ ଗଳା',
    'Maternal / Pregnancy': 'ମାତୃ / ଗର୍ଭାବସ୍ଥା',

    // Common Phrases
    'Male': 'ପୁରୁଷ',
    'Female': 'ମହିଳା',
    'Other': 'ଅନ୍ୟାନ୍ୟ',
    'Years': 'ବର୍ଷ',
    'Yrs': 'ବର୍ଷ',
    'Months': 'ମାସ',
    'Weeks': 'ସପ୍ତାହ',
    'Days': 'ଦିନ',
    'Beds': 'ବେଡ୍',
    'Beds Available': 'ବେଡ୍ ଉପଲବ୍ଧ',
    'Government-linked': 'ସରକାରୀ ସ୍ୱୀକୃତିପ୍ରାପ୍ତ',
    'Sahay Checked': 'ସହାୟ ଯାଞ୍ଚିତ',
    'Community Verified': 'ସମାଜ ସ୍ତରରେ ଯାଞ୍ଚିତ',
    'Recently Confirmed': 'ନିକଟରେ ନିଶ୍ଚିତ',
    'Emergency Capable': 'ଜରୁରୀ ଚିକିତ୍ସା ସକ୍ଷମ',
    'Confirmed 4 min ago': '୪ ମିନିଟ୍ ପୂର୍ବେ ନିଶ୍ଚିତ',
    'Confirmed 22 min ago': '୨୨ ମିନିଟ୍ ପୂର୍ବେ ନିଶ୍ଚିତ',
    'Updated 2 hours ago': '୨ ଘଣ୍ଟା ପୂର୍ବେ ଅପଡେଟ୍',
    'Confirmed 10 min ago (e-RaktKosh Direct API)': '୧୦ ମିନିଟ୍ ପୂର୍ବେ ନିଶ୍ଚିତ (e-RaktKosh API)',
    'Checked 1 hour ago': '୧ ଘଣ୍ଟା ପୂର୍ବେ ଯାଞ୍ଚ ହୋଇଛି',
    'Available Now': 'ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ',
    'Available (Evening Only)': 'ଉପଲବ୍ଧ (କେବଳ ସନ୍ଧ୍ୟାରେ)',
    'Rampur Sub-District Hospital': 'ରାମପୁର ଉପଖଣ୍ଡ ଡାକ୍ତରଖାନା',
    'Kalyanpur Community Health Centre (CHC)': 'କଲ୍ୟାଣପୁର ଗୋଷ୍ଠୀ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର (CHC)',
    'MGM Central Hospital': 'ଏମଜିଏମ୍ ସେଣ୍ଟ୍ରାଲ୍ ଡାକ୍ତରଖାନା',
    'Rampur Sub-District Blood Bank': 'ରାମପୁର ରକ୍ତ ଭଣ୍ଡାର',
    'Kalyanpur CHC Storage Facility': 'କଲ୍ୟାଣପୁର ରକ୍ତ ସଂରକ୍ଷଣ କେନ୍ଦ୍ର',
  },

  te: {
    // Triage & Status
    'Emergency': 'అత్యవసరం',
    'Urgent': 'త్వరిత శ్రద్ధ',
    'Routine': 'సాధారణం',
    'pending': 'సమీక్షలో ఉంది',
    'reviewed': 'పూర్తయింది',
    'Safe': 'సురక్షితం',
    'Watch': 'పర్యవేక్షణలో',
    'Alert': 'హెచ్చరిక',
    'High': 'అధికం',
    'Medium': 'మధ్యస్థం',
    'Normal': 'సాధారణం',
    'Overdue': 'గడువు దాటినది',
    'Due Today': 'ఈరోజు ఇవ్వాల్సినది',
    'Completed': 'పూర్తయింది',

    // Symptoms
    'High Fever (3 Days)': 'తీవ్రమైన జ్వరం (3 రోజులు)',
    'Joint Pain': 'కీళ్ల నొప్పులు',
    'Red Skin Rashes': 'చర్మంపై ఎర్రటి దద్దుర్లు',
    'Extreme Weakness': 'తీవ్ర నీరసం',
    'Severe Watery Diarrhea (6 episodes)': 'తీవ్ర విరేచనాలు (6 సార్లు)',
    'Vomiting': 'వాంతులు',
    'Dry Tongue': 'ఎండిన నాలుక',
    'Mild Cramps': 'కడుపులో నొప్పితో కూడిన తిమ్మిరి',
    'Bilateral Pedal Edema (Foot swelling)': 'పాదాల వాపు',
    'Morning Headache': 'ఉదయం తలనొప్పి',
    'Fatigue': 'అలసట',
    'Skin Rash / Redness (त्वचा पर दाने)': 'చర్మంపై ఎర్రటి దద్దుర్లు & దురద',
    'High Fever (तेज बुखार)': 'తీవ్రమైన జ్వరం',
    'Loose Stools / Diarrhea (दस्त)': 'విరేచనాలు / డయేరియా',
    'Vomiting (उल्टी)': 'వాంతులు / వికారం',
    'Severe Joint Pain (जोड़ों का दर्द)': 'తీవ్రమైన కీళ్ల నొప్పులు',
    'Cough & Cold (खांसी व जुकाम)': 'దగ్గు & జలుబు',
    'Shortness of Breath (सांस लेने में तकलीफ)': 'శ్వాస తీసుకోవడంలో ఇబ్బంది',
    'Severe Headache (सिरदर्द)': 'తీవ్రమైన తలనొప్పి',
    'Abdominal Cramps (पेट दर्द)': 'కడుపు నొప్పి & తిమ్మిరి',
    'Eye Redness / Itching (आंखें लाल होना)': 'కళ్ళు ఎర్రబడటం & దురద',
    'Foot / Hand Swelling (सूजन)': 'కాళ్ళు చేతుల వాపు',
    'Extreme Weakness (कमजोरी)': 'తీవ్రమైన నీరసం',

    // Body Areas
    'Whole Body / Fever': 'మొత్తం శరీరం / జ్వరం',
    'Stomach & Gut': 'కడుపు & జీర్ణవ్యవస్థ',
    'Skin & Limbs': 'చర్మం & కాళ్ళు చేతులు',
    'Chest & Breathing': 'ఛాతీ & శ్వాసక్రియ',
    'Head, Eyes, Throat': 'తల, కళ్ళు & గొంతు',
    'Maternal / Pregnancy': 'మాతృ / గర్భధారణ',

    // Common Phrases
    'Male': 'పురుషుడు',
    'Female': 'స్త్రీ',
    'Other': 'ఇతర',
    'Years': 'సంవత్సరాలు',
    'Yrs': 'సంవత్సరాలు',
    'Months': 'నెలలు',
    'Weeks': 'వారాలు',
    'Days': 'రోజులు',
    'Beds': 'బెడ్లు',
    'Beds Available': 'బెడ్లు అందుబాటులో ఉన్నాయి',
    'Government-linked': 'ప్రభుత్వ గుర్తింపు పొందినది',
    'Sahay Checked': 'సహాయ్ పరిశీలించినది',
    'Community Verified': 'సమాజం ధృవీకరించినది',
    'Recently Confirmed': 'ఇటీవల నిర్ధారించబడింది',
    'Emergency Capable': 'అత్యవసర చికిత్స సౌలభ్యం',
    'Confirmed 4 min ago': '4 నిమిషాల క్రితం ధృవీకరించబడింది',
    'Confirmed 22 min ago': '22 నిమిషాల క్రితం ధృవీకరించబడింది',
    'Updated 2 hours ago': '2 గంటల క్రితం నవీకరించబడింది',
    'Confirmed 10 min ago (e-RaktKosh Direct API)': '10 నిమిషాల క్రితం (e-RaktKosh లైవ్ API)',
    'Checked 1 hour ago': '1 గంట క్రితం తనిఖీ చేయబడింది',
    'Available Now': 'ఇప్పుడు అందుబాటులో ఉంది',
    'Available (Evening Only)': 'సాయంత్రం మాత్రమే అందుబాటులో ఉంది',
    'Rampur Sub-District Hospital': 'రాంపూర్ సబ్-డిస్ట్రిక్ట్ ఆసుపత్రి',
    'Kalyanpur Community Health Centre (CHC)': 'కళ్యాణ్‌పూర్ కమ్యూనిటీ హెల్త్ సెంటర్ (CHC)',
    'MGM Central Hospital': 'MGM సెంట్రల్ ఆసుపత్రి',
    'Rampur Sub-District Blood Bank': 'రాంపూర్ బ్లడ్ బ్యాంక్',
    'Kalyanpur CHC Storage Facility': 'కళ్యాణ్‌పూర్ రక్త నిల్వ కేంద్రం',
  },

  ta: {
    // Triage & Status
    'Emergency': 'அவசரம்',
    'Urgent': 'முக்கியமானது',
    'Routine': 'வழக்கமானது',
    'pending': 'பரிசீலனையில்',
    'reviewed': 'முடிக்கப்பட்டது',
    'Safe': 'பாதுகாப்பானது',
    'Watch': 'கண்காணிப்பில்',
    'Alert': 'எச்சரிக்கை',
    'High': 'அதிகம்',
    'Medium': 'நடுத்தரம்',
    'Normal': 'சாதாரணமானது',
    'Overdue': 'தாமதமானது',
    'Due Today': 'இன்று செலுத்த வேண்டியது',
    'Completed': 'முடிக்கப்பட்டது',

    // Symptoms
    'High Fever (3 Days)': 'கடுமையான காய்ச்சல் (3 நாட்கள்)',
    'Joint Pain': 'மூட்டு வலி',
    'Red Skin Rashes': 'தோலில் சிவப்பு தடிப்புகள்',
    'Extreme Weakness': 'கடுமையான சோர்வு',
    'Severe Watery Diarrhea (6 episodes)': 'கடுமையான வயிற்றுப்போக்கு (6 முறை)',
    'Vomiting': 'வாந்தி',
    'Dry Tongue': 'வறண்ட நாக்கு',
    'Mild Cramps': 'வயிற்றுப் பிடிப்பு',
    'Bilateral Pedal Edema (Foot swelling)': 'கால் வீக்கம்',
    'Morning Headache': 'காலை தலைவலி',
    'Fatigue': 'களைப்பு',
    'Skin Rash / Redness (त्वचा पर दाने)': 'தோல் தடிப்பு மற்றும் அரிப்பு',
    'High Fever (तेज बुखार)': 'கடுமையான காய்ச்சல்',
    'Loose Stools / Diarrhea (दस्त)': 'வயிற்றுப்போக்கு / பேதி',
    'Vomiting (उल्टी)': 'வாந்தி / குமட்டல்',
    'Severe Joint Pain (जोड़ों का दर्द)': 'கடுமையான மூட்டு வலி',
    'Cough & Cold (खांसी व जुकाम)': 'இருமல் மற்றும் சளி',
    'Shortness of Breath (सांस लेने में तकलीफ)': 'மூச்சுத்திணறல்',
    'Severe Headache (सिरदर्द)': 'கடுமையான தலைவலி',
    'Abdominal Cramps (पेट दर्द)': 'வயிற்று வலி மற்றும் பிடிப்பு',
    'Eye Redness / Itching (आंखें लाल होना)': 'கண் சிவத்தல் மற்றும் அரிப்பு',
    'Foot / Hand Swelling (सूजन)': 'கை-கால் வீக்கம்',
    'Extreme Weakness (कमजोरी)': 'கடுமையான உடல் பலவீனம்',

    // Body Areas
    'Whole Body / Fever': 'முழு உடல் / காய்ச்சல்',
    'Stomach & Gut': 'வயிறு மற்றும் செரிமானம்',
    'Skin & Limbs': 'தோல் மற்றும் கைகால்கள்',
    'Chest & Breathing': 'மார்பு மற்றும் சுவாசம்',
    'Head, Eyes, Throat': 'தலை, கண்கள் மற்றும் தொண்டை',
    'Maternal / Pregnancy': 'தாய்மை / கர்ப்பம்',

    // Common Phrases
    'Male': 'ஆண்',
    'Female': 'பெண்',
    'Other': 'மற்றவை',
    'Years': 'வயது',
    'Yrs': 'வயது',
    'Months': 'மாதங்கள்',
    'Weeks': 'வாரங்கள்',
    'Days': 'நாட்கள்',
    'Beds': 'படுக்கைகள்',
    'Beds Available': 'படுக்கைகள் உள்ளன',
    'Government-linked': 'அரசு அங்கீகாரம் பெற்றது',
    'Sahay Checked': 'சஹாய் சோதித்தது',
    'Community Verified': 'சமூக அளவில் சரிபார்க்கப்பட்டது',
    'Recently Confirmed': 'சமீபத்தில் உறுதி செய்யப்பட்டது',
    'Emergency Capable': 'அவசர சிகிச்சை வசதி கொண்டது',
    'Confirmed 4 min ago': '4 நிமிடங்களுக்கு முன் உறுதி செய்யப்பட்டது',
    'Confirmed 22 min ago': '22 நிமிடங்களுக்கு முன் உறுதி செய்யப்பட்டது',
    'Updated 2 hours ago': '2 மணி நேரத்திற்கு முன் புதுப்பிக்கப்பட்டது',
    'Confirmed 10 min ago (e-RaktKosh Direct API)': '10 நிமிடங்களுக்கு முன் (e-RaktKosh நேரடி API)',
    'Checked 1 hour ago': '1 மணி நேரத்திற்கு முன் சரிபார்க்கப்பட்டது',
    'Available Now': 'இப்போது கிடைக்கிறது',
    'Available (Evening Only)': 'கிடைக்கிறது (மாலை மட்டும்)',
    'Rampur Sub-District Hospital': 'ராம்பூர் வட்டார மருத்துவமனை',
    'Kalyanpur Community Health Centre (CHC)': 'கல்யாண்பூர் சமூக சுகாதார மையம் (CHC)',
    'MGM Central Hospital': 'எம்ஜிஎம் மத்திய மருத்துவமனை',
    'Rampur Sub-District Blood Bank': 'ராம்பூர் இரத்த வங்கி',
    'Kalyanpur CHC Storage Facility': 'கல்யாண்பூர் இரத்த சேமிப்பு மையம்',
  },

  mr: {
    // Triage & Status
    'Emergency': 'तातडीचे',
    'Urgent': 'अति-महत्वाचे',
    'Routine': 'नियमित',
    'pending': 'तपासणी बाकी',
    'reviewed': 'पूर्ण झाले',
    'Safe': 'सुरक्षित',
    'Watch': 'निगराणीखाली',
    'Alert': 'इशारा',
    'High': 'उच्च',
    'Medium': 'मध्यम',
    'Normal': 'सामान्य',
    'Overdue': 'चुकलेली लस',
    'Due Today': 'आजची देय तारीख',
    'Completed': 'पूर्ण झाले',

    // Symptoms
    'High Fever (3 Days)': 'तीव्र ताप (3 दिवस)',
    'Joint Pain': 'सांधेदुखी',
    'Red Skin Rashes': 'त्वचेवर लाल पुरळ',
    'Extreme Weakness': 'अति अशक्तपणा',
    'Severe Watery Diarrhea (6 episodes)': 'तीव्र जुलाब (6 वेळा)',
    'Vomiting': 'उलट्या',
    'Dry Tongue': 'कोरडी जीभ',
    'Mild Cramps': 'पोटात मुरडा',
    'Bilateral Pedal Edema (Foot swelling)': 'पायांवर सूज',
    'Morning Headache': 'सकाळचे डोकेदुखी',
    'Fatigue': 'थकवा',
    'Skin Rash / Redness (त्वचा पर दाने)': 'त्वचेवर लाल पुरळ व खाज',
    'High Fever (तेज बुखार)': 'तीव्र ताप',
    'Loose Stools / Diarrhea (दस्त)': 'पातळ जुलाब / डायरिया',
    'Vomiting (उल्टी)': 'उलट्या / मळमळ',
    'Severe Joint Pain (जोड़ों का दर्द)': 'तीव्र सांधेदुखी',
    'Cough & Cold (खांसी व जुकाम)': 'खोकला व सर्दी',
    'Shortness of Breath (सांस लेने में तकलीफ)': 'श्वास घेण्यास त्रास',
    'Severe Headache (सिरदर्द)': 'तीव्र डोकेदुखी',
    'Abdominal Cramps (पेट दर्द)': 'पोटदुखी व मुरडा',
    'Eye Redness / Itching (आंखें लाल होना)': 'डोळे लाल होणे व खाज',
    'Foot / Hand Swelling (सूजन)': 'हात-पायांवर सूज',
    'Extreme Weakness (कमजोरी)': 'अति अशक्तपणा व चक्कर',

    // Body Areas
    'Whole Body / Fever': 'संपूर्ण शरीर / ताप',
    'Stomach & Gut': 'पोट व पचनसंस्था',
    'Skin & Limbs': 'त्वचा व हातपाय',
    'Chest & Breathing': 'छाती व श्वसन',
    'Head, Eyes, Throat': 'डोके, डोळे व घसा',
    'Maternal / Pregnancy': 'माता / गरोदरपण',

    // Common Phrases
    'Male': 'पुरुष',
    'Female': 'स्त्री',
    'Other': 'इतर',
    'Years': 'वर्षे',
    'Yrs': 'वर्षे',
    'Months': 'महिने',
    'Weeks': 'आठवडे',
    'Days': 'दिवस',
    'Beds': 'बेड्स',
    'Beds Available': 'बेड्स उपलब्ध',
    'Government-linked': 'शासकीय मान्यताप्राप्त',
    'Sahay Checked': 'सहाय द्वारे तपासलेले',
    'Community Verified': 'स्थानिक स्तरावर प्रमाणित',
    'Recently Confirmed': 'नुकतेच निश्चित केलेले',
    'Emergency Capable': 'तातडीच्या उपचारासाठी सक्षम',
    'Confirmed 4 min ago': '4 मिनिटांपूर्वी निश्चित',
    'Confirmed 22 min ago': '22 मिनिटांपूर्वी निश्चित',
    'Updated 2 hours ago': '2 तासांपूर्वी अद्यतनित',
    'Confirmed 10 min ago (e-RaktKosh Direct API)': '10 मिनिटांपूर्वी निश्चित (e-RaktKosh API)',
    'Checked 1 hour ago': '1 तासापूर्वी तपासले',
    'Available Now': 'आता उपलब्ध',
    'Available (Evening Only)': 'उपलब्ध (फक्त संध्याकाळी)',
    'Rampur Sub-District Hospital': 'रामपूर उपजिल्हा रुग्णालय',
    'Kalyanpur Community Health Centre (CHC)': 'कल्याणपूर ग्रामीण रुग्णालय (CHC)',
    'MGM Central Hospital': 'एमजीएम सेंट्रल रुग्णालय',
    'Rampur Sub-District Blood Bank': 'रामपूर रक्तपेढी',
    'Kalyanpur CHC Storage Facility': 'कल्याणपूर रक्त साठवण केंद्र',
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('biobits_lang') || 'en');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    localStorage.setItem('biobits_lang', currentLang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLang;
    }
  }, [currentLang]);

  // Robust translation resolver
  const t = (key, fallback = '') => {
    if (!key) return fallback || '';
    
    // 1. Direct dictionary match in active language
    const langDict = TRANSLATIONS[currentLang];
    if (langDict && typeof langDict[key] === 'string') {
      return langDict[key];
    }

    // 2. Direct match in English dictionary
    const enDict = TRANSLATIONS.en;
    if (currentLang === 'en' && enDict && typeof enDict[key] === 'string') {
      return enDict[key];
    }

    // 3. Check dynamic phrase glossary for current language
    const glossary = DYNAMIC_GLOSSARY[currentLang];
    if (glossary && typeof glossary[key] === 'string') {
      return glossary[key];
    }

    // 4. If key is in English dictionary, see if that English text maps in glossary
    if (enDict && enDict[key] && glossary && glossary[enDict[key]]) {
      return glossary[enDict[key]];
    }

    // 5. Return fallback if provided, or English dictionary string, or key itself
    return fallback || (enDict && enDict[key]) || key;
  };

  // Helper for dynamic strings (symptoms, vitals, names, triage, status)
  const translateText = (text) => {
    if (!text || currentLang === 'en') return text;
    const glossary = DYNAMIC_GLOSSARY[currentLang];
    if (!glossary) return text;
    if (glossary[text]) return glossary[text];

    // Check partial phrase match
    let translated = text;
    Object.keys(glossary).forEach((k) => {
      if (translated.includes(k)) {
        translated = translated.replaceAll(k, glossary[k]);
      }
    });
    return translated;
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

  const value = useMemo(
    () => ({
      currentLang,
      setLanguage: setCurrentLang,
      languages: LANGUAGES,
      t,
      translateText,
      speak,
      stopSpeech: stop,
      isAudioPlaying,
    }),
    [currentLang, isAudioPlaying]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
