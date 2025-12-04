/**
 * SEO & Geo Optimization Library
 */

// Generate structured data for dental clinic
export function generateDentalSchema(clinicInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': '#dental-clinic',
    name: 'Quality Dental Services',
    description: 'Professional dental clinic in Punjabi Bagh, Delhi offering comprehensive dental care services.',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: '+91-11-45553139',
    email: 'info@qualitydentalservices@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '18, Punjabi Bagh, New Delhi - 11060',
      addressLocality: 'Punjabi Bagh',
      addressRegion: 'Delhi',
      postalCode: '110000',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.720719333879487,
      longitude: 77.23426267350955
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
    priceRange: '₹₹700 - ₹50,000',
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
      ratingValue: 4.2,
      reviewCount: 42,
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
    name: 'Quality Dental Services',
    image: '/images/clinic.jpg',
    '@id': '#local-business',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: '+91-11-45553139',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '18, Punjabi Bagh, New Delhi - 11060',
      addressLocality: 'Punjabi Bagh',
      addressRegion: 'Delhi',
      postalCode: '110000',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.720719333879487,
      longitude: 77.23426267350955
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
      siteName: 'Quality Dental Services'
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
  'dentist Punjabi Bagh',
  'dental clinic Punjabi Bagh',
  'best dentist in Punjabi Bagh',
  'dentist near me Punjabi Bagh',
  'teeth cleaning Punjabi Bagh',
  'root canal Punjabi Bagh',
  'teeth whitening Punjabi Bagh',
  'dental clinic delhi',
  'best dental clinic Punjabi Bagh delhi',
  'affordable dentist Punjabi Bagh'
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
