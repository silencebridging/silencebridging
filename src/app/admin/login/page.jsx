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
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square bg-blue-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none animate-pulse duration-[6000ms]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-slate-200/20 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Clean White Login Container */}
      <div className="w-full max-w-md bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-8 sm:p-10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 border border-slate-200 bg-slate-50 overflow-hidden shadow-sm group">
            <img src="/bridgingsilenceicon.jpeg" alt="Bridging Silence Logo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Bridging <span className="text-[#1b64da]">Silence</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2 flex items-center justify-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-600" /> Admin Portal Access
          </p>
        </div>

        {/* Alert Container */}
        {errorMsg && (
          <div className={`flex items-start gap-3 p-4 rounded-2xl text-xs mb-6 border animate-fadeIn ${
            errorMsg.includes('successful') 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="font-semibold leading-normal">{errorMsg}</span>
          </div>
        )}

        {/* Login/Registration Form */}
        <form onSubmit={isRegistering ? handleSignUp : handleLogin} className="space-y-5">
          {isRegistering && (
            <div className="space-y-2">
              <label className="block text-slate-500 text-[10px] font-extrabold uppercase tracking-widest pl-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sabri Salumu"
                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600/10 transition-all text-sm font-semibold placeholder-slate-400"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-slate-500 text-[10px] font-extrabold uppercase tracking-widest pl-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bridgingsilence.org"
                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl pl-12 pr-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600/10 transition-all text-sm font-semibold placeholder-slate-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-slate-500 text-[10px] font-extrabold uppercase tracking-widest pl-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl pl-12 pr-12 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600/10 transition-all text-sm font-semibold placeholder-slate-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl transition-all disabled:opacity-50 text-sm mt-3 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {loading ? 'Processing...' : isRegistering ? 'Register Account' : 'Sign In'}
          </button>
        </form>

        {/* Toggle between Register/Login */}
        <div className="text-center mt-6 border-t border-slate-100 pt-6">
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErrorMsg('');
            }}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer hover:underline transition-colors"
          >
            {isRegistering ? 'Already have an admin account? Sign In' : 'Create an Admin Account'}
          </button>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>

    </div>
  );
}
