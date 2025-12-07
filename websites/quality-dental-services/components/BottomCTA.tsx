import React, { useRef, useState, useEffect } from 'react';
import { PhoneIcon, MapPinIcon, InstagramIcon, MicIcon, MessageCircleIcon } from './Icons';

export const BottomCTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-chat'));
  };

  const openVoice = () => {
    window.dispatchEvent(new CustomEvent('open-live-audio'));
  };

  return (
    <section className="bg-[#f2f2f2] pb-12 pt-12 px-4 md:px-12 flex justify-center overflow-hidden">
      <div 
        ref={sectionRef}
        className={`
          relative w-full max-w-[1400px] rounded-[40px] md:rounded-[60px] p-[1px] transition-all duration-1000 ease-out transform
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-50 translate-y-10'}
        `}
      >
        {/* Glow Animation Layer */}
        <div 
          className={`
            absolute inset-0 rounded-[40px] md:rounded-[60px] bg-gradient-to-r from-gray-800 via-white to-gray-800
            transition-opacity duration-1000 blur-sm
            ${isVisible ? 'opacity-100 animate-pulse' : 'opacity-0'}
          `} 
        />
        
        {/* Stronger Outer Glow */}
        <div 
          className={`
            absolute -inset-[1px] rounded-[40px] md:rounded-[60px] bg-white/50 blur-xl transition-opacity duration-1000
            ${isVisible ? 'opacity-40' : 'opacity-0'}
          `}
        />

        {/* Inner Content Card */}
        <div className="relative bg-[#080808] rounded-[39px] md:rounded-[59px] overflow-hidden flex flex-col justify-between min-h-[600px]">
          
          {/* Realistic Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
          </div>

          {/* Subtle Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/80 pointer-events-none" />

          {/* Main CTA Content */}
          <div className="relative z-10 py-20 px-8 md:px-20 flex flex-col items-center text-center flex-grow justify-center">
            
            <span className={`
              text-xs md:text-sm font-bold tracking-[0.3em] text-gray-400 uppercase mb-6 transition-all duration-700 delay-300
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              The Future of Dentistry
            </span>

            <h2 className={`
              text-4xl md:text-6xl lg:text-7xl font-sans font-light text-white mb-10 tracking-tight leading-tight transition-all duration-700 delay-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              Redefine Your <br/>
              <span className="font-serif italic text-gray-300">Signature Smile.</span>
            </h2>

            <p className={`
              max-w-2xl text-gray-400 text-lg md:text-xl font-serif italic mb-12 leading-relaxed transition-all duration-700 delay-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              Experience the convergence of technology and artistry. 
              Schedule your personalized consultation with Aether Dental today.
            </p>

            <button 
              className={`
                group relative px-10 py-5 bg-white text-black rounded-full font-medium tracking-widest text-sm uppercase overflow-hidden transition-all duration-700 delay-900
                hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Book Appointment</span>
              <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/10 relative z-10" />

          {/* Bottom Contact Section (Merged Footer) */}
          <div className={`
             relative z-10 px-8 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0
             bg-white/5 backdrop-blur-sm
             transition-all duration-1000 delay-1000
             ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}>
             
             {/* Contact Info Group */}
             <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 border border-white/20 rounded-full text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                    <MapPinIcon />
                  </div>
                  <span className="text-gray-400 font-light tracking-wide text-sm group-hover:text-white transition-colors">12247 OS43S</span>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 border border-white/20 rounded-full text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                    <PhoneIcon />
                  </div>
                  <span className="text-gray-400 font-light tracking-wide text-sm group-hover:text-white transition-colors">+220 02421S</span>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 border border-white/20 rounded-full text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                    <InstagramIcon />
                  </div>
                  <span className="text-gray-400 font-light tracking-wide text-sm group-hover:text-white transition-colors">Aether dental</span>
                </div>

             </div>

             {/* AI Actions */}
             <div className="flex items-center gap-4">
               <button 
                  onClick={openVoice}
                  className="bg-white text-black p-4 rounded-full hover:scale-110 transition-transform duration-300 relative group"
               >
                 {/* Pulse ring */}
                 <div className="absolute inset-0 rounded-full border border-white opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                 <MicIcon />
               </button>
               <button 
                  onClick={openChat}
                  className="text-white p-4 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-300"
               >
                 <MessageCircleIcon />
               </button>
             </div>
          </div>
          
          {/* Copyright */}
          <div className="relative z-10 w-full text-center py-4 bg-black/40 text-[10px] text-gray-600 tracking-[0.2em] uppercase">
            © 2024 Sculpted Enamel. All rights reserved.
          </div>

        </div>
      </div>
    </section>
  );
};
