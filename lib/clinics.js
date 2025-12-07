import fs from 'fs'
import path from 'path'

// Path to the unified business data
const businessDataPath = path.join(process.cwd(), 'Bussines details', 'unified_business_data.json')

// Create URL-friendly slug from business name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .substring(0, 60) // Limit length
}

// Load and cache business data
let cachedBusinessData = null

function loadBusinessData() {
  if (cachedBusinessData) return cachedBusinessData

  try {
    if (fs.existsSync(businessDataPath)) {
      const data = JSON.parse(fs.readFileSync(businessDataPath, 'utf-8'))
      cachedBusinessData = data
      return data
    }
  } catch (error) {
    console.error('Error loading business data:', error)
  }
  return { businesses: [] }
}

// Filter for dental businesses only
function getDentalBusinesses() {
  const data = loadBusinessData()
  return data.businesses.filter(business => {
    const specialty = (business.specialty || '').toLowerCase()
    return specialty.includes('dent') ||
           specialty.includes('orthodont') ||
           specialty.includes('implant')
  })
}

// Get all clinic folders (slugs)
export function getAllClinicFolders() {
  const dentalBusinesses = getDentalBusinesses()
  return dentalBusinesses.map(business => createSlug(business.business_name))
}

// Get clinic data by folder/slug
export function getClinicData(clinicFolder) {
  const dentalBusinesses = getDentalBusinesses()
  const business = dentalBusinesses.find(b => createSlug(b.business_name) === clinicFolder)

  if (!business) return null

  // Generate default email from business name if not provided
  const defaultEmail = `contact@${createSlug(business.business_name).replace(/-/g, '')}.com`

  return {
    name: business.business_name,
    doctorName: business.doctor_name,
    specialty: business.specialty,
    experience: business.experience_years,
    phone: business.phone || '+91 11-XXXX XXXX',
    email: business.email || defaultEmail,
    address: business.address,
    area: business.area,
    city: business.city,
    pincode: business.pincode,
    services: business.services || [],
    description: business.description || `Professional dental care at ${business.business_name}`,
    qualifications: business.qualifications,
    rating: business.practo_rating || business.google_rating || business.justdial_rating || 4.5,
    totalReviews: business.total_reviews || 0,
    slug: clinicFolder,
    type: 'nextjs-dynamic'
  }
}

// Get clinic features
export function getClinicFeatures(clinicFolder) {
  const clinicData = getClinicData(clinicFolder)
  if (!clinicData) return null

  return {
    features: [
      'Lead Capture Form',
      'Modern Design',
      'Mobile Responsive',
      'SEO Optimized'
    ],
    services: clinicData.services,
    type: 'nextjs-dynamic'
  }
}

// Get all clinics with their data
export function getAllClinicsWithData() {
  const dentalBusinesses = getDentalBusinesses()

  return dentalBusinesses.map(business => {
    const folder = createSlug(business.business_name)
    const defaultEmail = `contact@${folder.replace(/-/g, '')}.com`
    return {
      folder,
      data: {
        name: business.business_name,
        doctorName: business.doctor_name,
        specialty: business.specialty,
        experience: business.experience_years,
        phone: business.phone || '+91 11-XXXX XXXX',
        email: business.email || defaultEmail,
        address: business.address,
        area: business.area,
        city: business.city,
        services: business.services || [],
        description: business.description,
        rating: business.practo_rating || business.google_rating || business.justdial_rating || 4.5,
        totalReviews: business.total_reviews || 0,
        slug: folder,
        type: 'nextjs-dynamic'
      },
      features: {
        features: ['Lead Capture Form', 'Modern Design', 'Mobile Responsive', 'SEO Optimized'],
        services: business.services || [],
        type: 'nextjs-dynamic'
      }
    }
  })
}

// Get clinic by exact slug (for dynamic routing)
export function getClinicBySlug(slug) {
  return getClinicData(slug)
}

// Get all slugs for static generation
export function getAllClinicSlugs() {
  return getAllClinicFolders()
}
