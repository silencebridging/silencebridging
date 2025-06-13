import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WhyChooseUsAnimated() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "TSL translation",
      subtitle: "Real Time",
      items: [
        "Instant Communication",
        "Accurate recognition",
        "100+ TSL sign languages",
        "Supports slang variations",
        "Learns and improves"
      ]
    },
    {
      title: "Training Mode",
      subtitle: "Helpful",
      items: [
        "Visual and Audio aids",
        "Interactive modules for all",
        "Practice mode to improve skills",
        "Certification-ready learning path",
        "Mutual understanding improvement"
      ]
    },
    {
      title: "Communication",
      subtitle: "Two-way communication",
      items: [
        "Easy conversion",
        "Supports voice-to-text",
        "Seamless turn-taking in real-time conversation",
        "Adaptive system",
        "Empower independent communication"
      ]
    },
    {
      title: "Customizable",
      subtitle: "Customizable experience",
      items: [
        "Easy personalization",
        "Easy changes in settings",
        "Modular components",
        "Accessible",
        "Dashboard settings for user preference"
      ]
    },
    {
      title: "Support",
      subtitle: "24/7 Support",
      items: [
        "Easy help access",
        "Live Chats, FAQ's and Guides",
        "Community-based Programs",
        "Regular updates from User Feedbacks",
        "Support during Deployment"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden py-16">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Why Choose <span className="text-blue-500">Us</span>?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <FeatureCard feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ feature }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-purple-600 mb-2">
          {feature.title}
        </h3>
        <p className="text-blue-500 font-medium text-sm">
          {feature.subtitle}
        </p>
      </div>

      {/* Feature Items */}
      <div className="space-y-3">
        {feature.items.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className={`flex items-start space-x-3 p-2 rounded-lg transition-all duration-300 cursor-pointer ${
              hoveredItem === itemIndex ? 'bg-purple-50 scale-105' : 'hover:bg-gray-50'
            }`}
            onMouseEnter={() => setHoveredItem(itemIndex)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`mt-0.5 transition-all duration-300 ${
              hoveredItem === itemIndex ? 'scale-110' : ''
            }`}>
              <Check className="w-4 h-4 text-purple-600" />
            </div>
            <span className={`text-gray-700 text-sm leading-relaxed transition-all duration-300 ${
              hoveredItem === itemIndex ? 'text-purple-700 font-medium' : ''
            }`}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}