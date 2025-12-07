import React from 'react';
import { PhoneIcon, MapPinIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white px-6 py-12 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20">
        
        {/* Address */}
        <a href="#" className="flex items-center gap-4 group transition-opacity hover:opacity-100 opacity-80">
          <div className="p-3 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0">
            <MapPinIcon />
          </div>
          <span className="font-light tracking-wide text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
            12247 OS43S
          </span>
        </a>

        {/* Phone */}
        <a href="tel:+22002421S" className="flex items-center gap-4 group transition-opacity hover:opacity-100 opacity-80">
          <div className="p-3 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0">
            <PhoneIcon />
          </div>
          <span className="font-light tracking-wide text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
            +220 02421S
          </span>
        </a>

        {/* Social / Brand */}
        <a href="#" className="flex items-center gap-4 group transition-opacity hover:opacity-100 opacity-80">
           <div className="p-3 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
          <span className="font-light tracking-wide text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
            Aether dental
          </span>
        </a>

      </div>
      
      <div className="text-center mt-12 pt-8 border-t border-white/10 text-[10px] md:text-xs text-gray-600 font-light tracking-[0.2em] uppercase">
        © 2024 Sculpted Enamel. All rights reserved.
      </div>
    </footer>
  );
};