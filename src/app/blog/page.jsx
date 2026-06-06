'use client';

import React, { useState, useEffect } from 'react';
import HeaderComponent from '@/components/navBar';
import SponsorsSection from '@/components/sponsors';
import Footer from '@/components/footer';
import { Calendar, Clock, ArrowRight, BookOpen, Loader2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const fallbackArticles = [
  {
    id: "fb-1",
    title: "Empowering the Deaf Community: The Rise of Real-Time AI Sign Translators",
    category: "Sign-Tech AI",
    date: "June 04, 2026",
    readTime: "6 min read",
    summary: "As assistive technology expands, real-time hand-landmark recognition models are breaking barriers and enabling fluent, two-way communication between Deaf and hearing individuals. Discover how the latest models are paving the way for complete global inclusion.",
    rawContent: "# Empowering the Deaf Community\n\nAs assistive technology expands, real-time hand-landmark recognition models are breaking barriers and enabling fluent, two-way communication between Deaf and hearing individuals. Our mission is to pave the way for complete global inclusion.\n\n## Real-Time Vision Frameworks\n\nBy leveraging high-speed camera streams and deep learning, our web interpreter processes 21 coordinates per hand in real-time. This eliminates translation gaps in critical situations.\n\n![Real-Time Camera Integration](/images/1.jpg)\n\n## Our Commitment\n\n- Free and open-source models for schools of the deaf.\n- Ongoing research into Tanzanian Sign Language (TSL) colloquialisms.\n- Support for low-latency translations on mobile edge devices.",
    image: "/images/1.jpg",
    author: "AI Lab"
  },
  {
    id: "fb-2",
    title: "The Importance of Two-Way Communication in Public Services",
    category: "Inclusion",
    date: "May 28, 2026",
    readTime: "4 min read",
    summary: "Public institutions must prioritize accessible tools. Integrating real-time translators in hospitals and administrative desks ensures independent access for all citizens.",
    rawContent: "# Public Service Accessibility\n\nPublic institutions must prioritize accessible tools. Integrating real-time sign language translators in hospitals, public service desks, and municipal offices ensures independent access for all citizens.\n\n## Bridging Communication Barriers\n\nWithout a translator present, Deaf individuals frequently experience isolation when navigating healthcare or legal services. AI translation models provide an instantaneous bridge.\n\n![Assistive Terminals](/images/2.jpg)\n\n## Implementation Strategy\n\n1. Install camera terminals at reception desks.\n2. Connect local webcams to our secure translation API.\n3. Display instant text translations and enable Text-to-Speech playback.",
    image: "/images/2.jpg",
    author: "Public Care"
  },
  {
    id: "fb-3",
    title: "Innovations in Assistive Sign Technology: What's Next for 2026?",
    category: "Research",
    date: "May 15, 2026",
    readTime: "5 min read",
    summary: "Explore emerging features in sign language tracking, from complete face/body landmark meshes to offline translation capabilities on low-powered edge devices.",
    rawContent: "# The Future of Sign-Tech\n\nExplore emerging features in sign language tracking, from complete face/body landmark meshes to offline translation capabilities on low-powered edge devices.\n\n## Multi-Mesh Tracking\n\nIn addition to hands, facial expressions play an integral role in grammatical structure. The next phase of our AI interpreter uses combined facial landmark tracking to capture emotional context.\n\n![Advanced Hand Meshes](/images/3.jpg)\n\n- Combined hand + facial expression recognition.\n- Reduced model size for local offline rendering.\n- High-accuracy sentence structuring using NLP.",
    image: "/images/3.jpg",
    author: "Research Lead"
  },
  {
    id: "fb-4",
    title: "How Hand-Tracking Models Reshape Educational Accessibility",
    category: "Education",
    date: "May 02, 2026",
    readTime: "7 min read",
    summary: "Interactive classrooms are utilizing real-time cameras to teach sign language vocabulary, helping students learn together with gamified feedback.",
    rawContent: "# Gamified Sign Education\n\nInteractive classrooms are utilizing real-time cameras to teach sign language vocabulary, helping students learn together with gamified feedback.\n\n## Classroom Integrations\n\nTeachers are now able to display a letter on screen and have students mirror the gesture, while our AI provides immediate feedback on finger positioning and precision.\n\n![Educational Labs](/images/1.jpg)\n\nThis leads to faster vocabulary absorption and promotes inclusivity in early education programs.",
    image: "/images/1.jpg",
    author: "Edu Dev"
  }
];

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReadPost, setActiveReadPost] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        
        // Fetch published articles joining with profiles for author names
        const { data, error } = await supabase
          .from('content_posts')
          .select('*, author:profiles(full_name)')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const formatted = data.map((post, idx) => {
            // Estimate reading time (180 words per minute average)
            const wordsCount = post.content_body ? post.content_body.split(/\s+/).length : 0;
            const readTime = Math.max(3, Math.ceil(wordsCount / 180)) + ' min read';
            
            // Format published date
            const pubDate = post.published_at 
              ? new Date(post.published_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })
              : 'Recently';

            // Clean markdown syntax from preview summary
            const cleanSummary = post.content_body
              ? post.content_body
                  .replace(/[#*`\-_[\]()]/g, '') // strip markdown
                  .trim()
                  .slice(0, 180) + '...'
              : 'No content description available.';

            const categories = ['Sign-Tech AI', 'Inclusion', 'Research', 'Education'];
            const category = categories[idx % categories.length];
            const image = `/images/${(idx % 3) + 1}.jpg`;

            return {
              id: post.id,
              title: post.title,
              category,
              date: pubDate,
              readTime,
              summary: cleanSummary,
              rawContent: post.content_body, // Store full markdown body
              image,
              author: post.author?.full_name || 'Admin Team'
            };
          });
          setArticles(formatted);
        } else {
          setArticles(fallbackArticles);
        }
      } catch (err) {
        console.warn("Supabase fetch failed, using fallback articles:", err.message);
        setArticles(fallbackArticles);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  // Simple custom markdown renderer that supports inline images, headings, lists, and paragraphs
  const renderMarkdownContent = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Match markdown image tag: ![description](url)
      const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const url = imgMatch[2];
        return (
          <div key={idx} className="my-6 text-center">
            <img 
              src={url} 
              alt={alt || "Article image"} 
              className="rounded-2xl max-h-[380px] object-cover mx-auto shadow-md border border-gray-100 w-full"
            />
            {alt && <p className="text-xs text-gray-400 mt-2 italic">{alt}</p>}
          </div>
        );
      }

      // Match Headers: #, ##, ###
      if (trimmed.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl sm:text-3xl font-black text-gray-900 mt-6 mb-4">{trimmed.slice(2)}</h1>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={idx} className="text-xl sm:text-2xl font-black text-gray-800 mt-5 mb-3">{trimmed.slice(3)}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={idx} className="text-lg sm:text-xl font-bold text-gray-800 mt-4 mb-2">{trimmed.slice(4)}</h3>;
      }

      // Match Bullet lists: - or *
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <ul key={idx} className="list-disc pl-5 my-1.5 text-gray-650 text-sm sm:text-base leading-relaxed">
            <li>{trimmed.slice(2)}</li>
          </ul>
        );
      }

      // Empty Lines
      if (trimmed === '') {
        return <div key={idx} className="h-2"></div>;
      }

      // Default paragraph
      return <p key={idx} className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">{trimmed}</p>;
    });
  };

  const featured = articles[0] || fallbackArticles[0];
  const gridPosts = articles.slice(1);

  return (
    <div className="min-h-screen flex flex-col w-full bg-white">
      <HeaderComponent />
      
      <main className="flex-grow w-full relative">
        
        {/* Slanted decoration cylinders top right */}
        <div className="absolute top-[5%] right-[-40px] pointer-events-none z-0 hidden lg:block">
          <div className="relative w-48 h-36">
            <div className="absolute top-[-10px] right-[40px] w-10 h-36 bg-sky-400 rounded-full transform -rotate-[45deg] opacity-[0.8] shadow-sm"></div>
            <div className="absolute top-[-10px] right-0 w-10 h-36 bg-[#8b5cf6] rounded-full transform -rotate-[45deg] opacity-[0.8] shadow-sm"></div>
          </div>
        </div>

        {/* Hero title banner */}
        <div className="bg-gray-50 py-16 border-b border-gray-100 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Bridging Silence <span className="text-[#1b64da]">Blog</span>
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base font-medium">
              Read about the latest updates in AI sign language research, assistive tech design, and educational initiatives.
            </p>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-[#1b64da] animate-spin mb-4" />
            <p className="text-gray-500 text-sm font-semibold">Fetching articles from database...</p>
          </div>
        ) : (
          /* Blog content section */
          <div className="py-16 container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
            
            {/* Featured Article */}
            {featured && (
              <div className="mb-20">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#1b64da]" /> Featured Article
                </div>
                
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_15px_50px_rgba(0,0,0,0.03)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 hover:shadow-lg transition-all duration-300">
                  <div className="lg:col-span-6 bg-gray-100 rounded-2xl h-64 lg:h-full min-h-[260px] overflow-hidden flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[#1b64da]/10 mix-blend-overlay"></div>
                    <div className="w-full h-full bg-gradient-to-tr from-sky-400/20 to-purple-500/20 flex items-center justify-center text-gray-400">
                      <span className="text-xs font-bold uppercase tracking-wider">Cover Image</span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
                    <div className="flex gap-2">
                      <span className="inline-block px-3.5 py-1 bg-[#8b5cf6] text-white text-[10px] font-black rounded-full uppercase tracking-wider w-max">
                        {featured.category}
                      </span>
                      <span className="inline-block px-3.5 py-1 bg-blue-50 text-[#1b64da] text-[10px] font-black rounded-full uppercase tracking-wider w-max">
                        By {featured.author}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight hover:text-[#1b64da] transition-colors cursor-pointer">
                      {featured.title}
                    </h2>
                    
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {featured.summary}
                    </p>
                    
                    <div className="flex items-center gap-6 text-xs text-gray-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> {featured.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {featured.readTime}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => setActiveReadPost(featured)}
                      className="flex items-center gap-2 text-xs font-black text-[#1b64da] hover:text-[#1b64da]/80 uppercase transition-all pt-2 cursor-pointer outline-none focus:underline"
                    >
                      Read Article <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Regular articles grid */}
            {gridPosts.length > 0 && (
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 border-b border-gray-100 pb-4">
                  Latest Publications
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {gridPosts.map((post, idx) => (
                    <div 
                      key={post.id || `post-${idx}`}
                      onClick={() => setActiveReadPost(post)}
                      className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.02)] cursor-pointer"
                    >
                      <div className="bg-gray-100 h-48 overflow-hidden flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-[#1b64da]/5 mix-blend-overlay"></div>
                        <div className="w-full h-full bg-gradient-to-tr from-sky-400/10 to-purple-500/10 flex items-center justify-center text-gray-400">
                          <span className="text-[10px] font-bold uppercase tracking-wider">Cover Image</span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1.5">
                            <span className="inline-block px-3 py-0.5 bg-[#8b5cf6] text-white text-[9px] font-black rounded-full uppercase tracking-wider">
                              {post.category}
                            </span>
                            <span className="inline-block px-3 py-0.5 bg-blue-50 text-[#1b64da] text-[9px] font-black rounded-full uppercase tracking-wider">
                              {post.author}
                            </span>
                          </div>
                          
                          <h3 className="font-extrabold text-gray-800 text-base leading-snug hover:text-[#1b64da] transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                            {post.summary}
                          </p>
                        </div>
                        
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold border-t border-gray-50 pt-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* FULL ARTICLE READING DIALOG/MODAL */}
        {activeReadPost && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-[2.5rem] border border-gray-200 max-w-3xl w-full shadow-2xl overflow-hidden my-8 animate-scaleUp flex flex-col max-h-[85vh]">
              
              {/* Modal Top Bar */}
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <span className="inline-block px-3 py-1 bg-[#8b5cf6] text-white text-[9px] font-black rounded-full uppercase tracking-wider">
                  {activeReadPost.category}
                </span>
                <button
                  onClick={() => setActiveReadPost(null)}
                  className="text-gray-400 hover:text-gray-650 hover:bg-gray-100 p-1.5 rounded-xl transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="p-8 overflow-y-auto flex-1 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                    {activeReadPost.title}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-bold border-b border-gray-100 pb-4">
                    <span>By {activeReadPost.author}</span>
                    <span>•</span>
                    <span>{activeReadPost.date}</span>
                    <span>•</span>
                    <span>{activeReadPost.readTime}</span>
                  </div>
                </div>

                {/* Parsed Rich Markdown Output */}
                <div className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-4">
                  {renderMarkdownContent(activeReadPost.rawContent)}
                </div>
              </div>

              {/* Modal Bottom Close bar */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end bg-gray-50/50">
                <button
                  onClick={() => setActiveReadPost(null)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Close Reader
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Shared Sponsors Section */}
        <div className="w-full bg-white py-16 border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SponsorsSection />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
