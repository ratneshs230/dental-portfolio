'use client'

import { PatientPortalUpload } from '@/components/features/FileUpload'

export default function PatientPortalPage() {
  return (
    <div className="dental-section">
      <div className="dental-container px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-dental-foreground mb-2">Patient Portal</h1>
          <p className="text-gray-600 mb-8">Upload your medical records, X-rays, and reports securely.</p>

          <PatientPortalUpload />
        </div>
      </div>
    </div>
  )
}
