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
      </div>
    </div>
  );
}
