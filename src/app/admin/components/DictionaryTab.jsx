'use client';

import React from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  FileVideo, 
  XCircle, 
  CheckCircle,
  Upload,
  X,
  Check,
  Loader2
} from 'lucide-react';

export default function DictionaryTab({
  tslSigns = [],
  isSignModalOpen,
  setIsSignModalOpen,
  searchQuery,
  setSearchQuery,
  filteredSigns = [],
  handleUpdateSignStatus,
  handleAddSignSubmit,
  signMeaning,
  setSignMeaning,
  signNotes,
  setSignNotes,
  signVideoFile,
  setSignVideoFile,
  formError,
  formSuccess,
  formSubmitting
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">TSL Dictionary</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Review and validate Kiswahili sign translations to build our training dataset.</p>
        </div>
        <button 
          onClick={() => setIsSignModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-600/10"
        >
          <Plus className="w-4 h-4" /> Add New Sign
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Kiswahili translations..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none text-sm w-full text-gray-800 placeholder-gray-400 font-medium"
        />
      </div>

      {/* Signs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSigns.length === 0 ? (
          <div className="col-span-full bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 font-medium shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>No dictionary signs matching your search.</p>
          </div>
        ) : (
          filteredSigns.map(sign => (
            <div key={sign.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">{sign.sign_meaning}</h3>
                    <span className="text-[10px] text-gray-500 mt-1 block font-medium">Uploaded {sign.created_at?.split('T')?.[0]}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize border ${
                    sign.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                    sign.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                    'bg-amber-50 text-amber-700 border-amber-100'
                  }`}>
                    {sign.status}
                  </span>
                </div>

                {/* Video Container */}
                <div className="relative bg-gray-100 border border-gray-200 rounded-xl h-44 flex items-center justify-center overflow-hidden mb-4">
                  {sign.video_url ? (
                    <video 
                      src={sign.video_url} 
                      controls 
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-gray-400">
                      <FileVideo className="w-8 h-8" />
                      <span className="text-xs font-bold">No Video Uploaded</span>
                    </div>
                  )}
                </div>

                {sign.notes && (
                  <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3 text-xs text-gray-600 mb-3 font-medium">
                    <span className="font-bold block text-[10px] text-gray-400 uppercase mb-1">Notes / Context</span>
                    {sign.notes}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 mt-4 font-semibold">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  {sign.validated_by ? 'Validation Completed' : 'Awaiting Validation'}
                </span>
                <div className="flex gap-2">
                  {sign.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateSignStatus(sign.id, 'rejected')}
                      className="p-2 text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 rounded-xl transition-all"
                      title="Reject Sign"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                  {sign.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateSignStatus(sign.id, 'approved')}
                      className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-600 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DIALOG/MODAL: ADD NEW SIGN */}
      {isSignModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-[1px]">
          <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-lg shadow-2xl overflow-hidden relative">
            
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-gray-900 text-base">Add TSL Sign Dataset</h3>
              </div>
              <button 
                onClick={() => {
                  setIsSignModalOpen(false);
                  setFormError('');
                  setFormSuccess('');
                }}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSignSubmit} className="p-6 space-y-4">
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
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Sign Meaning / Kiswahili Word</label>
                <input 
                  type="text" 
                  value={signMeaning}
                  onChange={e => setSignMeaning(e.target.value)}
                  placeholder="e.g. Habari, Asante, Samahani"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                  disabled={formSubmitting}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Context Notes (Optional)</label>
                <textarea
                  value={signNotes}
                  onChange={e => setSignNotes(e.target.value)}
                  placeholder="Describe hand gestures, dialect region (Dar vs Dodoma), or grammatical context..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all h-20 resize-none"
                  disabled={formSubmitting}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Demonstration Video (MP4 / WEBM)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors relative cursor-pointer bg-gray-50/50">
                  <input 
                    type="file" 
                    accept="video/mp4,video/webm"
                    onChange={e => setSignVideoFile(e.target.files[0])}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    disabled={formSubmitting}
                    required
                  />
                  {signVideoFile ? (
                    <div className="flex flex-col items-center justify-center text-blue-600">
                      <FileVideo className="w-10 h-10 mb-2" />
                      <p className="text-xs font-bold">{signVideoFile.name}</p>
                      <span className="text-[10px] text-gray-500 mt-1">{(signVideoFile.size / 1024 / 1024).toFixed(2)} MB • Click to replace</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Upload className="w-10 h-10 mb-2" />
                      <p className="text-xs font-bold text-gray-600">Upload Video File</p>
                      <span className="text-[10px] text-gray-400 mt-1">MP4 or WEBM (Max 50MB)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsSignModalOpen(false)}
                  disabled={formSubmitting}
                  className="px-4 py-2 border border-gray-200 text-gray-600 hover:text-gray-900 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/10 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading Assets...
                    </>
                  ) : (
                    'Submit Sign'
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
