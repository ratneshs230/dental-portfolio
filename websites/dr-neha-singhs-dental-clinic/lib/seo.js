/**
 * SEO & Geo Optimization Library
 */

// Generate structured data for dental clinic
export function generateDentalSchema(clinicInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': '#dental-clinic',
    name: 'Dr. Neha Singh's Dental Clinic',
    description: 'Professional dental clinic in Model Town, Delhi offering comprehensive dental care services.',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: '+91-11-48402630',
    email: 'info@drnehasinghsdentalclinic@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '361, Model Town, New Delhi - 11010',
      addressLocality: 'Model Town',
      addressRegion: 'Delhi',
      postalCode: '110000',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.538980217643335,
      longitude: 77.18171873427038
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
    priceRange: '₹₹300 - ₹50,000',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 3.9,
      reviewCount: 109,
      bestRating: 5,
      worstRating: 1
    },
    image: '/images/clinic.jpg',
    sameAs: []
  }
}

// Generate local business schema
export function generateLocalBusinessSchema(clinicInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Dr. Neha Singh's Dental Clinic',
    image: '/images/clinic.jpg',
    '@id': '#local-business',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: '+91-11-48402630',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '361, Model Town, New Delhi - 11010',
      addressLocality: 'Model Town',
      addressRegion: 'Delhi',
      postalCode: '110000',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.538980217643335,
      longitude: 77.18171873427038
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
      siteName: 'Dr. Neha Singh's Dental Clinic'
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
  'dentist Model Town',
  'dental clinic Model Town',
  'best dentist in Model Town',
  'dentist near me Model Town',
  'teeth cleaning Model Town',
  'root canal Model Town',
  'teeth whitening Model Town',
  'dental clinic delhi',
  'best dental clinic Model Town delhi',
  'affordable dentist Model Town'
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
