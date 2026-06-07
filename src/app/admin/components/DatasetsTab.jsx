'use client';

import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  RefreshCw, 
  FileArchive, 
  Layers, 
  CheckCircle, 
  HelpCircle 
} from 'lucide-react';

export default function DatasetsTab({ tslSigns = [] }) {
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationProgress, setCompilationProgress] = useState(0);
  const [metadataUrl, setMetadataUrl] = useState(null);
  const [scriptUrl, setScriptUrl] = useState(null);

  const approvedSigns = tslSigns.filter(s => s.status === 'approved');
  const pendingSigns = tslSigns.filter(s => s.status === 'pending');
  
  // Dynamic size estimate (4.8MB per video)
  const totalSizeMB = (approvedSigns.length * 4.8).toFixed(1);

  const handleCompileDataset = () => {
    setIsCompiling(true);
    setCompilationProgress(10);
    setMetadataUrl(null);
    setScriptUrl(null);
    
    const interval = setInterval(() => {
      setCompilationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompiling(false);

          // Generate real files
          const metadata = approvedSigns.map(sign => ({
            id: sign.id,
            sign_meaning: sign.sign_meaning,
            video_url: sign.video_url,
            notes: sign.notes,
            created_at: sign.created_at
          }));
          
          // 1. Create metadata.json Blob
          const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
          const mUrl = URL.createObjectURL(metadataBlob);
          setMetadataUrl(mUrl);
          
          // 2. Create python download script Blob
          const scriptText = `import os
import json
import urllib.request

# Bridging Silence TSL Dataset Export Tool
METADATA = ${JSON.stringify(metadata, null, 2)}

def main():
    print("Initializing Bridging Silence TSL Dataset Downloader...")
    os.makedirs("video_assets", exist_ok=True)
    
    # Save metadata.json
    with open("metadata.json", "w", encoding="utf-8") as f:
        json.dump(METADATA, f, indent=2)
    print("Created metadata.json")
    
    # Save dataset_info.txt
    with open("dataset_info.txt", "w", encoding="utf-8") as f:
        f.write("Bridging Silence TSL Dataset Export\\n")
        f.write(f"Total Gestures: {len(METADATA)}\\n")
    print("Created dataset_info.txt")
    
    # Download video assets
    print("Downloading video assets...")
    for item in METADATA:
        clean_meaning = "".join([c if c.isalnum() else "_" for c in item['sign_meaning']]).lower()
        filename = f"video_assets/{clean_meaning}_{item['id'][:8]}.mp4"
        url = item['video_url']
        if not url:
            continue
        print(f"Downloading {filename}...")
        try:
            urllib.request.urlretrieve(url, filename)
        except Exception as e:
            print(f"Failed to download {filename}: {e}")
            
    print("Dataset download complete!")

if __name__ == '__main__':
    main()`;
          
          const scriptBlob = new Blob([scriptText], { type: 'text/plain' });
          const sUrl = URL.createObjectURL(scriptBlob);
          setScriptUrl(sUrl);

          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Dataset Management</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Compile, version, and export verified sign gestures for machine learning training.</p>
        </div>
        <button
          onClick={handleCompileDataset}
          disabled={isCompiling || approvedSigns.length === 0}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-600/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCompiling ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Compiling ({compilationProgress}%)
            </>
          ) : (
            <>
              <FileArchive className="w-4 h-4" /> Compile Dataset
            </>
          )}
        </button>
      </div>

      {/* Dataset Ratios */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase">Approved Signs</span>
          <h4 className="text-2xl font-black text-gray-900 mt-1">{approvedSigns.length}</h4>
          <span className="text-[10px] text-green-600 font-bold mt-1 block">Ready for ML training</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase">Unverified Signs</span>
          <h4 className="text-2xl font-black text-gray-900 mt-1">{pendingSigns.length}</h4>
          <span className="text-[10px] text-amber-500 font-bold mt-1 block">Awaiting human review</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase">Dataset Size</span>
          <h4 className="text-2xl font-black text-gray-900 mt-1">{totalSizeMB} MB</h4>
          <span className="text-[10px] text-gray-500 font-bold mt-1 block">Video & Metadata size</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase">Active Versions</span>
          <h4 className="text-2xl font-black text-gray-900 mt-1">v2.4.0</h4>
          <span className="text-[10px] text-blue-600 font-bold mt-1 block">Latest build release</span>
        </div>
      </div>

      {/* Compilation progress feedback banner */}
      {isCompiling && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between text-xs text-blue-800 font-bold">
            <span>Building gesture training pack...</span>
            <span>{compilationProgress}%</span>
          </div>
          <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${compilationProgress}%` }}></div>
          </div>
        </div>
      )}

      {/* Compiled download assets list */}
      {(metadataUrl || scriptUrl) && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-700">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-emerald-900 text-sm">Dataset Export Pack Compiled!</h4>
              <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">{approvedSigns.length} gestures • {totalSizeMB} MB estimated</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {metadataUrl && (
              <a
                href={metadataUrl}
                download="metadata.json"
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/10"
              >
                <Download className="w-3.5 h-3.5" /> Download metadata.json
              </a>
            )}
            {scriptUrl && (
              <a
                href={scriptUrl}
                download="download_dataset.py"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/10"
              >
                <Download className="w-3.5 h-3.5" /> Download Downloader Script
              </a>
            )}
          </div>
        </div>
      )}

      {/* Dataset Structure Guide */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-extrabold text-gray-900 mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" /> Export File Structure
        </h3>
        <p className="text-xs text-gray-500 font-semibold mb-6">When compiled, the dataset uses the following directory format for ML intake pipelines.</p>

        <div className="bg-gray-900 text-gray-300 font-mono text-xs p-5 rounded-2xl space-y-1 overflow-x-auto shadow-inner leading-relaxed">
          <p className="text-gray-500"># Dataset Root</p>
          <p>bridging_silence_tsl_v2.4.0/</p>
          <p>├── metadata.json <span className="text-indigo-400">// Contains sign meanings, validators, and timestamps</span></p>
          <p>├── dataset_info.txt <span className="text-indigo-400">// Summary statistics</span></p>
          <p>└── video_assets/</p>
          {approvedSigns.length === 0 ? (
            <p className="text-gray-500 pl-4">└── [Empty: Approve signs to populate videos]</p>
          ) : (
            approvedSigns.slice(0, 3).map(sign => (
              <p key={sign.id} className="pl-4">├── {sign.sign_meaning.toLowerCase()}_{sign.id.substring(0,8)}.mp4</p>
            ))
          )}
          {approvedSigns.length > 3 && (
            <p className="pl-4 text-gray-500">└── ... ({approvedSigns.length - 3} more files)</p>
          )}
        </div>
      </div>
    </div>
  );
}
