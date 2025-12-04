'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Phone, X, Volume2, VolumeX, Loader2 } from 'lucide-react'

export function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState(null)

  const recognitionRef = useRef(null)
  const synthRef = useRef(null)

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-IN'

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex
        const transcriptText = event.results[current][0].transcript
        setTranscript(transcriptText)

        if (event.results[current].isFinal) {
          handleVoiceCommand(transcriptText)
        }
      }

      recognitionRef.current.onerror = (event) => {
        setError('Could not understand. Please try again.')
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    // Initialize Speech Synthesis
    synthRef.current = window.speechSynthesis

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  const startListening = () => {
    setError(null)
    setTranscript('')
    setResponse('')

    if (recognitionRef.current) {
      setIsListening(true)
      recognitionRef.current.start()
    } else {
      setError('Voice recognition not supported in this browser')
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  const speak = (text) => {
    if (synthRef.current) {
      synthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-IN'
      utterance.rate = 0.9

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)

      synthRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase()
    let responseText = ''

    if (lowerCommand.includes('book') || lowerCommand.includes('appointment')) {
      responseText = 'I can help you book an appointment. Our clinic is open Monday to Saturday from 9 AM to 8 PM. Would you like me to connect you to our reception for immediate booking?'
    } else if (lowerCommand.includes('call') || lowerCommand.includes('phone')) {
      responseText = 'Connecting you to Smile Dental Studio. Please hold while I dial the clinic number.'
      setTimeout(() => {
        window.location.href = 'tel:+91-11-34547867'
      }, 2000)
    } else if (lowerCommand.includes('service') || lowerCommand.includes('treatment')) {
      responseText = 'We offer dental checkups, teeth cleaning, whitening, root canal treatment, dental implants, and cosmetic dentistry. Would you like details about any specific service?'
    } else if (lowerCommand.includes('location') || lowerCommand.includes('address') || lowerCommand.includes('where')) {
      responseText = 'We are located at 815, Rajendra Nagar, New Delhi - 11070. Would you like me to open directions in Google Maps?'
    } else if (lowerCommand.includes('price') || lowerCommand.includes('cost')) {
      responseText = 'Our consultation fee is ₹700. For specific treatment costs, I recommend scheduling a consultation with our dentist.'
    } else if (lowerCommand.includes('timing') || lowerCommand.includes('open') || lowerCommand.includes('hour')) {
      responseText = 'Our clinic is open Monday to Saturday from 9 AM to 8 PM, and on Sundays from 10 AM to 2 PM by appointment only.'
    } else if (lowerCommand.includes('emergency')) {
      responseText = 'For dental emergencies, please call us immediately at +91-11-34547867. We prioritize emergency cases.'
    } else {
      responseText = 'I understood: ' + command + '. How can I assist you further? You can ask about appointments, services, location, or pricing.'
    }

    setResponse(responseText)
    speak(responseText)
  }

  return (
    <>
      {/* Voice Assistant Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-green-500 shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Voice Assistant"
      >
        <Mic className="w-5 h-5" />
      </motion.button>

      {/* Voice Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  <span className="font-bold">Voice Assistant</span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    stopListening()
                    stopSpeaking()
                  }}
                  className="p-1 hover:bg-white/20 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Voice Visualization */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={isListening ? {
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  } : {}}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className={`w-24 h-24 rounded-full flex items-center justify-center ${
                    isListening
                      ? 'bg-green-500 text-white'
                      : isSpeaking
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isListening ? (
                    <Mic className="w-10 h-10" />
                  ) : isSpeaking ? (
                    <Volume2 className="w-10 h-10" />
                  ) : (
                    <MicOff className="w-10 h-10" />
                  )}
                </motion.div>
              </div>

              {/* Status Text */}
              <div className="text-center mb-6">
                {isListening && (
                  <p className="text-green-600 font-medium">Listening...</p>
                )}
                {isSpeaking && (
                  <p className="text-blue-600 font-medium">Speaking...</p>
                )}
                {!isListening && !isSpeaking && !error && (
                  <p className="text-gray-500">Tap the microphone to speak</p>
                )}
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
              </div>

              {/* Transcript */}
              {transcript && (
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">You said:</p>
                  <p className="text-dental-foreground">{transcript}</p>
                </div>
              )}

              {/* Response */}
              {response && (
                <div className="bg-green-50 rounded-xl p-3 mb-4">
                  <p className="text-xs text-green-600 mb-1">Assistant:</p>
                  <p className="text-sm text-dental-foreground">{response}</p>
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-3">
                {!isListening ? (
                  <button
                    onClick={startListening}
                    className="flex-1 dental-btn-primary bg-green-500 hover:bg-green-600"
                  >
                    <Mic className="w-5 h-5 mr-2" />
                    Start Speaking
                  </button>
                ) : (
                  <button
                    onClick={stopListening}
                    className="flex-1 dental-btn-primary bg-red-500 hover:bg-red-600"
                  >
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop
                  </button>
                )}

                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <VolumeX className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {['Book appointment', 'Call clinic', 'Services'].map((action) => (
                    <button
                      key={action}
                      onClick={() => handleVoiceCommand(action)}
                      className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-dental-primary/10 hover:text-dental-primary transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Call Button Component
export function CallButton() {
  return (
    <a
      href="tel:+91-11-34547867"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors"
    >
      <Phone className="w-5 h-5" />
      <span className="font-medium">Call Now</span>
    </a>
  )
}
