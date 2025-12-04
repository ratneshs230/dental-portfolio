/**
 * Design Mapper
 * Maps design concepts to dental website templates
 */

import fs from 'fs-extra';

export class DesignMapper {
  constructor() {
    this.concepts = null;
  }

  async loadConcepts(filePath) {
    this.concepts = await fs.readJson(filePath);
    return this.concepts;
  }

  getArchetype(concepts, archetypeId) {
    const archetypes = concepts?.archetypes || this.concepts?.archetypes || [];
    return archetypes.find(a => a.id === archetypeId) || archetypes[0];
  }

  /**
   * Map archetype to dental-specific components
   */
  mapToDentalComponents(archetype) {
    const baseMapping = archetype?.component_mapping || {};

    // Dental-specific component overrides
    const dentalComponents = {
      'ethereal-flow': {
        hero: 'DentalHeroGradient',
        services: 'ServiceCardsGlass',
        testimonials: 'PatientReviewsCarousel',
        team: 'DentistProfileCards',
        contact: 'AppointmentFormEthereal',
        footer: 'FooterMinimal'
      },
      'clean-saas': {
        hero: 'DentalHeroStructured',
        services: 'ServicesBentoGrid',
        testimonials: 'AnimatedTestimonials',
        team: 'TeamGridModern',
        contact: 'ContactSplitForm',
        footer: 'FooterComprehensive'
      },
      'playful-interactive': {
        hero: 'DentalHeroAnimated',
        services: 'ServicesInteractive',
        testimonials: 'TestimonialShuffle',
        team: 'TeamCardsPlayful',
        contact: 'ContactFormGameified',
        footer: 'FooterAnimated'
      }
    };

    return {
      ...baseMapping,
      ...dentalComponents[archetype?.id] || dentalComponents['clean-saas']
    };
  }

  /**
   * Generate Tailwind config based on color scheme
   */
  generateTailwindColors(colorScheme, colorSchemeName) {
    return {
      colors: {
        dental: {
          primary: colorScheme.primary,
          secondary: colorScheme.secondary,
          accent: colorScheme.accent,
          background: colorScheme.background,
          foreground: colorScheme.text
        }
      },
      extend: {
        backgroundImage: {
          'dental-gradient': `linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.secondary} 100%)`,
          'dental-radial': `radial-gradient(circle at top right, ${colorScheme.accent}, transparent 50%)`
        }
      }
    };
  }

  /**
   * Get animation configuration for archetype
   */
  getAnimationConfig(archetype) {
    const configs = {
      'ethereal-flow': {
        pageTransition: {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.6, ease: 'easeInOut' }
        },
        elementStagger: 0.1,
        hoverScale: 1.02,
        scrollReveal: true
      },
      'clean-saas': {
        pageTransition: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.3, ease: 'easeOut' }
        },
        elementStagger: 0.05,
        hoverScale: 1.01,
        scrollReveal: true
      },
      'playful-interactive': {
        pageTransition: {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.05 },
          transition: { type: 'spring', stiffness: 300, damping: 30 }
        },
        elementStagger: 0.08,
        hoverScale: 1.05,
        scrollReveal: true,
        particleEffects: true
      }
    };

    return configs[archetype?.id] || configs['clean-saas'];
  }

  /**
   * Generate page structure for dental website
   */
  generatePageStructure(archetype, features) {
    const pages = [
      { path: '/', name: 'Home', component: 'HomePage' },
      { path: '/about', name: 'About Us', component: 'AboutPage' },
      { path: '/services', name: 'Services', component: 'ServicesPage' },
      { path: '/contact', name: 'Contact', component: 'ContactPage' }
    ];

    // Add feature-specific pages
    const featureIds = features.map(f => f.id);

    if (featureIds.includes('appointment-booking')) {
      pages.push({ path: '/book-appointment', name: 'Book Appointment', component: 'AppointmentPage' });
    }

    if (featureIds.includes('smile-assessment')) {
      pages.push({ path: '/smile-assessment', name: 'Smile Assessment', component: 'AssessmentPage' });
    }

    if (featureIds.includes('file-upload')) {
      pages.push({ path: '/patient-portal', name: 'Patient Portal', component: 'PatientPortalPage' });
    }

    return pages;
  }
}

export default DesignMapper;
