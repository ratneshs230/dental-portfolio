import React from 'react';
import { MicIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const openVoice = () => {
    window.dispatchEvent(new CustomEvent('open-live-audio'));
  };

  return (
    <section id="contact" className="bg-[#0a0a0a] py-24 px-6 md:px-12 relative overflow-hidden">
      <style>{`
        @keyframes borderPulse {
          0%, 100% {
            border-color: rgba(16, 185, 129, 0.3);
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
          }
          50% {
            border-color: rgba(16, 185, 129, 0.6);
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
          }
        }

        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes borderDash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }

        .contact-card {
          position: relative;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 1.5rem;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(16, 185, 129, 0.5) 0%,
            rgba(16, 185, 129, 0.1) 25%,
            rgba(136, 255, 255, 0.3) 50%,
            rgba(16, 185, 129, 0.1) 75%,
            rgba(16, 185, 129, 0.5) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .contact-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          background: linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.03) 100%);
          pointer-events: none;
          overflow: hidden;
        }

        .scan-effect {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 1.5rem;
          pointer-events: none;
        }

        .scan-effect::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(16, 185, 129, 0.05) 50%,
            transparent 100%
          );
          animation: scanLine 4s linear infinite;
        }

        .info-icon-border {
          position: relative;
        }

        .info-icon-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            rgba(16, 185, 129, 0.5) 25%,
            transparent 50%,
            rgba(16, 185, 129, 0.5) 75%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .info-icon-border:hover::before {
          opacity: 1;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .input-glow:focus {
          box-shadow:
            0 0 0 1px rgba(16, 185, 129, 0.5),
            0 0 20px rgba(16, 185, 129, 0.1);
        }

        .dashed-border {
          background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='rgba(0,229,255,0.3)' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
        }

        .corner-dots::before,
        .corner-dots::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(16, 185, 129, 0.5);
          border-radius: 50%;
        }

        .corner-dots::before {
          top: -3px;
          left: -3px;
          box-shadow:
            calc(100% + 0px) 0 0 0 rgba(16, 185, 129, 0.5);
        }

        .corner-dots::after {
          bottom: -3px;
          left: -3px;
          box-shadow:
            calc(100% + 0px) 0 0 0 rgba(16, 185, 129, 0.5);
        }
      `}</style>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Info */}
          <div>
            <span className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-6">
              Contact Us
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              Ready to transform your smile? Contact Dr. Gupta's Dental Care today to schedule your consultation or speak with our AI assistant for immediate assistance.
            </p>

            {/* Contact Info with animated borders */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="info-icon-border w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Location</h4>
                  <p className="text-gray-500">Pitampura, Delhi<br />Pitampura, Delhi </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="info-icon-border w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone</h4>
                  <p className="text-gray-500">+91-11-46610813</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="info-icon-border w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Hours</h4>
                  <p className="text-gray-500">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - CTA Card with animated borders */}
          <div className="contact-card corner-dots bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-12 relative overflow-hidden">
            {/* Scan effect */}
            <div className="scan-effect" />

            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                Book Your Visit
              </h3>
              <p className="text-gray-400 mb-8">
                Use our AI assistant to schedule an appointment instantly, or fill out the form below.
              </p>

              {/* AI Book Button with glow border */}
              <button
                onClick={openVoice}
                className="w-full mb-8 group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all hover:shadow-lg hover:shadow-emerald-500/30"
                style={{ animation: 'borderPulse 2s ease-in-out infinite' }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3 font-medium text-sm tracking-wide">
                  <MicIcon />
                  Book with AI Assistant
                </span>
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
                <span className="text-gray-500 text-sm">or send a message</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              </div>

              {/* Simple Form with glowing inputs */}
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input-glow w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-glow w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all duration-300"
                />
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className="input-glow w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all duration-300 resize-none"
                />
                <button
                  type="submit"
                  className="dashed-border w-full py-4 bg-transparent text-white rounded-3xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-300 font-medium tracking-wide"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2024 Dr. Gupta's Dental Care. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors text-sm">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors text-sm">Terms</a>
            <a href="#" className="text-gray-500 hover:text-emerald-400 transition-colors text-sm">Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
};
