'use client'

import { useState } from 'react'
import { AppointmentBooking } from '@/components/features/AppointmentBooking'

export default function BookAppointmentPage() {
  return (
    <div className="dental-section">
      <div className="dental-container px-4">
        <AppointmentBooking onClose={() => window.history.back()} />
      </div>
    </div>
  )
}
