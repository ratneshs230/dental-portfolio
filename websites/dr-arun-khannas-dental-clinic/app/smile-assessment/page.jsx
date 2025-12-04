import { SmileAssessment } from '@/components/features/SmileAssessment'

export const metadata = {
  title: 'Smile Assessment | Dr. Arun Khanna's Dental Clinic',
  description: 'Take our free smile assessment quiz and get personalized dental treatment recommendations with cost estimates.'
}

export default function SmileAssessmentPage() {
  return (
    <div className="dental-section">
      <div className="dental-container px-4">
        <SmileAssessment />
      </div>
    </div>
  )
}
