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

  // Convert clinic services to our format
  const clinicServices = clinic?.services && clinic.services.length > 0
    ? clinic.services.map((service, idx) => ({
        icon: String(idx + 1).padStart(2, '0'),
        title: typeof service === 'string' ? service : service.name,
        description: typeof service === 'string'
          ? `Professional ${service.toLowerCase()} services with modern techniques and personalized care.`
          : service.description || `Professional ${service.name.toLowerCase()} services with modern techniques and personalized care.`,
        color: defaultServices[idx % defaultServices.length].color
      }))
    : []

  // Ensure at least 4 services by filling with defaults
  const services = clinicServices.length >= 4
    ? clinicServices.slice(0, 4)
    : [
        ...clinicServices,
        ...defaultServices
          .filter(ds => !clinicServices.some(cs => cs.title.toLowerCase() === ds.title.toLowerCase()))
          .slice(0, 4 - clinicServices.length)
          .map((ds, idx) => ({
            ...ds,
            icon: String(clinicServices.length + idx + 1).padStart(2, '0')
          }))
      ]

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

// Cute Robot Component for Lead Gate Form
function LeadGateRobot({ isWaving = false }) {
  return (
    <div className="lead-gate-robot">
      <style>{`
        .lead-gate-robot {
          position: relative;
          width: 80px;
          height: 90px;
        }

        @keyframes robotBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes robotWave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }

        @keyframes robotBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }

        @keyframes robotHappy {
          0%, 100% { border-radius: 50%; }
          50% { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; }
        }

        @keyframes heartFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-8px) scale(1.1); opacity: 0.8; }
        }

        .robot-body-lead {
          animation: robotBounce 2s ease-in-out infinite;
        }

        .robot-head-lead {
          width: 60px;
          height: 50px;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%);
          border-radius: 25px 25px 20px 20px;
          position: relative;
          margin: 0 auto;
          box-shadow:
            inset 3px 3px 10px rgba(255,255,255,0.9),
            inset -3px -3px 10px rgba(0,0,0,0.1),
            0 8px 20px rgba(0,0,0,0.15);
        }

        .robot-face-lead {
          width: 45px;
          height: 28px;
          background: #111;
          border-radius: 15px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          overflow: hidden;
        }

        .robot-eye-lead {
          width: 10px;
          height: 12px;
          background: #00e5ff;
          border-radius: 50%;
          box-shadow: 0 0 8px #00e5ff;
          animation: robotBlink 3s infinite ease-in-out;
        }

        .robot-eye-lead.happy {
          animation: robotBlink 3s infinite ease-in-out, robotHappy 1s infinite ease-in-out;
          height: 8px;
        }

        .robot-antenna-lead {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 12px;
          background: #888;
        }

        .robot-antenna-ball {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: radial-gradient(circle at 30% 30%, #ff6b6b, #ee5a5a);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255,107,107,0.5);
        }

        .robot-arm-lead {
          position: absolute;
          width: 8px;
          height: 25px;
          background: linear-gradient(to bottom, #e8e8e8, #d0d0d0);
          border-radius: 4px;
          top: 55px;
        }

        .robot-arm-lead.left {
          left: 5px;
          transform-origin: top center;
        }

        .robot-arm-lead.right {
          right: 5px;
          transform-origin: top center;
        }

        .robot-arm-lead.waving {
          animation: robotWave 0.5s ease-in-out infinite;
        }

        .robot-hand-lead {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 10px;
          background: #d0d0d0;
          border-radius: 50%;
        }

        .robot-body-main-lead {
          width: 50px;
          height: 35px;
          background: linear-gradient(to bottom, #f5f5f5, #e8e8e8);
          border-radius: 15px 15px 10px 10px;
          margin: 5px auto 0;
          position: relative;
          box-shadow: inset 0 0 8px rgba(0,0,0,0.05);
        }

        .robot-heart {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          animation: heartFloat 1.5s ease-in-out infinite;
        }

        .robot-cheeks {
          position: absolute;
          width: 6px;
          height: 4px;
          background: rgba(255,150,150,0.5);
          border-radius: 50%;
          top: 32px;
        }

        .robot-cheeks.left { left: 8px; }
        .robot-cheeks.right { right: 8px; }
      `}</style>

      <div className="robot-body-lead">
        {/* Head */}
        <div className="robot-head-lead">
          <div className="robot-antenna-lead"></div>
          <div className="robot-antenna-ball"></div>
          <div className="robot-face-lead">
            <div className={`robot-eye-lead ${isWaving ? 'happy' : ''}`}></div>
            <div className={`robot-eye-lead ${isWaving ? 'happy' : ''}`}></div>
          </div>
          <div className="robot-cheeks left"></div>
          <div className="robot-cheeks right"></div>
        </div>

        {/* Arms */}
        <div className={`robot-arm-lead left ${isWaving ? '' : ''}`}>
          <div className="robot-hand-lead"></div>
        </div>
        <div className={`robot-arm-lead right ${isWaving ? 'waving' : ''}`}>
          <div className="robot-hand-lead"></div>
        </div>

        {/* Body */}
        <div className="robot-body-main-lead">
          <div className="robot-heart">❤️</div>
        </div>
      </div>
    </div>
  )
}

