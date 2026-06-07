'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const translations = {
  en: {
    // Navigation / Common
    nav_home: 'Home',
    nav_about: 'About Us',
    nav_services: 'Services',
    nav_faq: "FAQ's",
    nav_blog: 'Blog',
    nav_contact: 'Contact Us',
    nav_phone: 'Phone',
    nav_email: 'Email',
    nav_get_started: 'Get Started',
    hero_title: 'Bridging Silence',
    hero_subtitle: 'CONNECTING COMMUNITIES THROUGH COMMUNICATION',
    language_select: 'Language',

    // Voice Services Component
    srv_sign_language: 'Sign Language',
    srv_sign_to_sauti: 'Sign-to-Sauti',
    srv_sauti_to_sign: 'Sauti-to-Sign',
    srv_sign_to_text: 'Sign-to-Text',
    srv_join_live: 'Join Live Conversation',
    srv_title_bold_1: 'Every',
    srv_title_color_1: 'Voice',
    srv_title_bold_2: 'Deserves To Be',
    srv_title_color_2: 'Heard',
    srv_desc: 'Bridging Silence creates seamless communication between spoken and signed languages through innovative technology.',
    srv_how_to_start: 'How to start?',

    // Problem / Solution Component
    desc_prob_title_1: 'The',
    desc_prob_title_color: 'Silent Struggle',
    desc_prob_title_2: 'is Real.',
    desc_prob_content: '466 million people including students live with disabling hearing loss, yet everyday conversation remains a challenge. Misunderstandings, isolation, and lack of accessible tools create barriers between the Deaf and hearing worlds.',
    desc_watch_video: 'Watch Video',
    desc_sol_title_1: 'Bridging',
    desc_sol_title_color: 'Silence',
    desc_sol_title_2: 'Fixes This.',
    desc_sol_tagline: 'Where Technology Meets Inclusion',
    desc_sol_content: 'We turn barriers into bridges with real-time tools: speech-to-text, sign language translation, and inclusive community platforms. Now everyone can connect without limits.',
    desc_watch_demo: 'Watch Demo',

    // Sign Museum Component
    vid_title_color_1: 'Sign',
    vid_title_bold: 'Museum',
    vid_title_color_2: 'Videos',
    vid_desc: 'By clicking the button below, explore all videos of TSL...',
    vid_view_all: 'View All 121+ Videos',

    // Products Showcase Component
    prod_title: 'Products',
    prod_tab_get: 'Get',
    prod_tab_view: 'View',
    prod_order_now: 'Order Now',
    prod_download_now: 'Download Now',
    prod_request_demo: 'Request Demo',
    prod_subtitle_sautibox: 'Hardware Device',
    prod_subtitle_bridgingapp: 'Mobile App',
    prod_subtitle_sautiweb: 'Enterprise Platform',
    prod_features_sautibox: [
      'Portable sign-to-speech converter',
      '5" touchscreen & HD camera',
      '100+ TSL signs supported',
      'Offline functionality',
      '6-hours battery life'
    ],
    prod_features_bridgingapp: [
      'Real-time translations',
      'iOS/Android compatible',
      'Basic TSL tutorials',
      'Conversation history (30 days)',
      'Free and Premium access'
    ],
    prod_features_sautiweb: [
      'Organization-wide accessibility suite',
      'Admin dashboard for teams',
      'SCORM-compliant training module',
      'Analytical & reporting',
      'Custom API integration'
    ],

    // Footer Component
    footer_chat_reply: 'Write a reply..',
    footer_chat_start: 'Start a conversation...',
    footer_copyright: 'Copyright 2025- All Rights Reserved'
  },
  sw: {
    // Navigation / Common
    nav_home: 'Mwanzo',
    nav_about: 'Kuhusu Sisi',
    nav_services: 'Huduma',
    nav_faq: 'Maswali ya Kawaida',
    nav_blog: 'Blogu',
    nav_contact: 'Wasiliana Nasi',
    nav_phone: 'Simu',
    nav_email: 'Barua Pepe',
    nav_get_started: 'Anza Sasa',
    hero_title: 'Kuziba Kimya',
    hero_subtitle: 'KUUNGANISHA JAMII KUPITIA MAWASILIANO',
    language_select: 'Lugha',

    // Voice Services Component
    srv_sign_language: 'Lugha ya Alama',
    srv_sign_to_sauti: 'Alama-kwenda-Sauti',
    srv_sauti_to_sign: 'Sauti-kwenda-Alama',
    srv_sign_to_text: 'Alama-kwenda-Maandishi',
    srv_join_live: 'Jiunge na Mazungumzo ya Moja kwa Moja',
    srv_title_bold_1: 'Kila',
    srv_title_color_1: 'Sauti',
    srv_title_bold_2: 'Inastahili',
    srv_title_color_2: 'Kusikika',
    srv_desc: 'Kuziba Kimya inaunda mawasiliano yasiyo na kikwazo kati ya lugha za kuzungumza na za alama kupitia teknolojia ya ubunifu.',
    srv_how_to_start: 'Jinsi ya kuanza?',

    // Problem / Solution Component
    desc_prob_title_1: 'Hali ya',
    desc_prob_title_color: 'Kuteseka Kimya',
    desc_prob_title_2: 'ni Halisi.',
    desc_prob_content: 'Watu milioni 466 ikiwa ni pamoja na wanafunzi wanaishi na ulemavu wa kusikia, lakini mazungumzo ya kila siku bado ni changamoto. Kutokuelewana, kutengwa, na ukosefu wa zana zinazofikika huunda vizuizi kati ya viziwi na ulimwengu wa kusikia.',
    desc_watch_video: 'Tazama Video',
    desc_sol_title_1: 'Kuziba',
    desc_sol_title_color: 'Kimya',
    desc_sol_title_2: 'Inatatua Hili.',
    desc_sol_tagline: 'Ambapo Teknolojia Inakutana na Ujumuishi',
    desc_sol_content: 'Tunageuza vizuizi kuwa madaraja kwa zana za muda halisi: hotuba-kwenda-maandishi, tafsiri ya lugha ya alama, na majukwaa ya jamii yenye ujumuishi. Sasa kila mtu anaweza kuungana bila mipaka.',
    desc_watch_demo: 'Tazama Onyesho',

    // Sign Museum Component
    vid_title_color_1: 'Alama',
    vid_title_bold: 'Makumbusho ya',
    vid_title_color_2: 'Video',
    vid_desc: 'Kwa kubonyeza kitufe kilicho hapa chini, chunguza video zote za Lugha ya Alama ya Tanzania (TSL)...',
    vid_view_all: 'Tazama Video Zote 121+',

    // Products Showcase Component
    prod_title: 'Bidhaa',
    prod_tab_get: 'Pata',
    prod_tab_view: 'Tazama',
    prod_order_now: 'Agiza Sasa',
    prod_download_now: 'Pakua Sasa',
    prod_request_demo: 'Omba Onyesho',
    prod_subtitle_sautibox: 'Kifaa cha Kielektroniki',
    prod_subtitle_bridgingapp: 'Programu ya Simu',
    prod_subtitle_sautiweb: 'Jukwaa la Mashirika',
    prod_features_sautibox: [
      'Kifaa cha kubebeka cha kubadilisha alama kuwa sauti',
      'Skrini ya mguso ya inchi 5 na kamera ya HD',
      'Alama 100+ za TSL zinazoauniwa',
      'Inafanya kazi bila mtandao (offline)',
      'Masaa 6 ya maisha ya betri'
    ],
    prod_features_bridgingapp: [
      'Tafsiri za muda halisi',
      'Inafanya kazi kwenye iOS/Android',
      'Mafunzo ya kimsingi ya TSL',
      'Historia ya mazungumzo (siku 30)',
      'Ufikiaji wa Bure na wa Kulipia'
    ],
    prod_features_sautiweb: [
      'Zana ya ufikiaji ya shirika zima',
      'Dashibodi ya usimamizi kwa timu',
      'Moduli ya mafunzo inayotii SCORM',
      'Uchambuzi na ripoti',
      'Ujumuishaji wa API maalum'
    ],

    // Footer Component
    footer_chat_reply: 'Andika jibu..',
    footer_chat_start: 'Anza mazungumzo...',
    footer_copyright: 'Haki zote zimehifadhiwa © 2025'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

  // Load language preference from local storage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang === 'sw' || savedLang === 'en') {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'sw') {
      setLanguageState(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  const t = (key) => {
    const translation = translations[language]?.[key];
    if (translation === undefined) {
      // Fallback to English if translation is missing
      return translations['en']?.[key] || key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
