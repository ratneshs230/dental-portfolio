/**
 * SEO & Geo Optimization Library
 */

// Generate structured data for dental clinic
export function generateDentalSchema(clinicInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': '#dental-clinic',
    name: 'Dr. Sunita Bansal's Dental Clinic',
    description: 'Professional dental clinic in Malviya Nagar, Delhi offering comprehensive dental care services.',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: '+91-11-23156241',
    email: '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '27, Malviya Nagar, New Delhi - 11098',
      addressLocality: 'Malviya Nagar',
      addressRegion: 'Delhi',
      postalCode: '110000',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.655508278354418,
      longitude: 77.31254061650269
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
      ratingValue: 3.7,
      reviewCount: 102,
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
    name: 'Dr. Sunita Bansal's Dental Clinic',
    image: '/images/clinic.jpg',
    '@id': '#local-business',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    telephone: '+91-11-23156241',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '27, Malviya Nagar, New Delhi - 11098',
      addressLocality: 'Malviya Nagar',
      addressRegion: 'Delhi',
      postalCode: '110000',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.655508278354418,
      longitude: 77.31254061650269
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
      siteName: 'Dr. Sunita Bansal's Dental Clinic'
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
  'dentist Malviya Nagar',
  'dental clinic Malviya Nagar',
  'best dentist in Malviya Nagar',
  'dentist near me Malviya Nagar',
  'teeth cleaning Malviya Nagar',
  'root canal Malviya Nagar',
  'teeth whitening Malviya Nagar',
  'dental clinic delhi',
  'best dental clinic Malviya Nagar delhi',
  'affordable dentist Malviya Nagar'
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
