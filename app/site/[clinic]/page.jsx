import { notFound } from 'next/navigation'
import { getClinicData, getClinicFeatures, getAllClinicFolders } from '../../../lib/clinics'
import { ClinicWebsiteView } from './ClinicWebsiteView'

// Generate static params for all clinics
export async function generateStaticParams() {
  const folders = getAllClinicFolders()
  return folders.map((folder) => ({
    clinic: folder,
  }))
}

// Generate metadata for each clinic
export async function generateMetadata({ params }) {
  const clinicData = getClinicData(params.clinic)
  if (!clinicData) {
    return { title: 'Clinic Not Found' }
  }

  return {
    title: clinicData.seo?.title || `${clinicData.name} | Dental Clinic`,
    description: clinicData.seo?.description || `${clinicData.name} - Professional dental care in ${clinicData.area}, Delhi.`,
  }
}

export default function ClinicPage({ params }) {
  const clinicData = getClinicData(params.clinic)
  const features = getClinicFeatures(params.clinic)

  if (!clinicData) {
    notFound()
  }

  // Determine color scheme
  const colorSchemes = ['trust-blue', 'calm-teal', 'fresh-green', 'professional-slate', 'warm-coral']
  const colorScheme = colorSchemes[Math.abs(hashCode(params.clinic)) % colorSchemes.length]

  return (
    <ClinicWebsiteView
      clinic={clinicData}
      features={features}
      colorScheme={colorScheme}
      clinicFolder={params.clinic}
    />
  )
}

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash
}
