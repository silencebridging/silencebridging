import { Mic, Languages, Volume2, MessageSquare } from 'lucide-react';

export default function MissionSection() {
  const features = [
    {
      icon: <Mic className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />,
      title: "Sauti-to-Sign",
      bgColor: "bg-purple-100"
    },
    {
      icon: <Languages className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />,
      title: "Sign Language",
      bgColor: "bg-purple-100"
    },
    {
      icon: <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />,
      title: "Sign-to-Sauti",
      bgColor: "bg-purple-100"
    },
    {
      icon: <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />,
      title: "Sign-to-Text",
      bgColor: "bg-purple-100"
    }
  ];

  const stats = [
    {
      number: "5+",
      label: "Years Perfecting Sign-Tech",
      color: "bg-purple-600"
    },
    {
      number: "98%",
      label: "Translation Accuracy",
      color: "bg-purple-600"
    },
    {
      number: "10K+",
      label: "Lives Impacted",
      color: "bg-purple-600"
    },
    {
      number: "99%",
      label: "User Satisfaction",
      color: "bg-purple-600"
    }
  ];

  return (
    <div className="w-full bg-gray-50">
      {/* Main Content Section */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left Column - Title */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight mb-6 md:mb-8">
              Where <span className="text-blue-600">Hand</span>
              <br />
              Speak and
              <br />
              Voices Are <span className="text-blue-600">Heard</span>
            </h1>
          </div>

          {/* Right Column - Mission Text */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6 text-center lg:text-left">OUR MISSION...</h2>
            <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4">
              <p>
                We empower the Deaf and hearing communities to connect effortlessly 
                through innovative technology. By breaking down communication 
                barriers, we create a world where no conversation is left unheard.
              </p>
              <p>
                Through our flagship innovation, the <span className="font-semibold">SautiBox</span>, we provide an affordable, 
                offline-capable device that captures sign language and converts it into 
                audible speech and readable text- in real time.
              </p>
              <p>
                Whether in rural villages or busy urban centers, our mission is to ensure 
                that no voice goes unheard. We are building technology that doesn't just 
                translate signs- it builds understanding, empathy, and inclusion for all.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`${feature.bgColor} rounded-full p-3 sm:p-4 mb-2 sm:mb-3`}>
                {feature.icon}
              </div>
              <p className="text-blue-600 font-medium text-xs sm:text-sm">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 sm:w-8 sm:h-8 border-2 border-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">
                  {stat.number}
                </div>
                <div className={`${stat.color} text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium inline-block`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}