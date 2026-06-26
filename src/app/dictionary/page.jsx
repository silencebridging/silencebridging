'use client';

import React, { useState, useEffect, useRef } from 'react';
import HeaderComponent from '@/components/navBar';
import Footer from '@/components/footer';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Play, 
  BookOpen, 
  Volume2, 
  ArrowLeft, 
  Loader2, 
  Sparkles, 
  Info,
  Tv,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

// Static museum signs as fallback and default content
const staticSigns = [
  { id: 'static-1', sign_meaning: 'ambukiza', video_url: '/videos/ambukiza.mp4', notes: 'Habari za maambukizi ya ugonjwa (Infect/Transmission context)', category: 'Afya (Health)', is_static: true },
  { id: 'static-2', sign_meaning: 'angalia', video_url: '/videos/angalia.mp4', notes: 'Kuangalia au kutazama kwa macho (Look/Watch gesture)', category: 'Vitendo (Actions)', is_static: true },
  { id: 'static-3', sign_meaning: 'angalifu', video_url: '/videos/angalifu.mp4', notes: 'Kuwa makini au hadhari (Careful/Cautious expression)', category: 'Tabia (Traits)', is_static: true },
  { id: 'static-4', sign_meaning: 'kitengo', video_url: '/videos/kitengo.mp4', notes: 'Sehemu au idara maalum (Department/Unit classification)', category: 'Kazi (Work)', is_static: true },
  { id: 'static-5', sign_meaning: 'tofali', video_url: '/videos/tofali.mp4', notes: 'Kujenga kwa kutumia matofali (Brick/Building gesture)', category: 'Vitu (Objects)', is_static: true }
];

