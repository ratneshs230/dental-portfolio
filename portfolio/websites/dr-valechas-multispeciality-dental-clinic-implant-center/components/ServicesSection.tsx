import React from 'react';

const services = [
  {
    icon: '01',
    title: 'General Dentistry',
    description: 'Comprehensive dental care including checkups, cleanings, and preventive treatments for optimal oral health.',
    borderColor: 'from-cyan-400 via-blue-500 to-purple-500'
  },
  {
    icon: '02',
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with teeth whitening, veneers, and aesthetic enhancements tailored to you.',
    borderColor: 'from-emerald-400 via-cyan-500 to-blue-500'
  },
  {
    icon: '03',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth.',
    borderColor: 'from-orange-400 via-pink-500 to-purple-500'
  },
  {
    icon: '04',
    title: 'Root Canal Treatment',
    description: 'Pain-free root canal therapy using advanced techniques to save your natural teeth.',
    borderColor: 'from-yellow-400 via-orange-500 to-red-500'
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="bg-white py-24 px-6 md:px-12">
      <style>{`
        @keyframes borderRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .service-card {
          position: relative;
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          padding: 2px;
          background: linear-gradient(135deg, transparent 40%, rgba(0,229,255,0.3) 50%, transparent 60%);
          background-size: 200% 200%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .service-card:hover::before {
          opacity: 1;
          animation: shimmer 2s linear infinite;
        }

        .gradient-border-wrapper {
          position: relative;
          border-radius: 1.5rem;
          padding: 1px;
        }

        .gradient-border-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .gradient-border-wrapper:hover::before {
          opacity: 1;
        }

        .corner-accents::after {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          border-radius: 1.5rem;
          background:
            linear-gradient(135deg, rgba(0,229,255,0.5) 0%, transparent 20%) top left,
            linear-gradient(-135deg, rgba(0,229,255,0.5) 0%, transparent 20%) top right,
            linear-gradient(45deg, rgba(0,229,255,0.5) 0%, transparent 20%) bottom left,
            linear-gradient(-45deg, rgba(0,229,255,0.5) 0%, transparent 20%) bottom right;
          background-size: 50% 50%;
          background-repeat: no-repeat;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .corner-accents:hover::after {
          opacity: 1;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4 block">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
            Our Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="gradient-border-wrapper group"
            >
              {/* Animated gradient border */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]`} />

              <div className="service-card corner-accents relative bg-white p-8 md:p-10 rounded-3xl cursor-pointer overflow-hidden border border-gray-100 group-hover:border-transparent transition-colors duration-300">
                {/* Inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top line accent */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-1/2 bg-gradient-to-r ${service.borderColor} transition-all duration-500`} />

                <div className="relative z-10">
                  {/* Number with gradient on hover */}
                  <span className={`text-6xl font-thin text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${service.borderColor} transition-all duration-500`}>
                    {service.icon}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-gray-900 mt-4 mb-3 group-hover:text-black transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors">
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-gray-400 group-hover:text-cyan-500 transition-colors">
                    <span className="text-sm tracking-wide">Learn more</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
