/**
 * AI Enabled Chatbot Feature
 */

import fs from 'fs-extra';
import path from 'path';

export class AIChatbotFeature {
  async integrate(outputPath, clinicInfo) {
    const featuresDir = path.join(outputPath, 'components', 'features');
    const libDir = path.join(outputPath, 'lib');

    await fs.ensureDir(featuresDir);
    await fs.ensureDir(libDir);

    await fs.writeFile(path.join(featuresDir, 'AIChatbot.jsx'), `'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Loader2, Calendar, Phone, HelpCircle } from 'lucide-react'

const quickReplies = [
  { text: 'Book Appointment', icon: Calendar },
  { text: 'Our Services', icon: HelpCircle },
  { text: 'Call Clinic', icon: Phone }
]

const botResponses = {
  greeting: \`Hello! 👋 Welcome to ${clinicInfo.name}. I'm your dental assistant. How can I help you today?

You can ask me about:
• Our services and treatments
• Booking appointments
• Clinic timings and location
• Treatment costs\`,

  services: \`We offer a wide range of dental services:

🦷 **General Dentistry**
- Dental Checkups
- Teeth Cleaning
- Cavity Fillings
- Root Canal Treatment

✨ **Cosmetic Dentistry**
- Teeth Whitening
- Dental Veneers
- Smile Makeover

🔧 **Specialized Services**
- Dental Implants
- Orthodontics
- Oral Surgery

Would you like to book an appointment for any of these services?\`,

  appointment: \`Great! I can help you book an appointment.

📍 Location: ${clinicInfo.address || clinicInfo.area + ', Delhi'}
📞 Phone: ${clinicInfo.phones[0] || 'Contact us'}
⏰ Hours: Mon-Sat 9AM-8PM, Sun 10AM-2PM

You can:
1. Book online through our appointment system
2. Call us directly at ${clinicInfo.phones[0] || 'our clinic'}
3. WhatsApp us for quick booking

What would you prefer?\`,

  pricing: \`Here are our approximate treatment costs:

• Consultation: ${clinicInfo.consultationFee || '₹500'}
• Teeth Cleaning: ₹1,500
• Teeth Whitening: ₹5,000
• Root Canal: ₹8,000 onwards
• Dental Crown: ₹12,000 onwards
• Braces: ₹35,000 onwards

Note: Final costs may vary based on individual cases. We offer EMI options for major treatments!

Would you like to schedule a consultation?\`,

  location: \`📍 **${clinicInfo.name}**

${clinicInfo.address || clinicInfo.area + ', Delhi'}

⏰ **Clinic Hours:**
Monday - Saturday: 9:00 AM - 8:00 PM
Sunday: 10:00 AM - 2:00 PM (By Appointment)

📞 **Contact:**
${clinicInfo.phones[0] || 'Call us'}

You can also find us on Google Maps for directions!\`,

  default: \`I understand you're asking about something specific. Let me help you with that.

For detailed information, you can:
1. Call us at ${clinicInfo.phones[0] || 'our clinic'}
2. Visit our clinic in person
3. Book a free consultation

Is there anything else I can help you with?\`
}

function getBotResponse(message) {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
    return botResponses.greeting
  }
  if (lowerMessage.includes('service') || lowerMessage.includes('treatment') || lowerMessage.includes('offer')) {
    return botResponses.services
  }
  if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
    return botResponses.appointment
  }
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('charge')) {
    return botResponses.pricing
  }
  if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where') || lowerMessage.includes('timing') || lowerMessage.includes('hour')) {
    return botResponses.location
  }

  return botResponses.default
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: botResponses.greeting, time: new Date() }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text = input) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: text.trim(),
      time: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    // Get bot response
    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      text: getBotResponse(text),
      time: new Date()
    }

    setIsTyping(false)
    setMessages(prev => [...prev, botResponse])
  }

  const handleQuickReply = (reply) => {
    handleSend(reply.text)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={\`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-dental-gradient shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform \${isOpen ? 'hidden' : ''}\`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-dental-gradient p-4 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Dental Assistant</h3>
                    <div className="flex items-center gap-1 text-sm text-white/80">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      Online
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={\`flex \${message.type === 'user' ? 'justify-end' : 'justify-start'}\`}
                >
                  <div className={\`flex gap-2 max-w-[85%] \${message.type === 'user' ? 'flex-row-reverse' : ''}\`}>
                    <div className={\`w-8 h-8 rounded-full flex items-center justify-center shrink-0 \${
                      message.type === 'user'
                        ? 'bg-dental-primary text-white'
                        : 'bg-gray-200 text-gray-600'
                    }\`}>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={\`p-3 rounded-2xl \${
                      message.type === 'user'
                        ? 'bg-dental-primary text-white rounded-tr-sm'
                        : 'bg-white text-dental-foreground rounded-tl-sm shadow-sm'
                    }\`}>
                      <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 bg-white border-t border-gray-100">
              <div className="flex gap-2 overflow-x-auto">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border border-dental-primary/30 text-dental-primary text-sm hover:bg-dental-primary/5 transition-colors"
                  >
                    <reply.icon className="w-4 h-4" />
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:border-dental-primary outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-dental-primary text-white flex items-center justify-center disabled:opacity-50 hover:bg-dental-primary/90 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
`);

    // Chatbot Library
    await fs.writeFile(path.join(libDir, 'chatbot.js'), `/**
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
      location: \`We are located at \${clinicInfo.address}. Our clinic is easily accessible.\`,
      timing: 'We are open Monday to Saturday, 9 AM to 8 PM, and Sunday 10 AM to 2 PM.',
      emergency: 'For dental emergencies, please call us immediately. We prioritize urgent cases.',
      insurance: 'We accept various insurance plans. Please contact us with your policy details.',
      general: 'I\\'m here to help! You can ask about our services, book appointments, or get directions.'
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
`);
  }
}

export default AIChatbotFeature;
