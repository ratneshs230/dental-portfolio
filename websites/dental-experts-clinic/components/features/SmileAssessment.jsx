'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, Calendar, Phone } from 'lucide-react'
import Link from 'next/link'

const questions = [
  {
    id: 1,
    question: "How would you rate your overall dental health?",
    options: [
      { text: "Excellent - No issues", score: 0, icon: "😄" },
      { text: "Good - Minor concerns", score: 1, icon: "🙂" },
      { text: "Fair - Some problems", score: 2, icon: "😐" },
      { text: "Poor - Multiple issues", score: 3, icon: "😟" }
    ]
  },
  {
    id: 2,
    question: "When was your last dental checkup?",
    options: [
      { text: "Within 6 months", score: 0, icon: "📅" },
      { text: "6-12 months ago", score: 1, icon: "📆" },
      { text: "1-2 years ago", score: 2, icon: "⏰" },
      { text: "More than 2 years", score: 3, icon: "⏳" }
    ]
  },
  {
    id: 3,
    question: "Do you experience any tooth sensitivity?",
    options: [
      { text: "No sensitivity", score: 0, icon: "✅" },
      { text: "Occasional sensitivity", score: 1, icon: "🌡️" },
      { text: "Frequent sensitivity", score: 2, icon: "❄️" },
      { text: "Severe sensitivity", score: 3, icon: "⚡" }
    ]
  },
  {
    id: 4,
    question: "How satisfied are you with the color of your teeth?",
    options: [
      { text: "Very satisfied", score: 0, icon: "✨" },
      { text: "Somewhat satisfied", score: 1, icon: "👍" },
      { text: "Not very satisfied", score: 2, icon: "😕" },
      { text: "Not satisfied at all", score: 3, icon: "😞" }
    ]
  },
  {
    id: 5,
    question: "Do you have any missing teeth?",
    options: [
      { text: "No missing teeth", score: 0, icon: "😁" },
      { text: "1 missing tooth", score: 1, icon: "1️⃣" },
      { text: "2-3 missing teeth", score: 2, icon: "2️⃣" },
      { text: "More than 3", score: 3, icon: "❌" }
    ]
  },
  {
    id: 6,
    question: "What is your primary dental concern?",
    options: [
      { text: "Routine maintenance", score: 0, icon: "🔄", treatment: "checkup" },
      { text: "Cosmetic improvement", score: 1, icon: "💎", treatment: "cosmetic" },
      { text: "Pain or discomfort", score: 2, icon: "🩹", treatment: "treatment" },
      { text: "Major restoration", score: 3, icon: "🔧", treatment: "restoration" }
    ]
  }
]

const recommendations = {
  low: {
    title: "Great Dental Health! 🎉",
    description: "Your dental health appears to be in good shape. Regular checkups will help maintain your beautiful smile.",
    treatments: ["Routine Checkup", "Professional Cleaning"],
    estimatedCost: "₹500 - ₹2,000",
    urgency: "low"
  },
  medium: {
    title: "Some Attention Needed 👀",
    description: "You may benefit from some dental care. A consultation will help identify the best treatments for you.",
    treatments: ["Dental Checkup", "Teeth Cleaning", "Possible Whitening"],
    estimatedCost: "₹2,000 - ₹10,000",
    urgency: "medium"
  },
  high: {
    title: "Professional Care Recommended 🦷",
    description: "Based on your responses, we recommend scheduling a comprehensive dental evaluation soon.",
    treatments: ["Complete Examination", "X-rays", "Treatment Plan"],
    estimatedCost: "₹5,000 - ₹30,000",
    urgency: "high"
  },
  urgent: {
    title: "Please Visit Us Soon! ⚠️",
    description: "Your dental health needs attention. We strongly recommend booking an appointment at the earliest.",
    treatments: ["Emergency Consultation", "Full Mouth Evaluation", "Personalized Treatment"],
    estimatedCost: "₹10,000 - ₹50,000+",
    urgency: "urgent"
  }
}

export function SmileAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '' })

  const handleAnswer = (option) => {
    const newAnswers = [...answers, { questionId: questions[currentQuestion].id, ...option }]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  const restart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setContactInfo({ name: '', phone: '' })
  }

  const totalScore = answers.reduce((sum, a) => sum + a.score, 0)
  const maxScore = questions.length * 3

  const getRecommendation = () => {
    const percentage = (totalScore / maxScore) * 100
    if (percentage <= 25) return recommendations.low
    if (percentage <= 50) return recommendations.medium
    if (percentage <= 75) return recommendations.high
    return recommendations.urgent
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto">
      <div className="dental-card">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-dental-primary/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-dental-primary" />
          </div>
          <h2 className="text-2xl font-bold text-dental-foreground">Smile Assessment Quiz</h2>
          <p className="text-gray-600 mt-2">Answer a few questions to get personalized recommendations</p>
        </div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-dental-gradient"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-dental-foreground mb-6">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-dental-primary hover:bg-dental-primary/5 transition-all text-left flex items-center gap-4"
                    >
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium text-dental-foreground">{option.text}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              {currentQuestion > 0 && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-gray-500 hover:text-dental-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous question
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Results */}
              {(() => {
                const recommendation = getRecommendation()
                return (
                  <>
                    <div className={`p-6 rounded-xl mb-6 ${
                      recommendation.urgency === 'urgent' ? 'bg-red-50 border border-red-200' :
                      recommendation.urgency === 'high' ? 'bg-orange-50 border border-orange-200' :
                      recommendation.urgency === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-green-50 border border-green-200'
                    }`}>
                      <h3 className="text-xl font-bold text-dental-foreground mb-2">
                        {recommendation.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{recommendation.description}</p>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Recommended Treatments:</p>
                          <div className="flex flex-wrap gap-2">
                            {recommendation.treatments.map((treatment, i) => (
                              <span key={i} className="px-3 py-1 bg-white rounded-full text-sm font-medium text-dental-foreground">
                                {treatment}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Estimated Investment:</p>
                          <p className="text-2xl font-bold text-dental-primary">{recommendation.estimatedCost}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-dental-foreground mb-4">Get Your Personalized Treatment Plan</h4>

                      <div className="space-y-4 mb-6">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary outline-none"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary outline-none"
                        />
                      </div>

                      <div className="flex gap-4">
                        <Link href="/contact" className="flex-1 dental-btn-primary">
                          <Calendar className="w-5 h-5 mr-2" />
                          Book Consultation
                        </Link>
                        <a href="tel:+91-11-22135221" className="flex-1 dental-btn-secondary">
                          <Phone className="w-5 h-5 mr-2" />
                          Call Now
                        </a>
                      </div>

                      <button
                        onClick={restart}
                        className="w-full mt-4 text-gray-500 hover:text-dental-primary transition-colors text-sm"
                      >
                        Retake Assessment
                      </button>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// CTA Component for Homepage
export function SmileAssessmentCTA() {
  return (
    <section className="dental-section">
      <div className="dental-container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-dental-primary/10 to-dental-secondary/10 rounded-3xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-dental-gradient flex items-center justify-center text-white">
                <Sparkles className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-dental-foreground mb-2">
                  Take Our Smile Assessment
                </h3>
                <p className="text-gray-600 max-w-md">
                  Answer a few quick questions and get personalized treatment recommendations with cost estimates.
                </p>
              </div>
            </div>

            <Link
              href="/smile-assessment"
              className="dental-btn-primary whitespace-nowrap"
            >
              Start Free Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
