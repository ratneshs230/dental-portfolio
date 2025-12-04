import fs from 'fs'
import path from 'path'

// Point to the websites directory (sibling to portfolio)
const websitesDir = path.join(process.cwd(), '..', 'websites')

export function getAllClinicFolders() {
  try {
    const folders = fs.readdirSync(websitesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .filter(dirent => !dirent.name.startsWith('.') &&
                       !dirent.name.startsWith('node_modules') &&
                       !dirent.name.startsWith('app') &&
                       !dirent.name.startsWith('lib') &&
                       !dirent.name.startsWith('components'))
      .map(dirent => dirent.name)

    return folders
  } catch (error) {
    console.error('Error reading clinic folders:', error)
    return []
  }
}

export function getClinicData(clinicFolder) {
  try {
    const clinicPath = path.join(websitesDir, clinicFolder, 'data', 'clinic.json')
    if (fs.existsSync(clinicPath)) {
      const data = JSON.parse(fs.readFileSync(clinicPath, 'utf-8'))
      return data
    }
    return null
  } catch (error) {
    console.error(`Error reading clinic data for ${clinicFolder}:`, error)
    return null
  }
}

export function getClinicFeatures(clinicFolder) {
  try {
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
