'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Activity, 
  LifeBuoy, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Plus, 
  TrendingUp, 
  ShieldAlert,
  LogOut,
  Bell,
  RefreshCw,
  Play,
  Star,
  User,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Menu,
  Upload,
  X,
  Loader2,
  FileVideo,
  Check,
  Database,
  Cpu,
  Terminal,
  ClipboardList,
  Settings as SettingsIcon,
  Shield,
  HelpCircle,
  Image as ImageIcon
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Sub-page components
import OverviewTab from './components/OverviewTab';
import UsersTab from './components/UsersTab';
import DictionaryTab from './components/DictionaryTab';
import DatasetsTab from './components/DatasetsTab';
import ModelTab from './components/ModelTab';
import LogsTab from './components/LogsTab';
import FeedbackTab from './components/FeedbackTab';
import TicketsTab from './components/TicketsTab';
import PostsTab from './components/PostsTab';
import ActivityTab from './components/ActivityTab';
import SettingsTab from './components/SettingsTab';
import ManualTab from './components/ManualTab';
import GalleryTab from './components/GalleryTab';

export default function AdminDashboard() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // Active Navigation States
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  // Database States
  const [profiles, setProfiles] = useState([]);
  const [tslSigns, setTslSigns] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [usageMetrics, setUsageMetrics] = useState([]);

  // Modal Control States
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Form Field States - TSL Dictionary
  const [signMeaning, setSignMeaning] = useState('');
  const [signNotes, setSignNotes] = useState('');
  const [signVideoFile, setSignVideoFile] = useState(null);

  // Form Field States - Content CMS
  const [articleTitle, setArticleTitle] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [articleStatus, setArticleStatus] = useState('draft');
  const [articleHeaderImage, setArticleHeaderImage] = useState('');

  const [updatingRoleUserId, setUpdatingRoleUserId] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    }
  }, []);

  // Auth checking and routing
  useEffect(() => {
    async function checkUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/admin/login');
          return;
        }

        setCurrentUser(session.user);

        // Fetch User Profile
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error || !profile) {
          throw new Error("Profile not found.");
        }

        if (profile.role === 'user') {
          // Normal user trying to access admin
          await supabase.auth.signOut();
          router.push('/admin/login');
          return;
        }

        setUserProfile(profile);
        setAuthChecking(false);
      } catch (err) {
        console.warn("Auth check failed, redirecting to login:", err.message);
        router.push('/admin/login');
      }
    }

    checkUser();
  }, [router]);

  // Fetch Database tables on Mount / Sync
  const syncDatabase = async () => {
    setIsSyncing(true);
    try {
      const { data: dbProfiles } = await supabase.from('profiles').select('*');
      if (dbProfiles) setProfiles(dbProfiles);

      const { data: dbSigns } = await supabase.from('tsl_dictionary').select('*');
      if (dbSigns) setTslSigns(dbSigns);

      const { data: dbFeedback } = await supabase.from('user_feedback').select('*');
      if (dbFeedback) setFeedbackList(dbFeedback);

      const { data: dbPosts } = await supabase.from('content_posts').select('*');
      if (dbPosts) setPosts(dbPosts);

      const { data: dbTickets } = await supabase.from('support_tickets').select('*');
      if (dbTickets) setTickets(dbTickets);

      const { data: dbMetrics } = await supabase.from('usage_metrics').select('*');
      if (dbMetrics) setUsageMetrics(dbMetrics);
    } catch (err) {
      console.warn("Failed to fetch database content:", err.message);
    } finally {
      setTimeout(() => setIsSyncing(false), 800);
    }
  };

  useEffect(() => {
    if (!authChecking) {
      syncDatabase();
    }
  }, [authChecking]);

  // Sign out handler
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  // State Updates
  const handleUpdateSignStatus = async (id, newStatus) => {
    const validatorName = userProfile ? userProfile.full_name : 'Admin';
    try {
      await supabase.from('tsl_dictionary').update({ 
        status: newStatus,
        validated_by: userProfile?.id
      }).eq('id', id);
    } catch (e) {
      console.error("Database update failed, updating local state only:", e.message);
    }
    setTslSigns(prev => prev.map(sign => 
      sign.id === id ? { ...sign, status: newStatus, validated_by: validatorName } : sign
    ));
  };

  const handleResolveFeedback = async (id) => {
    try {
      await supabase.from('user_feedback').update({ status: 'resolved' }).eq('id', id);
    } catch (e) {
      console.error(e);
    }
    setFeedbackList(prev => prev.map(f => 
      f.id === id ? { ...f, status: 'resolved' } : f
    ));
  };

  const handleUpdatePostStatus = async (id, newStatus) => {
    try {
      await supabase.from('content_posts').update({ status: newStatus }).eq('id', id);
    } catch (e) {
      console.error(e);
    }
    setPosts(prev => prev.map(post => 
      post.id === id ? { ...post, status: newStatus } : post
    ));
  };

  const handleResolveTicket = async (id) => {
    try {
      await supabase.from('support_tickets').update({ status: 'resolved' }).eq('id', id);
    } catch (e) {
      console.error(e);
    }
    setTickets(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'resolved' } : t
    ));
  };

  const handleSeedDatabase = async () => {
    setIsSyncing(true);
    try {
      // 1. Seed TSL Dictionary entries
      const sampleSigns = [
        {
          sign_meaning: 'Habari (Hello)',
          video_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
          status: 'pending',
          created_by: currentUser?.id,
          notes: 'Standard greetings gesture. Commonly used in Dar es Salaam.'
        },
        {
          sign_meaning: 'Asante (Thank you)',
          video_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
          status: 'approved',
          created_by: currentUser?.id,
          notes: 'Right hand touches forehead and moves outward.'
        },
        {
          sign_meaning: 'Tanzania',
          video_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
          status: 'pending',
          created_by: currentUser?.id,
          notes: 'Linguistic variation captured in Dodoma deaf school.'
        }
      ];

      const { error: signErr } = await supabase.from('tsl_dictionary').insert(sampleSigns);
      if (signErr) throw signErr;

      // 2. Seed User Feedback
      const sampleFeedback = [
        {
          feedback_text: 'The sign translation latency is a bit high on my mobile phone (Tecno Spark).',
          category: 'bug',
          status: 'open',
          sentiment_rating: 3
        },
        {
          feedback_text: 'Great work! It recognizes Tanzanian sign alphabet for A and B accurately.',
          category: 'general',
          status: 'resolved',
          sentiment_rating: 5
        },
        {
          feedback_text: 'Some sign variations used in Dodoma are different from Dar. We should document this.',
          category: 'cultural_context',
          status: 'open',
          sentiment_rating: 4
        }
      ];
      
      const { error: feedbackErr } = await supabase.from('user_feedback').insert(sampleFeedback);
      if (feedbackErr) throw feedbackErr;

      // 3. Seed Content CMS Posts
      const samplePosts = [
        {
          title: 'Getting Started with Tanzanian Sign Language (TSL)',
          slug: 'getting-started-tsl',
          content_body: '# Getting Started\n\nWelcome to Bridging Silence! This guide helps you understand the fundamentals of TSL.',
          status: 'published',
          author_id: currentUser?.id,
          published_at: new Date().toISOString()
        },
        {
          title: 'Bridging Silence AI Model Version 2.0 Release Notes',
          slug: 'model-v2-release',
          content_body: '# Model v2.0 Release\n\nWe have updated the CNN-LSTM hand translation model to reach 94% validation accuracy.',
          status: 'draft',
          author_id: currentUser?.id
        }
      ];

      const { error: postsErr } = await supabase.from('content_posts').insert(samplePosts);
      if (postsErr) throw postsErr;

      // 4. Seed Support Tickets
      const sampleTickets = [
        {
          submitter_name: 'Mery Ndosi',
          submitter_email: 'mery@gmail.com',
          message: 'I want to volunteer as a sign language video contributor. How can I join?',
          status: 'open'
        },
        {
          submitter_name: 'David Lema',
          submitter_email: 'david@lema.co.tz',
          message: 'Is there an offline API available for schools of the deaf?',
          status: 'in_progress'
        }
      ];

      const { error: ticketsErr } = await supabase.from('support_tickets').insert(sampleTickets);
      if (ticketsErr) throw ticketsErr;

      await syncDatabase();
      alert("Sample data successfully written to your Supabase database!");
    } catch (err) {
      console.error(err);
      alert(`Seeding failed: ${err.message || 'Make sure you have run the database schema SQL on Supabase SQL Editor.'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  // Changing team member roles
  const handleUpdateUserRole = async (targetUserId, newRole) => {
    setUpdatingRoleUserId(targetUserId);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', targetUserId);
      
      if (error) throw error;

      setProfiles(prev => prev.map(p => 
        p.id === targetUserId ? { ...p, role: newRole } : p
      ));
    } catch (err) {
      console.error("Failed to update user role:", err.message);
      alert(`Failed to change role: ${err.message}`);
    } finally {
      setUpdatingRoleUserId('');
    }
  };

  // Submit TSL Sign Form
  const handleAddSignSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setFormSubmitting(true);

    try {
      if (!signMeaning.trim()) throw new Error("Sign meaning/word is required.");
      if (!signVideoFile) throw new Error("A sign language demonstration video is required.");

      // 1. Upload Video File to Supabase Storage Bucket
      const fileExt = signVideoFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `tsl_videos/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, signVideoFile);

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}. Make sure the 'assets' storage bucket is created in Supabase.`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      // 2. Insert record into tsl_dictionary table
      const { data: insertData, error: insertError } = await supabase
        .from('tsl_dictionary')
        .insert([
          {
            sign_meaning: signMeaning,
            video_url: publicUrl,
            notes: signNotes,
            created_by: currentUser?.id,
            status: 'pending'
          }
        ])
        .select();

      if (insertError) throw insertError;

      // Update state local variables
      const newSign = insertData?.[0] || {
        id: Math.random().toString(),
        sign_meaning: signMeaning,
        video_url: publicUrl,
        notes: signNotes,
        status: 'pending',
        created_at: new Date().toISOString().split('T')[0]
      };

      setTslSigns(prev => [newSign, ...prev]);
      setFormSuccess("Sign successfully uploaded and submitted for validation!");
      
      // Reset Form fields
      setSignMeaning('');
      setSignNotes('');
      setSignVideoFile(null);
      setTimeout(() => {
        setIsSignModalOpen(false);
        setFormSuccess('');
      }, 1500);

    } catch (err) {
      setFormError(err.message || "An error occurred during upload.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Submit CMS Article Form
  const handleAddArticleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setFormSubmitting(true);

    try {
      if (!articleTitle.trim()) throw new Error("Article title is required.");
      if (!articleBody.trim()) throw new Error("Article body content is required.");

      const slug = articleTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // Prepend header cover image markdown tag if provided
      let finalBody = articleBody;
      if (articleHeaderImage) {
        finalBody = `![Header Image](${articleHeaderImage})\n\n${articleBody}`;
      }

      // Insert record into content_posts table
      const { data: insertData, error: insertError } = await supabase
        .from('content_posts')
        .insert([
          {
            title: articleTitle,
            slug,
            content_body: finalBody,
            status: articleStatus,
            author_id: currentUser?.id,
            published_at: articleStatus === 'published' ? new Date().toISOString() : null
          }
        ])
        .select();

      if (insertError) throw insertError;

      const newPost = insertData?.[0] || {
        id: Math.random().toString(),
        title: articleTitle,
        slug,
        content_body: finalBody,
        status: articleStatus,
        author: userProfile?.full_name || 'Admin',
        published_at: articleStatus === 'published' ? new Date().toISOString().split('T')[0] : null
      };

      setPosts(prev => [newPost, ...prev]);
      setFormSuccess("Article successfully saved!");

      // Reset Fields
      setArticleTitle('');
      setArticleBody('');
      setArticleHeaderImage('');
      setArticleStatus('draft');
      setTimeout(() => {
        setIsArticleModalOpen(false);
        setFormSuccess('');
      }, 1500);

    } catch (err) {
      setFormError(err.message || "An error occurred while saving article.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const filteredSigns = tslSigns.filter(sign => 
    sign.sign_meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingSignsCount = tslSigns.filter(s => s.status === 'pending').length;
  const openFeedbackCount = feedbackList.filter(f => f.status === 'open').length;
  const openTicketsCount = tickets.filter(t => t.status === 'open').length;

  const notifications = [];
  if (pendingSignsCount > 0) {
    notifications.push({
      id: 'signs',
      text: `${pendingSignsCount} sign translations awaiting expert validation.`,
      tab: 'dictionary'
    });
  }
  if (openFeedbackCount > 0) {
    notifications.push({
      id: 'feedback',
      text: `${openFeedbackCount} user feedback submissions need review.`,
      tab: 'feedback'
    });
  }
  if (openTicketsCount > 0) {
    notifications.push({
      id: 'tickets',
      text: `${openTicketsCount} support tickets require response.`,
      tab: 'tickets'
    });
  }

  // If loading or checking auth, show full page spinner
  if (authChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 text-sm font-medium">Verifying Admin Permissions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row font-sans relative overflow-x-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-[2px]"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 1. LEFT SIDEBAR PANEL */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col shrink-0 transition-all duration-300 ease-in-out
        fixed lg:static inset-y-0 left-0 w-72 z-50 lg:z-10
        ${isSidebarOpen ? 'translate-x-0 lg:w-72 lg:opacity-100 lg:pointer-events-auto' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-r-0 lg:opacity-0 lg:pointer-events-none'}
      `}>
        
        {/* Brand/Logo Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-gray-200 shadow-md bg-white">
              <img src="/bridgingsilenceicon.jpeg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-950 text-sm tracking-wide">Bridging Silence</h2>
              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Admin Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button 
              onClick={syncDatabase} 
              className={`p-1.5 rounded-lg text-gray-500 hover:text-gray-950 hover:bg-gray-100 transition-all ${isSyncing ? 'animate-spin text-blue-600' : ''}`}
              title="Sync Database"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-950 hover:bg-gray-100 transition-all"
              title="Collapse Sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'dictionary', label: 'TSL Dictionary', icon: BookOpen, count: tslSigns.filter(s => s.status === 'pending').length },
            { id: 'datasets', label: 'Dataset Management', icon: Database },
            { id: 'model', label: 'Model Performance', icon: Cpu },
            { id: 'logs', label: 'Translation Logs', icon: Terminal },
            { id: 'feedback', label: 'User Feedback', icon: MessageSquare, count: feedbackList.filter(f => f.status === 'open').length },
            { id: 'tickets', label: 'Support Tickets', icon: LifeBuoy, count: tickets.filter(t => t.status === 'open').length },
            { id: 'posts', label: 'Content Management', icon: FileText },
            { id: 'gallery', label: 'Media Library', icon: ImageIcon },
            { id: 'activity', label: 'Team Activity', icon: ClipboardList },
            { id: 'settings', label: 'Settings', icon: SettingsIcon },
            { id: 'manual', label: 'User Manual', icon: HelpCircle }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                // Auto collapse sidebar after tab navigation on mobile
                if (window.innerWidth < 1024) {
                  setIsSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.count > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === item.id ? 'bg-white text-blue-600' : 'bg-red-500 text-white'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Card & Sign Out */}
        <div className="p-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 mb-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-600 font-bold">
              {userProfile?.full_name?.charAt(0) || <User className="w-5 h-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 truncate">{userProfile?.full_name || 'Admin User'}</p>
              <p className="text-[10px] text-gray-500 capitalize truncate">{userProfile?.role?.replace('_', ' ') || 'Administrator'}</p>
            </div>
          </div>
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        
        {/* Top Mini Header */}
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-950 hover:bg-gray-100 transition-all focus:outline-none"
                title="Expand Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
              <span>Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-blue-600 font-bold capitalize">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all focus:outline-none"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></span>
                )}
              </button>

              {isNotificationOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsNotificationOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl py-3 z-50 animate-fadeIn">
                    <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Alerts & Actions</span>
                      {notifications.length > 0 && (
                        <span className="text-[9px] bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded-full font-bold">
                          {notifications.length} Action{notifications.length > 1 ? 's' : ''} Required
                        </span>
                      )}
                    </div>
                    <div className="divide-y divide-gray-50 max-h-60 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-gray-500 text-xs font-semibold">
                          <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                          All caught up! No pending actions.
                        </div>
                      ) : (
                        notifications.map(n => (
                          <button
                            key={n.id}
                            onClick={() => {
                              setActiveTab(n.tab);
                              setIsNotificationOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                            <div>
                              <p className="text-xs font-semibold text-gray-700 hover:text-blue-600 transition-colors leading-relaxed">{n.text}</p>
                              <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 block">Click to resolve</span>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <a 
              href="https://www.bridgingsilence.org/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-xl transition-all"
            >
              <span>View Main Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-6 lg:p-8 max-w-5xl w-full mx-auto">
          {activeTab === 'overview' && (
            <OverviewTab
              tslSigns={tslSigns}
              feedbackList={feedbackList}
              posts={posts}
              tickets={tickets}
              usageMetrics={usageMetrics}
              profiles={profiles}
              handleSeedDatabase={handleSeedDatabase}
              isSyncing={isSyncing}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'users' && (
            <UsersTab
              profiles={profiles}
              userProfile={userProfile}
              updatingRoleUserId={updatingRoleUserId}
              handleUpdateUserRole={handleUpdateUserRole}
            />
          )}

          {activeTab === 'dictionary' && (
            <DictionaryTab
              tslSigns={tslSigns}
              isSignModalOpen={isSignModalOpen}
              setIsSignModalOpen={setIsSignModalOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredSigns={filteredSigns}
              handleUpdateSignStatus={handleUpdateSignStatus}
              handleAddSignSubmit={handleAddSignSubmit}
              signMeaning={signMeaning}
              setSignMeaning={setSignMeaning}
              signNotes={signNotes}
              setSignNotes={setSignNotes}
              signVideoFile={signVideoFile}
              setSignVideoFile={setSignVideoFile}
              formError={formError}
              formSuccess={formSuccess}
              formSubmitting={formSubmitting}
            />
          )}

          {activeTab === 'datasets' && (
            <DatasetsTab
              tslSigns={tslSigns}
            />
          )}

          {activeTab === 'model' && (
            <ModelTab usageMetrics={usageMetrics} />
          )}

          {activeTab === 'logs' && (
            <LogsTab
              usageMetrics={usageMetrics}
              profiles={profiles}
            />
          )}

          {activeTab === 'feedback' && (
            <FeedbackTab
              feedbackList={feedbackList}
              handleResolveFeedback={handleResolveFeedback}
            />
          )}

          {activeTab === 'tickets' && (
            <TicketsTab
              tickets={tickets}
              handleResolveTicket={handleResolveTicket}
            />
          )}

          {activeTab === 'posts' && (
            <PostsTab
              posts={posts}
              isArticleModalOpen={isArticleModalOpen}
              setIsArticleModalOpen={setIsArticleModalOpen}
              articleTitle={articleTitle}
              setArticleTitle={setArticleTitle}
              articleBody={articleBody}
              setArticleBody={setArticleBody}
              articleStatus={articleStatus}
              setArticleStatus={setArticleStatus}
              articleHeaderImage={articleHeaderImage}
              setArticleHeaderImage={setArticleHeaderImage}
              handleAddArticleSubmit={handleAddArticleSubmit}
              handleUpdatePostStatus={handleUpdatePostStatus}
              formError={formError}
              setFormError={setFormError}
              formSuccess={formSuccess}
              setFormSuccess={setFormSuccess}
              formSubmitting={formSubmitting}
              userProfile={userProfile}
            />
          )}

          {activeTab === 'activity' && (
            <ActivityTab
              profiles={profiles}
              tslSigns={tslSigns}
              feedbackList={feedbackList}
              posts={posts}
              tickets={tickets}
            />
          )}

          {activeTab === 'gallery' && (
            <GalleryTab />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              userProfile={userProfile}
            />
          )}

          {activeTab === 'manual' && (
            <ManualTab />
          )}
        </div>
      </div>
    </div>
  );
}
