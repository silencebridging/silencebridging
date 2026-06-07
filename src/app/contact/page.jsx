'use client';

import React, { useState } from 'react';
import HeaderComponent from '@/components/navBar';
import SponsorsSection from '@/components/sponsors';
import Footer from '@/components/footer';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // If subject is entered, prepend it to the message or store it cleanly.
      const formattedMessage = formData.subject 
        ? `[Subject: ${formData.subject}]\n\n${formData.message}`
        : formData.message;

      const { error: insertError } = await supabase
        .from('support_tickets')
        .insert([
          {
            submitter_name: formData.name,
            submitter_email: formData.email,
            message: formattedMessage,
            status: 'open'
          }
        ]);

      if (insertError) {
        throw insertError;
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error("Error submitting to Supabase:", err);
      setError(err.message || 'Failed to send message. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-white">
      <HeaderComponent />
      
      <main className="flex-grow w-full relative">
        
        {/* Slanted decoration cylinders top right */}
        <div className="absolute top-[5%] right-[-40px] pointer-events-none z-0 hidden lg:block">
          <div className="relative w-48 h-36">
            <div className="absolute top-[-10px] right-[40px] w-10 h-36 bg-sky-400 rounded-full transform -rotate-[45deg] opacity-[0.8] shadow-sm"></div>
            <div className="absolute top-[-10px] right-0 w-10 h-36 bg-[#8b5cf6] rounded-full transform -rotate-[45deg] opacity-[0.8] shadow-sm"></div>
          </div>
        </div>

        {/* Hero title banner */}
        <div className="bg-gray-50 py-16 border-b border-gray-100 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              Get In <span className="text-[#1b64da]">Touch</span>
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base font-medium">
              Have questions, feedback, or want to collaborate? Send us a message and our team will get back to you shortly.
            </p>
          </div>
        </div>

        {/* Contact Content Section */}
        <div className="py-16 container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column - Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-gray-800 mb-2">
                  Contact Information
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We look forward to hearing from you. Connect with us via email, phone, or visit our headquarters.
                </p>
              </div>

              <div className="space-y-4">
                {/* Email Address */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex gap-4 hover:border-blue-100 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1b64da] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-800 text-sm mb-1 uppercase tracking-wider">Email Us</h4>
                    <a href="mailto:bridgingsilence@gmail.com" className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#1b64da] transition-colors">
                      bridgingsilence@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone number */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex gap-4 hover:border-blue-100 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-800 text-sm mb-1 uppercase tracking-wider">Call Us</h4>
                    <a href="tel:+255675546576" className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#1b64da] transition-colors">
                      +255 675 546 576
                    </a>
                  </div>
                </div>

                {/* Headquarters Address */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex gap-4 hover:border-blue-100 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-800 text-sm mb-1 uppercase tracking-wider">Headquarters</h4>
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-relaxed">
                      Dar es Salaam, Tanzania
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Form Panel */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_15px_50px_rgba(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden">
                
                {submitted ? (
                  /* Success Feedback Banner */
                  <div className="text-center py-10 space-y-4 animate-scaleUp">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-black text-gray-800">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                      Thank you for contacting Bridging Silence. Our support representatives will review your message and reach out to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#1b64da] text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* Form Input Fields */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Sabri Salumu"
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1b64da] focus:border-transparent focus:bg-white transition-all font-semibold"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@mail.com"
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1b64da] focus:border-transparent focus:bg-white transition-all font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Inquiry regarding developer API integration"
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1b64da] focus:border-transparent focus:bg-white transition-all font-semibold"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">
                        Message Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Write your message details..."
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1b64da] focus:border-transparent focus:bg-white transition-all font-semibold"
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-xs font-bold">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#1b64da] hover:bg-[#1b64da]/90 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* Shared Sponsors Section */}
        <div className="w-full bg-white py-16 border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SponsorsSection />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