// Lead Gate Component - Blocks site access until form is filled
export function LeadPopup({ clinic }) {
  const [hasAccess, setHasAccess] = useState(true) // Start true to prevent flash
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [robotWaving, setRobotWaving] = useState(true)

  const theme = getThemeColor(clinic?.name || '')
  const clinicName = clinic?.name || 'Dental Clinic'
  const clinicSlug = clinic?.slug || 'dental-clinic'

  // Check access on mount
  useEffect(() => {
    setIsMounted(true)
    const accessGranted = localStorage.getItem(`leadGate_${clinicSlug}`)
    setHasAccess(accessGranted === 'true')
  }, [clinicSlug])

  // Robot waves when form fields are focused
  const handleInputFocus = () => setRobotWaving(true)
  const handleInputBlur = () => setRobotWaving(false)

  const handleSkip = () => {
    // Grant access without submitting form
    localStorage.setItem(`leadGate_${clinicSlug}`, 'true')
    setHasAccess(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Build webhook URL with query params (GET request)
      const webhookUrl = new URL('https://baklol23.app.n8n.cloud/webhook/a20d6f31-e0b7-41e4-b0f2-dc5c1c86045b')
      webhookUrl.searchParams.append('name', formData.name)
      webhookUrl.searchParams.append('phone', formData.phone)
      webhookUrl.searchParams.append('email', formData.email)
      webhookUrl.searchParams.append('clinic', clinicName)
      webhookUrl.searchParams.append('clinic_slug', clinicSlug)
      webhookUrl.searchParams.append('timestamp', new Date().toISOString())

      // Send GET request to webhook
      await fetch(webhookUrl.toString(), {
        method: 'GET',
        mode: 'no-cors' // Webhook may not have CORS headers
      })

      // Grant access and store in localStorage
      localStorage.setItem(`leadGate_${clinicSlug}`, 'true')
      setHasAccess(true)
    } catch (err) {
      console.error('Webhook error:', err)
      // Still grant access even if webhook fails (to not block user)
      localStorage.setItem(`leadGate_${clinicSlug}`, 'true')
      setHasAccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Don't render anything during SSR or if user has access
  if (!isMounted || hasAccess) return null

  return (
    <>
      <style>{`
        @keyframes gateSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gatePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(${theme.rgb}, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(${theme.rgb}, 0); }
        }
        @keyframes skipBtnHover {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
      `}</style>

      {/* Full screen blocking overlay */}
      <div className="fixed inset-0 z-[99999] bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: theme.primary }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: theme.primary }} />

        {/* Form Card */}
        <div
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{ animation: 'gateSlideIn 0.6s ease-out' }}
        >
          {/* Header with Robot */}
          <div
            className="p-6 pb-4 text-white text-center relative"
            style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}cc 100%)` }}
          >
            {/* Robot */}
            <div className="flex justify-center mb-3">
              <LeadGateRobot isWaving={robotWaving} />
            </div>

            <h2 className="text-xl font-light mb-1">Welcome to</h2>
            <h1 className="text-lg font-medium">{clinicName}</h1>
            <p className="text-white/80 text-xs mt-2">
              Enter your details to access our website and get a free consultation
            </p>
          </div>

          {/* Form */}
          <div className="p-6 pt-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-opacity-100 transition-all"
                  style={{ '--tw-border-opacity': 0.5 }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none transition-all"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 text-white font-medium rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}dd 100%)`,
                  animation: !isSubmitting ? 'gatePulse 2s infinite' : 'none'
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Access Website'
                )}
              </button>

              {/* Skip Button */}
              <button
                type="button"
                onClick={handleSkip}
                className="w-full py-2.5 text-gray-500 text-sm font-medium rounded-xl transition-all hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2 group"
              >
                <span>Skip for now</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <p className="text-xs text-gray-400 text-center">
                By continuing, you agree to receive communications about our dental services.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

