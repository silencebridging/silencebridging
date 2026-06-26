import React from 'react';

const SponsorsSection = () => {
  const sponsors = [
    {
      name: "MUHAS (Muhimbili University of Health and Allied Sciences)",
      logo: "/sponsors/muhas.png",
      url: "https://muhas.ac.tz/"
    },
    {
      name: "TABESA (Tanzania Biomedical Engineering Association)",
      logo: "/sponsors/tabesa.webp",
      url: "https://www.tabesa.org/"
    },
    {
      name: "Hearing the Unheard Initiative",
      logo: "/sponsors/hearinng_the_unheard.jpeg",
      url: "https://www.hearingtheunheardinitiative.org/"
    },
    {
      name: "CRDB Foundation",
      logo: "/sponsors/crdb_foundtaion.jpg",
      url: "https://crdbbank.co.tz/en/about-us/group"
    }
  ];

  return (
    <div className="text-center space-y-10 relative z-10 py-10">
      <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
        Our Partners & <span className="text-[#1b64da]">Sponsors</span>
      </h2>
      
      {/* Logos Grid Container */}
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
        {sponsors.map((sponsor) => (
          <a 
            key={sponsor.name}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-5 bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-lg hover:border-blue-100 hover:scale-[1.03] transition-all duration-300 w-44 h-28 group cursor-pointer"
            title={sponsor.name}
          >
            <img 
              src={sponsor.logo} 
              alt={sponsor.name}
              className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 opacity-75 group-hover:opacity-100 transition-all duration-300"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SponsorsSection;
