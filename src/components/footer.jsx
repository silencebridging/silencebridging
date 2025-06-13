import React, { useState } from 'react';
import { 
  Home, 
  MessageCircle, 
  ChevronUp, 
  X, 
  Menu, 
  Send, 
  ThumbsUp, 
  Smile, 
  Edit3,
  Mail,
  VolumeX,
  Maximize2
} from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [message, setMessage] = useState('');

  const menuItems = [
    { icon: Edit3, label: 'Change Name', action: () => console.log('Change Name') },
    { icon: Mail, label: 'Email Transcript', action: () => console.log('Email Transcript') },
    { icon: VolumeX, label: 'Sound Off', action: () => console.log('Sound Off') },
    { icon: Maximize2, label: 'Pop Up Widget', action: () => console.log('Pop Up Widget') },
    { icon: X, label: 'Cancel', action: () => setShowMenu(false) }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Menu Popup */}
      {showMenu && (
        <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-48 mb-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-sm text-gray-700 transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl border border-gray-200 w-80 mb-2">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="hover:bg-blue-700 p-1 rounded transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-4 h-64 bg-gray-50">
            {/* Chat messages would go here */}
            <div className="text-center text-gray-500 text-sm mt-20">
              Start a conversation...
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Write a reply.."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendMessage}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-blue-600 transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 text-white"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

const Footer = () => {
  const navigationLinks = [
    { name: 'Home', href: '#', icon: Home, active: true },
    { name: 'About Us', href: '#' },
    { name: 'Services', href: '#' },
    { name: "FAQ's", href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact Us', href: '#' }
  ];

  const socialIcons = [
    { 
      name: 'WhatsApp', 
      bgColor: 'bg-green-500', 
      iconPath: 'M12.017 2C6.5 2 2.017 6.5 2.017 12c0 1.767.459 3.425 1.267 4.867L2.017 22l5.233-1.267C8.675 21.542 10.333 22 12.017 22c5.5 0 10-4.5 10-10S17.517 2 12.017 2zm5.308 14.292c-.225.633-1.34 1.183-1.842 1.225-.467.042-.867.184-2.917-.608-2.542-1-4.142-3.617-4.267-3.783-.117-.167-.967-1.283-.967-2.45s.617-1.733.833-1.967c.217-.233.475-.292.633-.292s.317.008.458.017c.142.008.333-.058.517.392.192.458.658 1.608.717 1.725.058.117.092.258.017.417-.075.158-.117.25-.233.383-.117.133-.25.3-.358.4-.117.117-.242.242-.1.475.142.233.625 1.033 1.342 1.675 1.017.875 1.767 1.142 2.017 1.267.25.125.392.1.533-.067.142-.167.608-.708.775-.95.167-.242.333-.2.558-.117.225.083 1.442.683 1.692.808.25.125.417.183.475.292.058.108.058.608-.167 1.242z'
    },
    { 
      name: 'LinkedIn', 
      bgColor: 'bg-blue-600', 
      iconPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    },
    { 
      name: 'X (Twitter)', 
      bgColor: 'bg-black', 
      iconPath: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
    },
    { 
      name: 'Instagram', 
      bgColor: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500', 
      iconPath: 'M12.017 0C8.396 0 7.989.016 6.756.08 5.526.146 4.677.278 3.936.525a5.88 5.88 0 00-2.124 1.384A5.88 5.88 0 00.525 3.936C.278 4.677.146 5.526.08 6.756.016 7.989 0 8.396 0 12.017s.016 4.028.08 5.261c.066 1.23.198 2.079.445 2.82a5.88 5.88 0 001.384 2.124 5.88 5.88 0 002.124 1.384c.741.247 1.59.379 2.82.445 1.233.066 1.64.082 5.261.082s4.028-.016 5.261-.082c1.23-.066 2.079-.198 2.82-.445a5.88 5.88 0 002.124-1.384 5.88 5.88 0 001.384-2.124c.247-.741.379-1.59.445-2.82.066-1.233.082-1.64.082-5.261s-.016-4.028-.082-5.261c-.066-1.23-.198-2.079-.445-2.82a5.88 5.88 0 00-1.384-2.124A5.88 5.88 0 0019.877.525C19.136.278 18.287.146 17.057.08 15.824.016 15.417 0 12.017 0zm0 2.167c3.343 0 3.737.014 5.056.08 1.22.056 1.88.249 2.32.413.583.226 1 .497 1.437.934.437.437.708.854.934 1.437.164.44.357 1.1.413 2.32.066 1.319.08 1.713.08 5.056s-.014 3.737-.08 5.056c-.056 1.22-.249 1.88-.413 2.32-.226.583-.497 1-.934 1.437-.437.437-.854.708-1.437.934-.44.164-1.1.357-2.32.413-1.319.066-1.713.08-5.056.08s-3.737-.014-5.056-.08c-1.22-.056-1.88-.249-2.32-.413-.583-.226-1-.497-1.437-.934-.437-.437-.708-.854-.934-1.437-.164-.44-.357-1.1-.413-2.32-.066-1.319-.08-1.713-.08-5.056s.014-3.737.08-5.056c.056-1.22.249-1.88.413-2.32.226-.583.497-1 .934-1.437.437-.437.854-.708 1.437-.934.44-.164 1.1-.357 2.32-.413 1.319-.066 1.713-.08 5.056-.08zm0 3.683a6.167 6.167 0 100 12.334 6.167 6.167 0 000-12.334zm0 10.167a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-gray-50 py-12 relative">
        <div className="max-w-6xl mx-auto px-4">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            {navigationLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 text-lg font-medium transition-all duration-300 hover:scale-105 ${
                  link.active 
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                {link.icon && <link.icon className="w-5 h-5" />}
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-6 mb-12">
            {socialIcons.map((social, index) => (
              <div
                key={social.name}
                className={`w-14 h-14 rounded-full ${social.bgColor} flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 cursor-pointer`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <svg
                  className="w-7 h-7 text-white fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={social.iconPath} />
                </svg>
              </div>
            ))}
          </div>

          {/* Copyright Section */}
          <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg -mx-4">
            <p className="font-medium">
              Copyright 2025- All Rights Reserved
            </p>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <div 
          className="fixed right-6 bottom-6 cursor-pointer"
          onClick={scrollToTop}
        >
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
            <ChevronUp className="w-6 h-6 text-white" />
          </div>
        </div>

        <style jsx>{`
          @keyframes bounce-in {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-bounce-in {
            animation: bounce-in 0.6s ease-out forwards;
          }
        `}</style>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </>
  );
};

export default Footer;