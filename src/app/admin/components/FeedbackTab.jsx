'use client';

import React from 'react';
import { MessageSquare, Star, CheckCircle } from 'lucide-react';

export default function FeedbackTab({
  feedbackList = [],
  handleResolveFeedback
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Community Feedback</h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">Review feedback collected from Deaf/HoH testing sessions and public reviews.</p>
      </div>

      <div className="space-y-4">
        {feedbackList.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 font-medium shadow-sm">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>No user feedback received yet.</p>
          </div>
        ) : (
          feedbackList.map(feedback => (
            <div key={feedback.id} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-gray-900 text-sm">{feedback.user_name || 'Anonymous Tester'}</span>
                  <span className="text-[10px] text-gray-500 font-medium">• {feedback.created_at?.split('T')?.[0]}</span>
                </div>
                <div className="flex gap-2 font-bold text-[10px]">
                  <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-0.5 rounded-full capitalize">
                    {feedback.category?.replace('_', ' ')}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full capitalize border ${
                    feedback.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                  }`}>
                    {feedback.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed font-medium">{feedback.feedback_text}</p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (feedback.sentiment_rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>

                {feedback.status === 'open' && (
                  <button
                    onClick={() => handleResolveFeedback(feedback.id)}
                    className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Resolve Feedback
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
