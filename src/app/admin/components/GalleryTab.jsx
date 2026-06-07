'use client';

import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Upload, 
  Edit3, 
  Trash2, 
  Plus, 
  Calendar, 
  Tag, 
  FileText, 
  Check, 
  X, 
  RefreshCw, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function GalleryTab() {
  const [images, setImages] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Modal State
  const [editingImage, setEditingImage] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formTags, setFormTags] = useState('');
  const [saving, setSaving] = useState(false);

  // Fetch both Cloudinary images and Supabase metadata
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Fetch images from our Cloudinary API
      const res = await fetch('/api/cloudinary/gallery');
      if (!res.ok) throw new Error('Failed to load images from Cloudinary.');
      const data = await res.json();
      const cloudinaryImages = data.resources || [];
      setImages(cloudinaryImages);

      // 2. Fetch metadata from Supabase
      const { data: dbMetadata, error: dbError } = await supabase
        .from('cloudinary_metadata')
        .select('*');
      
      if (dbError) throw dbError;

      // Map metadata by public_id for easy O(1) lookup
      const metaMap = {};
      dbMetadata?.forEach(item => {
        metaMap[item.public_id] = item;
      });
      setMetadata(metaMap);

    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Upload handler
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to upload image.');
      }

      setSuccess('Image successfully uploaded to Cloudinary!');
      fetchData(); // reload
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Open Edit Modal
  const startEdit = (img) => {
    const existing = metadata[img.public_id] || {};
    setEditingImage(img);
    setFormTitle(existing.title || img.public_id.split('/').pop() || '');
    setFormDescription(existing.description || '');
    setFormDate(existing.event_date || new Date().toISOString().split('T')[0]);
    setFormTags(existing.tags || '');
  };

  // Close Edit Modal
  const closeEdit = () => {
    setEditingImage(null);
    setFormTitle('');
    setFormDescription('');
    setFormDate('');
    setFormTags('');
  };

  // Save metadata
  const handleSaveMetadata = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setError('Title is required.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        public_id: editingImage.public_id,
        title: formTitle,
        description: formDescription,
        event_date: formDate,
        tags: formTags,
        updated_at: new Date().toISOString()
      };

      const { error: dbError } = await supabase
        .from('cloudinary_metadata')
        .upsert(payload, { onConflict: 'public_id' });

      if (dbError) throw dbError;

      // Update local state
      setMetadata(prev => ({
        ...prev,
        [editingImage.public_id]: { ...prev[editingImage.public_id], ...payload }
      }));

      setSuccess('Metadata successfully saved!');
      closeEdit();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete metadata record
  const handleDeleteMetadata = async (publicId) => {
    if (!confirm('Are you sure you want to clear this image\'s metadata? This won\'t delete the file from Cloudinary.')) return;
    
    setError('');
    setSuccess('');

    try {
      const { error: dbError } = await supabase
        .from('cloudinary_metadata')
        .delete()
        .eq('public_id', publicId);

      if (dbError) throw dbError;

      // Update local state
      setMetadata(prev => {
        const copy = { ...prev };
        delete copy[publicId];
        return copy;
      });

      setSuccess('Metadata successfully removed.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Tab Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Event Media Gallery Manager</h2>
          <p className="text-gray-500 text-xs mt-1">
            Manage files stored on Cloudinary and attach rich descriptions, event details, and metadata.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
          </button>
          
          <label className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer">
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>{uploading ? 'Uploading...' : 'Upload New Photo'}</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleUpload} 
              disabled={uploading || loading} 
            />
          </label>
        </div>
      </div>

      {/* Alert Banners */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-center gap-3 text-xs">
          <Check className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{success}</span>
        </div>
      )}

      {/* Images Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm animate-pulse space-y-4">
              <div className="aspect-[4/3] w-full rounded-xl bg-gray-100" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 rounded-2xl text-center shadow-sm">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-base font-bold text-gray-800">No Assets Available</h3>
          <p className="text-gray-500 text-xs mt-1">Upload images to Cloudinary to see and configure them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map(img => {
            const hasMeta = !!metadata[img.public_id];
            const meta = metadata[img.public_id] || {};
            const previewUrl = img.secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_400/');
            
            return (
              <div 
                key={img.public_id}
                className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                    <img src={previewUrl} alt={img.public_id} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded">
                      {img.format.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="p-2.5 space-y-2">
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-1">
                      {hasMeta ? meta.title : img.public_id.split('/').pop()}
                    </h3>
                    
                    {hasMeta ? (
                      <>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {meta.description || 'No description provided.'}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-gray-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {meta.event_date}
                          </span>
                          {meta.tags && (
                            <span className="flex items-center gap-1">
                              <Tag className="w-3.5 h-3.5" />
                              {meta.tags}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="bg-gray-50 p-2.5 rounded-lg border border-dashed border-gray-200 text-center">
                        <span className="text-[11px] text-gray-400 font-semibold">No info added yet</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 mt-3 flex items-center justify-between gap-2">
                  <button
                    onClick={() => startEdit(img)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{hasMeta ? 'Edit Info' : 'Add Info'}</span>
                  </button>

                  {hasMeta && (
                    <button
                      onClick={() => handleDeleteMetadata(img.public_id)}
                      className="p-2 border border-red-100 hover:border-red-200 bg-red-50/50 hover:bg-red-50 text-red-600 rounded-xl transition-all"
                      title="Clear Metadata"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Details Slider / Modal */}
      {editingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="font-bold text-gray-900 text-base">Configure Metadata</h3>
                <button onClick={closeEdit} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                <img 
                  src={editingImage.secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_400/')} 
                  alt="Edit preview" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <form onSubmit={handleSaveMetadata} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="e.g. Community Sign-Tech Seminar"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Description</label>
                  <textarea
                    value={formDescription}
                    onChange={e => setFormDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    placeholder="Provide details about the event context or attendees..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Event Date</label>
                    <input
                      type="date"
                      value={formDate}
                      onChange={e => setFormDate(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Tags / Labels</label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={e => setFormTags(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      placeholder="e.g. outreach, sauti"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-6 flex gap-3">
              <button
                type="button"
                onClick={closeEdit}
                className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl text-xs font-bold transition-all hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSaveMetadata}
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>{saving ? 'Saving...' : 'Save Details'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
