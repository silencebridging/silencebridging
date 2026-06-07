'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  Activity, 
  Users, 
  Database, 
  Cpu, 
  Terminal, 
  MessageSquare, 
  LifeBuoy, 
  FileText, 
  ClipboardList 
} from 'lucide-react';

export default function ManualTab() {
  const [openSection, setOpenSection] = useState('overview');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const manualSections = [
    {
      id: 'overview',
      title: '1. Overview Dashboard',
      icon: Activity,
      color: 'text-blue-600 bg-blue-50',
      summary: 'Get a bird\'s-eye view of your entire platform metrics, active alerts, and database status.',
      details: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            The <strong>Overview Tab</strong> is the administrative landing page. It aggregates statistics from the dictionary, feedback submissions, and active support tickets to give you a quick snapshot of the platform\'s health.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h5 className="font-extrabold text-gray-900 mb-1.5 text-xs uppercase tracking-wider">Key Utilities:</h5>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Real-time Stats</strong>: Counts of total validated signs, pending signs, unresolved feedback, and active tickets.</li>
              <li><strong>Alerts Center (Bell Icon)</strong>: Displays critical actions requiring immediate attention (e.g. pending signs or open bug reports).</li>
              <li><strong>Database Seeding</strong>: Click the database refresh button in this tab to populate the system with pre-configured sample signs, feedback, and support tickets for demonstration.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'users',
      title: '2. User & Team Management',
      icon: Users,
      color: 'text-purple-600 bg-purple-50',
      summary: 'Assign system permissions, edit staff responsibilities, and monitor team credentials.',
      details: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Access control is fully managed under the <strong>Users Tab</strong>. Administrative roles grant different levels of access to the database.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
            <h5 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">Available Roles:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-white border border-gray-200/60 rounded-lg">
                <span className="font-bold text-red-600 block">Administrator (admin)</span>
                Full clearance to edit roles, validate signs, manage articles, and alter system logs.
              </div>
              <div className="p-2.5 bg-white border border-gray-200/60 rounded-lg">
                <span className="font-bold text-blue-600 block">ML Engineer (ml_engineer)</span>
                Access to dataset compiles, translation logs, and model performance metrics.
              </div>
              <div className="p-2.5 bg-white border border-gray-200/60 rounded-lg">
                <span className="font-bold text-green-600 block">Linguist (linguist)</span>
                Clearance to validation actions for TSL signs and managing sign meanings.
              </div>
              <div className="p-2.5 bg-white border border-gray-200/60 rounded-lg">
                <span className="font-bold text-amber-600 block">Community Liaison</span>
                Handles support tickets, user feedback, and general outreach responses.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dictionary',
      title: '3. TSL Dictionary & Validation',
      icon: BookOpen,
      color: 'text-emerald-600 bg-emerald-50',
      summary: 'Upload new sign dictionary items and validate sign videos contributed by community users.',
      details: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            The <strong>TSL Dictionary</strong> is the core vocabulary database of Tanzanian Sign Language gestures.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h5 className="font-extrabold text-gray-900 mb-1.5 text-xs uppercase tracking-wider">Validation Workflow:</h5>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs">
              <li>Linguists or Admins view new video submissions flagged as <strong>Pending</strong>.</li>
              <li>Review the video clip demonstrating the sign language gesture.</li>
              <li>Click <strong>Approve</strong> to add the gesture to the active dictionary and output compilation dataset, or <strong>Reject</strong> if the gesture is incorrect.</li>
              <li>You can also click <strong>"Add New Sign"</strong> to upload a demonstration MP4 video directly from your computer, assign its meaning, and submit it.</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'datasets',
      title: '4. Dataset Management',
      icon: Database,
      color: 'text-indigo-600 bg-indigo-50',
      summary: 'Generate machine learning training packages, export metadata.json, and download asset scripts.',
      details: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Under the <strong>Dataset Management Tab</strong>, administrators and machine learning engineers can export approved signs to retrain neural networks.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h5 className="font-extrabold text-gray-900 mb-1.5 text-xs uppercase tracking-wider">How to Export & Download:</h5>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Click <strong>Compile Dataset</strong>. The platform will query Supabase, compile metadata from all approved signs, and generate two tailored packages:
                <ul className="list-circle pl-5 mt-1 space-y-1">
                  <li><code>metadata.json</code>: Contains all approved sign mappings, labels, and timestamps.</li>
                  <li><code>download_dataset.py</code>: A custom Python downloader script that automatically downloads all gesture MP4 videos from Supabase storage and places them into categorized folders.</li>
                </ul>
              </li>
              <li>Execute the Python script locally (e.g. <code>python download_dataset.py</code>) to automatically construct your machine learning asset directory.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'model',
      title: '5. Model Performance Tracking',
      icon: Cpu,
      color: 'text-cyan-600 bg-cyan-50',
      summary: 'Monitor the gesture recognition model performance, accuracy rates, and loss curves.',
      details: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            The <strong>Model Tab</strong> gives you real-time insight into the neural network\'s predictions.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <h5 className="font-extrabold text-gray-900 mb-1.5 text-xs uppercase tracking-wider">Key Metrics:</h5>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Validation Accuracy</strong>: Current model accuracy (e.g. 94.2%).</li>
              <li><strong>Average Inference Latency</strong>: Average response time in milliseconds for translating a gesture.</li>
              <li><strong>Confusion Matrix & Loss Curves</strong>: Helps ML engineers trace classification errors.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'logs',
      title: '6. Translation Logs',
      icon: Terminal,
      color: 'text-rose-600 bg-rose-50',
      summary: 'Inspect user session API calls, system latencies, and device configuration histories.',
      details: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            The <strong>Translation Logs Tab</strong> keeps an audit trail of real-time sign translations requested by users.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs space-y-1">
            <p><strong>Latency Monitoring</strong>: Tracks latency speeds across mobile (iOS/Android) and desktop web platforms.</p>
            <p><strong>Debugging Tools</strong>: If users encounter issues with the web camera translator, logs will record if the transaction was successful or failed due to API connection dropouts.</p>
          </div>
        </div>
      )
    },
    {
      id: 'feedback',
      title: '7. User Feedback & Bugs',
      icon: MessageSquare,
      color: 'text-pink-600 bg-pink-50',
      summary: 'Read user reviews, usability reports, and report bugs compiled from user tests.',
      details: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            The <strong>Feedback Tab</strong> contains entries sent by users regarding the application experience.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs">
            <p className="font-bold text-gray-900">Categories:</p>
            <p className="mt-1">Submissions are tagged as <code>Bug</code>, <code>Feature Request</code>, <code>Cultural Context</code>, or <code>General Feedback</code>, alongside a sentiment rating (1 to 5 stars).</p>
            <p className="mt-2 font-bold text-gray-900">Actions:</p>
            <p>You can flag issues as <strong>Resolved</strong> once you debug user-reported bugs.</p>
          </div>
        </div>
      )
    },
    {
      id: 'tickets',
      title: '8. Support Tickets',
      icon: LifeBuoy,
      color: 'text-orange-600 bg-orange-50',
      summary: 'Handle organization inquiries, volunteer requests, and issues submitted via the Contact page.',
      details: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Whenever a visitor uses the <strong>Contact Us</strong> form on the main website, a ticket is written directly into the Supabase database.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs space-y-1.5">
            <p><strong>Real-time Retrieval</strong>: All new tickets are listed on this page, showing the submitter\'s name, email, subject prefix, and description.</p>
            <p><strong>Resolution Status</strong>: Click <strong>Resolve Ticket</strong> to label the ticket as resolved once the community liaison responds to the user\'s email.</p>
          </div>
        </div>
      )
    },
    {
      id: 'posts',
      title: '9. Content Management (CMS)',
      icon: FileText,
      color: 'text-sky-600 bg-sky-50',
      summary: 'Draft and publish articles, announcements, tutorials, and community success stories.',
      details: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            The <strong>Content Management Tab</strong> allows creators to publish dynamic posts on the platform\'s blog.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2 text-xs">
            <div>
              <span className="font-bold text-gray-900">Writing Articles:</span>
              <p className="mt-0.5">Click <strong>Add New Article</strong>. You can specify a title, optional banner cover image URL, and body content supporting Markdown format.</p>
            </div>
            <div>
              <span className="font-bold text-gray-900">Status Control:</span>
              <p className="mt-0.5">Save posts as <code>Draft</code> to edit later, or <code>Published</code> to display them immediately on the active web portal.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'activity',
      title: '10. Team Activity & Audits',
      icon: ClipboardList,
      color: 'text-teal-600 bg-teal-50',
      summary: 'Review administrative logs, updates, and moderation history.',
      details: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            The <strong>Team Activity Tab</strong> lists recent administrative events to prevent mistakes and coordinate work between linguists, ML engineers, and editors. It lists when dictionary items were approved, who edited specific posts, and role changes.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" /> Admin User Manual
        </h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">
          A comprehensive reference guide for administrators, linguists, and engineers to operate the Bridging Silence portal.
        </p>
      </div>

      {/* Intro card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
          <Shield className="w-56 h-56" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-white/20 backdrop-blur-md text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider">
            Operational Protocol
          </span>
          <h2 className="text-xl md:text-2xl font-black">Admin Clearance Guidelines</h2>
          <p className="text-xs md:text-sm text-blue-50 font-medium leading-relaxed">
            All administrative actions write directly to your Supabase cloud database. Please ensure all dictionary validations, volunteer tickets, and content CMS uploads adhere to the platform\'s quality guidelines.
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {manualSections.map((sec) => {
          const Icon = sec.icon;
          const isOpen = openSection === sec.id;
          return (
            <div 
              key={sec.id} 
              className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${
                isOpen ? 'border-blue-200 shadow-blue-100/10' : 'border-gray-200'
              }`}
            >
              {/* Header trigger */}
              <button
                onClick={() => toggleSection(sec.id)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sec.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-sm">{sec.title}</h3>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{sec.summary}</p>
                  </div>
                </div>
                <div className="text-gray-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Collapsible content */}
              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/20">
                  {sec.details}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
