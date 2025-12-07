import fs from 'fs'
import path from 'path'

// Point to the websites directory (inside portfolio)
const websitesDir = path.join(process.cwd(), 'websites')

export function getAllClinicFolders() {
  try {
    const folders = fs.readdirSync(websitesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .filter(dirent => !dirent.name.startsWith('.') &&
                       !dirent.name.startsWith('node_modules') &&
                       !dirent.name.startsWith('app') &&
                       !dirent.name.startsWith('lib') &&
                       !dirent.name.startsWith('components') &&
                       !dirent.name.startsWith('Reference'))
      .map(dirent => dirent.name)

    return folders
  } catch (error) {
    console.error('Error reading clinic folders:', error)
    return []
  }
}

export function getClinicData(clinicFolder) {
  try {
    // Try new structure first (metadata.json)
    const metadataPath = path.join(websitesDir, clinicFolder, 'metadata.json')
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'))
      // Transform to expected format
      return {
        name: metadata.name,
        description: metadata.description,
        slug: clinicFolder,
        type: 'vite-react' // New website type
      }
    }

    // Fallback to old structure (data/clinic.json)
    const clinicPath = path.join(websitesDir, clinicFolder, 'data', 'clinic.json')
    if (fs.existsSync(clinicPath)) {
      const data = JSON.parse(fs.readFileSync(clinicPath, 'utf-8'))
      return { ...data, type: 'nextjs' }
    }
    return null
  } catch (error) {
    console.error(`Error reading clinic data for ${clinicFolder}:`, error)
    return null
  }
}

export function getClinicFeatures(clinicFolder) {
  try {
    // For new Vite websites, return default features
    const metadataPath = path.join(websitesDir, clinicFolder, 'metadata.json')
    if (fs.existsSync(metadataPath)) {
      return {
        features: ['AI Voice Assistant', 'AI Chat', 'Lead Capture', 'Modern Design'],
        type: 'vite-react'
      }
    }

    // Old structure
    const manifestPath = path.join(websitesDir, clinicFolder, 'features-manifest.json')
    if (fs.existsSync(manifestPath)) {
      const data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
      return data
    }
    return null
  } catch (error) {
    console.error(`Error reading features manifest for ${clinicFolder}:`, error)
    return null
  }
}

export function getAllClinicsWithData() {
  const folders = getAllClinicFolders()
  return folders.map(folder => {
    const data = getClinicData(folder)
    const features = getClinicFeatures(folder)
    return {
      folder,
      data,
      features,
    }
  }).filter(c => c.data !== null)
}
