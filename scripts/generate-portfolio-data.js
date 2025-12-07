/**
 * Generate portfolio data from unified business data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const businessDataPath = path.resolve(__dirname, '../Bussines details/unified_business_data.json');
const outputFile = path.resolve(__dirname, '../data/clinics.json');

// Create URL-friendly slug from business name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

// Filter for dental businesses only
function isDentalBusiness(business) {
  const specialty = (business.specialty || '').toLowerCase();
  return specialty.includes('dent') ||
         specialty.includes('orthodont') ||
         specialty.includes('implant');
}

// Color schemes for design variety
const colorSchemes = ['trust-blue', 'calm-teal', 'fresh-green', 'professional-slate', 'warm-coral'];
const archetypes = ['clean-saas', 'playful-interactive', 'ethereal-flow'];

async function generatePortfolioData() {
  console.log('Reading unified business data...');

  if (!fs.existsSync(businessDataPath)) {
    console.error('Business data file not found:', businessDataPath);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(businessDataPath, 'utf-8'));
  const allBusinesses = data.businesses || [];

  // Filter dental businesses
  const dentalBusinesses = allBusinesses.filter(isDentalBusiness);
  console.log(`Found ${dentalBusinesses.length} dental clinics`);

  const websites = dentalBusinesses.map((business, index) => {
    const folder = createSlug(business.business_name);
    const colorScheme = colorSchemes[index % colorSchemes.length];
    const archetype = archetypes[index % archetypes.length];

    return {
      id: `DENT-DEL-${String(index + 1).padStart(3, '0')}`,
      folder,
      name: business.business_name,
      area: business.area || 'Delhi',
      design: {
        archetype,
        colorScheme
      },
      features: [
        { id: 'lead-capture', name: 'Lead Capture Form', integratedAt: new Date().toISOString() },
        { id: 'ai-assistant', name: 'AI Voice Assistant', integratedAt: new Date().toISOString() },
        { id: 'responsive', name: 'Mobile Responsive', integratedAt: new Date().toISOString() },
        { id: 'seo', name: 'SEO Optimized', integratedAt: new Date().toISOString() },
        { id: 'animations', name: 'Interactive Animations', integratedAt: new Date().toISOString() }
      ],
      featureCount: 5,
      framework: {
        base: 'Next.js',
        styling: 'Tailwind CSS',
        ui: 'shadcn/ui',
        animations: 'CSS Animations'
      },
      generatedAt: new Date().toISOString(),
      // Clinic info
      phone: business.phone || '',
      email: business.email || '',
      experience: business.experience_years || 0,
      rating: business.practo_rating || business.google_rating || business.justdial_rating || 0,
      reviews: business.total_reviews || 0,
      consultationFee: business.consultation_fee || '₹500',
      services: business.services || [],
      address: business.address || '',
      doctorName: business.doctor_name || '',
      specialty: business.specialty || 'Dentistry'
    };
  });

  // Sort by name
  websites.sort((a, b) => a.name.localeCompare(b.name));

  // Ensure data directory exists
  const dataDir = path.dirname(outputFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Get unique areas for stats
  const areas = [...new Set(websites.map(w => w.area))];

  // Write output
  fs.writeFileSync(outputFile, JSON.stringify({
    totalWebsites: websites.length,
    totalAreas: areas.length,
    generatedAt: new Date().toISOString(),
    websites
  }, null, 2));

  console.log(`Generated portfolio data for ${websites.length} websites`);
  console.log(`Areas covered: ${areas.length}`);
  console.log(`Output: ${outputFile}`);
}

generatePortfolioData();
