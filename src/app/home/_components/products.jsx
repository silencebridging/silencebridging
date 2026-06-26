'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

const ProductsShowcase = () => {
  const [activeTab, setActiveTab] = useState('Get');
  const { t } = useLanguage();

  const products = [
    {
      name: 'SautiBox',
      subtitle: t('prod_subtitle_sautibox'),
      features: t('prod_features_sautibox') || [],
      buttonText: t('prod_order_now'),
      buttonStyle: 'border-blue-600 text-blue-600 hover:bg-blue-50'
    },
    {
      name: 'BridgingApp',
      subtitle: t('prod_subtitle_bridgingapp'),
      features: t('prod_features_bridgingapp') || [],
      buttonText: t('prod_download_now'),
      buttonStyle: 'border-blue-600 text-blue-600 hover:bg-blue-50',
      isCenter: true
    },
    {
      name: 'SautiWeb',
      subtitle: t('prod_subtitle_sautiweb'),
      features: t('prod_features_sautiweb') || [],
      buttonText: t('prod_request_demo'),
      buttonStyle: 'border-blue-600 text-blue-600 hover:bg-blue-50'
    }
  ];

  return (
    <div className="bg-transparent py-20 px-4">
      {/* Outer section wrapper card matching screenshot */}
      <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-200/60 relative max-w-6xl mx-auto overflow-hidden">
        
        {/* Blue top border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1b64da]"></div>
        
        {/* Chevron dip pointing down */}
        <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 -translate-y-[1px] z-20">
          <div className="w-12 h-6 bg-[#1b64da] rounded-b-2xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-6 mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1b64da] tracking-wide">
            {t('prod_title')}
          </h2>
        </div>

        {/* Tab Switcher - Styled like screenshot with purple outline and blue gradient background */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#1b64da]/10 border border-[#8b5cf6]/40 p-1.5 rounded-full shadow-inner flex items-center">
            <div className="bg-gradient-to-r from-[#8b5cf6] to-[#1b64da] p-0.5 rounded-full flex">
              {[
                { id: 'Get', label: t('prod_tab_get') },
                { id: 'View', label: t('prod_tab_view') }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-2 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-[#1b64da] shadow-md'
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  {tab.label}
                </button>
               ))}
            </div>
          </div>
        </div>

        {/* Products Grid - Floating Layout with violet content and blue CTA buttons */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 max-w-5xl mx-auto py-4">
          {products.map((product, index) => (
            <div
              key={product.name}
              className={`bg-white rounded-[2rem] p-8 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between ${
                index === 0 ? 'md:mt-12' : index === 1 ? 'md:-mt-4' : 'md:mt-8'
              } ${product.isCenter ? 'md:scale-105 border border-blue-100 shadow-lg' : ''} w-full md:w-80`}
            >
              {/* Product Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-[#8b5cf6] mb-1">
                  {product.name}
                </h3>
                <p className="text-[#1b64da] text-sm font-bold tracking-wide">
                  {product.subtitle}
                </p>
              </div>

              {/* Features List - Violet color matching screenshot */}
              <div className="space-y-4 mb-8 flex-grow">
                {Array.isArray(product.features) && product.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-start space-x-3 text-left"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="w-5 h-5 text-[#8b5cf6]" />
                    </div>
                    <p className="text-[#8b5cf6]/90 text-sm font-medium leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-auto">
                <Link 
                  href="/contact"
                  className={`w-full max-w-[200px] inline-block px-6 py-2.5 border rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-center ${product.buttonStyle}`}
                >
                  {product.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsShowcase;