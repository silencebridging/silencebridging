'use client';

import React from 'react';
import { Cpu, BarChart2, CheckCircle, TrendingUp, Sliders, Globe, Smartphone, Activity } from 'lucide-react';

export default function ModelTab({ usageMetrics = [] }) {
  const totalCount = usageMetrics.length;
  const successfulInferences = usageMetrics.filter(m => m.is_successful).length;
  const successRate = totalCount > 0 ? ((successfulInferences / totalCount) * 100).toFixed(1) : '0.0';
  const totalLatency = usageMetrics.reduce((sum, m) => sum + (m.translation_latency_ms || 0), 0);
  const avgLatency = totalCount > 0 ? (totalLatency / totalCount).toFixed(0) : '0';

  // Group by platform
  const webCount = usageMetrics.filter(m => m.platform?.toLowerCase()?.includes('web')).length;
  const mobileCount = usageMetrics.filter(m => 
    m.platform?.toLowerCase()?.includes('android') || 
    m.platform?.toLowerCase()?.includes('ios') || 
    m.platform?.toLowerCase()?.includes('mobile')
  ).length;
  const unknownCount = totalCount - (webCount + mobileCount);

  // Group latency into buckets
  const latencyBuckets = [
    { label: '< 30ms', count: usageMetrics.filter(m => m.translation_latency_ms < 30).length },
    { label: '30-50ms', count: usageMetrics.filter(m => m.translation_latency_ms >= 30 && m.translation_latency_ms < 50).length },
    { label: '50-80ms', count: usageMetrics.filter(m => m.translation_latency_ms >= 50 && m.translation_latency_ms < 80).length },
    { label: '80-120ms', count: usageMetrics.filter(m => m.translation_latency_ms >= 80 && m.translation_latency_ms < 120).length },
    { label: '> 120ms', count: usageMetrics.filter(m => m.translation_latency_ms >= 120).length }
  ];

  const maxBucketCount = Math.max(...latencyBuckets.map(b => b.count), 1);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Model Performance</h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">
          Real-time metrics computed directly from gestural translation queries.
        </p>
      </div>

      {totalCount === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 font-medium shadow-sm">
          <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-pulse" />
          <h3 className="font-extrabold text-gray-900 text-sm mb-1">No Inference Metrics Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Your database table is currently empty. Seed sample database metrics in the System Overview tab to view performance metrics.
          </p>
        </div>
      ) : (
        <>
          {/* Real Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Inference Success Rate</span>
                <h3 className="text-2xl font-black text-gray-900 mt-1">{successRate}%</h3>
                <span className="text-[10px] text-green-600 font-bold mt-1 block flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 animate-pulse" /> {successfulInferences} Successful
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Average Latency</span>
                <h3 className="text-2xl font-black text-gray-900 mt-1">{avgLatency}ms</h3>
                <span className="text-[10px] text-gray-500 font-bold mt-1 block">
                  Latency Threshold: &lt; 80ms
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Sliders className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Total Request Load</span>
                <h3 className="text-2xl font-black text-gray-900 mt-1">{totalCount}</h3>
                <span className="text-[10px] text-gray-500 font-bold mt-1 block">
                  Active ML Instances: 1
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Cpu className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Latency Distribution Graph */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
              <h3 className="text-sm font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600" /> Latency Distribution (Inference Counts)
              </h3>

              <div className="flex items-end justify-between h-48 border-b border-gray-200 pb-2 px-4 gap-4">
                {latencyBuckets.map((bucket, index) => {
                  const percentage = (bucket.count / maxBucketCount) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group relative cursor-pointer">
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full mb-2 bg-gray-950 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                        {bucket.count} Query{bucket.count !== 1 ? 'ies' : ''}
                      </div>
                      
                      {/* Bar */}
                      <div 
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-all rounded-t-lg shadow-sm"
                        style={{ height: `${Math.max(percentage, 4)}%` }}
                      ></div>
                      
                      {/* Label */}
                      <span className="text-[10px] text-gray-500 font-bold mt-2 text-center whitespace-nowrap">
                        {bucket.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Platform usage */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-indigo-600" /> Platform Deployment
                </h3>

                <div className="space-y-4 font-semibold text-xs text-gray-700">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="flex items-center gap-1.5 font-bold"><Globe className="w-3.5 h-3.5 text-blue-500" /> Web App</span>
                      <span>{webCount} ({totalCount > 0 ? ((webCount / totalCount) * 100).toFixed(0) : 0}%)</span>
                    </div>
                    <div className="w-full bg-gray-150 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${totalCount > 0 ? (webCount / totalCount) * 100 : 0}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="flex items-center gap-1.5 font-bold"><Smartphone className="w-3.5 h-3.5 text-indigo-500" /> Mobile Devices</span>
                      <span>{mobileCount} ({totalCount > 0 ? ((mobileCount / totalCount) * 100).toFixed(0) : 0}%)</span>
                    </div>
                    <div className="w-full bg-gray-150 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${totalCount > 0 ? (mobileCount / totalCount) * 100 : 0}%` }}></div>
                    </div>
                  </div>

                  {unknownCount > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="flex items-center gap-1.5 font-bold"><Cpu className="w-3.5 h-3.5 text-gray-500" /> Other Clients</span>
                        <span>{unknownCount} ({totalCount > 0 ? ((unknownCount / totalCount) * 100).toFixed(0) : 0}%)</span>
                      </div>
                      <div className="w-full bg-gray-150 h-2 rounded-full overflow-hidden">
                        <div className="bg-gray-400 h-full rounded-full" style={{ width: `${totalCount > 0 ? (unknownCount / totalCount) * 100 : 0}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-4">
                <p className="text-[10px] text-gray-400 font-bold leading-normal uppercase">
                  Data Synchronization
                </p>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed mt-1">
                  Metrics are generated dynamically in response to clients invoking translation workflows.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
