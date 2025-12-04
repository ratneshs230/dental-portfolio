/**
 * Configuration for Dental Website Generator
 */

export const CONFIG = {
  // Paths
  paths: {
    clinicData: '../Bussines details/delhi_dentists_discovery.json',
    designConcepts: '../website design concepts.json',
    outputDir: '../websites',
    templatesDir: './templates'
  },

  // Feature pool - at least 4 will be randomly selected per website
  features: [
    {
      id: 'appointment-booking',
      name: 'Online Appointment & Scheduling',
      description: 'Real-time appointment booking with calendar integration',
      complexity: 'medium',
      files: ['components/AppointmentBooking.jsx', 'lib/appointments.js']
    },
    {
      id: 'bill-generation',
      name: 'Bill Generation',
      description: 'Treatment cost calculator and invoice generator',
      complexity: 'medium',
      files: ['components/BillGenerator.jsx', 'lib/billing.js']
    },
    {
      id: 'file-upload',
      name: 'File Upload for Reports/X-rays',
      description: 'Secure upload portal for medical documents',
      complexity: 'low',
      files: ['components/FileUpload.jsx', 'lib/fileHandler.js']
    },
    {
      id: 'ai-chatbot',
      name: 'AI Enabled Chatbot',
      description: 'Intelligent chatbot for patient queries',
      complexity: 'high',
      files: ['components/AIChatbot.jsx', 'lib/chatbot.js']
    },
    {
      id: 'voice-assistant',
      name: 'Voice Assistant',
      description: 'Voice-enabled call booking and information',
      complexity: 'high',
      files: ['components/VoiceAssistant.jsx', 'lib/voiceHandler.js']
    },
    {
      id: 'seo-geo',
      name: 'SEO & Geo Optimization',
      description: 'Local SEO with schema markup and geo-targeting',
      complexity: 'low',
      files: ['lib/seo.js', 'components/LocalSEO.jsx']
    },
    {
      id: 'multi-language',
      name: 'Multi-Language Support',
      description: 'Hindi/English language toggle',
      complexity: 'medium',
      files: ['lib/i18n.js', 'locales/en.json', 'locales/hi.json']
    },
    {
      id: 'smile-assessment',
      name: 'Cost Estimate / Smile Assessment Quiz',
      description: 'Interactive quiz for treatment estimation',
      complexity: 'medium',
      files: ['components/SmileAssessment.jsx', 'lib/assessment.js']
    }
  ],

  // Minimum features per website
  minFeatures: 4,
  maxFeatures: 6,

  // Design archetypes from concepts.json
  dentalArchetypes: ['ethereal-flow', 'clean-saas', 'playful-interactive'],

  // Color schemes for dental clinics
  colorSchemes: {
    'trust-blue': {
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      accent: '#7DD3FC',
      background: '#F0F9FF',
      text: '#0C4A6E'
    },
    'calm-teal': {
      primary: '#14B8A6',
      secondary: '#2DD4BF',
      accent: '#5EEAD4',
      background: '#F0FDFA',
      text: '#134E4A'
    },
    'fresh-green': {
      primary: '#22C55E',
      secondary: '#4ADE80',
      accent: '#86EFAC',
      background: '#F0FDF4',
      text: '#14532D'
    },
    'professional-slate': {
      primary: '#6366F1',
      secondary: '#818CF8',
      accent: '#A5B4FC',
      background: '#F8FAFC',
      text: '#1E293B'
    },
    'warm-coral': {
      primary: '#F97316',
      secondary: '#FB923C',
      accent: '#FDBA74',
      background: '#FFF7ED',
      text: '#7C2D12'
    }
  }
};

export default CONFIG;
