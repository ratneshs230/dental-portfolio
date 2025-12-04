/**
 * Smile Assessment Library
 */

export const assessmentService = {
  // Calculate score
  calculateScore(answers) {
    return answers.reduce((sum, answer) => sum + answer.score, 0)
  },

  // Get recommendation based on score
  getRecommendation(score, maxScore) {
    const percentage = (score / maxScore) * 100

    if (percentage <= 25) return 'low'
    if (percentage <= 50) return 'medium'
    if (percentage <= 75) return 'high'
    return 'urgent'
  },

  // Estimate cost range
  estimateCost(answers) {
    let minCost = 500
    let maxCost = 2000

    answers.forEach(answer => {
      if (answer.treatment === 'cosmetic') {
        minCost += 3000
        maxCost += 15000
      } else if (answer.treatment === 'treatment') {
        minCost += 5000
        maxCost += 25000
      } else if (answer.treatment === 'restoration') {
        minCost += 10000
        maxCost += 50000
      }

      minCost += answer.score * 1000
      maxCost += answer.score * 5000
    })

    return {
      min: minCost,
      max: maxCost,
      formatted: `₹${minCost.toLocaleString()} - ₹${maxCost.toLocaleString()}`
    }
  },

  // Save assessment results
  async saveResults(data) {
    // In production, this would save to backend
    console.log('Saving assessment results:', data)
    return { success: true, id: 'assess_' + Date.now() }
  }
}

export default assessmentService
