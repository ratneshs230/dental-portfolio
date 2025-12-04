/**
 * Website Generator
 * Generates complete Next.js dental clinic websites
 */

import fs from 'fs-extra';
import path from 'path';
import { ClinicParser } from './clinic-parser.js';
import { DesignMapper } from './design-mapper.js';
import { FeatureIntegrator } from './features/index.js';

export class WebsiteGenerator {
  constructor() {
    this.clinicParser = new ClinicParser();
    this.designMapper = new DesignMapper();
    this.featureIntegrator = new FeatureIntegrator();
  }

  async generate(config) {
    const { clinic, features, archetype, colorScheme, colorSchemeName, outputPath } = config;

    // Extract clinic info first
    const clinicInfo = this.clinicParser.extractClinicInfo(clinic);
    const seoData = this.clinicParser.generateSEOData(clinic);
    const hours = this.clinicParser.generateOperatingHours(clinic);

    // Get design mappings
    const components = this.designMapper.mapToDentalComponents(archetype);
    const animations = this.designMapper.getAnimationConfig(archetype);
    const pages = this.designMapper.generatePageStructure(archetype, features);

    // Create all directories first
    await fs.ensureDir(outputPath);
    await fs.ensureDir(path.join(outputPath, 'app'));
    await fs.ensureDir(path.join(outputPath, 'app', 'about'));
    await fs.ensureDir(path.join(outputPath, 'app', 'services'));
    await fs.ensureDir(path.join(outputPath, 'app', 'contact'));
    await fs.ensureDir(path.join(outputPath, 'components'));
    await fs.ensureDir(path.join(outputPath, 'components', 'features'));
    await fs.ensureDir(path.join(outputPath, 'lib'));
    await fs.ensureDir(path.join(outputPath, 'data'));
    await fs.ensureDir(path.join(outputPath, 'public'));
    await fs.ensureDir(path.join(outputPath, 'locales'));

    // Generate all files (directories already exist)
    await Promise.all([
      this.generatePackageJson(outputPath, clinicInfo),
      this.generateNextConfig(outputPath),
      this.generateTailwindConfig(outputPath, colorScheme, colorSchemeName),
      this.generateGlobalStyles(outputPath, colorScheme),
      this.generateLayout(outputPath, clinicInfo, seoData),
      this.generateHomePage(outputPath, clinicInfo, archetype, colorScheme, features),
      this.generateAboutPage(outputPath, clinicInfo, archetype),
      this.generateServicesPage(outputPath, clinicInfo, archetype),
      this.generateContactPage(outputPath, clinicInfo, hours),
      this.generateComponents(outputPath, clinicInfo, components, colorScheme),
      this.generateClinicData(outputPath, clinicInfo, seoData, hours),
      this.featureIntegrator.integrate(outputPath, features, clinicInfo)
    ]);
  }

  async generatePackageJson(outputPath, clinicInfo) {
    const pkg = {
      name: clinicInfo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint'
      },
      dependencies: {
        'next': '^14.0.0',
        'react': '^18.2.0',
        'react-dom': '^18.2.0',
        'framer-motion': '^10.16.0',
        'lucide-react': '^0.294.0',
        'clsx': '^2.0.0',
        'tailwind-merge': '^2.0.0',
        '@radix-ui/react-dialog': '^1.0.5',
        '@radix-ui/react-dropdown-menu': '^2.0.6',
        '@radix-ui/react-slot': '^1.0.2',
        'class-variance-authority': '^0.7.0',
        'date-fns': '^2.30.0'
      },
      devDependencies: {
        'autoprefixer': '^10.4.16',
        'postcss': '^8.4.31',
        'tailwindcss': '^3.3.5',
        'typescript': '^5.2.2',
        '@types/node': '^20.9.0',
        '@types/react': '^18.2.37',
        '@types/react-dom': '^18.2.15'
      }
    };

    await fs.writeJson(path.join(outputPath, 'package.json'), pkg, { spaces: 2 });
  }

  async generateNextConfig(outputPath) {
    const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
  },
}

