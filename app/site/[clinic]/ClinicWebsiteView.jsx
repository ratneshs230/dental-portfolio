'use client'

import { Navbar, Hero, Services, Testimonials, Contact, Footer, LeadPopup } from '../../../components/WebsiteComponents'

export function ClinicWebsiteView({ clinic, features, colorScheme, clinicFolder }) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white">
      {/* Lead Capture Popup */}
      <LeadPopup clinic={clinic} />

      {/* Header/Navigation */}
      <Navbar clinic={clinic} colorScheme={colorScheme} />

      {/* Main Content */}
      <main>
        <Hero clinic={clinic} colorScheme={colorScheme} />
        <Services clinic={clinic} colorScheme={colorScheme} />
        <Testimonials clinic={clinic} colorScheme={colorScheme} />
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
    </div>
  )
}
