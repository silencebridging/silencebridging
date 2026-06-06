'use client';

import React from 'react';
import { Users, User, Shield, Loader2 } from 'lucide-react';

export default function UsersTab({
  profiles = [],
  userProfile = null,
  updatingRoleUserId = '',
  handleUpdateUserRole
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-black text-gray-900">User & Roster Management</h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">Manage registered administrative staff, experts, and their system access roles.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-extrabold text-gray-900 mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" /> Active Roster ({profiles.length})
        </h3>
        
        <div className="overflow-x-auto font-medium">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200">Team Member</th>
                <th className="px-6 py-3 border-b border-gray-200">Joined Date</th>
                <th className="px-6 py-3 border-b border-gray-200">Administrative Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {profiles.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500">No users registered yet.</td>
                </tr>
              ) : (
                profiles.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 font-bold shrink-0">
                        {p.full_name?.charAt(0) || <User className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 leading-tight">{p.full_name}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{p.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">
                      {p.created_at ? p.created_at.split('T')?.[0] : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative flex items-center">
                        <select
                          value={p.role}
                          disabled={updatingRoleUserId !== '' || userProfile?.role !== 'admin'}
                          onChange={(e) => handleUpdateUserRole(p.id, e.target.value)}
                          className="bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 py-1.5 pl-2 pr-8 outline-none focus:border-blue-500 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                        >
                          <option value="admin">Admin</option>
                          <option value="ml_engineer">ML Engineer</option>
                          <option value="linguist">Linguist</option>
                          <option value="community_liaison">Community Liaison</option>
                          <option value="content_creator">Content Creator</option>
                          <option value="user">User (No Access)</option>
                        </select>
                        {updatingRoleUserId === p.id && (
                          <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin absolute right-2" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
