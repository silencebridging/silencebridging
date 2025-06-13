import React, { useState } from 'react';
import { 
  MessageCircle, 
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

export default ChatWidget;