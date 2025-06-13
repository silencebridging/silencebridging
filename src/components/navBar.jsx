import React from 'react';
import { Home, Headphones, Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

const HeaderComponent = () => {
  return (
    <div className="w-full">
      {/* Top Contact Bar */}
      <div className="bg-white px-6 py-3 rounded-t-lg shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo/Avatar */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
          
          {/* Contact Info */}
          <div className="flex items-center space-x-8">
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
          
          {/* CTA Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
            Get Started
          </button>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <div className="bg-blue-600 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Navigation Links */}
          <nav className="flex items-center space-x-8">
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
      </div>
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">Bridging Silence</h1>
            <p className="text-xl opacity-90">Connecting Communities Through Communication</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;