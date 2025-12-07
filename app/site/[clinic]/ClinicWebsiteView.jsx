'use client'

import { Navbar, Hero, Services, Testimonials, Contact, Footer } from '../../../components/WebsiteComponents'

export function ClinicWebsiteView({ clinic, features, colorScheme, clinicFolder }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar clinic={clinic} colorScheme={colorScheme} backLink="/" />
      <main>
        <Hero clinic={clinic} colorScheme={colorScheme} />
        <Services clinic={clinic} colorScheme={colorScheme} />
        <Testimonials clinic={clinic} colorScheme={colorScheme} />
        <Contact clinic={clinic} colorScheme={colorScheme} />

        {/* Features Badge */}
        {features && features.integratedFeatures && (
          <div className="bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">Integrated Features</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {features.integratedFeatures.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 shadow-sm"
                    >
                      {feature.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer clinic={clinic} colorScheme={colorScheme} />
    </div>
  )
}