module.exports = nextConfig
`;
    await fs.writeFile(path.join(outputPath, 'next.config.js'), config);
  }

  async generateTailwindConfig(outputPath, colorScheme, colorSchemeName) {
    const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dental: {
          primary: '${colorScheme.primary}',
          secondary: '${colorScheme.secondary}',
          accent: '${colorScheme.accent}',
          background: '${colorScheme.background}',
          foreground: '${colorScheme.text}',
        },
      },
      backgroundImage: {
        'dental-gradient': 'linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.secondary} 100%)',
        'dental-radial': 'radial-gradient(circle at top right, ${colorScheme.accent}, transparent 50%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
`;
    await fs.writeFile(path.join(outputPath, 'tailwind.config.js'), config);
    await fs.writeFile(path.join(outputPath, 'postcss.config.js'),
      `module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n}\n`
    );
  }

  async generateGlobalStyles(outputPath, colorScheme) {
    await fs.ensureDir(path.join(outputPath, 'app'));

    const styles = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --dental-primary: ${colorScheme.primary};
    --dental-secondary: ${colorScheme.secondary};
    --dental-accent: ${colorScheme.accent};
    --dental-background: ${colorScheme.background};
    --dental-foreground: ${colorScheme.text};
  }

  body {
    @apply bg-dental-background text-dental-foreground antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-display font-bold tracking-tight;
  }
}

