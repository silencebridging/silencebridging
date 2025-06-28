import { Mic, MessageSquare, Volume2, Hand } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Add this import

export default function BridgingSilenceHero() {
  const router = useRouter(); // Add this line

  const navigateToSignToSpeech = () => {
    console.log('Navigating to Sign-to-Sauti page');
    router.push('/services/signToSpeech');
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-16 right-0 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Main content */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Breaking <span className="text-blue-500">Barriers</span>, Building{' '}
                <span className="text-blue-500">Connections</span>.
              </h1>
            </div>
            
            <div className="mb-6 sm:mb-8">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Bridging Silence transforms communication between Deaf and Hearing communities 
                through real-time AI tools, workshops, and inclusive designs. Our technology ensures no 
                one is left out of the conversation. Through our technology hand gestures are captured, 
                interpreted and instantly displays the meaning as text on screen and audible 
                speech through a speaker.
              </p>
            </div>
            
            <button className="bg-white border-2 border-blue-500 text-blue-500 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium hover:bg-blue-50 transition-colors duration-200">
              Translate to Swahili
            </button>
          </div>
          
          {/* Right side - Feature cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Sign Language Card */}
            <Link href="#" className="block">
              <div className="bg-white rounded-2xl shadow-lg aspect-square transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 cursor-pointer flex flex-col justify-center items-center p-4 sm:p-6">
                <div className="bg-purple-100 p-3 rounded-xl mb-3 sm:mb-4">
                  <Hand className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
                <h3 className="font-medium text-blue-500 text-center">Sign Language</h3>
              </div>
            </Link>
            
            {/* Sign-to-Sauti Card - Modified with direct navigation */}
            <div 
              onClick={navigateToSignToSpeech}
              className="bg-white rounded-2xl shadow-lg aspect-square transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 cursor-pointer flex flex-col justify-center items-center p-4 sm:p-6"
            >
              <div className="bg-purple-100 p-3 rounded-xl mb-3 sm:mb-4">
                <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h3 className="font-medium text-blue-500 text-center">Sign-to-Sauti</h3>
            </div>
            
            {/* Sauti-to-Sign Card */}
            <Link href="#" className="block">
              <div className="bg-white rounded-2xl shadow-lg aspect-square transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 cursor-pointer flex flex-col justify-center items-center p-4 sm:p-6">
                <div className="bg-purple-100 p-3 rounded-xl mb-3 sm:mb-4">
                  <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
                <h3 className="font-medium text-blue-500 text-center">Sauti-to-Sign</h3>
              </div>
            </Link>
            
            {/* Sign-to-Text Card */}
            <Link href="#" className="block">
              <div className="bg-white rounded-2xl shadow-lg aspect-square transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 cursor-pointer flex flex-col justify-center items-center p-4 sm:p-6">
                <div className="bg-purple-100 p-3 rounded-xl mb-3 sm:mb-4">
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
                <h3 className="font-medium text-blue-500 text-center">Sign-to-Text</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}