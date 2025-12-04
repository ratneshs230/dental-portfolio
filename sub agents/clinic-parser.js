/**
 * Clinic Data Parser
 * Parses and normalizes dental clinic data from discovery JSON
 */

import fs from 'fs-extra';

export class ClinicParser {
  constructor() {
    this.clinics = [];
  }

  async loadClinics(filePath) {
    const data = await fs.readJson(filePath);
    this.clinics = Array.isArray(data) ? data : [];
    return this.clinics;
  }

  generateFolderName(clinic) {
    // Create URL-friendly folder name from clinic name
    const name = clinic.business_name || `clinic-${clinic.id}`;
    return name
      .toLowerCase()
      .replace(/[''`]/g, '')
      .replace(/dr\.?\s*/gi, 'dr-')
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);
  }

  extractClinicInfo(clinic) {
    return {
      id: clinic.id,
      name: clinic.business_name,
      type: clinic.type || 'Dental Clinic',

      // Location
      address: clinic.location?.full_address || '',
      area: clinic.location?.area || 'Delhi',
      city: clinic.location?.city || 'Delhi',
      coordinates: clinic.location?.coordinates || null,

      // Contact
      phones: clinic.contact?.phone || [],
      email: clinic.contact?.email || null,
      existingWebsite: clinic.contact?.website || null,

      // Professional Details
      established: clinic.deep_research?.professional_details?.establishment_year || null,
      experience: clinic.deep_research?.professional_details?.experience_years || 0,
      dentists: clinic.deep_research?.professional_details?.dentists_count || 1,
      staff: clinic.deep_research?.professional_details?.support_staff || 0,
      qualifications: clinic.deep_research?.professional_details?.qualifications || [],
      registration: clinic.deep_research?.professional_details?.registration || {},

      // Services
      services: this.extractServices(clinic),

      // Infrastructure
      infrastructure: clinic.deep_research?.infrastructure || {},

      // Business Metrics
      consultationFee: clinic.deep_research?.business_metrics?.consultation_fee || '₹500',
      avgTreatmentValue: clinic.deep_research?.business_metrics?.average_treatment_value || '',
      paymentModes: clinic.deep_research?.business_metrics?.payment_modes || ['Cash', 'UPI'],
      insuranceTieUps: clinic.deep_research?.business_metrics?.insurance_tie_ups || [],

      // Patient Info
      monthlyPatients: clinic.deep_research?.patient_demographics?.monthly_footfall || 0,
      patientBase: clinic.deep_research?.patient_demographics?.patient_base || 0,
      catchmentArea: clinic.deep_research?.patient_demographics?.catchment_area || '',

      // Online Presence
      googleRating: clinic.deep_research?.online_presence?.google_my_business?.rating || null,
      totalReviews: clinic.deep_research?.reviews_analysis?.total_reviews || 0,
      avgRating: clinic.deep_research?.reviews_analysis?.average_rating || 0,
      positiveThemes: clinic.deep_research?.reviews_analysis?.positive_themes || [],

      // Scores
      opportunityScore: clinic.opportunity_score || 0,
      digitalScore: clinic.digital_score || 0
    };
  }

  extractServices(clinic) {
    const deepResearch = clinic.deep_research?.services_offered || {};

    return {
      general: deepResearch.general || [
        'Dental Checkup',
        'Teeth Cleaning',
        'Cavity Filling',
        'Root Canal Treatment'
      ],
      cosmetic: deepResearch.cosmetic || [
        'Teeth Whitening',
        'Dental Veneers'
      ],
      specialized: deepResearch.specialized || [],
      emergency: deepResearch.emergency_services || false,
      homeVisits: deepResearch.home_visits || false
    };
  }

  generateSEOData(clinic) {
    const info = this.extractClinicInfo(clinic);

    return {
      title: `${info.name} | Best Dentist in ${info.area}, ${info.city}`,
      description: `${info.name} - ${info.experience}+ years of dental excellence in ${info.area}. Services include ${info.services.general.slice(0, 3).join(', ')}. Book appointment today!`,
      keywords: [
        `dentist ${info.area}`,
        `dental clinic ${info.area}`,
        `best dentist ${info.city}`,
        ...info.services.general.map(s => s.toLowerCase()),
        `teeth treatment ${info.area}`
      ],
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        name: info.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: info.address,
          addressLocality: info.area,
          addressRegion: info.city,
          addressCountry: 'IN'
        },
        telephone: info.phones[0] || '',
        priceRange: info.consultationFee,
        aggregateRating: info.avgRating ? {
          '@type': 'AggregateRating',
          ratingValue: info.avgRating,
          reviewCount: info.totalReviews
        } : undefined
      }
    };
  }

  generateOperatingHours(clinic) {
    // Default dental clinic hours
    return {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '18:00' },
      sunday: { open: '10:00', close: '14:00', note: 'By Appointment' }
    };
  }
}

export default ClinicParser;
