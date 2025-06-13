import { MoreVertical, Copy, Download, Volume2 } from 'lucide-react';
import { useState } from 'react';

export default function TranslationOutput() {
  const [translatedText, setTranslatedText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulate translation updates
  const simulateTranslation = (text) => {
    setTranslatedText(text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    // You could add a toast notification here
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

  const handlePlayAudio = () => {
    if (translatedText && 'speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
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
                      <span>Download</span>
                    </button>
                    <button
                      onClick={handlePlayAudio}
                      disabled={!translatedText || isPlaying}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isPlaying ? 'Playing...' : 'Play Audio'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Output Area */}
            <div className="p-6">
              <div className="bg-gray-50 rounded-2xl min-h-96 p-6 border-2 border-dashed border-gray-200">
                {translatedText ? (
                  <div className="space-y-4">
                    <div className="prose max-w-none">
                      <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {translatedText}
                      </p>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={handleCopy}
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                      >
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </button>
                      <button
                        onClick={handlePlayAudio}
                        disabled={isPlaying}
                        className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span className="text-sm">{isPlaying ? 'Playing...' : 'Play'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 border-2 border-gray-400 border-dashed rounded-full"></div>
                      </div>
                      <p className="text-gray-500 text-lg">Translation will appear here</p>
                      <p className="text-gray-400 text-sm mt-2">Start signing to see real-time translation</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Demo Translation Buttons */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => simulateTranslation('Hello, how are you today?')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm"
                >
                  Demo: "Hello, how are you today?"
                </button>
                <button
                  onClick={() => simulateTranslation('Thank you for your help. I appreciate it very much.')}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 text-sm"
                >
                  Demo: "Thank you for your help"
                </button>
                <button
                  onClick={() => simulateTranslation('Good morning! It\'s a beautiful day outside. Would you like to go for a walk?')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm"
                >
                  Demo: "Good morning! Beautiful day"
                </button>
                <button
                  onClick={() => setTranslatedText('')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm"
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