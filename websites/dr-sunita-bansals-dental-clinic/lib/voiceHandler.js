/**
 * Voice Handler Library
 */

export const voiceHandler = {
  // Check browser support
  isSupported() {
    return typeof window !== 'undefined' &&
      ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
  },

  // Create speech recognition instance
  createRecognition(options = {}) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      return null
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = options.continuous || false
    recognition.interimResults = options.interimResults || true
    recognition.lang = options.lang || 'en-IN'

    return recognition
  },

  // Text to speech
  speak(text, options = {}) {
    return new Promise((resolve, reject) => {
      const synth = window.speechSynthesis
      const utterance = new SpeechSynthesisUtterance(text)

      utterance.lang = options.lang || 'en-IN'
      utterance.rate = options.rate || 0.9
      utterance.pitch = options.pitch || 1
      utterance.volume = options.volume || 1

      utterance.onend = () => resolve()
      utterance.onerror = (e) => reject(e)

      synth.speak(utterance)
    })
  },

  // Stop speaking
  stopSpeaking() {
    window.speechSynthesis.cancel()
  },

  // Get available voices
  getVoices() {
    return window.speechSynthesis.getVoices()
  },

  // Command patterns for dental clinic
  commandPatterns: {
    appointment: /book|appointment|schedule|available/i,
    call: /call|phone|dial|contact/i,
    services: /service|treatment|offer|provide/i,
    location: /location|address|where|direction/i,
    pricing: /price|cost|fee|charge/i,
    timing: /timing|hour|open|close/i,
    emergency: /emergency|urgent|pain/i
  },

  // Match command to intent
  matchIntent(command) {
    for (const [intent, pattern] of Object.entries(this.commandPatterns)) {
      if (pattern.test(command)) {
        return intent
      }
    }
    return 'general'
  }
}

export default voiceHandler
