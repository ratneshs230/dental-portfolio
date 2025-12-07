import React, { useEffect, useRef, useState } from 'react';
import { RoboDentist } from './RoboDentist';
import { MoleculeBackground } from './MoleculeBackground';
import { MicIcon } from './Icons';
import { SineWaveAnimation } from './SineWaveAnimation';

export const Hero: React.FC = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  // Listen for voice session changes
  useEffect(() => {
    const handleVoiceChange = (e: CustomEvent) => {
      setIsCallActive(e.detail.active);
    };
    window.addEventListener('voice-session-change', handleVoiceChange as EventListener);
    return () => window.removeEventListener('voice-session-change', handleVoiceChange as EventListener);
  }, []);

  const handleButtonClick = () => {
    if (isCallActive) {
      window.dispatchEvent(new CustomEvent('end-live-audio'));
    } else {
      window.dispatchEvent(new CustomEvent('open-live-audio'));
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#fdfdfd] flex flex-col">
      {/* Dynamic Molecular Background */}
      <div className="absolute inset-0 pointer-events-none">
        <MoleculeBackground />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col h-full max-w-[1400px] mx-auto w-full px-6">

        {/* Top Section - Typography */}
        <div className="flex-1 flex flex-col justify-center items-center text-center pt-20">
          {/* Eyebrow text */}
          <span className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-6 font-light">
            Excellence in Dental Care Since 1999
          </span>

          {/* Main Heading */}
          <h1 className="font-light text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-gray-900 mb-6">
            <span className="block">Where Science</span>
            <span className="block">
              Meets{' '}
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
                Artistry
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed font-light">
            Experience exceptional dental care in Karol Bagh. Book your consultation with our AI assistant and take the first step towards your perfect smile.
          </p>
        </div>

        {/* Bottom Section - Robot, Wave, Button */}
        <div className="flex flex-col items-center pb-12 md:pb-16">
          {/* Container for the robot with ambient glow */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Ambient glow behind the robot */}
            <div className={`absolute inset-0 rounded-full blur-3xl opacity-40 animate-pulse transition-colors duration-500 ${
              isCallActive ? 'bg-cyan-200' : 'bg-blue-50'
            }`}></div>

            {/* The Robot Component */}
            <div className="relative z-10 transform scale-65 md:scale-75 transition-transform duration-500">
              <RoboDentist />
            </div>
          </div>

          {/* Sine Wave Animation */}
          <div className="w-80 -mt-8">
            <SineWaveAnimation isHovered={isButtonHovered || isCallActive} />
          </div>

          {/* Voice Booking Button - transforms to End Call */}
          <button
            onClick={handleButtonClick}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className={`-mt-2 group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-500 cursor-pointer z-20 ${
              isCallActive
                ? 'bg-red-500 border-2 border-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30'
                : 'bg-transparent border border-gray-300 hover:border-black'
            }`}
          >
            <span className={`relative z-10 flex items-center gap-3 font-medium text-xs tracking-[0.2em] uppercase transition-colors ${
              isCallActive
                ? 'text-white'
                : 'text-gray-800 group-hover:text-black'
            }`}>
              {isCallActive ? (
                <>
                  <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                  </svg>
                  End Call
                </>
              ) : (
                <>
                  <MicIcon />
                  Book Appointment via AI
                </>
              )}
            </span>
            {!isCallActive && (
              <div className="absolute inset-0 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            )}
          </button>

          {/* Call status indicator */}
          {isCallActive && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>AI Assistant is listening...</span>
            </div>
          )}
        </div>
      </div>

      {/* Left Vertical Text */}
      <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2">
        <div className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
          <span className="text-sm tracking-[0.2em] text-gray-400 uppercase font-light">Dr. Bhatia's Dental ...</span>
        </div>
      </div>

      {/* Right Vertical Text */}
      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2">
        <div style={{ writingMode: 'vertical-rl' }}>
          <span className="text-sm tracking-[0.2em] text-gray-400 uppercase font-light">Est. 1999</span>
        </div>
      </div>
    </section>
  );
};
