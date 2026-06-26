'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeaderComponent from '@/components/navBar';
import SponsorsSection from '@/components/sponsors';
import Footer from '@/components/footer';
import { Calendar, Clock, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function BlogPage() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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

            // Check if there is an uploaded header image as the first markdown element
            let image = `/images/${(idx % 3) + 1}.jpg`; // Fallback image
            if (post.content_body) {
              const firstLine = post.content_body.trim().split('\n')[0]?.trim();
              const imageMatch = firstLine?.match(/^!\[(?:Header Image|.*?)\]\((.*?)\)$/);
              if (imageMatch) {
                image = imageMatch[1];
              }
            }

            const categories = ['Sign-Tech AI', 'Inclusion', 'Research', 'Education'];
            const category = categories[idx % categories.length];

            return {
              id: post.id,
              title: post.title,
              slug: post.slug,
              category,
              date: pubDate,
              readTime,
              summary: cleanSummary,
              image,
              author: post.author?.full_name || 'Admin Team'
            };
          });
          setArticles(formatted);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.warn("Supabase fetch failed or returned empty:", err.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const featured = articles[0] || null;
  const gridPosts = articles.slice(1);

  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc] overflow-hidden relative">
      {/* Decorative background ambient glows for page uniformity */}
      <div className="absolute top-[15%] left-[-15%] w-[50%] aspect-square rounded-full bg-blue-400/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[60%] right-[-15%] w-[50%] aspect-square rounded-full bg-purple-400/10 blur-[130px] pointer-events-none z-0" />

      <HeaderComponent />
      
      <main className="flex-grow w-full relative z-10">
        
        {/* Slanted decoration cylinders top right */}
        <div className="absolute top-[5%] right-[-40px] pointer-events-none z-0 hidden lg:block">
          <div className="relative w-48 h-36">
            <div className="absolute top-[-10px] right-[40px] w-10 h-36 bg-sky-400 rounded-full transform -rotate-[45deg] opacity-[0.8] shadow-sm"></div>
            <div className="absolute top-[-10px] right-0 w-10 h-36 bg-[#8b5cf6] rounded-full transform -rotate-[45deg] opacity-[0.8] shadow-sm"></div>
          </div>
        </div>

        {/* Hero title banner */}
        <div className="bg-transparent py-16 relative overflow-hidden">
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
            
            {articles.length === 0 ? (
              /* Beautiful Empty State Card instead of mock blogs */
              <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 max-w-xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-200/50">
                <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-gray-800">No Publications Yet</h3>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-md mx-auto">
                  We are preparing content! Our articles on sign language technology, AI models, and community impact will be available soon. Check back shortly.
                </p>
              </div>
            ) : (
              <>
                {/* Featured Article */}
                {featured && (
                  <div className="mb-20">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#1b64da]" /> Featured Article
                    </div>
                    
                    <div 
                      onClick={() => router.push(`/blog/${featured.slug}`)}
                      className="bg-white/90 backdrop-blur-sm rounded-[2.5rem] border border-gray-100 shadow-[0_15px_50px_rgba(0,0,0,0.03)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="lg:col-span-6 bg-gray-50 rounded-2xl h-64 lg:h-full min-h-[260px] overflow-hidden relative border border-gray-55">
                        <img 
                          src={featured.image} 
                          alt={featured.title} 
                          className="w-full h-full object-cover absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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
                        
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight hover:text-[#1b64da] transition-colors">
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
                        
                        <button className="flex items-center gap-2 text-xs font-black text-[#1b64da] hover:text-[#1b64da]/80 uppercase transition-all pt-2 cursor-pointer">
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
                          onClick={() => router.push(`/blog/${post.slug}`)}
                          className="bg-white/90 backdrop-blur-sm rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.02)] cursor-pointer"
                        >
                          <div className="bg-gray-50 h-48 overflow-hidden relative border-b border-gray-50">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover absolute inset-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
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
              </>
            )}

          </div>
        )}

        {/* Shared Sponsors Section - transparent to blend */}
        <div className="w-full bg-transparent py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SponsorsSection />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
