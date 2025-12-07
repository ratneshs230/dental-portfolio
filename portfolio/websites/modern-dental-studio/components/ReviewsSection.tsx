import React, { useState } from 'react';

const reviews = [
  {
    name: 'Sunita Joshi',
    role: 'Homemaker',
    content: 'Wonderful experience! The entire family now visits Modern Dental Studio. Friendly staff and excellent treatment quality.',
    rating: 5
  },
  {
    name: 'Arun Mehta',
    role: 'Bank Manager',
    content: 'Professional and efficient. Got my teeth whitening done and the results are amazing. Thank you, team!',
    rating: 5
  },
  {
    name: 'Kavita Nair',
    role: 'Lawyer',
    content: 'Highly recommend this dental clinic. Clean, modern, and the doctors really know what they are doing.',
    rating: 5
  }
];

export const ReviewsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="reviews" className="bg-[#fafafa] py-24 px-6 md:px-12 overflow-hidden">
      <style>{`
        @keyframes borderGlow {
          0%, 100% {
            box-shadow:
              0 0 20px rgba(6, 182, 212, 0.1),
              inset 0 0 20px rgba(6, 182, 212, 0.05);
          }
          50% {
            box-shadow:
              0 0 40px rgba(6, 182, 212, 0.2),
              inset 0 0 30px rgba(6, 182, 212, 0.1);
          }
        }

        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .review-card-wrapper {
          position: relative;
          border-radius: 1.5rem;
        }

        .review-card-wrapper::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 1.75rem;
          background: conic-gradient(
            from 0deg,
            transparent,
            rgba(6, 182, 212, 0.4),
            rgba(136, 255, 255, 0.6),
            rgba(6, 182, 212, 0.4),
            transparent,
            transparent,
            transparent
          );
          animation: rotateBorder 8s linear infinite;
        }

        .review-card-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          background: white;
        }

        .review-card-inner {
          position: relative;
          z-index: 1;
          background: white;
          border-radius: 1.5rem;
          animation: borderGlow 3s ease-in-out infinite;
        }

        .floating-card {
          position: relative;
        }

        .floating-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 1rem;
          background: linear-gradient(
            135deg,
            rgba(6, 182, 212, 0.3),
            transparent 50%,
            rgba(136, 255, 255, 0.3)
          );
          opacity: 0.5;
        }

        .dot-border {
          background-image:
            radial-gradient(circle, rgba(6, 182, 212, 0.5) 1px, transparent 1px);
          background-size: 8px 8px;
          background-position: 0 0;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
            What Our Patients Say
          </h2>
        </div>

        {/* Reviews */}
        <div className="relative">
          {/* Main Review Card with rotating border */}
          <div className="review-card-wrapper max-w-4xl mx-auto">
            <div className="review-card-inner p-10 md:p-14">
              {/* Quote Icon */}
              <svg className="w-12 h-12 text-sky-200 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Review Content */}
              <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-8 italic">
                "{reviews[activeIndex].content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{reviews[activeIndex].name}</h4>
                  <p className="text-gray-500 text-sm">{reviews[activeIndex].role}</p>
                </div>

                {/* Navigation Dots */}
                <div className="flex gap-3">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'bg-sky-500 w-8 shadow-lg shadow-sky-500/50'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Side Cards with gradient borders */}
          <div className="floating-card hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-48 rounded-2xl opacity-40 -rotate-6">
            <div className="absolute inset-[1px] bg-white rounded-2xl" />
          </div>
          <div className="floating-card hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-48 rounded-2xl opacity-40 rotate-6">
            <div className="absolute inset-[1px] bg-white rounded-2xl" />
          </div>

          {/* Decorative dot borders */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 dot-border rounded-full" />
        </div>
      </div>
    </section>
  );
};
