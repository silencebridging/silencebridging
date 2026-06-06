'use client';

import React from 'react';
import { LifeBuoy, CheckCircle } from 'lucide-react';

export default function TicketsTab({
  tickets = [],
  handleResolveTicket
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Support Tickets</h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">Manage inquiries, help requests, and organization requests filed from our site.</p>
      </div>

      <div className="space-y-4">
        {tickets.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 font-medium shadow-sm">
            <LifeBuoy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>No support tickets filed yet.</p>
          </div>
        ) : (
          tickets.map(ticket => (
            <div key={ticket.id} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <span className="font-extrabold text-gray-900 text-sm">{ticket.submitter_name}</span>
                  <span className="text-[10px] text-gray-500 block mt-0.5 font-medium">{ticket.submitter_email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-500 font-medium">{ticket.created_at?.split('T')?.[0]}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize border ${
                    ticket.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed italic font-medium">"{ticket.message}"</p>

              {ticket.status !== 'resolved' && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleResolveTicket(ticket.id)}
                    className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Resolve Ticket
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
