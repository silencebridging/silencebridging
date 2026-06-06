'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState('');

  // If already logged in, redirect to admin dashboard
  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        router.push('/admin');
      }
    }
    checkSession();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.session) {
        // Query the profile to verify role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .single();

        if (profileError || !profile || profile.role === 'user') {
          // If role is normal user, log them out
          await supabase.auth.signOut();
          throw new Error("Access Denied: You do not have permissions to access the Admin portal.");
        }

        router.push('/admin');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (!fullName) {
        throw new Error('Full name is required.');
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create profile in profiles table manually
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: fullName,
              role: 'admin' // Grant admin by default for setup convenience
            }
          ]);

        if (profileError) {
          console.warn("Could not insert profile automatically: ", profileError.message);
        }

        setErrorMsg('Registration successful! You can now log in.');
        setIsRegistering(false);
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative top gradient accent matching main theme banner */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
      
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200/80 p-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm overflow-hidden border border-gray-200 bg-white">
            <img src="/bridgingsilenceicon.jpeg" alt="Bridging Silence Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Bridging Silence</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Admin Portal Access</p>
        </div>

        {/* Alert Container */}
        {errorMsg && (
          <div className={`flex items-start gap-3 p-4 rounded-xl text-sm mb-6 ${
            errorMsg.includes('successful') 
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {/* Login/Registration Form */}
        <form onSubmit={isRegistering ? handleSignUp : handleLogin} className="space-y-5">
          {isRegistering && (
            <div>
              <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sabri Salumu"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bridgingsilence.org"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-12 pr-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-12 pr-12 py-3 text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 text-sm mt-2 shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20"
          >
            {loading ? 'Processing...' : isRegistering ? 'Register Account' : 'Sign In'}
          </button>
        </form>

        {/* Toggle between Register/Login */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErrorMsg('');
            }}
            className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-semibold"
          >
            {isRegistering ? 'Already have an admin account? Sign In' : 'Create an Admin Account'}
          </button>
        </div>

      </div>
    </div>
  );
}
