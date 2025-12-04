/**
 * Appointments Management Library
 */

export const appointmentService = {
  // Get available slots for a given date
  async getAvailableSlots(date) {
    // In production, this would fetch from backend
    const allSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
      '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM'
    ]

    // Simulate some slots being booked
    const bookedSlots = ['10:00 AM', '02:30 PM', '04:00 PM']
    return allSlots.filter(slot => !bookedSlots.includes(slot))
  },

  // Book appointment
  async bookAppointment(data) {
    // In production, this would send to backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          bookingId: 'BK' + Date.now(),
          ...data
        })
      }, 1000)
    })
  },

  // Cancel appointment
  async cancelAppointment(bookingId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 500)
    })
  },

  // Reschedule appointment
  async rescheduleAppointment(bookingId, newDate, newTime) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          newDate,
          newTime
        })
      }, 500)
    })
  }
}

export default appointmentService
