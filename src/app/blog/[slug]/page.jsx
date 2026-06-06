'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import HeaderComponent from '@/components/navBar';
import SponsorsSection from '@/components/sponsors';
import Footer from '@/components/footer';
import { Calendar, Clock, ArrowLeft, Loader2, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ArticleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchArticle() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('content_posts')
          .select('*, author:profiles(full_name)')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;
        
        if (data) {
          // Calculate read time
          const wordsCount = data.content_body ? data.content_body.split(/\s+/).length : 0;
          const readTime = Math.max(3, Math.ceil(wordsCount / 180)) + ' min read';

          const pubDate = data.published_at 
            ? new Date(data.published_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })
            : 'Recently';

          setPost({
            ...data,
            date: pubDate,
            readTime,
            authorName: data.author?.full_name || 'Admin Team'
          });
        }
      } catch (err) {
        console.warn("Failed to retrieve article from database:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  // Extract first markdown image if present to use as header image
  let headerImageUrl = null;
  let bodyContent = post?.content_body || '';

  if (bodyContent) {
    const firstLine = bodyContent.trim().split('\n')[0]?.trim();
    const imageMatch = firstLine?.match(/^!\[(?:Header Image|.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      headerImageUrl = imageMatch[1];
      // Strip the header image line from the body to avoid double rendering
      bodyContent = bodyContent.replace(firstLine, '').trim();
    }
  }

  // Regex markdown parser for custom UI tags
  const renderMarkdown = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Images
      const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const url = imgMatch[2];
        return (
          <div key={idx} className="my-8 text-center">
            <img 
              src={url} 
              alt={alt || "Article illustration"} 
              className="rounded-2xl max-h-[420px] object-cover mx-auto shadow-md border border-gray-100 w-full"
            />
            {alt && <p className="text-xs text-gray-400 mt-2 italic">{alt}</p>}
          </div>
        );
      }

      // Headers
      if (trimmed.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl sm:text-3xl font-black text-gray-900 mt-8 mb-4">{trimmed.slice(2)}</h1>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={idx} className="text-xl sm:text-2xl font-black text-gray-800 mt-6 mb-3">{trimmed.slice(3)}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={idx} className="text-lg sm:text-xl font-bold text-gray-800 mt-4 mb-2">{trimmed.slice(4)}</h3>;
      }

      // Bullet lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <ul key={idx} className="list-disc pl-6 my-2 text-gray-650 text-sm sm:text-base leading-relaxed">
            <li>{trimmed.slice(2)}</li>
          </ul>
        );
      }

      // Spacing
      if (trimmed === '') {
        return <div key={idx} className="h-2"></div>;
      }

      // Paragraphs
      return <p key={idx} className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">{trimmed}</p>;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col w-full bg-white">
        <HeaderComponent />
        <div className="flex-grow flex flex-col items-center justify-center py-32">
          <Loader2 className="w-10 h-10 text-[#1b64da] animate-spin mb-4" />
          <p className="text-gray-500 text-sm font-semibold">Loading article details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col w-full bg-white">
        <HeaderComponent />
        <div className="flex-grow flex flex-col items-center justify-center py-32 max-w-md mx-auto text-center px-4">
          <h2 className="text-2xl font-black text-gray-800 mb-2">Article Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">The article you are looking for may have been archived, deleted, or reverted to draft status.</p>
          <button 
            onClick={() => router.push('/blog')}
            className="flex items-center gap-2 bg-[#1b64da] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-[#1b64da]/90 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

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

        {/* Back Link Row */}
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl pt-8 relative z-10">
          <button 
            onClick={() => router.push('/blog')}
            className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-[#1b64da] transition-colors uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to publications
          </button>
        </div>

        {/* Article Reading Area */}
        <article className="py-12 container mx-auto px-4 sm:px-6 max-w-3xl relative z-10">
          
          {/* Header Details */}
          <div className="space-y-4 mb-8">
            <span className="inline-block px-3 py-1 bg-[#8b5cf6] text-white text-[9px] font-black rounded-full uppercase tracking-wider">
              {post.category || 'Sign-Tech AI'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-bold border-b border-gray-100 pb-6">
              <span>By {post.authorName}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>
          </div>

          {/* Header Banner Image (if extracted) */}
          {headerImageUrl ? (
            <div className="mb-10 rounded-[2rem] overflow-hidden border border-gray-100 shadow-md h-64 sm:h-[400px]">
              <img 
                src={headerImageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            /* fallback gradient banner if no cover is found */
            <div className="mb-10 rounded-[2rem] h-48 bg-gradient-to-tr from-sky-400/10 to-purple-500/10 border border-gray-100 flex items-center justify-center text-gray-300">
              <BookOpen className="w-12 h-12" />
            </div>
          )}

          {/* Parsed Body Markup */}
          <div className="text-gray-750 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
            {renderMarkdown(bodyContent)}
          </div>

        </article>

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
