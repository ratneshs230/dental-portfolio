# Dental Website Generator - Sub-Agent System

A comprehensive Node.js system for automatically generating 100 professional dental clinic websites based on clinic data and design concepts.

## Overview

This sub-agent system reads dental clinic information from the discovery database and generates complete Next.js websites with:

- Modern, responsive designs based on design archetypes
- Random selection of 4-6 features per website
- SEO optimization and local schema markup
- Multi-language support (English/Hindi)
- Interactive components and animations

## Quick Start

```bash
# Install dependencies
npm install

# Generate all 100 websites
npm start

# Generate a single website
npm run generate-single -- DENT-DEL-001

# Preview mode (show first 3 clinics)
npm run preview
```

## Project Structure

```
sub agents/
├── orchestrator.js          # Main coordinator
├── config.js                # Configuration settings
├── clinic-parser.js         # Parses clinic data
├── feature-selector.js      # Random feature selection
├── design-mapper.js         # Maps design concepts
├── website-generator.js     # Generates website files
├── features/                # Feature modules
│   ├── index.js
│   ├── appointment-booking.js
│   ├── bill-generation.js
│   ├── file-upload.js
│   ├── ai-chatbot.js
│   ├── voice-assistant.js
│   ├── seo-geo.js
│   ├── multi-language.js
│   └── smile-assessment.js
└── package.json
```

## Features Pool

Each website randomly receives 4-6 of these features:

| Feature | Description |
|---------|-------------|
| **Online Appointment Booking** | Calendar-based scheduling with time slots |
| **Bill Generation** | Treatment cost calculator & invoice generator |
| **File Upload** | Secure upload for X-rays and reports |
| **AI Chatbot** | Intelligent chat assistant for patient queries |
| **Voice Assistant** | Voice-enabled information and booking |
| **SEO & Geo Optimization** | Local SEO with schema markup |
| **Multi-Language** | English/Hindi language support |
| **Smile Assessment Quiz** | Interactive quiz with cost estimates |

## Design Archetypes

Websites rotate through three design styles:

1. **Ethereal Flow** - Soft gradients, glass effects, smooth animations
2. **Clean SaaS** - Structured layouts, clear typography, spring animations
3. **Playful Interactive** - Engaging UI, particles, bouncy interactions

## Color Schemes

Five dental-appropriate color schemes:

- Trust Blue (#0EA5E9)
- Calm Teal (#14B8A6)
- Fresh Green (#22C55E)
- Professional Slate (#6366F1)
- Warm Coral (#F97316)

## Output Structure

Each generated website includes:

```
websites/{clinic-name}/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── globals.css
│   ├── about/page.jsx
│   ├── services/page.jsx
│   ├── contact/page.jsx
│   ├── book-appointment/page.jsx    # If feature selected
│   ├── smile-assessment/page.jsx    # If feature selected
│   └── patient-portal/page.jsx      # If feature selected
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── WhyChooseUs.jsx
│   ├── Testimonials.jsx
│   ├── CTASection.jsx
│   └── features/                    # Selected feature components
├── lib/                             # Utility libraries
├── data/clinic.json                 # Clinic information
├── locales/                         # Translation files
├── public/                          # Static assets
├── package.json
├── tailwind.config.js
├── next.config.js
├── generation-log.json              # Generation metadata
└── features-manifest.json           # Integrated features
```

## Configuration

Edit `config.js` to customize:

```javascript
export const CONFIG = {
  paths: {
    clinicData: '../Bussines details/delhi_dentists_discovery.json',
    designConcepts: '../website design concepts.json',
    outputDir: '../websites'
  },
  minFeatures: 4,
  maxFeatures: 6,
  // ... more options
}
```

## Technology Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Running Generated Websites

After generation, each website can be run independently:

```bash
cd ../websites/{clinic-name}
npm install
npm run dev
```

## Generation Log

Each website includes a `generation-log.json` with:

```json
{
  "generatedAt": "2024-01-15T10:30:00.000Z",
  "clinic": {
    "id": "DENT-DEL-001",
    "name": "Dr. Chopra's Dental Centre",
    "area": "Rohini"
  },
  "design": {
    "archetype": "ethereal-flow",
    "colorScheme": "trust-blue"
  },
  "features": [
    { "id": "appointment-booking", "name": "Online Appointment & Scheduling" },
    { "id": "ai-chatbot", "name": "AI Enabled Chatbot" },
    // ...
  ]
}
```

## Notes

- Generation time: ~1-2 seconds per website
- Total disk space: ~50-100MB per website
- Requires Node.js 18+
- All websites are production-ready

## Support

For issues or questions, contact the development team.
