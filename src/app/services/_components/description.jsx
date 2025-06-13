import { Mic, MessageSquare, Volume2, Hand } from 'lucide-react';
import Link from 'next/link';

export default function BridgingSilenceHero() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-16 right-0 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Breaking <span className="text-blue-500">Barriers</span>, Building{' '}
                <span className="text-blue-500">Connections</span>.
              </h1>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-600 text-lg leading-relaxed">
                Bridging Silence transforms communication between Deaf and Hearing communities 
                through real-time AI tools, workshops, and inclusive designs. Our technology ensures no 
                one is left out of the conversation. Through our technology hand gestures are captured, 
                interpreted and instantly displays the meaning as text on screen and audible 
                speech through a speaker.
              </p>
            </div>
            
            <button className="bg-white border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors duration-200">
              Translate to Swahili
            </button>
          </div>
          
          {/* Right side - Feature cards */}
          <div className="relative">
            {/* Left column cards */}
            <div className="space-y-6">
              {/* Sign Language Card */}
              <Link href="#" className="block">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-80 transition-all duration-200 hover:shadow-xl hover:translate-y-[-2px] cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Hand className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-500">Sign Language</h3>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Sign-to-Sauti Card */}
              <Link href="/services/signToSpeech" className="block">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-80 transition-all duration-200 hover:shadow-xl hover:translate-y-[-2px] cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Volume2 className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-500">Sign-to-Sauti</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Right column cards - positioned absolutely */}
            <div className="absolute top-16 right-0 space-y-6">
              {/* Sauti-to-Sign Card */}
              <Link href="#" className="block">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-48 transition-all duration-200 hover:shadow-xl hover:translate-y-[-2px] cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-100 p-3 rounded-xl mb-3">
                      <Mic className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-blue-500 text-sm">Sauti-to-Sign</h3>
                  </div>
                </div>
              </Link>
              
              {/* Sign-to-Text Card */}
              <Link href="#" className="block">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-48 transition-all duration-200 hover:shadow-xl hover:translate-y-[-2px] cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-100 p-3 rounded-xl mb-3">
                      <MessageSquare className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-blue-500 text-sm">Sign-to-Text</h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}