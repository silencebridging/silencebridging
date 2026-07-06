'use client';

export default function RealTimeTextTranslator() {
  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Title */}
          <div>
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              Real-Time{' '}
              <span className="text-blue-500">Sign-to-Text</span>{' '}
              Translator
            </h2>
          </div>
          
          {/* Right side - Description */}
          <div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Use your webcam to translate sign language into text characters and words 
              instantly. Position your hand clearly in the camera frame and begin signing to see 
              the corresponding letters generated on screen in real time.
            </p>
          </div>
        </div>

        {/* Supported Vocabulary Section */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Supported Swahili Vocabulary (Words Mode)</h4>
          <div className="flex flex-wrap gap-2.5">
            {['ALAMA', 'ASUBUHI', 'HABARI', 'JINA', 'JIONI', 'KUJITAMBULISHA', 'LANGU', 'LUGHA', 'MCHANA', 'SHIKAMOO', 'YAKO'].map((word) => (
              <span 
                key={word} 
                className="bg-blue-50/70 text-blue-600 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-default uppercase shadow-sm hover:scale-105"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
