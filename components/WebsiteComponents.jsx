'use client'

import { useState, useEffect, useRef } from 'react'

// Color themes based on clinic name hash
const COLOR_THEMES = [
  { primary: '#00e5ff', name: 'cyan', rgb: '0, 229, 255' },
  { primary: '#10b981', name: 'emerald', rgb: '16, 185, 129' },
  { primary: '#6366f1', name: 'indigo', rgb: '99, 102, 241' },
  { primary: '#f59e0b', name: 'amber', rgb: '245, 158, 11' },
  { primary: '#ec4899', name: 'pink', rgb: '236, 72, 153' },
  { primary: '#8b5cf6', name: 'violet', rgb: '139, 92, 246' },
  { primary: '#14b8a6', name: 'teal', rgb: '20, 184, 166' },
  { primary: '#f97316', name: 'orange', rgb: '249, 115, 22' },
]

function getThemeColor(clinicName) {
  const hash = (clinicName || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return COLOR_THEMES[hash % COLOR_THEMES.length]
}

// Header Component - Modern minimal design
export function Navbar({ clinic, colorScheme, backLink }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'}`}>
      <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center">
        <div className="text-base md:text-lg font-medium tracking-wide uppercase truncate max-w-[200px] md:max-w-none">
          {clinic?.name || 'Dental Clinic'}
        </div>
        <nav className="flex items-center gap-4 md:gap-8">
          <a href="#services" className="hidden md:block text-sm uppercase tracking-widest hover:opacity-60 transition">Services</a>
          <a href="#reviews" className="hidden md:block text-sm uppercase tracking-widest hover:opacity-60 transition">Reviews</a>
          <a href="#contact" className="hidden md:block text-sm uppercase tracking-widest hover:opacity-60 transition">Contact</a>
        </nav>
      </div>
    </header>
  )
}

