'use client';

import { MoreVertical, Copy, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function TranslationOutput({ translatedText, setTranslatedText, onCommand }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const simulateTranslation = (text) => {
    setTranslatedText(text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
  };

  const handleClear = () => {
    if (onCommand) {
      onCommand('clear');
    } else {
      setTranslatedText('');
    }
  };

  const handleDeleteLetter = () => {
    if (onCommand) {
      onCommand('delete_letter');
    } else {
      setTranslatedText(prev => prev.slice(0, -1));
    }
  };

  const handleDeleteWord = () => {
    if (onCommand) {
      onCommand('delete_word');
    } else {
      setTranslatedText(prev => {
        const words = prev.trim().split(' ');
        if (words.length <= 1) return '';
        return words.slice(0, -1).join(' ') + ' ';
      });
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([translatedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'translation.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Translation Output Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                <span className="text-blue-500">Translation</span> Output
              </h2>
              
              {/* Menu Button */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 hover:bg-gray-300 rounded-full transition-colors duration-200"
                >
                  <MoreVertical className="w-5 h-5 text-gray-700" />
                </button>
                
                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border py-2 w-48 z-10">
                    <button
                      onClick={handleCopy}
                      disabled={!translatedText}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Text</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      disabled={!translatedText}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Text</span>
                    </button>
                    <button
                      onClick={handleClear}
                      disabled={!translatedText}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear Text</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Output Area */}
            <div className="p-6">
              <div className="bg-gray-50 rounded-2xl min-h-96 p-6 border-2 border-dashed border-gray-200 relative">
                {translatedText ? (
                  <div className="space-y-4">
                    <div className="prose max-w-none">
                      <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                        {translatedText}
                      </p>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={handleCopy}
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                      >
                        <Copy className="w-4 h-4" />
                        <span className="text-sm font-semibold">Copy</span>
                      </button>
                      
                      <button
                        onClick={() => setTranslatedText(prev => prev + ' ')}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        <span className="text-sm font-semibold font-sans">␣ Space</span>
                      </button>

                      <button
                        onClick={handleDeleteLetter}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        <span className="text-sm font-semibold font-sans">⌫ Letter</span>
                      </button>
                      
                      <button
                        onClick={handleDeleteWord}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        <span className="text-sm font-semibold font-sans">🗑 Word</span>
                      </button>
                      
                      <button
                        onClick={handleClear}
                        className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-semibold font-sans">Clear</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center mt-24">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 border-2 border-gray-400 border-dashed rounded-full"></div>
                      </div>
                      <p className="text-gray-500 text-lg">Translation will appear here</p>
                      <p className="text-gray-400 text-sm mt-2">Start signing to translate gestures to text on-screen</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Demo Translation Buttons */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => simulateTranslation('Habari gani, jina langu ni John.')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                >
                  Demo: "Habari gani"
                </button>
                <button
                  onClick={() => simulateTranslation('Asante sana kwa msaada wako leo.')}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 text-sm font-medium"
                >
                  Demo: "Asante sana"
                </button>
                <button
                  onClick={() => simulateTranslation('Ndiyo, naelewa kabisa.')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium"
                >
                  Demo: "Ndiyo"
                </button>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-5"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
