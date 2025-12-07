import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';

interface LeadPopupProps {
  clinicName: string;
  accentColor: string;
}

export const LeadPopup: React.FC<LeadPopupProps> = ({ clinicName, accentColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('leadPopupShown');
    if (!popupShown) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('leadPopupShown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - in production, this would send to a backend
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Log the lead data (in production, send to CRM/backend)
    console.log('Lead captured:', { ...formData, clinic: clinicName, timestamp: new Date().toISOString() });

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Close popup after showing success message
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .popup-container {
          animation: popupSlideIn 0.4s ease-out forwards;
        }

        .popup-backdrop {
          animation: backdropFadeIn 0.3s ease-out forwards;
        }

        .popup-input:focus {
          box-shadow: 0 0 0 2px ${accentColor}40;
          border-color: ${accentColor};
        }

        .popup-button {
          background: ${accentColor};
        }

        .popup-button:hover {
          background: ${accentColor}dd;
        }

        .popup-accent {
          background: linear-gradient(135deg, ${accentColor} 0%, ${accentColor}88 100%);
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="popup-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
        onClick={() => setIsOpen(false)}
      />

      {/* Popup */}
      <div className="popup-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000] w-[90%] max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with accent */}
          <div className="popup-accent p-6 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <XIcon />
            </button>

            <div className="pr-8">
              <h2 className="text-2xl font-light mb-2">Welcome to {clinicName}</h2>
              <p className="text-white/90 text-sm">
                Get a free consultation! Leave your details and we'll get back to you shortly.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-500">We'll contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="popup-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="popup-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="popup-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="popup-button w-full py-3 text-white font-medium rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Get Free Consultation'
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  By submitting, you agree to receive communications from us.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
