import React, { useState } from 'react';
import { Home, Headphones, Search, ShoppingBag, Menu, X, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

const HeaderComponent = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Top Contact Bar */}
      <div className="bg-white px-4 sm:px-6 py-3 rounded-t-lg shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo/Avatar */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
          
          {/* Contact Info - Hidden on mobile, visible on medium screens and up */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <Headphones className="w-5 h-5 text-blue-600" />
              <div className="text-sm">
                <span className="font-semibold text-gray-700">Phone: </span>
                <span className="text-gray-600">+255 675 546 576</span>
              </div>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-gray-700">Email: </span>
              <span className="text-gray-600">bridgingsilence@gmail.com</span>
            </div>
          </div>
          
          {/* Mobile Contact Icons - Visible on mobile only */}
          <div className="flex md:hidden items-center space-x-4">
            <a href="tel:+255675546576" className="text-blue-600">
              <Phone className="w-5 h-5" />
            </a>
            <a href="mailto:bridgingsilence@gmail.com" className="text-blue-600">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          
          {/* CTA Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-colors">
            Get Started
          </button>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <div className="bg-blue-600 px-4 sm:px-6 py-4 relative">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Desktop Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <a href="/about" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-medium">About Us</span>
            </a>
            <a href="/services" className="text-white hover:text-blue-200 transition-colors font-medium">
              Services
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors font-medium">
              FAQ's
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors font-medium">
              Blog
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors font-medium">
              Contact Us
            </a>
          </nav>
          
          {/* Mobile Menu Button - Visible only on mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-blue-200 transition-colors">
              <ShoppingBag className="w-6 h-6" />
            </button>
            <button className="text-white hover:text-blue-200 transition-colors">
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu - Dropdown style */}
        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full z-50 bg-blue-700 shadow-lg md:hidden animate-slideDown">
            <div className="px-4 py-3 flex justify-between items-center border-b border-blue-600">
              <div className="text-white text-lg font-medium">Menu</div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col p-4">
              <a 
                href="/about" 
                className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors py-3 border-b border-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">About Us</span>
              </a>
              <a 
                href="/services" 
                className="text-white hover:text-blue-200 transition-colors font-medium py-3 border-b border-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#" 
                className="text-white hover:text-blue-200 transition-colors font-medium py-3 border-b border-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ's
              </a>
              <a 
                href="#" 
                className="text-white hover:text-blue-200 transition-colors font-medium py-3 border-b border-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a 
                href="#" 
                className="text-white hover:text-blue-200 transition-colors font-medium py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </a>
              <div className="py-4 mt-2 text-white bg-blue-800 rounded-md px-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Phone className="w-5 h-5 text-blue-200" />
                  <span>+255 675 546 576</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-200" />
                  <span>bridgingsilence@gmail.com</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Hero Section */}
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
          <div className="text-center text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Bridging Silence</h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90">Connecting Communities Through Communication</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;