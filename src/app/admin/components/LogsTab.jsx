'use client';

import React, { useState } from 'react';
import { Terminal, Clock, RefreshCw, CheckCircle, XCircle, Search, Smartphone, Globe } from 'lucide-react';

export default function LogsTab({ usageMetrics = [], profiles = [] }) {
  const [platformFilter, setPlatformFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Map user IDs to names
  const userMap = profiles.reduce((acc, curr) => {
    acc[curr.id] = curr.full_name;
    return acc;
  }, {});

  const filteredMetrics = usageMetrics.filter(log => {
    // Platform match
    const platformMatch = platformFilter === 'all' || log.platform?.toLowerCase() === platformFilter.toLowerCase();
    
    // Search query match (can match user name or status)
    const userName = userMap[log.user_id] || 'Guest User';
    const searchMatch = searchQuery === '' || 
      userName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (log.platform || '').toLowerCase().includes(searchQuery.toLowerCase());
      
    return platformMatch && searchMatch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Translation Logs</h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">Audit real-time sign language translation execution logs and latency parameters.</p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-xs w-full text-gray-800 placeholder-gray-400 font-medium"
          />
        </div>
        
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          <span className="text-[10px] text-gray-400 font-extrabold uppercase mr-1">Platform</span>
          <button
            onClick={() => setPlatformFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${platformFilter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            All
          </button>
          <button
            onClick={() => setPlatformFilter('web')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${platformFilter === 'web' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Web
          </button>
          <button
            onClick={() => setPlatformFilter('android')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${platformFilter === 'android' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Android
          </button>
          <button
            onClick={() => setPlatformFilter('ios')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${platformFilter === 'ios' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            iOS
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-gray-600" /> Live Inferences Console
        </h3>
        
        <div className="overflow-x-auto font-medium">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200">Execution Time</th>
                <th className="px-6 py-3 border-b border-gray-200">User Profile</th>
                <th className="px-6 py-3 border-b border-gray-200">Latency</th>
                <th className="px-6 py-3 border-b border-gray-200">Platform</th>
                <th className="px-6 py-3 border-b border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50 font-mono text-xs">
              {filteredMetrics.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500 font-semibold font-sans">No translation logs found in this query.</td>
                </tr>
              ) : (
                filteredMetrics.map(log => {
                  const userName = userMap[log.user_id] || 'Guest User';
                  return (
                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-gray-500">{log.session_date ? log.session_date.replace('T', ' ').substring(0, 19) : 'N/A'}</td>
                      <td className="px-6 py-4 font-bold text-gray-900 font-sans">{userName}</td>
                      <td className="px-6 py-4 text-gray-700 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" /> {log.translation_latency_ms || 42} ms
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-sans">
                        <span className="flex items-center gap-1.5">
                          {log.platform?.toLowerCase() === 'web' ? (
                            <Globe className="w-3.5 h-3.5 text-blue-500" />
                          ) : (
                            <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
                          )}
                          <span className="capitalize">{log.platform || 'Web'}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {log.is_successful ? (
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit font-sans">
                            <CheckCircle className="w-3 h-3" /> SUCCESS
                          </span>
                        ) : (
                          <span className="text-[10px] text-rose-700 font-bold bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit font-sans">
                            <XCircle className="w-3 h-3" /> FAILED
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
