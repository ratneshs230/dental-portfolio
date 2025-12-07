const fs = require('fs')
const path = require('path')

// Configuration - Vercel URL
const BASE_URL = 'https://portfolio-pearl-nine-41.vercel.app'

// Read clinic data
const websitesDir = path.join(__dirname, '..', 'websites')
const outputDir = path.join(__dirname, '..', 'public')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

function getAllClinicFolders() {
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

function getClinicData(clinicFolder) {
  try {
    const clinicPath = path.join(websitesDir, clinicFolder, 'data', 'clinic.json')
    if (fs.existsSync(clinicPath)) {
      return JSON.parse(fs.readFileSync(clinicPath, 'utf-8'))
    }
    return null
  } catch (error) {
    console.error(`Error reading clinic data for ${clinicFolder}:`, error)
    return null
  }
}

// Generate URLs
const folders = getAllClinicFolders()
const sites = []

folders.forEach(folder => {
  const data = getClinicData(folder)
  if (data) {
    sites.push({
      name: data.name,
      folder: folder,
      url: `${BASE_URL}/site/${folder}/`,
      area: data.area || 'Delhi',
      phone: data.phones?.[0] || '',
      experience: data.experience || 0,
      rating: data.googleRating || 0,
      reviews: data.totalReviews || 0
    })
  }
})

// Sort by name
sites.sort((a, b) => a.name.localeCompare(b.name))

// Generate JSON file
const jsonOutput = {
  generated: new Date().toISOString(),
  baseUrl: BASE_URL,
  totalSites: sites.length,
  sites: sites
}

fs.writeFileSync(
  path.join(outputDir, 'site-urls.json'),
  JSON.stringify(jsonOutput, null, 2)
)

// Generate CSV file
const csvHeader = 'Name,Folder,URL,Area,Phone,Experience,Rating,Reviews'
const csvRows = sites.map(s =>
  `"${s.name}","${s.folder}","${s.url}","${s.area}","${s.phone}",${s.experience},${s.rating},${s.reviews}`
)
const csvContent = [csvHeader, ...csvRows].join('\n')

fs.writeFileSync(
  path.join(outputDir, 'site-urls.csv'),
  csvContent
)

// Generate simple text file with name and URL
const txtContent = sites.map(s => `${s.name}: ${s.url}`).join('\n')

fs.writeFileSync(
  path.join(outputDir, 'site-urls.txt'),
  txtContent
)

console.log(`Generated URL files for ${sites.length} sites:`)
console.log(`  - public/site-urls.json`)
console.log(`  - public/site-urls.csv`)
console.log(`  - public/site-urls.txt`)
console.log(`\nBase URL: ${BASE_URL}`)
console.log(`\nTo update with your GitHub username, set GITHUB_USERNAME environment variable`)
