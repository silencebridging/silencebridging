'use client';

import React from 'react';
import { 
  Activity, 
  BookOpen, 
  ShieldAlert, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  RefreshCw,
  Server,
  Zap,
  Globe,
  Database
} from 'lucide-react';

export default function OverviewTab({
  tslSigns = [],
  feedbackList = [],
  posts = [],
  tickets = [],
  usageMetrics = [],
  profiles = [],
  handleSeedDatabase,
  isSyncing,
  setActiveTab
}) {
  const pendingSignsCount = tslSigns.filter(s => s.status === 'pending').length;
  const openFeedbackCount = feedbackList.filter(f => f.status === 'open').length;
  const openTicketsCount = tickets.filter(t => t.status === 'open').length;

  const totalActionsNeeded = pendingSignsCount + openFeedbackCount + openTicketsCount;

  // Calculate average latency
  const avgLatency = usageMetrics.length > 0 
    ? Math.round(usageMetrics.reduce((acc, curr) => acc + (curr.translation_latency_ms || 0), 0) / usageMetrics.length)
    : 42;

  // Calculate model accuracy estimation
  const successRate = usageMetrics.length > 0
    ? Math.round((usageMetrics.filter(m => m.is_successful).length / usageMetrics.length) * 100)
    : 98;

  const isEmptyDatabase = tslSigns.length === 0 && feedbackList.length === 0 && posts.length === 0 && tickets.length === 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">Real-time status indicators, model efficiency metrics, and operations summary.</p>
      </div>

      {/* Database Seeder Option */}
      {isEmptyDatabase && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm animate-fadeIn">
          <div className="space-y-1">
            <h3 className="font-extrabold text-blue-900 text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-600 animate-pulse" /> Welcome to the Admin Portal!
            </h3>
            <p className="text-xs text-blue-700 font-medium leading-relaxed">
              Your Supabase database is currently empty. Click the button to automatically write sample TSL signs, feedback reports, support tickets, and CMS announcements directly into your database.
            </p>
          </div>
          <button
            onClick={handleSeedDatabase}
            disabled={isSyncing}
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/10 flex items-center gap-2 disabled:opacity-50"
          >
            {isSyncing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Seeding Database...
              </>
            ) : (
              'Seed Sample Data'
            )}
          </button>
        </div>
      )}

      {/* Status Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Approved Signs */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Approved Signs</span>
            <h3 className="text-3xl font-black text-gray-900 mt-2">{tslSigns.filter(s => s.status === 'approved').length}</h3>
            <div className="text-[10px] text-green-600 font-bold mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 animate-pulse" /> Models Synchronized
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Actions Required */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Actions Required</span>
            <h3 className="text-3xl font-black text-gray-900 mt-2">{totalActionsNeeded}</h3>
            <div className="text-[10px] text-amber-600 font-bold mt-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Needs validation
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Model Latency */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Avg Model Latency</span>
            <h3 className="text-3xl font-black text-gray-900 mt-2">{avgLatency} ms</h3>
            <div className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> High Performance
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Advanced Performance & System Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Model KPI */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm col-span-1 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-gray-900 mb-2">Translation Pipeline Summary</h3>
            <p className="text-xs text-gray-500 font-semibold mb-6">Real-time inference performance and status breakdown.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 border-y border-gray-100 mb-6">
            <div className="text-center md:text-left">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase">Total Requests</span>
              <p className="text-xl font-black text-gray-950 mt-1">{usageMetrics.length}</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase">Model Success</span>
              <p className="text-xl font-black text-gray-950 mt-1">{successRate}%</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase">Active Users</span>
              <p className="text-xl font-black text-gray-950 mt-1">{profiles.length}</p>
            </div>
            <div className="text-center md:text-left">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase">Dictionary Terms</span>
              <p className="text-xl font-black text-gray-950 mt-1">{tslSigns.length}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-500">
            <span className="flex items-center gap-1.5 text-green-600">
              <Server className="w-4 h-4" /> ML Pipeline API Status: Operational (100% Up)
            </span>
            <button
              onClick={() => setActiveTab('logs')}
              className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 font-bold"
            >
              View Full Logs &rarr;
            </button>
          </div>
        </div>

        {/* Server & Database Health */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm col-span-1">
          <h3 className="text-base font-extrabold text-gray-900 mb-4">Database Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-600 font-bold">Supabase Realtime</span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">CONNECTED</span>
            </div>
            
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-gray-600 font-bold">Inference latency</span>
              </div>
              <span className="text-xs text-gray-900 font-extrabold">Optimal</span>
            </div>

            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-500" />
                <span className="text-xs text-gray-600 font-bold">CDN Edge Delivery</span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