// Cursor Follower Component
export function CursorFollower() {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const positionRef = useRef({ x: -100, y: -100 })
  const mouseRef = useRef({ x: -100, y: -100 })
  const cursorRef = useRef(null)

  // Only run on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const onMouseMove = (e) => {
      if (!isVisible) {
        positionRef.current = { x: e.clientX, y: e.clientY }
        setIsVisible(true)
      }
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [isMounted, isVisible])

  useEffect(() => {
    if (!isMounted) return

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
  }, [isMounted])

  // Don't render on server
  if (!isMounted) return null

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

// Floating Robot Head Component - Peeking from bottom right with voice indicator
export function FloatingRobotHead() {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const headRef = useRef(null)
  const eyesRef = useRef(null)

  // Only run on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Listen for voice session changes
  useEffect(() => {
    if (!isMounted) return

    const handleVoiceChange = (e) => {
      setIsVoiceActive(e.detail?.active || false)
    }

    window.addEventListener('voice-session-change', handleVoiceChange)
    return () => window.removeEventListener('voice-session-change', handleVoiceChange)
  }, [isMounted])

  useEffect(() => {
    if (!isMounted) return

    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.4
      setIsVisible(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMounted])

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

  // Don't render on server or when not visible
  if (!isMounted || !isVisible) return null

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

        /* Radial sine wave animations for active voice */
        @keyframes radialWave1 {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
        @keyframes radialWave2 {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
        @keyframes radialWave3 {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(1.9); opacity: 0; }
        }
        @keyframes voicePulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0,229,255,0.4), inset 0 0 15px rgba(0,229,255,0.2); }
          50% { box-shadow: 0 0 40px rgba(0,229,255,0.6), inset 0 0 25px rgba(0,229,255,0.3); }
        }
        @keyframes eyeGlow {
          0%, 100% { box-shadow: 0 0 12px #00e5ff; }
          50% { box-shadow: 0 0 25px #00e5ff, 0 0 40px rgba(0,229,255,0.5); }
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
          position: relative;
        }

        /* Radial sine wave rings - only visible when voice active */
        .voice-wave-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          border: 2px solid rgba(0,229,255,0.6);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
        }

        .voice-active .voice-wave-ring:nth-child(1) {
          animation: radialWave1 1.5s ease-out infinite;
        }
        .voice-active .voice-wave-ring:nth-child(2) {
          animation: radialWave2 1.5s ease-out infinite 0.3s;
        }
        .voice-active .voice-wave-ring:nth-child(3) {
          animation: radialWave3 1.5s ease-out infinite 0.6s;
        }
        .voice-active .voice-wave-ring:nth-child(4) {
          animation: radialWave1 1.5s ease-out infinite 0.9s;
        }

        .floating-robot-head {
          width: 100px;
          height: 80px;
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #d4d4d4 100%);
          border-radius: 35px 35px 20px 20px;
          position: relative;
          box-shadow: inset 5px 5px 15px rgba(255,255,255,0.9), inset -5px -5px 15px rgba(0,0,0,0.1), 0 -5px 25px rgba(0,0,0,0.15), 0 0 40px rgba(0,229,255,0.2);
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out, box-shadow 0.3s ease;
          perspective: 1000px;
        }

        .voice-active .floating-robot-head {
          animation: voicePulse 1s ease-in-out infinite;
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

        .voice-active .floating-eye {
          animation: blinkEyes 4s infinite ease-in-out, eyeGlow 0.8s ease-in-out infinite;
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

        .voice-active .robot-tooltip {
          opacity: 1 !important;
          background: linear-gradient(135deg, rgba(0,229,255,0.9), rgba(0,180,220,0.9));
          transform: translateX(-50%) translateY(-5px);
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

        .voice-active .robot-tooltip::after {
          border-top-color: rgba(0,180,220,0.9);
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

        .voice-active .floating-mirror {
          box-shadow: 0 0 15px rgba(0,229,255,0.8), 0 0 30px rgba(0,229,255,0.4);
          border-color: rgba(0,229,255,0.6);
        }
      `}</style>

      <div className={`floating-robot-container ${isVoiceActive ? 'voice-active' : ''}`} onClick={handleClick}>
        <div className="robot-tooltip">{isVoiceActive ? 'AI Speaking...' : 'Talk to AI Assistant'}</div>
        <div className="floating-head-wrapper">
          {/* Radial wave rings for voice activity */}
          <div className="voice-wave-ring"></div>
          <div className="voice-wave-ring"></div>
          <div className="voice-wave-ring"></div>
          <div className="voice-wave-ring"></div>

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

// Helper function to play notification sound
const playNotificationSound = () => {
  try {
    const audio = new Audio('/sounds/notification.mp3')
    audio.volume = 0.5
    audio.play().catch(e => console.log('Audio play failed:', e))
  } catch (e) {
    console.log('Could not play notification sound:', e)
  }
}

// Live Audio Widget Component - Manages Gemini voice session
export function LiveAudioWidget({ clinic }) {
  const [status, setStatus] = useState('idle') // 'idle' | 'connecting' | 'connected' | 'error'
  const sessionManagerRef = useRef(null)

  const startSession = async () => {
    if (status === 'connecting' || status === 'connected') return

    setStatus('connecting')

    try {
      // Dynamically import to avoid SSR issues
      const { LiveSessionManager } = await import('../services/geminiService')

      sessionManagerRef.current = new LiveSessionManager({
        name: clinic?.name,
        address: clinic?.address || (clinic?.area ? `${clinic.area}, ${clinic.city || 'Delhi'}` : 'Delhi, India'),
        phone: clinic?.phone,
        services: clinic?.services || []
      })

      sessionManagerRef.current.onConnect = () => {
        console.log('Voice session connected!')
        playNotificationSound() // Play sound on connect
        setStatus('connected')
        window.dispatchEvent(new CustomEvent('voice-session-change', { detail: { active: true } }))
      }

      sessionManagerRef.current.onDisconnect = () => {
        console.log('Voice session disconnected')
        playNotificationSound() // Play sound on disconnect
        setStatus('idle')
        window.dispatchEvent(new CustomEvent('voice-session-change', { detail: { active: false } }))
      }

      sessionManagerRef.current.onError = (err) => {
        console.error('Voice session error:', err)
        setStatus('error')
        window.dispatchEvent(new CustomEvent('voice-session-change', { detail: { active: false } }))
        // Show error to user
        alert(err.message || 'Failed to connect to voice assistant. Please try again.')
      }

      await sessionManagerRef.current.connect()
    } catch (err) {
      console.error('Failed to start session:', err)
      setStatus('error')
      alert('Failed to start voice session. Please check your microphone permissions.')
    }
  }

  const endSession = async () => {
    if (sessionManagerRef.current) {
      await sessionManagerRef.current.disconnect()
      sessionManagerRef.current = null
    }
    setStatus('idle')
    window.dispatchEvent(new CustomEvent('voice-session-change', { detail: { active: false } }))
  }

  useEffect(() => {
    const handleOpen = () => startSession()
    window.addEventListener('open-live-audio', handleOpen)
    return () => window.removeEventListener('open-live-audio', handleOpen)
  }, [status, clinic])

  useEffect(() => {
    const handleEnd = () => endSession()
    window.addEventListener('end-live-audio', handleEnd)
    return () => window.removeEventListener('end-live-audio', handleEnd)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sessionManagerRef.current) {
        sessionManagerRef.current.disconnect()
      }
    }
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
