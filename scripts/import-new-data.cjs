const fs = require('fs');
const path = require('path');

// Read the new comprehensive data
const newDataPath = path.join(__dirname, '..', 'Bussines details', 'delhi_dental_enriched_comprehensive.json');
const outputPath = path.join(__dirname, '..', 'Bussines details', 'unified_business_data.json');

console.log('Reading new data from:', newDataPath);
const newData = JSON.parse(fs.readFileSync(newDataPath, 'utf-8'));

console.log(`Found ${newData.length} dental clinics in new data`);

// Transform new data format to unified format
const transformedBusinesses = newData.map((clinic, index) => {
  const basic = clinic.basic_info || {};
  const contact = clinic.contact || {};
  const professional = clinic.professional || {};
  const services = clinic.services || {};
  const operations = clinic.operations || {};
  const socialProof = clinic.social_proof || {};
  const leadDentist = professional.lead_dentist || {};

  // Extract services from different fields
  const allServices = [
    ...(services.primary_services || []),
    ...(services.specialized_services || []),
    ...(services.signature_treatments || [])
  ].filter(Boolean);

  // Get unique services (limit to 10)
  const uniqueServices = [...new Set(allServices)].slice(0, 10);

  // If no services, add default dental services
  const finalServices = uniqueServices.length > 0 ? uniqueServices : [
    'General Dentistry',
    'Root Canal Treatment',
    'Teeth Whitening',
    'Dental Implants'
  ];

  // Extract email (handle array or string)
  let email = '';
  if (Array.isArray(contact.primary_email) && contact.primary_email.length > 0) {
    email = contact.primary_email[0];
  } else if (typeof contact.primary_email === 'string') {
    email = contact.primary_email;
  }

  // Extract phone
  const phone = contact.primary_phone || '';

  // Build description
  const description = basic.tagline ||
    `Professional dental care at ${basic.name || 'our clinic'}. Offering quality dental services in ${basic.area || 'Delhi'}.`;

  // Get qualifications
  const qualifications = leadDentist.qualifications?.join(', ') ||
    professional.all_qualifications?.join(', ') || '';

  return {
    id: index + 1,
    business_name: basic.name || `Dental Clinic ${index + 1}`,
    doctor_name: leadDentist.name || '',
    specialty: leadDentist.specialization || professional.specializations?.join(', ') || 'Dentistry',
    experience_years: leadDentist.experience_years || null,
    phone: phone,
    email: email,
    address: contact.full_address || '',
    area: basic.area || 'Delhi',
    city: basic.city || 'Delhi',
    pincode: '',
    website_url: contact.website || '',
    practo_rating: socialProof.practo_rating || null,
    justdial_rating: socialProof.justdial_rating || null,
    google_rating: socialProof.google_rating || null,
    total_reviews: (socialProof.google_reviews || 0) + (socialProof.practo_reviews || 0),
    social_media: {},
    qualifications: qualifications,
    services: finalServices,
    description: description,
    priority_tier: '',
    opportunity_score: 0,
    digital_status: contact.website ? 'Has Website' : 'No Website',
    source: 'delhi_dental_enriched_comprehensive.json',
    // Additional fields from new data
    consultation_fee: operations.consultation_fee || '',
    working_hours: operations.working_hours || '',
    working_days: operations.working_days || '',
    google_maps_link: contact.google_maps_link || '',
    facilities: clinic.infrastructure?.facilities || [],
    languages: operations.languages || ['Hindi', 'English']
  };
});

// Create the unified data structure
const unifiedData = {
  generated: new Date().toISOString().split('T')[0],
  total_businesses: transformedBusinesses.length,
  sources: ['delhi_dental_enriched_comprehensive.json'],
  businesses: transformedBusinesses
};

// Write to output file
console.log(`Writing ${transformedBusinesses.length} businesses to:`, outputPath);
fs.writeFileSync(outputPath, JSON.stringify(unifiedData, null, 2), 'utf-8');

console.log('Done! Unified business data updated successfully.');
console.log(`Total dental clinics: ${transformedBusinesses.length}`);

// Show sample of first entry
console.log('\nSample entry:');
console.log(JSON.stringify(transformedBusinesses[0], null, 2));
