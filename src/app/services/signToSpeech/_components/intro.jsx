'use client';

const WORDS = ['ALAMA', 'ASUBUHI', 'HABARI', 'JINA', 'JIONI', 'KUJITAMBULISHA', 'LANGU', 'LUGHA', 'MCHANA', 'SHIKAMOO', 'YAKO'];

export default function RealTimeTranslator() {
  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Title */}
          <div>
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              Real-Time{' '}
              <span className="text-blue-500">Sign Language</span>{' '}
              Translator
            </h2>
          </div>
          
          {/* Right side - Description */}
          <div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Use your webcam to translate sign language into text and speech 
              instantly. Position yourself in frame and begin signing to see the 
              translation appear
            </p>
          </div>
        </div>

        {/* Supported Vocabulary Carousel */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Supported Swahili Vocabulary (Words Mode)</h4>
          
          <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            <div className="flex gap-5 animate-marquee whitespace-nowrap">
              {/* First set */}
              {WORDS.map((word) => (
                <span 
                  key={`a-${word}`}
                  className="inline-flex items-center bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 border border-blue-200/60 px-6 py-3.5 rounded-2xl text-base font-extrabold uppercase shadow-md hover:shadow-lg hover:scale-110 hover:border-blue-300 transition-all duration-300 cursor-default select-none flex-shrink-0"
                >
                  {word}
                </span>
              ))}
              {/* Duplicate set for seamless loop */}
              {WORDS.map((word) => (
                <span 
                  key={`b-${word}`}
                  className="inline-flex items-center bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 border border-blue-200/60 px-6 py-3.5 rounded-2xl text-base font-extrabold uppercase shadow-md hover:shadow-lg hover:scale-110 hover:border-blue-300 transition-all duration-300 cursor-default select-none flex-shrink-0"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}