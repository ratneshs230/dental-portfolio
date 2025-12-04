'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Dental Clinic Schema Component
export function DentalSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: 'Dr. Sethi's Dental Clinic',
    description: 'Professional dental clinic in Shahdara, Delhi',
    telephone: '+91-11-24189358',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '218, Shahdara, New Delhi - 11040',
      addressLocality: 'Shahdara',
      addressRegion: 'Delhi',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.460098818636098,
      longitude: 77.22225596330385
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00'
      }
    ],
    priceRange: '₹₹'
    ,aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.6,
      reviewCount: 147
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Breadcrumbs Component with Schema
export function Breadcrumbs({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
        <ol className="flex items-center gap-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {index === items.length - 1 ? (
                <span className="text-dental-primary">{item.name}</span>
              ) : (
                <a href={item.url} className="hover:text-dental-primary">
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

// Location Badge Component
export function LocationBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-dental-primary/10 rounded-full text-dental-primary text-sm">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      <span>Shahdara, Delhi</span>
    </div>
  )
}

// Google Maps Embed
export function GoogleMapsEmbed() {
  const lat = 28.460098818636098
  const lng = 77.22225596330385

  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden">
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${lat},${lng}&zoom=15`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

// Nearby Areas Component (for local SEO)
export function NearbyAreas() {
  const nearbyAreas = [
    'Shahdara',
    'South Delhi',
    'Central Delhi',
    'Greater Kailash',
    'Saket',
    'Hauz Khas',
    'Defence Colony'
  ]

  return (
    <section className="py-8">
      <h3 className="text-lg font-bold text-dental-foreground mb-4">
        Serving Patients From
      </h3>
      <div className="flex flex-wrap gap-2">
        {nearbyAreas.map((area, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
          >
            {area}
          </span>
        ))}
      </div>
    </section>
  )
}
