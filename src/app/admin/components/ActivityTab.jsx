'use client';

import React, { useState } from 'react';
import { 
  ClipboardList, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  LifeBuoy, 
  Plus, 
  CheckCircle, 
  XCircle,
  Clock 
} from 'lucide-react';

export default function ActivityTab({
  profiles = [],
  tslSigns = [],
  feedbackList = [],
  posts = [],
  tickets = []
}) {
  const [filterType, setFilterType] = useState('all');

  // Map user IDs to names
  const userMap = profiles.reduce((acc, curr) => {
    acc[curr.id] = curr.full_name;
    return acc;
  }, {});

  // Build dynamic timeline events from live tables
  const events = [];

  // TSL Dictionary events
  tslSigns.forEach(sign => {
    const creatorName = userMap[sign.created_by] || 'Expert Contributor';
    const validatorName = userMap[sign.validated_by] || 'Linguist Validator';

    // Event 1: Upload
    events.push({
      id: `sign-upload-${sign.id}`,
      timestamp: new Date(sign.created_at || Date.now()),
      type: 'dictionary',
      user: creatorName,
      description: `Uploaded new Kiswahili sign translation for "${sign.sign_meaning}"`,
      icon: Plus,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100'
    });

    // Event 2: Validation status change
    if (sign.status === 'approved') {
      events.push({
        id: `sign-approve-${sign.id}`,
        timestamp: new Date(sign.updated_at || Date.now()),
        type: 'dictionary',
        user: validatorName,
        description: `Approved and verified gesture coordinates for "${sign.sign_meaning}"`,
        icon: CheckCircle,
        iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100'
      });
    } else if (sign.status === 'rejected') {
      events.push({
        id: `sign-reject-${sign.id}`,
        timestamp: new Date(sign.updated_at || Date.now()),
        type: 'dictionary',
        user: validatorName,
        description: `Rejected and requested re-filming for "${sign.sign_meaning}"`,
        icon: XCircle,
        iconBg: 'bg-rose-50 text-rose-600 border-rose-100'
      });
    }
  });

  // CMS Posts events
  posts.forEach(post => {
    const authorName = post.author || 'CMS Publisher';

    // Event 1: Creation
    events.push({
      id: `post-create-${post.id}`,
      timestamp: new Date(post.created_at || Date.now()),
      type: 'cms',
      user: authorName,
      description: `Drafted CMS announcement: "${post.title}"`,
      icon: FileText,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    });

    // Event 2: Publish
    if (post.status === 'published') {
      events.push({
        id: `post-publish-${post.id}`,
        timestamp: new Date(post.published_at || post.updated_at || Date.now()),
        type: 'cms',
        user: authorName,
        description: `Published article to public website: "${post.title}"`,
        icon: CheckCircle,
        iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100'
      });
    }
  });

  // User Feedback events
  feedbackList.forEach(fb => {
    const testerName = fb.user_name || 'Community Tester';

    events.push({
      id: `fb-receive-${fb.id}`,
      timestamp: new Date(fb.created_at || Date.now()),
      type: 'feedback',
      user: testerName,
      description: `Submitted cultural/testing feedback session feedback: "${fb.feedback_text.substring(0, 60)}${fb.feedback_text.length > 60 ? '...' : ''}"`,
      icon: MessageSquare,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100'
    });

    if (fb.status === 'resolved') {
      events.push({
        id: `fb-resolve-${fb.id}`,
        timestamp: new Date(fb.created_at || Date.now()), // fallback
        type: 'feedback',
        user: 'Community Liaison',
        description: `Resolved and processed feedback entry from ${testerName}`,
        icon: CheckCircle,
        iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100'
      });
    }
  });

  // Support Tickets events
  tickets.forEach(tk => {
    events.push({
      id: `ticket-open-${tk.id}`,
      timestamp: new Date(tk.created_at || Date.now()),
      type: 'tickets',
      user: tk.submitter_name || 'Inquirer',
      description: `Opened public support inquiry: "${tk.message.substring(0, 60)}${tk.message.length > 60 ? '...' : ''}"`,
      icon: LifeBuoy,
      iconBg: 'bg-red-50 text-red-600 border-red-100'
    });

    if (tk.status === 'resolved') {
      events.push({
        id: `ticket-resolve-${tk.id}`,
        timestamp: new Date(tk.created_at || Date.now()),
        type: 'tickets',
        user: 'Support Staff',
        description: `Resolved support ticket opened by ${tk.submitter_name}`,
        icon: CheckCircle,
        iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100'
      });
    }
  });

  // Sort events chronologically (Newest first)
  const sortedEvents = events.sort((a, b) => b.timestamp - a.timestamp);

  // Filter events
  const filteredEvents = sortedEvents.filter(e => {
    if (filterType === 'all') return true;
    return e.type === filterType;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Team Activity Logs</h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">Chronological audit stream of dataset changes, content publishing, and staff actions.</p>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center gap-2 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <span className="text-[10px] text-gray-400 font-extrabold uppercase mr-2">Filter Log</span>
        {[
          { id: 'all', label: 'All Activities' },
          { id: 'dictionary', label: 'TSL Dictionary' },
          { id: 'cms', label: 'CMS Articles' },
          { id: 'feedback', label: 'Feedback' },
          { id: 'tickets', label: 'Tickets' }
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setFilterType(btn.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              filterType === btn.id 
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Audit Timeline */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-gray-600" /> System Audit Stream
        </h3>

        {filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-gray-500 font-medium">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>No activity records compiled for this type.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 py-2">
            {filteredEvents.map(event => {
              const IconComp = event.icon;
              return (
                <div key={event.id} className="relative pl-8 animate-fadeIn">
                  {/* Dot icon */}
                  <span className={`absolute -left-[17px] top-0.5 w-8 h-8 rounded-full border flex items-center justify-center shadow-sm ${event.iconBg}`}>
                    <IconComp className="w-4 h-4" />
                  </span>

                  {/* Log Card */}
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <span className="font-extrabold text-gray-900 text-xs sm:text-sm">{event.user}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        {event.timestamp.toLocaleDateString()} at {event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 font-semibold mt-1 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