// Hero Component - Full screen modern design
export function Hero({ clinic, colorScheme }) {
  const clinicName = clinic?.name || 'Dental Clinic'
  const experience = clinic?.experience || 15
  const estYear = 2024 - experience

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#fdfdfd] flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col h-full max-w-[1400px] mx-auto w-full px-6">
        <div className="flex-1 flex flex-col justify-center items-center text-center pt-24 pb-12">
          {/* Eyebrow text */}
          <span className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-6 font-light">
            {experience}+ Years of Excellence
          </span>

          {/* Main Heading */}
          <h1 className="font-light text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-gray-900 mb-6">
            <span className="block">Where Science</span>
            <span className="block">
              Meets{' '}
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
                Artistry
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed font-light mb-10">
            {clinic?.description || `Experience exceptional dental care at ${clinicName}. Book your consultation and discover your perfect smile.`}
          </p>

          {/* CTA Button */}
          <a
            href="#contact"
            className="group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-500 bg-transparent border border-gray-300 hover:border-black"
          >
            <span className="relative z-10 flex items-center gap-3 font-medium text-xs tracking-[0.2em] uppercase text-gray-800 group-hover:text-black">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Appointment
            </span>
            <div className="absolute inset-0 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
        </div>
      </div>

      {/* Left Vertical Text */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2">
        <div className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
          <span className="text-sm tracking-[0.2em] text-gray-400 uppercase font-light">{clinicName.substring(0, 20)}</span>
        </div>
      </div>

      {/* Right Vertical Text */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2">
        <div style={{ writingMode: 'vertical-rl' }}>
          <span className="text-sm tracking-[0.2em] text-gray-400 uppercase font-light">Est. {estYear}</span>
        </div>
      </div>
    </section>
  )
}

// Services Component with shimmer and corner effects
export function Services({ clinic, colorScheme }) {
  const theme = getThemeColor(clinic?.name || '')

  const defaultServices = [
    { icon: '01', title: 'General Dentistry', description: 'Comprehensive dental care including checkups, cleanings, and preventive treatments for optimal oral health.', color: 'from-cyan-400 via-blue-500 to-purple-500' },
    { icon: '02', title: 'Cosmetic Dentistry', description: 'Transform your smile with teeth whitening, veneers, and aesthetic enhancements tailored to you.', color: 'from-emerald-400 via-cyan-500 to-blue-500' },
    { icon: '03', title: 'Dental Implants', description: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth.', color: 'from-orange-400 via-pink-500 to-purple-500' },
    { icon: '04', title: 'Orthodontics', description: 'Modern braces and invisible aligners for perfect teeth alignment with comfort.', color: 'from-yellow-400 via-orange-500 to-red-500' },
  ]

  // Use clinic services if available, otherwise use defaults
  const services = clinic?.services && clinic.services.length > 0
    ? clinic.services.slice(0, 4).map((service, idx) => ({
        icon: String(idx + 1).padStart(2, '0'),
        title: typeof service === 'string' ? service : service.name,
        description: typeof service === 'string'
          ? `Professional ${service.toLowerCase()} services with modern techniques and personalized care.`
          : service.description || `Professional ${service.name.toLowerCase()} services with modern techniques and personalized care.`,
        color: defaultServices[idx % defaultServices.length].color
      }))
    : defaultServices

  return (
    <section id="services" className="bg-white py-24 px-6 md:px-12">
      <style>{`
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
          background: linear-gradient(135deg, transparent 40%, rgba(${theme.rgb}, 0.3) 50%, transparent 60%);
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
            linear-gradient(135deg, rgba(${theme.rgb}, 0.5) 0%, transparent 20%) top left,
            linear-gradient(-135deg, rgba(${theme.rgb}, 0.5) 0%, transparent 20%) top right,
            linear-gradient(45deg, rgba(${theme.rgb}, 0.5) 0%, transparent 20%) bottom left,
            linear-gradient(-45deg, rgba(${theme.rgb}, 0.5) 0%, transparent 20%) bottom right;
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
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]`} />

              <div className="service-card corner-accents relative bg-white p-8 md:p-10 rounded-3xl cursor-pointer overflow-hidden border border-gray-100 group-hover:border-transparent transition-colors duration-300">
                {/* Inner glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top line accent */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-1/2 bg-gradient-to-r ${service.color} transition-all duration-500`} />

                <div className="relative z-10">
                  {/* Number with gradient on hover */}
                  <span className={`text-6xl font-thin text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${service.color} transition-all duration-500`}>
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
  )
}

// Testimonials/Reviews Component with rotating border
export function Testimonials({ clinic, colorScheme }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const clinicName = clinic?.name || 'this clinic'
  const theme = getThemeColor(clinic?.name || '')

  const reviews = [
    { name: 'Priya Sharma', role: 'Business Professional', content: `Excellent dental care at ${clinicName}! The staff is friendly and professional. My treatment was painless and the results exceeded my expectations.`, rating: 5 },
    { name: 'Rajesh Kumar', role: 'IT Professional', content: `Best dental clinic in the area. Modern equipment and very hygienic environment. Highly recommend for all dental needs.`, rating: 5 },
    { name: 'Anita Desai', role: 'Teacher', content: 'Very satisfied with my dental treatment. The doctor explained everything clearly and the procedure was smooth.', rating: 5 },
  ]

  return (
    <section id="reviews" className="bg-[#fafafa] py-24 px-6 md:px-12 overflow-hidden">
      <style>{`
        @keyframes borderGlow {
          0%, 100% {
            box-shadow:
              0 0 20px rgba(${theme.rgb}, 0.1),
              inset 0 0 20px rgba(${theme.rgb}, 0.05);
          }
          50% {
            box-shadow:
              0 0 40px rgba(${theme.rgb}, 0.2),
              inset 0 0 30px rgba(${theme.rgb}, 0.1);
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
            rgba(${theme.rgb}, 0.4),
            rgba(${theme.rgb}, 0.6),
            rgba(${theme.rgb}, 0.4),
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
            rgba(${theme.rgb}, 0.3),
            transparent 50%,
            rgba(${theme.rgb}, 0.3)
          );
          opacity: 0.5;
        }

        .dot-border {
          background-image:
            radial-gradient(circle, rgba(${theme.rgb}, 0.5) 1px, transparent 1px);
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
              <svg className="w-12 h-12 text-cyan-200 mb-6" fill="currentColor" viewBox="0 0 24 24">
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
                      className={`h-3 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'w-8 shadow-lg'
                          : 'bg-gray-200 hover:bg-gray-300 w-3'
                      }`}
                      style={index === activeIndex ? {
                        backgroundColor: theme.primary,
                        boxShadow: `0 10px 15px -3px rgba(${theme.rgb}, 0.5)`
                      } : {}}
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
  )
}

// Contact Component - Dark theme with scan effect
export function Contact({ clinic, colorScheme }) {
  const clinicName = clinic?.name || 'Dental Clinic'
  const address = clinic?.address || (clinic?.area ? `${clinic.area}, Delhi` : 'Delhi, India')
  const phone = clinic?.phone || '+91 11-XXXX XXXX'
  const theme = getThemeColor(clinic?.name || '')

  return (
    <section id="contact" className="bg-[#0a0a0a] py-24 px-6 md:px-12 relative overflow-hidden">
      <style>{`
        @keyframes borderPulse {
          0%, 100% {
            border-color: rgba(${theme.rgb}, 0.3);
            box-shadow: 0 0 20px rgba(${theme.rgb}, 0.1);
          }
          50% {
            border-color: rgba(${theme.rgb}, 0.6);
            box-shadow: 0 0 30px rgba(${theme.rgb}, 0.2);
          }
        }

        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
            rgba(${theme.rgb}, 0.5) 0%,
            rgba(${theme.rgb}, 0.1) 25%,
            rgba(${theme.rgb}, 0.3) 50%,
            rgba(${theme.rgb}, 0.1) 75%,
            rgba(${theme.rgb}, 0.5) 100%
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
          background: linear-gradient(180deg, transparent 0%, rgba(${theme.rgb}, 0.03) 100%);
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
            rgba(${theme.rgb}, 0.05) 50%,
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
            rgba(${theme.rgb}, 0.5) 25%,
            transparent 50%,
            rgba(${theme.rgb}, 0.5) 75%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .info-icon-border:hover::before {
          opacity: 1;
          animation: spin 2s linear infinite;
        }

        .input-glow:focus {
          box-shadow:
            0 0 0 1px rgba(${theme.rgb}, 0.5),
            0 0 20px rgba(${theme.rgb}, 0.1);
        }

        .corner-dots::before,
        .corner-dots::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(${theme.rgb}, 0.5);
          border-radius: 50%;
        }

        .corner-dots::before {
          top: -3px;
          left: -3px;
          box-shadow: calc(100% + 0px) 0 0 0 rgba(${theme.rgb}, 0.5);
        }

        .corner-dots::after {
          bottom: -3px;
          left: -3px;
          box-shadow: calc(100% + 0px) 0 0 0 rgba(${theme.rgb}, 0.5);
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
              Ready to transform your smile? Reach out to schedule your consultation at {clinicName}.
            </p>

            {/* Contact Info with animated borders */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="info-icon-border w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-cyan-500/50 transition-all duration-300" style={{ '--hover-color': theme.primary }}>
                  <svg className="w-5 h-5 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Location</h4>
                  <p className="text-gray-500">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="info-icon-border w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-cyan-500/50 transition-all duration-300">
                  <svg className="w-5 h-5 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone</h4>
                  <p className="text-gray-500">{phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="info-icon-border w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-cyan-500/50 transition-all duration-300">
                  <svg className="w-5 h-5 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Hours</h4>
                  <p className="text-gray-500">Mon - Sat: 9:00 AM - 8:00 PM<br />Sunday: By Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - CTA Card with animated borders */}
          <div className="contact-card corner-dots bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-12 relative overflow-hidden">
            {/* Scan effect */}
            <div className="scan-effect" />

            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: `rgba(${theme.rgb}, 0.1)` }} />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                Book Your Visit
              </h3>
              <p className="text-gray-400 mb-8">
                Fill out the form below and we'll get back to you shortly.
              </p>

              {/* Form with glowing inputs */}
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input-glow w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input-glow w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-glow w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                />
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className="input-glow w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all duration-300 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 font-medium tracking-wide hover:shadow-lg"
                  style={{ '--hover-shadow': `0 10px 25px -5px rgba(${theme.rgb}, 0.3)` }}
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
            © 2024 {clinicName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">Terms</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer Component (included in Contact, but kept for compatibility)
export function Footer({ clinic, colorScheme }) {
  return null
}

// Lead Popup Component
export function LeadPopup({ clinic }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const theme = getThemeColor(clinic?.name || '')
  const clinicName = clinic?.name || 'Dental Clinic'

  useEffect(() => {
    const popupShown = sessionStorage.getItem('leadPopupShown')
    if (!popupShown) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem('leadPopupShown', 'true')
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Lead captured:', { ...formData, clinic: clinicName, timestamp: new Date().toISOString() })
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => setIsOpen(false), 2000)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (!isOpen) return null

  return (
    <>
      <style>{`
        @keyframes popupFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupScaleIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
        onClick={() => setIsOpen(false)}
        style={{ animation: 'popupFadeIn 0.3s ease-out' }}
      />

      {/* Popup */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000] w-[90%] max-w-md"
        style={{ animation: 'popupScaleIn 0.4s ease-out' }}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div
            className="p-6 text-white relative"
            style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}88 100%)` }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    style={{ '--tw-ring-color': `${theme.primary}40` }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    style={{ '--tw-ring-color': `${theme.primary}40` }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    style={{ '--tw-ring-color': `${theme.primary}40` }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-white font-medium rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: theme.primary }}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
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
  )
}

// Cursor Follower Component
export function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const positionRef = useRef({ x: -100, y: -100 })
  const mouseRef = useRef({ x: -100, y: -100 })
  const cursorRef = useRef(null)

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isVisible) {
        positionRef.current = { x: e.clientX, y: e.clientY }
        setIsVisible(true)
      }
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [isVisible])

  useEffect(() => {
    let animationFrameId

    const animate = () => {
      const { x: targetX, y: targetY } = mouseRef.current
      const { x: currentX, y: currentY } = positionRef.current

      const strength = 0.15
      const newX = currentX + (targetX - currentX) * strength
      const newY = currentY + (targetY - currentY) * strength

      positionRef.current = { x: newX, y: newY }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) translate(-50%, -50%)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[100] hidden md:block transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'transform' }}
    >
      <div className="w-12 h-12 border border-gray-800/30 rounded-full bg-white/5 backdrop-blur-[1px]" />
    </div>
  )
}

// Molecule Background Component
export function MoleculeBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let particles = []
    const particleCount = 60
    const connectionDistance = 150

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight
    }

    const createParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(200, 210, 230, 0.6)'
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(200, 210, 230, ${1 - distance / connectionDistance})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    resizeCanvas()
    createParticles()
    drawParticles()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  )
}

// Sine Wave Animation Component
export function SineWaveAnimation({ isHovered }) {
  const canvasRef = useRef(null)
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const animationRef = useRef(0)
  const voiceIntensityRef = useRef(0)
  const hoverIntensityRef = useRef(0)

  useEffect(() => {
    const handleVoiceChange = (e) => {
      setIsVoiceActive(e.detail.active)
    }
    window.addEventListener('voice-session-change', handleVoiceChange)
    return () => window.removeEventListener('voice-session-change', handleVoiceChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let time = 0

    const gradientColors = [
      { start: '#00e5ff', end: '#0088ff' },
      { start: '#00ffcc', end: '#00e5ff' },
      { start: '#88ffff', end: '#00ccff' },
      { start: '#00ffaa', end: '#00e5ff' },
    ]

    const activeGradientColors = [
      { start: '#ff00ff', end: '#00e5ff' },
      { start: '#00e5ff', end: '#ff6600' },
      { start: '#ffff00', end: '#00ff88' },
      { start: '#ff0088', end: '#8800ff' },
    ]

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerY = height / 2

      const targetVoiceIntensity = isVoiceActive ? 1 : 0
      voiceIntensityRef.current += (targetVoiceIntensity - voiceIntensityRef.current) * 0.04

      const targetHoverIntensity = isHovered ? 1 : 0
      hoverIntensityRef.current += (targetHoverIntensity - hoverIntensityRef.current) * 0.06

      const voiceIntensity = voiceIntensityRef.current
      const hoverIntensity = hoverIntensityRef.current

      ctx.clearRect(0, 0, width, height)

      const baseWaveCount = 4
      const waveCount = baseWaveCount + Math.floor(voiceIntensity * 3)
      const baseSpeed = 0.025
      const speed = baseSpeed + hoverIntensity * 0.015 + voiceIntensity * 0.05
      const baseAmplitude = 6
      const amplitude = baseAmplitude + hoverIntensity * 4 + voiceIntensity * 10

      time += speed

      const colors = voiceIntensity > 0.5 ? activeGradientColors : gradientColors
      const pointCount = 80
      const startPadding = width * 0.1
      const endPadding = width * 0.1
      const waveWidth = width - startPadding - endPadding

      for (let w = 0; w < waveCount; w++) {
        const waveOffset = (w / waveCount) * Math.PI * 2
        const wavePhase = time + waveOffset
        const colorIndex = w % colors.length
        const alpha = 0.5 + (1 - w / waveCount) * 0.4 + voiceIntensity * 0.1

        const points = []

        for (let i = 0; i <= pointCount; i++) {
          const t = i / pointCount
          const envelope = Math.sin(t * Math.PI)
          const taperEnvelope = Math.pow(envelope, 0.5)
          const x = startPadding + t * waveWidth
          const frequency = 0.025 + w * 0.008
          const waveAmplitude = amplitude * (0.6 + w * 0.12) * taperEnvelope
          const y = centerY + Math.sin(x * frequency + wavePhase) * waveAmplitude

          points.push({ x, y })
        }

        ctx.globalAlpha = alpha
        ctx.lineWidth = 2 + voiceIntensity + hoverIntensity * 0.5
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        const gradient = ctx.createLinearGradient(startPadding, centerY, startPadding + waveWidth, centerY)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(0.1, colors[colorIndex].start)
        gradient.addColorStop(0.5, colors[(colorIndex + 1) % colors.length].end)
        gradient.addColorStop(0.9, colors[colorIndex].end)
        gradient.addColorStop(1, 'transparent')
        ctx.strokeStyle = gradient

        ctx.beginPath()
        points.forEach((point, idx) => {
          if (idx === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }
        })
        ctx.stroke()

        ctx.globalAlpha = 1
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isHovered, isVoiceActive])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-20 pointer-events-none"
      style={{ opacity: 0.9, mixBlendMode: 'normal' }}
    />
  )
}

// RoboDentist Component - Bottom section robot
export function RoboDentist() {
  const headRef = useRef(null)
  const eyesRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!headRef.current || !eyesRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const x = (clientX - innerWidth / 2) / (innerWidth / 2)
      const y = (clientY - innerHeight / 2) / (innerHeight / 2)

      const rotateY = x * 40
      const rotateX = -y * 30

      headRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`

      const eyeX = x * 10
      const eyeY = y * 10
      eyesRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative w-80 h-80 flex items-center justify-center select-none pointer-events-none">
      <style>{`
        @keyframes floatBody {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blink {
          0%, 96%, 100% { transform: scaleY(1); }
          98% { transform: scaleY(0.1); }
        }

        .robot-perspective { perspective: 1000px; }

        .robot-head {
          width: 140px;
          height: 110px;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #d4d4d4 100%);
          border-radius: 45px;
          position: relative;
          z-index: 10;
          box-shadow: inset 5px 5px 15px rgba(255,255,255,0.9), inset -5px -5px 15px rgba(0,0,0,0.1), 0 15px 35px rgba(0,0,0,0.15);
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        .head-mirror-stick {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 30px;
          background: #888;
          z-index: 5;
        }

        .head-mirror {
          position: absolute;
          top: -45px;
          left: 50%;
          transform: translateX(-50%) rotateX(10deg);
          width: 40px;
          height: 40px;
          background: radial-gradient(circle at 30% 30%, #fff 0%, #e0e0e0 60%, #999 100%);
          border: 3px solid silver;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255,255,255,0.8);
          z-index: 6;
        }

        .face-screen {
          width: 100px;
          height: 60px;
          background: #111;
          border-radius: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translateZ(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: inset 0 0 5px rgba(0,0,0,0.8);
        }

        .eyes-container {
          display: flex;
          gap: 18px;
          transition: transform 0.1s ease-out;
        }

        .eye {
          width: 20px;
          height: 24px;
          background: #00e5ff;
          border-radius: 50%;
          box-shadow: 0 0 15px #00e5ff;
          animation: blink 4s infinite ease-in-out;
          position: relative;
        }

        .eye::after {
          content: '';
          position: absolute;
          top: 4px;
          right: 4px;
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
        }

        .robot-body {
          width: 90px;
          height: 70px;
          background: linear-gradient(to bottom, #f2f2f2, #e0e0e0);
          border-radius: 40px 40px 20px 20px;
          position: relative;
          margin-top: -15px;
          z-index: 5;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
          animation: floatBody 6s ease-in-out infinite;
        }

        .robot-neck {
          width: 50px;
          height: 20px;
          background: #333;
          border-radius: 10px;
          margin: 0 auto;
          transform: translateY(10px);
          position: relative;
          z-index: 4;
        }

        .badge {
          position: absolute;
          top: 25px;
          right: 20px;
          width: 8px;
          height: 8px;
          background: #ff4444;
          border-radius: 50%;
          box-shadow: 0 0 5px #ff4444;
        }

        .pocket {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 25px;
          height: 3px;
          background: #ccc;
          border-radius: 2px;
        }

        .shadow-floor {
          width: 120px;
          height: 20px;
          background: black;
          border-radius: 50%;
          opacity: 0.1;
          filter: blur(8px);
          margin-top: 30px;
          animation: shadowScale 6s ease-in-out infinite;
        }

        @keyframes shadowScale {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(0.8); opacity: 0.05; }
        }
      `}</style>

      <div className="robot-perspective flex flex-col items-center">
        <div ref={headRef} className="robot-head">
          <div className="head-mirror-stick"></div>
          <div className="head-mirror"></div>
          <div className="face-screen">
            <div ref={eyesRef} className="eyes-container">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
          </div>
        </div>

        <div className="robot-neck"></div>
        <div className="robot-body">
          <div className="pocket"></div>
          <div className="badge"></div>
        </div>

        <div className="shadow-floor"></div>
      </div>
    </div>
  )
}

// Floating Robot Head Component - Peeking from bottom right
export function FloatingRobotHead() {
  const [isVisible, setIsVisible] = useState(false)
  const headRef = useRef(null)
  const eyesRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.4
      setIsVisible(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!headRef.current || !eyesRef.current || !isVisible) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const x = (clientX - innerWidth / 2) / (innerWidth / 2)
      const y = (clientY - innerHeight / 2) / (innerHeight / 2)

      const rotateY = x * 20
      const rotateX = -y * 15

      headRef.current.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`

      const eyeX = x * 8
      const eyeY = y * 8
      eyesRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isVisible])

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-live-audio'))
  }

  if (!isVisible) return null

  return (
    <>
      <style>{`
        @keyframes peekUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }

        @keyframes floatBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes blinkEyes {
          0%, 96%, 100% { transform: scaleY(1); }
          98% { transform: scaleY(0.1); }
        }

        .floating-robot-container {
          position: fixed;
          bottom: 0;
          right: 30px;
          z-index: 1000;
          cursor: pointer;
          transition: transform 0.3s ease;
          animation: peekUp 0.5s ease-out forwards;
        }

        .floating-robot-container:hover {
          transform: translateY(-10px);
        }

        .floating-head-wrapper {
          animation: floatBob 3s ease-in-out infinite;
        }

        .floating-robot-head {
          width: 100px;
          height: 80px;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #d4d4d4 100%);
          border-radius: 35px 35px 20px 20px;
          position: relative;
          box-shadow: inset 5px 5px 15px rgba(255,255,255,0.9), inset -5px -5px 15px rgba(0,0,0,0.1), 0 -5px 25px rgba(0,0,0,0.15), 0 0 40px rgba(0,229,255,0.2);
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
          perspective: 1000px;
        }

        .floating-robot-head::before {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 15px;
          background: linear-gradient(to bottom, #333, #222);
          border-radius: 0 0 10px 10px;
        }

        .floating-face-screen {
          width: 70px;
          height: 42px;
          background: #111;
          border-radius: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: inset 0 0 5px rgba(0,0,0,0.8);
        }

        .floating-eyes-container {
          display: flex;
          gap: 12px;
          transition: transform 0.1s ease-out;
        }

        .floating-eye {
          width: 14px;
          height: 18px;
          background: #00e5ff;
          border-radius: 50%;
          box-shadow: 0 0 12px #00e5ff;
          animation: blinkEyes 4s infinite ease-in-out;
          position: relative;
        }

        .floating-eye::after {
          content: '';
          position: absolute;
          top: 3px;
          right: 3px;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
        }

        .robot-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 15px;
          padding: 8px 16px;
          background: rgba(0,0,0,0.9);
          color: white;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          white-space: nowrap;
          border-radius: 20px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .robot-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: rgba(0,0,0,0.9);
        }

        .floating-robot-container:hover .robot-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-5px);
        }

        .floating-mirror-stick {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 22px;
          background: #888;
        }

        .floating-mirror {
          position: absolute;
          top: -32px;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 28px;
          background: radial-gradient(circle at 30% 30%, #fff 0%, #e0e0e0 60%, #999 100%);
          border: 2px solid #aaa;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255,255,255,0.8);
        }
      `}</style>

      <div className="floating-robot-container" onClick={handleClick}>
        <div className="robot-tooltip">Talk to AI Assistant</div>
        <div className="floating-head-wrapper">
          <div ref={headRef} className="floating-robot-head">
            <div className="floating-mirror-stick"></div>
            <div className="floating-mirror"></div>
            <div className="floating-face-screen">
              <div ref={eyesRef} className="floating-eyes-container">
                <div className="floating-eye"></div>
                <div className="floating-eye"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Mic Icon Component
export function MicIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

// Live Audio Widget Component - Manages Gemini voice session
export function LiveAudioWidget({ clinic }) {
  const [status, setStatus] = useState('idle') // 'idle' | 'connecting' | 'connected' | 'error'

  const startSession = async () => {
    if (status === 'connecting' || status === 'connected') return

    setStatus('connecting')

    // Simulate connection for demo
    setTimeout(() => {
      setStatus('connected')
      window.dispatchEvent(new CustomEvent('voice-session-change', { detail: { active: true } }))
    }, 500)
  }

  const endSession = async () => {
    setStatus('idle')
    window.dispatchEvent(new CustomEvent('voice-session-change', { detail: { active: false } }))
  }

  useEffect(() => {
    const handleOpen = () => startSession()
    window.addEventListener('open-live-audio', handleOpen)
    return () => window.removeEventListener('open-live-audio', handleOpen)
  }, [status])

  useEffect(() => {
    const handleEnd = () => endSession()
    window.addEventListener('end-live-audio', handleEnd)
    return () => window.removeEventListener('end-live-audio', handleEnd)
  }, [])

  return null
}

// Enhanced Hero Component with Robot and Sine Wave
export function HeroWithRobot({ clinic, colorScheme }) {
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const clinicName = clinic?.name || 'Dental Clinic'
  const experience = clinic?.experience || 15
  const estYear = 2024 - experience

  useEffect(() => {
    const handleVoiceChange = (e) => {
      setIsCallActive(e.detail.active)
    }
    window.addEventListener('voice-session-change', handleVoiceChange)
    return () => window.removeEventListener('voice-session-change', handleVoiceChange)
  }, [])

  const handleButtonClick = () => {
    if (isCallActive) {
      window.dispatchEvent(new CustomEvent('end-live-audio'))
    } else {
      window.dispatchEvent(new CustomEvent('open-live-audio'))
    }
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#fdfdfd] flex flex-col">
      {/* Dynamic Molecular Background */}
      <div className="absolute inset-0 pointer-events-none">
        <MoleculeBackground />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col h-full max-w-[1400px] mx-auto w-full px-6">
        {/* Top Section - Typography */}
        <div className="flex-1 flex flex-col justify-center items-center text-center pt-20">
          <span className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-6 font-light">
            {experience}+ Years of Excellence
          </span>

          <h1 className="font-light text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-gray-900 mb-6">
            <span className="block">Where Science</span>
            <span className="block">
              Meets{' '}
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
                Artistry
              </span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed font-light">
            {clinic?.description || `Experience precision dentistry powered by AI. Book your consultation with our intelligent assistant and discover your perfect smile.`}
          </p>
        </div>

        {/* Bottom Section - Robot, Wave, Button */}
        <div className="flex flex-col items-center pb-12 md:pb-16">
          {/* Container for the robot with ambient glow */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className={`absolute inset-0 rounded-full blur-3xl opacity-40 animate-pulse transition-colors duration-500 ${
              isCallActive ? 'bg-cyan-200' : 'bg-blue-50'
            }`}></div>

            <div className="relative z-10 transform scale-[0.65] md:scale-75 transition-transform duration-500">
              <RoboDentist />
            </div>
          </div>

          {/* Sine Wave Animation */}
          <div className="w-80 -mt-8">
            <SineWaveAnimation isHovered={isButtonHovered || isCallActive} />
          </div>

          {/* Voice Booking Button */}
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
              isCallActive ? 'text-white' : 'text-gray-800 group-hover:text-black'
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
          <span className="text-sm tracking-[0.2em] text-gray-400 uppercase font-light">{clinicName.substring(0, 20)}</span>
        </div>
      </div>

      {/* Right Vertical Text */}
      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2">
        <div style={{ writingMode: 'vertical-rl' }}>
          <span className="text-sm tracking-[0.2em] text-gray-400 uppercase font-light">Est. {estYear}</span>
        </div>
      </div>
    </section>
  )
}
