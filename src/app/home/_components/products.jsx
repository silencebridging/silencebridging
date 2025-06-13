"use client"
import React, { useState } from 'react';
import { Check, Download, Eye } from 'lucide-react';

const ProductsShowcase = () => {
  const [activeTab, setActiveTab] = useState('Get');

  const products = [
    {
      name: 'SautiBox',
      subtitle: 'Hardware Device',
      features: [
        'Portable sign-to-speech converter',
        '5" touchscreen& HD camera',
        '100+ TSL',
        'Offline functionality',
        '8-hours battery life'
      ],
      buttonText: 'Order Now',
      buttonStyle: 'border-blue-500 text-blue-500 hover:bg-blue-50'
    },
    {
      name: 'BridgingApp',
      subtitle: 'Mobile App',
      features: [
        'Real-time translations',
        'iOS/Android compatible',
        'Basic TSL tutorials',
        'Conversation history(30 days)',
        'Free and Premium access'
      ],
      buttonText: 'Download Now',
      buttonStyle: 'border-blue-500 text-blue-500 hover:bg-blue-50',
      isCenter: true
    },
    {
      name: 'SautiWeb',
      subtitle: 'Enterprise Platform',
      features: [
        'Organization-wide accessibility suite',
        'Admin dashboard for teams',
        'SCORM-compliant training module',
        'Analytics&reporting',
        'Custom API integration'
      ],
      buttonText: 'Request Demo',
      buttonStyle: 'border-blue-500 text-blue-500 hover:bg-blue-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with animated line */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto w-full max-w-4xl rounded-full"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-cyan-400 transform rotate-45 rounded-sm"></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-blue-600 mb-8 animate-fade-in">
            Products
          </h1>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-1 rounded-full shadow-lg">
              <div className="bg-white rounded-full flex">
                {['Get', 'View'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-white text-blue-600 shadow-md'
                        : 'text-gray-500 hover:text-blue-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid - Floating Layout */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.name}
              className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up ${
                index === 0 ? 'md:mt-16' : index === 1 ? 'md:-mt-8' : 'md:mt-12'
              } ${product.isCenter ? 'md:scale-105 border-2 border-blue-200' : ''} w-full md:w-80`}
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Product Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">
                  {product.name}
                </h3>
                <p className="text-blue-500 font-medium">
                  {product.subtitle}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {product.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-start space-x-3 animate-fade-in"
                    style={{
                      animationDelay: `${(index * 200) + (featureIndex * 100)}ms`
                    }}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button className={`px-8 py-3 border-2 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${product.buttonStyle}`}>
                  {product.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ProductsShowcase;