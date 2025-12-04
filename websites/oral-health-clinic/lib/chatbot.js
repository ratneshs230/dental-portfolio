/**
 * AI Chatbot Library
 */

export const chatbotService = {
  // Intent detection
  detectIntent(message) {
    const lowerMessage = message.toLowerCase()

    const intents = {
      greeting: ['hi', 'hello', 'hey', 'good morning', 'good evening'],
      appointment: ['book', 'appointment', 'schedule', 'available', 'slot'],
      services: ['service', 'treatment', 'offer', 'provide', 'do you'],
      pricing: ['price', 'cost', 'fee', 'charge', 'expensive', 'cheap'],
      location: ['location', 'address', 'where', 'direction', 'map'],
      timing: ['timing', 'hour', 'open', 'close', 'when'],
      emergency: ['emergency', 'urgent', 'pain', 'hurt', 'broken'],
      insurance: ['insurance', 'cover', 'claim', 'cashless']
    }

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent
      }
    }

    return 'general'
  },

  // Get response based on intent
  getResponse(intent, clinicInfo) {
    const responses = {
      greeting: 'Hello! Welcome to our dental clinic. How can I help you today?',
      appointment: 'I can help you book an appointment. Would you like to schedule one?',
      services: 'We offer general dentistry, cosmetic treatments, and specialized services.',
      pricing: 'Our consultation fee starts from ₹500. Would you like a detailed price list?',
      location: `We are located at ${clinicInfo.address}. Our clinic is easily accessible.`,
      timing: 'We are open Monday to Saturday, 9 AM to 8 PM, and Sunday 10 AM to 2 PM.',
      emergency: 'For dental emergencies, please call us immediately. We prioritize urgent cases.',
      insurance: 'We accept various insurance plans. Please contact us with your policy details.',
      general: 'I\'m here to help! You can ask about our services, book appointments, or get directions.'
    }

    return responses[intent] || responses.general
  },

  // Conversation history management
  createConversation() {
    return {
      id: 'conv_' + Date.now(),
      messages: [],
      startedAt: new Date(),
      lastActivity: new Date()
    }
  },

  addMessage(conversation, message, type = 'user') {
    conversation.messages.push({
      id: 'msg_' + Date.now(),
      type,
      text: message,
      timestamp: new Date()
    })
    conversation.lastActivity = new Date()
    return conversation
  }
}

export default chatbotService
