/**
 * SEO & Geo Optimization Feature
 */

import fs from 'fs-extra';
import path from 'path';

export class SEOGeoFeature {
  async integrate(outputPath, clinicInfo) {
    const libDir = path.join(outputPath, 'lib');
    const componentsDir = path.join(outputPath, 'components', 'features');

    await fs.ensureDir(libDir);
    await fs.ensureDir(componentsDir);

    // SEO Library
    await fs.writeFile(path.join(libDir, 'seo.js'), `/**
 * SEO & Geo Optimization Library
 */

// Generate structured data for dental clinic
export function generateDentalSchema(clinicInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': '#dental-clinic',
    name: '${clinicInfo.name}',
    description: 'Professional dental clinic in ${clinicInfo.area}, Delhi offering comprehensive dental care services.',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: '${clinicInfo.phones[0] || ''}',
    email: '${clinicInfo.email || ''}',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '${clinicInfo.address || ''}',
      addressLocality: '${clinicInfo.area}',
      addressRegion: 'Delhi',
      postalCode: '110000',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ${clinicInfo.coordinates?.lat || 28.6139},
      longitude: ${clinicInfo.coordinates?.lng || 77.2090}
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '14:00'
      }
    ],
    priceRange: '₹${clinicInfo.consultationFee || '500'} - ₹50,000',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI',
    currenciesAccepted: 'INR',
    medicalSpecialty: 'Dentistry',
    availableService: [
      { '@type': 'MedicalProcedure', name: 'Dental Checkup' },
      { '@type': 'MedicalProcedure', name: 'Teeth Cleaning' },
      { '@type': 'MedicalProcedure', name: 'Root Canal Treatment' },
      { '@type': 'MedicalProcedure', name: 'Teeth Whitening' },
      { '@type': 'MedicalProcedure', name: 'Dental Implants' }
    ],
    ${clinicInfo.avgRating ? `aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ${clinicInfo.avgRating},
      reviewCount: ${clinicInfo.totalReviews || 0},
      bestRating: 5,
      worstRating: 1
    },` : ''}
    image: '/images/clinic.jpg',
    sameAs: []
  }
}

// Generate local business schema
export function generateLocalBusinessSchema(clinicInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '${clinicInfo.name}',
    image: '/images/clinic.jpg',
    '@id': '#local-business',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: '${clinicInfo.phones[0] || ''}',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '${clinicInfo.address || ''}',
      addressLocality: '${clinicInfo.area}',
      addressRegion: 'Delhi',
      postalCode: '110000',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ${clinicInfo.coordinates?.lat || 28.6139},
      longitude: ${clinicInfo.coordinates?.lng || 77.2090}
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
  }
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// Generate FAQ schema
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Generate meta tags
export function generateMetaTags(pageInfo) {
  const { title, description, keywords, image, url, type = 'website' } = pageInfo

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type,
      url,
      images: [{ url: image }],
      siteName: '${clinicInfo.name}'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  }
}

// Location-based keywords
export const locationKeywords = [
  'dentist ${clinicInfo.area}',
  'dental clinic ${clinicInfo.area}',
  'best dentist in ${clinicInfo.area}',
  'dentist near me ${clinicInfo.area}',
  'teeth cleaning ${clinicInfo.area}',
  'root canal ${clinicInfo.area}',
  'teeth whitening ${clinicInfo.area}',
  'dental clinic delhi',
  'best dental clinic ${clinicInfo.area} delhi',
  'affordable dentist ${clinicInfo.area}'
]

// Service keywords
export const serviceKeywords = [
  'dental checkup',
  'teeth cleaning',
  'root canal treatment',
  'teeth whitening',
  'dental implants',
  'braces',
  'invisalign',
  'tooth extraction',
  'cavity filling',
  'dental crown'
]

export default {
  generateDentalSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateMetaTags,
  locationKeywords,
  serviceKeywords
}
`);

    // Local SEO Component
    await fs.writeFile(path.join(componentsDir, 'LocalSEO.jsx'), `'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Dental Clinic Schema Component
export function DentalSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: '${clinicInfo.name}',
    description: 'Professional dental clinic in ${clinicInfo.area}, Delhi',
    telephone: '${clinicInfo.phones[0] || ''}',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '${clinicInfo.address || ''}',
      addressLocality: '${clinicInfo.area}',
      addressRegion: 'Delhi',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ${clinicInfo.coordinates?.lat || 28.6139},
      longitude: ${clinicInfo.coordinates?.lng || 77.2090}
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
    ${clinicInfo.avgRating ? `,aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ${clinicInfo.avgRating},
      reviewCount: ${clinicInfo.totalReviews || 0}
    }` : ''}
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
      <span>${clinicInfo.area}, Delhi</span>
    </div>
  )
}

// Google Maps Embed
export function GoogleMapsEmbed() {
  const lat = ${clinicInfo.coordinates?.lat || 28.6139}
  const lng = ${clinicInfo.coordinates?.lng || 77.2090}

  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden">
      <iframe
        src={\`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=\${lat},\${lng}&zoom=15\`}
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
    '${clinicInfo.area}',
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
`);

    // Ensure public directory exists first
    await fs.ensureDir(path.join(outputPath, 'public'));

    // Robots.txt
    await fs.writeFile(path.join(outputPath, 'public', 'robots.txt'), `# Robots.txt for ${clinicInfo.name}
User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.example.com/sitemap.xml

# Disallow admin/private areas
Disallow: /api/
Disallow: /admin/
`);

    // Sitemap generator
    await fs.writeFile(path.join(libDir, 'sitemap.js'), `/**
 * Sitemap Generator
 */

export function generateSitemap(baseUrl, pages) {
  const urls = pages.map(page => ({
    loc: baseUrl + page.path,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: page.changefreq || 'weekly',
    priority: page.priority || 0.8
  }))

  return \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${urls.map(url => \`  <url>
    <loc>\${url.loc}</loc>
    <lastmod>\${url.lastmod}</lastmod>
    <changefreq>\${url.changefreq}</changefreq>
    <priority>\${url.priority}</priority>
  </url>\`).join('\\n')}
</urlset>\`
}

export const defaultPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/about', priority: 0.8 },
  { path: '/services', priority: 0.9 },
  { path: '/contact', priority: 0.8 },
  { path: '/book-appointment', priority: 0.9 }
]
`);
  }
}

export default SEOGeoFeature;
