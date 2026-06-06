import React from 'react';

const SponsorsSection = () => {
  return (
    <div className="text-center space-y-12 relative z-10 py-8">
      <h2 className="text-4xl font-bold text-gray-900">
        <span className="text-blue-600">Trusted</span> By The World's <span className="text-blue-600">Best</span>
      </h2>
      
      {/* Company Logos */}
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
        {/* AT&T */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-2xl font-bold text-gray-700">AT&T</span>
        </div>
        
        {/* Microsoft */}
        <div className="flex items-center space-x-2">
          <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
            <div className="bg-red-500 w-full h-full"></div>
            <div className="bg-green-500 w-full h-full"></div>
            <div className="bg-blue-500 w-full h-full"></div>
            <div className="bg-yellow-500 w-full h-full"></div>
          </div>
          <span className="text-xl font-semibold text-gray-700">Microsoft</span>
        </div>
        
        {/* Google */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </span>
        </div>
        
        {/* Skoll Foundation */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-red-600">skoll</span>
          <div className="text-sm text-gray-600">
            <div>FOUNDATION</div>
          </div>
        </div>
        
        {/* Verizon */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold text-gray-700">verizon</span>
        </div>
        
        {/* World Health Organization */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="text-white text-xs font-bold">WHO</div>
          </div>
          <div className="text-sm text-blue-600 font-semibold">
            <div>World Health</div>
            <div>Organization</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;
