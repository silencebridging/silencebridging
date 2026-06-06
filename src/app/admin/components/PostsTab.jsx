'use client';

import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Plus, 
  X, 
  XCircle, 
  Check, 
  Loader2,
  Upload
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function PostsTab({
  posts = [],
  isArticleModalOpen,
  setIsArticleModalOpen,
  articleTitle,
  setArticleTitle,
  articleBody,
  setArticleBody,
  articleStatus,
  setArticleStatus,
  articleHeaderImage,
  setArticleHeaderImage,
  handleAddArticleSubmit,
  handleUpdatePostStatus,
  formError,
  setFormError,
  formSuccess,
  setFormSuccess,
  formSubmitting,
  userProfile
}) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingHeader, setIsUploadingHeader] = useState(false);
  
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const headerInputRef = useRef(null);

  const onImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `article_images/${fileName}`;

      // Upload image to the Supabase assets bucket
      const { data, error } = await supabase.storage
        .from('assets')
        .upload(filePath, file);

      if (error) {
        throw new Error(error.message);
      }

      // Retrieve public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      const textarea = textareaRef.current;
      const markdownSnippet = `\n![Image Description](${publicUrl})\n`;

      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = articleBody;
        const newText = currentText.substring(0, start) + markdownSnippet + currentText.substring(end);
        
        setArticleBody(newText);

        // Reset cursor focus after inserting markdown image
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + markdownSnippet.length, start + markdownSnippet.length);
        }, 100);
      } else {
        setArticleBody(prev => prev + markdownSnippet);
      }
    } catch (err) {
      alert("Failed to upload image: " + err.message);
    } finally {
      setIsUploadingImage(false);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const onHeaderImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingHeader(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `header_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `article_headers/${fileName}`;

      // Upload header cover image to the Supabase assets bucket
      const { data, error } = await supabase.storage
        .from('assets')
        .upload(filePath, file);

      if (error) {
        throw new Error(error.message);
      }

      // Retrieve public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      setArticleHeaderImage(publicUrl);
    } catch (err) {
      alert("Failed to upload cover photo: " + err.message);
    } finally {
      setIsUploadingHeader(false);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Content Management (CMS)</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Manage articles, tutorials, announcements, and resources published on the website.</p>
        </div>
        <button 
          onClick={() => setIsArticleModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-600/10"
        >
          <Plus className="w-4 h-4" /> Write Article
        </button>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 font-medium shadow-sm">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>No articles or posts found.</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-extrabold text-gray-900 text-base tracking-tight">{post.title}</h3>
                <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-2 font-semibold">
                  <span>Author: {post.author || 'Staff'}</span>
                  <span>•</span>
                  <span>{post.published_at ? `Published: ${post.published_at?.split('T')?.[0]}` : 'Draft Mode'}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize border ${
                  post.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-100 text-gray-500 border-gray-200'
                }`}>
                  {post.status}
                </span>
                {post.status === 'draft' ? (
                  <button
                    onClick={() => handleUpdatePostStatus(post.id, 'published')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdatePostStatus(post.id, 'draft')}
                    className="text-gray-650 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    Keep Draft
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* DIALOG/MODAL: WRITE ARTICLE */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-[1px]">
          <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-2xl shadow-2xl overflow-hidden relative animate-scaleUp">
            
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-gray-900 text-base">Write Announcement / Article</h3>
              </div>
              <button 
                onClick={() => {
                  setIsArticleModalOpen(false);
                  setFormError('');
                  setFormSuccess('');
                }}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddArticleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {formError && (
                <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-800 rounded-xl font-medium flex items-center gap-2">
                  <XCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{formError}</span>
                </div>
              )}
              {formSuccess && (
                <div className="p-3 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Article Title</label>
                <input 
                  type="text" 
                  value={articleTitle}
                  onChange={e => setArticleTitle(e.target.value)}
                  placeholder="e.g. Launching TSL gestural translator v2"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                  disabled={formSubmitting}
                />
              </div>

              {/* HEADER COVER IMAGE COVER SELECTOR */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Header Cover Image</label>
                <input 
                  type="file" 
                  ref={headerInputRef}
                  onChange={onHeaderImageChange}
                  accept="image/*"
                  className="hidden"
                />
                
                {articleHeaderImage ? (
                  <div className="relative border border-gray-250 rounded-xl overflow-hidden bg-gray-50 flex items-center p-3 gap-3">
                    <img 
                      src={articleHeaderImage} 
                      alt="Header Preview" 
                      className="w-16 h-12 object-cover rounded-lg border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">Upload Complete</p>
                      <span className="text-[10px] text-gray-400 font-semibold truncate block">{articleHeaderImage}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setArticleHeaderImage('')}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all cursor-pointer"
                      title="Remove cover photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => headerInputRef.current?.click()}
                    disabled={isUploadingHeader || formSubmitting}
                    className="w-full border border-dashed border-gray-300 hover:border-blue-550 rounded-xl py-4 flex flex-col items-center justify-center gap-1.5 transition-all text-gray-500 hover:text-blue-600 bg-gray-50/50 cursor-pointer disabled:opacity-50"
                  >
                    {isUploadingHeader ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                        <span className="text-xs font-bold">Uploading Cover Photo...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-gray-400" />
                        <span className="text-xs font-bold">Choose cover photo</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Author</label>
                  <input 
                    type="text" 
                    value={userProfile?.full_name || 'Staff Member'}
                    disabled
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Initial Status</label>
                  <select
                    value={articleStatus}
                    onChange={e => setArticleStatus(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                    disabled={formSubmitting}
                  >
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published (Public)</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Content Body (Markdown Supported)
                  </label>
                  
                  {/* Upload Image Helper */}
                  <div className="relative">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={onImageFileChange} 
                      accept="image/*"
                      className="hidden" 
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage || formSubmitting}
                      className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-[#1b64da] rounded-lg text-[10px] font-extrabold transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isUploadingImage ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin text-[#1b64da]" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Insert Image</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <textarea
                  ref={textareaRef}
                  value={articleBody}
                  onChange={e => setArticleBody(e.target.value)}
                  placeholder="Type your markdown content here... Tip: Click 'Insert Image' to upload and place images inside the content."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all h-48 resize-none font-mono"
                  required
                  disabled={formSubmitting}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  disabled={formSubmitting}
                  className="px-4 py-2 border border-gray-200 text-gray-600 hover:text-gray-900 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/10 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {formSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving Article...
                    </>
                  ) : (
                    'Save Article'
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