export default function DictionaryPage() {
  const { language } = useLanguage();
  const isSwahili = language === 'sw';
  const playerRef = useRef(null);

  // States
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSign, setSelectedSign] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Load signs from Supabase and merge with static
  useEffect(() => {
    async function fetchSigns() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('tsl_dictionary')
          .select('*')
          .eq('status', 'approved')
          .order('sign_meaning', { ascending: true });

        if (error) throw error;

        // Merge Supabase and static signs
        const dbSigns = (data || []).map(item => ({
          ...item,
          is_static: false,
          category: 'Jamii (Community)' // Default category for user-submitted signs
        }));

        // Filter out static signs if they are already present in DB by meaning
        const filteredStatic = staticSigns.filter(
          s => !dbSigns.some(db => db.sign_meaning.toLowerCase() === s.sign_meaning.toLowerCase())
        );

        const combined = [...filteredStatic, ...dbSigns];
        // Sort alphabetically by meaning
        combined.sort((a, b) => a.sign_meaning.localeCompare(b.sign_meaning));

        setSigns(combined);
        if (combined.length > 0) {
          setSelectedSign(combined[0]);
        }
      } catch (err) {
        console.error('Error fetching signs:', err);
        // Fallback to static signs only on failure
        setSigns(staticSigns);
        setSelectedSign(staticSigns[0]);
      } finally {
        setLoading(false);
      }
    }

    fetchSigns();
    // Check speech synthesis support
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSupported(true);
    }
  }, []);

  // Filtered signs
  const filteredSigns = signs.filter(sign =>
    sign.sign_meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (sign.notes && sign.notes.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle Card Click
  const handleSelectSign = (sign) => {
    setSelectedSign(sign);
    // Smoothly scroll to the player on mobile viewports
    if (window.innerWidth < 1024 && playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Text to Speech
  const handleTextToSpeech = (text) => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isSwahili ? 'sw-TZ' : 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 overflow-hidden relative font-sans">
      {/* Header */}
      <HeaderComponent />

      {/* Decorative ambient elements */}
      <div className="absolute top-[10%] left-[-15%] w-[45%] aspect-square rounded-full bg-blue-100/30 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-15%] w-[45%] aspect-square rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none z-0" />

      {/* Content Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1b64da] transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          {isSwahili ? 'Rudi Nyumbani' : 'Back to Home'}
        </Link>

        {/* Section Title */}
        <div className="mb-10">
          <span className="px-3.5 py-1.5 rounded-full bg-[#1b64da]/10 text-[#1b64da] text-xs font-black uppercase tracking-wider">
            {isSwahili ? 'Kujifunza & Tafsiri' : 'Learning & Translation'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            {isSwahili ? 'Makumbusho ya Lugha ya' : 'Tanzanian Sign'}{' '}
            <span className="bg-gradient-to-r from-blue-600 to-[#8b5cf6] bg-clip-text text-transparent">
              {isSwahili ? 'Alama (TSL)' : 'Language Dictionary'}
            </span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2 font-medium max-w-2xl leading-relaxed">
            {isSwahili 
              ? 'Tazama na ujifunze tafsiri sahihi za maneno ya Kiswahili kwenda kwenye Lugha ya Alama ya Tanzania (TSL) kupitia video zilizothibitishwa.' 
              : 'Browse and learn certified Tanzanian Sign Language (TSL) signs. Watch accurate demonstrations to bridge communication barriers.'}
          </p>
        </div>

        {/* Layout Split: Search & Grid (Left) / Cinematic Player (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Search & Grid List (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Search Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex items-center gap-3">
              <div className="pl-3.5">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder={isSwahili ? 'Tafuta neno la alama...' : 'Search for a sign word...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 outline-none text-slate-800 placeholder-slate-400 font-semibold text-sm w-full py-2"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-655 font-bold hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  {isSwahili ? 'Futa' : 'Clear'}
                </button>
              )}
            </div>

            {/* Grid list container */}
            <div className="relative">
              {loading ? (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center shadow-sm flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-slate-500 text-sm font-semibold">
                    {isSwahili ? 'Tunapakia maneno yote ya alama...' : 'Loading dictionary signs...'}
                  </p>
                </div>
              ) : filteredSigns.length === 0 ? (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center shadow-sm">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-800 font-black text-lg">
                    {isSwahili ? 'Hakuna Matokeo Yaliyopatikana' : 'No Signs Found'}
                  </p>
                  <p className="text-slate-400 text-xs mt-1 font-semibold">
                    {isSwahili ? 'Jaribu kutafuta neno lingine au badilisha herufi.' : 'Try searching for another word or spelling.'}
                  </p>
                </div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredSigns.map((sign) => {
                      const isActive = selectedSign?.id === sign.id;
                      return (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          key={sign.id}
                          onClick={() => handleSelectSign(sign)}
                          className={`group cursor-pointer rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between h-36 ${
                            isActive
                              ? 'bg-white border-blue-600 shadow-[0_12px_30px_rgba(27,100,218,0.08)] ring-1 ring-blue-600'
                              : 'bg-white border-slate-200/70 hover:border-slate-350 hover:shadow-[0_8px_25px_rgb(0,0,0,0.02)]'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                sign.is_static 
                                  ? 'bg-[#8b5cf6]/10 text-[#8b5cf6]' 
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              }`}>
                                {sign.is_static ? (isSwahili ? 'Makumbusho' : 'Museum') : (isSwahili ? 'Imethibitishwa' : 'Verified')}
                              </span>
                            </div>
                            <h3 className="font-extrabold text-slate-900 group-hover:text-[#1b64da] transition-colors mt-3 text-base capitalize tracking-tight leading-tight truncate">
                              {sign.sign_meaning}
                            </h3>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate max-w-[100px]">
                              {sign.category || (isSwahili ? 'Jamii' : 'Community')}
                            </span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isActive 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-slate-100 text-slate-400 group-hover:bg-[#1b64da]/10 group-hover:text-[#1b64da]'
                            }`}>
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

          </div>

          {/* RIGHT SIDE: Cinematic Video Player Panel (5 Cols) */}
          <div ref={playerRef} className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white border border-slate-200/80 rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.03)] overflow-hidden">
              
              {/* Cinematic TV Player Bar */}
              <div className="bg-slate-900 px-5 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Tv className="w-4.5 h-4.5 text-blue-400" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">
                    {isSwahili ? 'Kicheza Video cha TSL' : 'TSL Sign Player'}
                  </span>
                </div>
                {selectedSign && (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    selectedSign.is_static ? 'bg-purple-500/20 text-purple-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {selectedSign.is_static ? 'Museum' : 'Live DB'}
                  </span>
                )}
              </div>

              {/* Video Display Container */}
              <div className="relative aspect-[4/3] bg-black flex items-center justify-center overflow-hidden group">
                {selectedSign ? (
                  selectedSign.video_url ? (
                    <video
                      key={selectedSign.id}
                      src={selectedSign.video_url}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                      playsInline
                    />
                  ) : (
                    <div className="text-center p-8 text-slate-500 space-y-2">
                      <HelpCircle className="w-12 h-12 text-slate-600 mx-auto" />
                      <p className="text-sm font-bold">{isSwahili ? 'Video Haijapatikana' : 'No Demonstration Video'}</p>
                    </div>
                  )
                ) : (
                  <div className="text-center p-8 text-slate-500 space-y-3">
                    <Tv className="w-12 h-12 text-slate-700 mx-auto animate-pulse" />
                    <p className="text-sm font-bold">
                      {isSwahili ? 'Chagua neno lolote kuanza kucheza' : 'Select a word to start watching'}
                    </p>
                  </div>
                )}
              </div>

              {/* Player Metadata details */}
              {selectedSign ? (
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Title & Speech */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 capitalize tracking-tight">
                        {selectedSign.sign_meaning}
                      </h2>
                      <span className="text-xs text-blue-600 font-bold block mt-1 uppercase tracking-wider">
                        {selectedSign.category || (isSwahili ? 'Lugha ya Alama ya Tanzania' : 'Tanzanian Sign Language')}
                      </span>
                    </div>

                    {speechSupported && (
                      <button
                        onClick={() => handleTextToSpeech(selectedSign.sign_meaning)}
                        className="p-3 bg-slate-100 hover:bg-[#1b64da]/10 text-slate-655 hover:text-[#1b64da] rounded-2xl transition-all cursor-pointer group-hover:scale-105 active:scale-95 shadow-sm"
                        title={isSwahili ? 'Sikia Matamshi' : 'Listen Pronunciation'}
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Context notes */}
                  <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-blue-500" /> {isSwahili ? 'Maelezo / Muktadha' : 'Context / Notes'}
                    </span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {selectedSign.notes || (isSwahili 
                        ? 'Hakuna maelezo ya muktadha yaliyowekwa kwa alama hii.' 
                        : 'No context notes provided for this TSL sign.')}
                    </p>
                  </div>

                  {/* Trust indicator */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <CheckCircle className={`w-4 h-4 ${selectedSign.is_static ? 'text-purple-500' : 'text-emerald-500'}`} />
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      {selectedSign.is_static 
                        ? (isSwahili ? 'Alama ya Kudumu ya Makumbusho' : 'Standard Museum Exhibition Sign')
                        : (isSwahili ? 'Alama Iliyothibitishwa na Msimamizi' : 'Admin Verified Community Translation')}
                    </span>
                  </div>

                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 font-semibold text-xs bg-slate-50/50">
                  {isSwahili ? 'Tafsiri inaonekana hapa' : 'Translations display panel'}
                </div>
              )}

            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
