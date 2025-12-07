'use client'

import {
  Navbar,
  HeroWithRobot,
  Services,
  Testimonials,
  Contact,
  Footer,
  LeadPopup,
  CursorFollower,
  FloatingRobotHead,
  LiveAudioWidget,
  RoboDentist
} from '../../../components/WebsiteComponents'

export function ClinicWebsiteView({ clinic, features, colorScheme, clinicFolder }) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white">
      {/* Custom Cursor Follower */}
      <CursorFollower />

      {/* Lead Capture Popup */}
      <LeadPopup clinic={clinic} />

      {/* Live Audio Widget (Gemini Voice) */}
      <LiveAudioWidget clinic={clinic} />

      {/* Floating Robot Head - Appears after scrolling */}
      <FloatingRobotHead />

      {/* Header/Navigation */}
      <Navbar clinic={clinic} colorScheme={colorScheme} />

      {/* Main Content */}
      <main>
        {/* Hero with Robot and Sine Wave */}
        <HeroWithRobot clinic={clinic} colorScheme={colorScheme} />

        {/* Services Section */}
        <Services clinic={clinic} colorScheme={colorScheme} />

        {/* Testimonials/Reviews */}
        <Testimonials clinic={clinic} colorScheme={colorScheme} />

        {/* Contact Section with Bottom Robot */}
        <Contact clinic={clinic} colorScheme={colorScheme} />
      </main>

      {/* Features Badge (if available) */}
      {features && features.features && features.features.length > 0 && (
        <div className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">Features</p>
              <div className="flex flex-wrap justify-center gap-2">
                {features.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 shadow-sm border border-gray-100"
                  >
                    {typeof feature === 'string' ? feature : feature.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Robot Section */}
      <section className="bg-gradient-to-b from-[#0a0a0a] to-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">AI Powered</p>
              <h3 className="text-2xl font-light text-white">Meet Our AI Assistant</h3>
            </div>
            <div className="transform scale-75 md:scale-100">
              <RoboDentist />
            </div>
            <p className="text-gray-400 text-center mt-8 max-w-md">
              Our AI-powered assistant is available 24/7 to help you book appointments and answer your questions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