@layer components {
  .dental-btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 rounded-xl
           bg-dental-primary text-white font-semibold
           hover:opacity-90 transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-dental-primary focus:ring-offset-2;
  }

  .dental-btn-secondary {
    @apply inline-flex items-center justify-center px-6 py-3 rounded-xl
           bg-white text-dental-primary font-semibold border-2 border-dental-primary
           hover:bg-dental-primary hover:text-white transition-all duration-200;
  }

  .dental-card {
    @apply bg-white rounded-2xl shadow-lg p-6
           border border-gray-100 hover:shadow-xl transition-shadow duration-300;
  }

  .dental-section {
    @apply py-16 md:py-24 px-4 md:px-8;
  }

  .dental-container {
    @apply max-w-7xl mx-auto;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Selection color */
::selection {
  background: ${colorScheme.primary}33;
  color: ${colorScheme.text};
}
`;
    await fs.writeFile(path.join(outputPath, 'app', 'globals.css'), styles);
  }

  async generateLayout(outputPath, clinicInfo, seoData) {
    const layout = `import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata = {
  title: '${seoData.title}',
  description: '${seoData.description}',
  keywords: ${JSON.stringify(seoData.keywords)},
  openGraph: {
    title: '${seoData.title}',
    description: '${seoData.description}',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={${'`${inter.variable} ${jakarta.variable}`'}}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(${JSON.stringify(seoData.schema, null, 2)})
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
`;
    await fs.writeFile(path.join(outputPath, 'app', 'layout.jsx'), layout);
  }

  async generateHomePage(outputPath, clinicInfo, archetype, colorScheme, features) {
    const featureIds = features.map(f => f.id);

    const page = `'use client'

import { motion } from 'framer-motion'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { Testimonials } from '@/components/Testimonials'
import { CTASection } from '@/components/CTASection'
${featureIds.includes('ai-chatbot') ? "import { AIChatbot } from '@/components/features/AIChatbot'" : ''}
${featureIds.includes('appointment-booking') ? "import { QuickBooking } from '@/components/features/QuickBooking'" : ''}
${featureIds.includes('smile-assessment') ? "import { SmileAssessmentCTA } from '@/components/features/SmileAssessmentCTA'" : ''}

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />

      ${featureIds.includes('appointment-booking') ? '<QuickBooking />' : ''}

      <Services />

      <WhyChooseUs />

      ${featureIds.includes('smile-assessment') ? '<SmileAssessmentCTA />' : ''}

      <Testimonials />

      <CTASection />

      ${featureIds.includes('ai-chatbot') ? '<AIChatbot />' : ''}
    </div>
  )
}
`;
    await fs.writeFile(path.join(outputPath, 'app', 'page.jsx'), page);
  }

  async generateAboutPage(outputPath, clinicInfo, archetype) {
    await fs.ensureDir(path.join(outputPath, 'app', 'about'));

    const page = `'use client'

import { motion } from 'framer-motion'
import {
  Award,
  Users,
  Calendar,
  Heart,
  CheckCircle,
  Building
} from 'lucide-react'
import clinicData from '@/data/clinic.json'

const stats = [
  { icon: Calendar, label: 'Years Experience', value: '${clinicInfo.experience}+' },
  { icon: Users, label: 'Happy Patients', value: '${clinicInfo.patientBase > 0 ? Math.floor(clinicInfo.patientBase / 1000) + 'K+' : '5K+'}' },
  { icon: Award, label: 'Dentists', value: '${clinicInfo.dentists}' },
  { icon: Heart, label: 'Treatments Done', value: '${clinicInfo.monthlyPatients > 0 ? Math.floor(clinicInfo.monthlyPatients * 12) + '+' : '2000+'}' },
]

export default function AboutPage() {
  return (
    <div className="dental-section">
      <div className="dental-container">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dental-foreground mb-6">
            About ${clinicInfo.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Providing exceptional dental care to ${clinicInfo.area} since ${clinicInfo.established || '2000'}.
            Your smile is our passion.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="dental-card text-center">
              <stat.icon className="w-10 h-10 text-dental-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-dental-foreground mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-display font-bold text-dental-foreground mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4">
              ${clinicInfo.name} was established with a simple mission: to provide
              world-class dental care in a warm, welcoming environment. Located in the
              heart of ${clinicInfo.area}, we've been serving families for over
              ${clinicInfo.experience || 10} years.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of ${clinicInfo.dentists} experienced dentist${clinicInfo.dentists > 1 ? 's' : ''} and
              ${clinicInfo.staff} support staff are committed to making every visit comfortable
              and stress-free.
            </p>
            <ul className="space-y-3">
              {clinicInfo.qualifications.slice(0, 4).map((qual, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-dental-primary" />
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-dental-gradient opacity-10 absolute inset-0" />
            <div className="relative dental-card">
              <Building className="w-16 h-16 text-dental-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">Our Facility</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Modern ${clinicInfo.infrastructure?.chairs || 2}-chair dental setup</li>
                <li>• ${clinicInfo.infrastructure?.sterilization || 'Advanced'} sterilization</li>
                <li>• Digital X-ray facility</li>
                <li>• Comfortable waiting area</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
`;
    await fs.writeFile(path.join(outputPath, 'app', 'about', 'page.jsx'), page);
  }

  async generateServicesPage(outputPath, clinicInfo, archetype) {
    await fs.ensureDir(path.join(outputPath, 'app', 'services'));

    const allServices = [
      ...clinicInfo.services.general.map(s => ({ name: s, category: 'General' })),
      ...clinicInfo.services.cosmetic.map(s => ({ name: s, category: 'Cosmetic' })),
      ...clinicInfo.services.specialized.map(s => ({ name: s, category: 'Specialized' }))
    ];

    const page = `'use client'

import { motion } from 'framer-motion'
import {
  Stethoscope,
  Sparkles,
  Shield,
  ArrowRight,
  Phone
} from 'lucide-react'
import Link from 'next/link'

const services = ${JSON.stringify(allServices, null, 2)}

const categories = [
  { name: 'General', icon: Stethoscope, description: 'Essential dental care for the whole family' },
  { name: 'Cosmetic', icon: Sparkles, description: 'Enhance your smile with our cosmetic treatments' },
  { name: 'Specialized', icon: Shield, description: 'Advanced treatments for complex dental needs' },
]

export default function ServicesPage() {
  return (
    <div className="dental-section">
      <div className="dental-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dental-foreground mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive dental care tailored to your needs. From routine checkups to
            advanced treatments, we've got you covered.
          </p>
        </motion.div>

        {/* Service Categories */}
        {categories.map((category, catIndex) => {
          const categoryServices = services.filter(s => s.category === category.name)
          if (categoryServices.length === 0) return null

          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-16"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-dental-primary/10">
                  <category.icon className="w-8 h-8 text-dental-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dental-foreground">{category.name} Dentistry</h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="dental-card group cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-dental-foreground mb-2 group-hover:text-dental-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Professional {service.name.toLowerCase()} services with modern techniques and equipment.
                    </p>
                    <div className="flex items-center text-dental-primary text-sm font-medium">
                      Learn more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-dental-gradient rounded-3xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Book your consultation today and take the first step towards a healthier smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="dental-btn-secondary bg-white">
              Book Appointment
            </Link>
            <a href="tel:${clinicInfo.phones[0] || ''}" className="dental-btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-dental-primary">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
`;
    await fs.writeFile(path.join(outputPath, 'app', 'services', 'page.jsx'), page);
  }

  async generateContactPage(outputPath, clinicInfo, hours) {
    await fs.ensureDir(path.join(outputPath, 'app', 'contact'));

    const page = `'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle
} from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    setSubmitted(true)
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: '${clinicInfo.address}',
      link: 'https://maps.google.com/?q=${encodeURIComponent(clinicInfo.address)}'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '${clinicInfo.phones[0] || 'Contact Us'}',
      link: 'tel:${clinicInfo.phones[0] || ''}'
    },
    {
      icon: Mail,
      label: 'Email',
      value: '${clinicInfo.email || 'info@clinic.com'}',
      link: 'mailto:${clinicInfo.email || 'info@clinic.com'}'
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Sat: 9AM-8PM',
      link: null
    }
  ]

  return (
    <div className="dental-section">
      <div className="dental-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dental-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or ready to schedule an appointment? We're here to help!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-dental-foreground mb-8">Get in Touch</h2>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link || '#'}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-dental-primary/10 group-hover:bg-dental-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-dental-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="text-dental-foreground font-medium group-hover:text-dental-primary transition-colors">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video rounded-2xl bg-gray-100 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5!2d77.2!3d28.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzAwLjAiTiA3N8KwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="dental-card">
              <h2 className="text-2xl font-bold text-dental-foreground mb-6">Send us a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-dental-foreground mb-2">Message Sent!</h3>
                  <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none transition-all"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none transition-all"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none transition-all"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none transition-all"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="">Select a service</option>
                      <option value="checkup">General Checkup</option>
                      <option value="cleaning">Teeth Cleaning</option>
                      <option value="whitening">Teeth Whitening</option>
                      <option value="rootcanal">Root Canal</option>
                      <option value="braces">Braces/Aligners</option>
                      <option value="implants">Dental Implants</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-dental-primary focus:ring-2 focus:ring-dental-primary/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your dental needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full dental-btn-primary"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
`;
    await fs.writeFile(path.join(outputPath, 'app', 'contact', 'page.jsx'), page);
  }

  async generateComponents(outputPath, clinicInfo, components, colorScheme) {
    const componentsDir = path.join(outputPath, 'components');
    await fs.ensureDir(componentsDir);

    // Navbar
    await fs.writeFile(path.join(componentsDir, 'Navbar.jsx'), `'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="dental-container">
        <div className="flex items-center justify-between h-16 md:h-20 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-dental-gradient flex items-center justify-center">
              <span className="text-white text-xl font-bold">🦷</span>
            </div>
            <span className="font-display font-bold text-dental-foreground text-lg hidden sm:block">
              ${clinicInfo.name.split(' ').slice(0, 2).join(' ')}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-dental-primary font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:${clinicInfo.phones[0] || ''}" className="text-dental-primary font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5" />
              ${clinicInfo.phones[0] || 'Call Us'}
            </a>
            <Link href="/contact" className="dental-btn-primary">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-600 hover:text-dental-primary font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block dental-btn-primary text-center"
                onClick={() => setIsOpen(false)}
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
`);

    // Footer
    await fs.writeFile(path.join(componentsDir, 'Footer.jsx'), `import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-dental-foreground text-white">
      <div className="dental-container py-16 px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <span className="text-xl">🦷</span>
              </div>
              <span className="font-display font-bold text-xl">${clinicInfo.name.split(' ').slice(0, 2).join(' ')}</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Providing quality dental care in ${clinicInfo.area} for over ${clinicInfo.experience || 10} years.
              Your smile is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-dental-primary shrink-0 mt-0.5" />
                <span className="text-gray-400">${clinicInfo.address || clinicInfo.area + ', Delhi'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-dental-primary" />
                <a href="tel:${clinicInfo.phones[0] || ''}" className="text-gray-400 hover:text-white transition-colors">
                  ${clinicInfo.phones[0] || 'Contact Us'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-dental-primary" />
                <span className="text-gray-400">Mon-Sat: 9AM-8PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; ${new Date().getFullYear()} ${clinicInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
`);

    // Hero Component
    await fs.writeFile(path.join(componentsDir, 'Hero.jsx'), `'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, Star, CheckCircle } from 'lucide-react'

const features = [
  'Modern Equipment',
  '${clinicInfo.experience || 10}+ Years Experience',
  'Gentle Care',
  '${clinicInfo.dentists > 1 ? clinicInfo.dentists + ' Expert Dentists' : 'Expert Dentist'}'
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dental-radial opacity-50" />

      <div className="dental-container relative">
        <div className="min-h-[80vh] flex items-center py-16 px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dental-primary/10 text-dental-primary text-sm font-medium mb-6">
                <Star className="w-4 h-4 fill-dental-primary" />
                Trusted by ${clinicInfo.patientBase > 0 ? Math.floor(clinicInfo.patientBase / 1000) + ',000+' : '5,000+'} patients
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dental-foreground mb-6 leading-tight">
                Your Smile, <br />
                <span className="text-dental-primary">Our Priority</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Welcome to ${clinicInfo.name}. Experience exceptional dental care
                in ${clinicInfo.area} with our team of expert dentists.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-dental-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="dental-btn-primary">
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <a href="tel:${clinicInfo.phones[0] || ''}" className="dental-btn-secondary">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-3xl bg-dental-gradient p-1">
                <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">🦷</div>
                    <div className="text-2xl font-display font-bold text-dental-foreground">
                      ${clinicInfo.name.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div className="text-gray-500">${clinicInfo.area}, Delhi</div>
                    ${clinicInfo.avgRating ? `<div class="flex items-center justify-center gap-1 mt-4">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span class="font-semibold">${clinicInfo.avgRating}</span>
                      <span class="text-gray-500">(${clinicInfo.totalReviews} reviews)</span>
                    </div>` : ''}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
`);

    // Services Component
    await fs.writeFile(path.join(componentsDir, 'Services.jsx'), this.generateServicesComponent(clinicInfo));

    // WhyChooseUs Component
    await fs.writeFile(path.join(componentsDir, 'WhyChooseUs.jsx'), this.generateWhyChooseUsComponent(clinicInfo));

    // Testimonials Component
    await fs.writeFile(path.join(componentsDir, 'Testimonials.jsx'), this.generateTestimonialsComponent(clinicInfo));

    // CTASection Component
    await fs.writeFile(path.join(componentsDir, 'CTASection.jsx'), this.generateCTAComponent(clinicInfo));
  }

  generateServicesComponent(clinicInfo) {
    const services = [
      ...clinicInfo.services.general.slice(0, 3),
      ...clinicInfo.services.cosmetic.slice(0, 2),
      ...clinicInfo.services.specialized.slice(0, 1)
    ].slice(0, 6);

    return `'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = ${JSON.stringify(services.map(s => ({ name: s, icon: '🦷' })), null, 2)}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function Services() {
  return (
    <section className="dental-section bg-gray-50">
      <div className="dental-container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-foreground mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive dental care for the whole family. From routine checkups to specialized treatments.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="dental-card group"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-dental-foreground mb-2 group-hover:text-dental-primary transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm">
                Professional {service.name.toLowerCase()} services using modern techniques.
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link href="/services" className="dental-btn-primary">
            View All Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
`;
  }

  generateWhyChooseUsComponent(clinicInfo) {
    return `'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Award, Heart, Users, Sparkles } from 'lucide-react'

const reasons = [
  {
    icon: Award,
    title: '${clinicInfo.experience || 10}+ Years Experience',
    description: 'Trusted expertise built over years of dedicated service'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: '${clinicInfo.dentists} qualified dentist${clinicInfo.dentists > 1 ? 's' : ''} with specialized training'
  },
  {
    icon: Sparkles,
    title: 'Modern Equipment',
    description: 'State-of-the-art dental technology for precise treatment'
  },
  {
    icon: Clock,
    title: 'Convenient Hours',
    description: 'Flexible scheduling including weekends'
  },
  {
    icon: Heart,
    title: 'Gentle Care',
    description: 'Comfortable, anxiety-free dental experience'
  },
  {
    icon: Shield,
    title: 'Sterilization Standards',
    description: 'Strict hygiene protocols for your safety'
  }
]

export function WhyChooseUs() {
  return (
    <section className="dental-section">
      <div className="dental-container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what makes ${clinicInfo.name} the preferred choice for dental care in ${clinicInfo.area}.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-dental-primary/10 flex items-center justify-center">
                <reason.icon className="w-6 h-6 text-dental-primary" />
              </div>
              <div>
                <h3 className="font-bold text-dental-foreground mb-1">{reason.title}</h3>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
`;
  }

  generateTestimonialsComponent(clinicInfo) {
    const themes = clinicInfo.positiveThemes.length > 0
      ? clinicInfo.positiveThemes
      : ['Professional staff', 'Clean clinic', 'Gentle treatment', 'Quick service'];

    return `'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya S.',
    rating: 5,
    text: 'Excellent experience! The staff was very professional and the treatment was painless. Highly recommend!',
    service: 'Root Canal'
  },
  {
    name: 'Rahul M.',
    rating: 5,
    text: 'Best dental clinic in ${clinicInfo.area}. ${themes[0]} and ${themes[1].toLowerCase()}. Will definitely come back!',
    service: 'Teeth Cleaning'
  },
  {
    name: 'Anjali K.',
    rating: 5,
    text: 'Very ${themes[2] ? themes[2].toLowerCase() : 'gentle'} with my kids. The doctor explained everything clearly. Great experience!',
    service: 'Dental Checkup'
  }
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="dental-section bg-gray-50">
      <div className="dental-container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dental-foreground mb-4">
            What Our Patients Say
          </h2>
          <p className="text-gray-600">
            ${clinicInfo.totalReviews > 0 ? 'Rated ' + clinicInfo.avgRating + '/5 from ' + clinicInfo.totalReviews + ' reviews' : 'Trusted by thousands of happy patients'}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="dental-card text-center"
            >
              <Quote className="w-12 h-12 text-dental-primary/20 mx-auto mb-6" />

              <p className="text-xl text-gray-700 mb-6 italic">
                "{testimonials[current].text}"
              </p>

              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <div className="font-bold text-dental-foreground">{testimonials[current].name}</div>
              <div className="text-sm text-gray-500">{testimonials[current].service}</div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-dental-primary hover:text-white hover:border-dental-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-dental-primary hover:text-white hover:border-dental-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
`;
  }

  generateCTAComponent(clinicInfo) {
    return `'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, Calendar, ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="dental-section">
      <div className="dental-container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-dental-gradient p-12 md:p-16 text-white text-center"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready for Your Best Smile?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Book your appointment today and experience the difference at ${clinicInfo.name}.
              Consultation starts at just ${clinicInfo.consultationFee || '₹500'}.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-dental-primary font-semibold hover:bg-gray-100 transition-colors"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Link>
              <a
                href="tel:${clinicInfo.phones[0] || ''}"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/20 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                ${clinicInfo.phones[0] || 'Call Now'}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
`;
  }

  async generateClinicData(outputPath, clinicInfo, seoData, hours) {
    const dataDir = path.join(outputPath, 'data');
    await fs.ensureDir(dataDir);

    const clinicData = {
      ...clinicInfo,
      seo: seoData,
      hours,
      generatedAt: new Date().toISOString()
    };

    await fs.writeJson(path.join(dataDir, 'clinic.json'), clinicData, { spaces: 2 });
  }
}

export default WebsiteGenerator;
