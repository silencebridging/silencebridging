import { Mic, Languages, Volume2, MessageSquare } from 'lucide-react';

export default function MissionSection() {
  const features = [
    {
      icon: <Mic className="w-6 h-6 text-blue-500" />,
      title: "Sauti-to-Sign",
      bgColor: "bg-purple-100"
    },
    {
      icon: <Languages className="w-6 h-6 text-blue-500" />,
      title: "Sign Language",
      bgColor: "bg-purple-100"
    },
    {
      icon: <Volume2 className="w-6 h-6 text-blue-500" />,
      title: "Sign-to-Sauti",
      bgColor: "bg-purple-100"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
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
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Title */}
          <div>
            <h1 className="text-5xl font-bold text-black leading-tight mb-8">
              Where <span className="text-blue-600">Hand</span>
              <br />
              Speak and
              <br />
              Voices Are <span className="text-blue-600">Heard</span>
            </h1>
          </div>

          {/* Right Column - Mission Text */}
          <div>
            <h2 className="text-xl font-bold text-black mb-6">OUR MISSION...</h2>
            <div className="text-gray-700 text-base leading-relaxed space-y-4">
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`${feature.bgColor} rounded-full p-4 mb-3`}>
                {feature.icon}
              </div>
              <p className="text-blue-600 font-medium text-sm">
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
              className="absolute w-8 h-8 border-2 border-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-white text-5xl lg:text-6xl font-bold mb-4">
                  {stat.number}
                </div>
                <div className={`${stat.color} text-white px-4 py-2 rounded-full text-sm font-medium inline-block`}>
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