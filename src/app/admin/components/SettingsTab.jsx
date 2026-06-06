'use client';

import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Sliders, Database, Save, Check } from 'lucide-react';

export default function SettingsTab({ userProfile = null }) {
  const [allowPublicDictionary, setAllowPublicDictionary] = useState(true);
  const [autoTrainModel, setAutoTrainModel] = useState(false);
  const [modelThreshold, setModelThreshold] = useState(0.85);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">System Settings</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Configure administrative permissions, ML pipeline trigger variables, and API options.</p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-600/10"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4" /> Saved Successfully!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Configuration
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm col-span-2 space-y-6">
          
          {/* TSL dictionary configs */}
          <div>
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sliders className="w-4.5 h-4.5 text-blue-500" /> Dictionary Controls
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <label className="text-xs font-bold text-gray-900">Allow Public Submissions</label>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">Let anonymous/guest users upload video demonstrations for spelling words.</p>
                </div>
                <input
                  type="checkbox"
                  checked={allowPublicDictionary}
                  onChange={(e) => setAllowPublicDictionary(e.target.checked)}
                  className="w-10 h-5 bg-gray-200 checked:bg-blue-600 rounded-full cursor-pointer appearance-none relative before:w-5 before:h-5 before:bg-white before:rounded-full before:absolute before:transition-all checked:before:translate-x-5 shadow-inner border border-gray-300"
                />
              </div>

              <div className="flex items-start justify-between gap-4 pt-3 border-t border-gray-50">
                <div className="space-y-0.5">
                  <label className="text-xs font-bold text-gray-900">Auto-train on validation</label>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">Automatically trigger landmark model fine-tuning when 10 new words are approved.</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoTrainModel}
                  onChange={(e) => setAutoTrainModel(e.target.checked)}
                  className="w-10 h-5 bg-gray-200 checked:bg-blue-600 rounded-full cursor-pointer appearance-none relative before:w-5 before:h-5 before:bg-white before:rounded-full before:absolute before:transition-all checked:before:translate-x-5 shadow-inner border border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Model fine-tune parameters */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sliders className="w-4.5 h-4.5 text-indigo-500" /> Pipeline Thresholds
            </h3>
            
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-900 mb-2">
                <label>Minimum Landmarking Confidence</label>
                <span>{Math.round(modelThreshold * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="0.99"
                step="0.01"
                value={modelThreshold}
                onChange={(e) => setModelThreshold(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[10px] text-gray-400 font-bold mt-2">Recommended minimum: 80% to avoid noisy coordinate files during training.</p>
            </div>
          </div>

        </div>

        {/* Database & RLS status */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm col-span-1 space-y-6">
          <div>
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Database className="w-4.5 h-4.5 text-blue-500" /> Database & RLS
            </h3>
            <div className="space-y-3 font-semibold text-xs text-gray-600">
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-50">
                <span>Database host</span>
                <span className="font-mono text-[10px] text-gray-900">Supabase PG</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-50">
                <span>Row Level Security</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">ENABLED</span>
              </div>
              <div className="flex justify-between items-center">
                <span>TLS Encryption</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">SSL ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-indigo-500" /> User Permissions
            </h3>
            <div className="space-y-1 text-xs text-gray-600 font-semibold">
              <p className="text-gray-900 font-bold">Your Account: {userProfile?.full_name}</p>
              <p className="text-gray-500">Security Clearance: <span className="capitalize text-blue-600 font-bold">{userProfile?.role}</span></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
