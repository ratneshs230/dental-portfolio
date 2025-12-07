/**
 * Website Generator Script
 * Generates customized dental clinic websites from a template
 */

const fs = require('fs');
const path = require('path');

// Paths
const TEMPLATE_DIR = path.join(__dirname, 'sculpted-enamel---aether-dental (1)');
const OUTPUT_DIR = path.join(__dirname, 'websites');
const BUSINESS_DATA_PATH = path.join(__dirname, 'Bussines details', 'unified_business_data.json');

// Color themes for variety
const COLOR_THEMES = [
  { primary: '#00e5ff', name: 'cyan', gradient: 'from-cyan-400 via-blue-500 to-purple-500' },
  { primary: '#10b981', name: 'emerald', gradient: 'from-emerald-400 via-teal-500 to-cyan-500' },
  { primary: '#6366f1', name: 'indigo', gradient: 'from-indigo-400 via-purple-500 to-pink-500' },
  { primary: '#f59e0b', name: 'amber', gradient: 'from-amber-400 via-orange-500 to-red-500' },
  { primary: '#ec4899', name: 'pink', gradient: 'from-pink-400 via-rose-500 to-red-500' },
  { primary: '#8b5cf6', name: 'violet', gradient: 'from-violet-400 via-purple-500 to-indigo-500' },
  { primary: '#14b8a6', name: 'teal', gradient: 'from-teal-400 via-cyan-500 to-blue-500' },
  { primary: '#f97316', name: 'orange', gradient: 'from-orange-400 via-amber-500 to-yellow-500' },
  { primary: '#06b6d4', name: 'sky', gradient: 'from-sky-400 via-blue-500 to-indigo-500' },
  { primary: '#84cc16', name: 'lime', gradient: 'from-lime-400 via-green-500 to-emerald-500' },
];

// Dental services variations
const DENTAL_SERVICES_TEMPLATES = [
  [
    { icon: '01', title: 'General Dentistry', description: 'Comprehensive dental care including checkups, cleanings, and preventive treatments for optimal oral health.', borderColor: 'from-cyan-400 via-blue-500 to-purple-500' },
    { icon: '02', title: 'Cosmetic Dentistry', description: 'Transform your smile with teeth whitening, veneers, and aesthetic enhancements tailored to you.', borderColor: 'from-emerald-400 via-cyan-500 to-blue-500' },
    { icon: '03', title: 'Dental Implants', description: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth.', borderColor: 'from-orange-400 via-pink-500 to-purple-500' },
    { icon: '04', title: 'Root Canal Treatment', description: 'Pain-free root canal therapy using advanced techniques to save your natural teeth.', borderColor: 'from-yellow-400 via-orange-500 to-red-500' },
  ],
  [
    { icon: '01', title: 'Teeth Whitening', description: 'Professional whitening treatments for a brighter, more confident smile in just one visit.', borderColor: 'from-cyan-400 via-blue-500 to-purple-500' },
    { icon: '02', title: 'Orthodontics', description: 'Invisible aligners and modern braces for perfect teeth alignment with comfort.', borderColor: 'from-emerald-400 via-cyan-500 to-blue-500' },
    { icon: '03', title: 'Dental Crowns', description: 'Custom-made crowns to restore damaged teeth and improve your smile aesthetics.', borderColor: 'from-orange-400 via-pink-500 to-purple-500' },
    { icon: '04', title: 'Gum Treatment', description: 'Comprehensive periodontal care to maintain healthy gums and prevent disease.', borderColor: 'from-yellow-400 via-orange-500 to-red-500' },
  ],
  [
    { icon: '01', title: 'Smile Makeover', description: 'Complete smile transformation combining multiple treatments for stunning results.', borderColor: 'from-cyan-400 via-blue-500 to-purple-500' },
    { icon: '02', title: 'Dental Bridges', description: 'Replace missing teeth with natural-looking bridges for a complete smile.', borderColor: 'from-emerald-400 via-cyan-500 to-blue-500' },
    { icon: '03', title: 'Pediatric Dentistry', description: 'Gentle dental care for children in a friendly, comfortable environment.', borderColor: 'from-orange-400 via-pink-500 to-purple-500' },
    { icon: '04', title: 'Emergency Dental Care', description: '24/7 emergency dental services for urgent dental problems and accidents.', borderColor: 'from-yellow-400 via-orange-500 to-red-500' },
  ],
];

// Review templates
const REVIEW_TEMPLATES = [
  [
    { name: 'Priya Sharma', role: 'Business Professional', content: 'Excellent dental care! The staff is friendly and professional. My treatment was painless and the results exceeded my expectations.', rating: 5 },
    { name: 'Rajesh Kumar', role: 'IT Professional', content: 'Best dental clinic in the area. Modern equipment and very hygienic environment. Highly recommend for all dental needs.', rating: 5 },
    { name: 'Anita Desai', role: 'Teacher', content: 'Very satisfied with my dental implant treatment. The doctor explained everything clearly and the procedure was smooth.', rating: 5 },
  ],
  [
    { name: 'Amit Patel', role: 'Entrepreneur', content: 'Outstanding service! The clinic uses latest technology and the team is highly skilled. My smile has never looked better.', rating: 5 },
    { name: 'Meera Reddy', role: 'Healthcare Worker', content: 'As a healthcare professional, I appreciate their attention to hygiene and patient care. Truly exceptional dental practice.', rating: 5 },
    { name: 'Vikram Singh', role: 'Engineer', content: 'Got my root canal done here without any pain. The doctor is very experienced and makes you feel comfortable.', rating: 5 },
  ],
  [
    { name: 'Sunita Joshi', role: 'Homemaker', content: 'Wonderful experience! The entire family now visits this clinic. Friendly staff and excellent treatment quality.', rating: 5 },
    { name: 'Arun Mehta', role: 'Bank Manager', content: 'Professional and efficient. Got my teeth whitening done and the results are amazing. Thank you, team!', rating: 5 },
    { name: 'Kavita Nair', role: 'Lawyer', content: 'Highly recommend this dental clinic. Clean, modern, and the doctors really know what they are doing.', rating: 5 },
  ],
];

// Helper to create slug from business name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/dr\.\s*/gi, 'dr-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Helper to get random item from array
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to get item by index (cycling through)
function getItemByIndex(arr, index) {
  return arr[index % arr.length];
}

// Generate assistant names based on clinic name
function generateAssistantName(clinicName) {
  const names = ['Maya', 'Arya', 'Priya', 'Diya', 'Isha', 'Nisha', 'Riya', 'Sanya', 'Tara', 'Zara'];
  const hash = clinicName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return names[hash % names.length];
}

// Generate tagline based on experience and area
function generateTagline(business) {
  const taglines = [
    `${business.experience_years}+ Years of Trusted Dental Care`,
    `Your Smile, Our Priority`,
    `Excellence in Dental Care Since ${2024 - business.experience_years}`,
    `Where Every Smile Matters`,
    `Advanced Dentistry, Compassionate Care`,
    `Transforming Smiles in ${business.area}`,
    `Your Partner in Dental Health`,
    `Creating Beautiful Smiles Every Day`,
  ];
  const hash = (business.id || 0) + (business.experience_years || 0);
  return taglines[hash % taglines.length];
}

// Main generation function
async function generateWebsites() {
  console.log('Starting website generation...\n');

  // Read business data
  const businessData = JSON.parse(fs.readFileSync(BUSINESS_DATA_PATH, 'utf-8'));

  // Filter for dental businesses only
  const dentalBusinesses = businessData.businesses.filter(b =>
    b.specialty && (
      b.specialty.toLowerCase().includes('dent') ||
      b.specialty.toLowerCase().includes('implant') ||
      b.specialty.toLowerCase().includes('orthodont')
    )
  );

  console.log(`Found ${dentalBusinesses.length} dental businesses to process.\n`);

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Process each dental business
  for (let i = 0; i < dentalBusinesses.length; i++) {
    const business = dentalBusinesses[i];
    const slug = createSlug(business.business_name);
    const websiteDir = path.join(OUTPUT_DIR, slug);
    const colorTheme = getItemByIndex(COLOR_THEMES, i);
    const servicesTemplate = getItemByIndex(DENTAL_SERVICES_TEMPLATES, i);
    const reviewsTemplate = getItemByIndex(REVIEW_TEMPLATES, i);
    const assistantName = generateAssistantName(business.business_name);
    const tagline = generateTagline(business);

    console.log(`[${i + 1}/${dentalBusinesses.length}] Generating: ${business.business_name} -> ${slug}`);

    // Create website directory
    if (fs.existsSync(websiteDir)) {
      fs.rmSync(websiteDir, { recursive: true });
    }
    fs.mkdirSync(websiteDir, { recursive: true });

    // Copy and customize files
    copyAndCustomizeFiles(TEMPLATE_DIR, websiteDir, {
      business,
      slug,
      colorTheme,
      servicesTemplate,
      reviewsTemplate,
      assistantName,
      tagline,
    });
  }

  console.log(`\n✅ Successfully generated ${dentalBusinesses.length} websites!`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
}

// Copy and customize all files
function copyAndCustomizeFiles(srcDir, destDir, config) {
  const items = fs.readdirSync(srcDir);

  for (const item of items) {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      if (item === 'node_modules') continue; // Skip node_modules

      fs.mkdirSync(destPath, { recursive: true });
      copyAndCustomizeFiles(srcPath, destPath, config);
    } else {
      // Customize content based on file type
      let content = fs.readFileSync(srcPath, 'utf-8');

      if (item === 'Header.tsx') {
        content = customizeHeader(content, config);
      } else if (item === 'Hero.tsx') {
        content = customizeHero(content, config);
      } else if (item === 'ContactSection.tsx') {
        content = customizeContactSection(content, config);
      } else if (item === 'ServicesSection.tsx') {
        content = customizeServicesSection(content, config);
      } else if (item === 'ReviewsSection.tsx') {
        content = customizeReviewsSection(content, config);
      } else if (item === 'ChatWidget.tsx') {
        content = customizeChatWidget(content, config);
      } else if (item === 'livePrompt.ts') {
        content = customizeLivePrompt(content, config);
      } else if (item === 'geminiService.ts') {
        content = customizeGeminiService(content, config);
      } else if (item === 'index.html') {
        content = customizeIndexHtml(content, config);
      } else if (item === 'metadata.json') {
        content = customizeMetadata(content, config);
      } else if (item === 'package.json') {
        content = customizePackageJson(content, config);
      } else if (item === 'App.tsx') {
        content = customizeApp(content, config);
      }

      fs.writeFileSync(destPath, content);
    }
  }
}

// Customize Header.tsx
function customizeHeader(content, config) {
  const { business } = config;
  const displayName = business.business_name.replace(/['']/g, "'");

  return content
    .replace(/Sculpted Enamel/g, displayName)
    .replace(/Aether Dental/g, displayName);
}

// Customize Hero.tsx
function customizeHero(content, config) {
  const { business, tagline, colorTheme } = config;
  const displayName = business.business_name.replace(/['']/g, "'");

  // Update the vertical text on left side
  content = content.replace(
    /Aether Dental/g,
    displayName.length > 20 ? displayName.substring(0, 20) + '...' : displayName
  );

  // Update the establishment year
  const estYear = 2024 - (business.experience_years || 10);
  content = content.replace(/Est\. 2024/g, `Est. ${estYear}`);

  // Update tagline in eyebrow text
  content = content.replace(
    /The Future of Dentistry/g,
    tagline
  );

  // Update subheading with area
  const area = business.area || 'Delhi';
  content = content.replace(
    /Experience precision dentistry powered by AI\. Book your consultation\s*with our intelligent assistant and discover your perfect smile\./g,
    `Experience exceptional dental care in ${area}. Book your consultation with our AI assistant and take the first step towards your perfect smile.`
  );

  return content;
}

// Customize ContactSection.tsx
function customizeContactSection(content, config) {
  const { business, colorTheme } = config;
  const displayName = business.business_name.replace(/['']/g, "'");
  const area = business.area || 'Delhi';
  const phone = business.phone || '+91 11-XXXX XXXX';
  const address = business.address || `${area}, Delhi`;

  // Update location
  content = content.replace(
    /123 Dental Avenue, Suite 100<br \/>New York, NY 10001/g,
    `${address}<br />${area}, ${business.city || 'Delhi'} ${business.pincode || ''}`
  );

  // Update phone
  content = content.replace(
    /\+1 \(555\) 123-4567/g,
    phone
  );

  // Update footer copyright
  content = content.replace(
    /© 2024 Aether Dental\. All rights reserved\./g,
    `© 2024 ${displayName}. All rights reserved.`
  );

  // Update the CTA text
  content = content.replace(
    /Ready to transform your smile\? Reach out to schedule your consultation or speak with our AI assistant for immediate assistance\./g,
    `Ready to transform your smile? Contact ${displayName} today to schedule your consultation or speak with our AI assistant for immediate assistance.`
  );

  // Update accent colors (cyan to theme color)
  if (colorTheme.name !== 'cyan') {
    content = content.replace(/cyan-/g, `${colorTheme.name}-`);
    content = content.replace(/rgba\(0, 229, 255/g, hexToRgba(colorTheme.primary));
  }

  return content;
}

// Customize ServicesSection.tsx
function customizeServicesSection(content, config) {
  const { servicesTemplate, colorTheme } = config;

  // Replace the services array
  const servicesArrayStr = JSON.stringify(servicesTemplate, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'");

  content = content.replace(
    /const services = \[[\s\S]*?\];/,
    `const services = ${servicesArrayStr};`
  );

  // Update accent colors
  if (colorTheme.name !== 'cyan') {
    content = content.replace(/rgba\(0,229,255/g, hexToRgba(colorTheme.primary).replace('rgba(', ''));
  }

  return content;
}

// Customize ReviewsSection.tsx
function customizeReviewsSection(content, config) {
  const { reviewsTemplate, business, colorTheme } = config;
  const displayName = business.business_name.replace(/['']/g, "'");

  // Update reviews to mention clinic name
  const customizedReviews = reviewsTemplate.map(review => ({
    ...review,
    content: review.content.replace(/this clinic|the clinic/gi, displayName)
  }));

  // Replace the reviews array
  const reviewsArrayStr = JSON.stringify(customizedReviews, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'");

  content = content.replace(
    /const reviews = \[[\s\S]*?\];/,
    `const reviews = ${reviewsArrayStr};`
  );

  // Update accent colors
  if (colorTheme.name !== 'cyan') {
    content = content.replace(/cyan-/g, `${colorTheme.name}-`);
    content = content.replace(/rgba\(0, 229, 255/g, hexToRgba(colorTheme.primary));
  }

  return content;
}

// Customize ChatWidget.tsx
function customizeChatWidget(content, config) {
  const { business, assistantName, colorTheme } = config;
  const displayName = business.business_name.replace(/['']/g, "'");

  content = content.replace(/Aether Assistant/g, `${assistantName} - ${displayName}`);
  content = content.replace(/Welcome to Sculpted Enamel\./g, `Welcome to ${displayName}.`);

  return content;
}

// Customize livePrompt.ts
function customizeLivePrompt(content, config) {
  const { business, assistantName, colorTheme } = config;
  const displayName = business.business_name.replace(/['']/g, "'").replace(/'/g, "\\'");
  const area = business.area || 'Delhi';
  const phone = business.phone || '+91 11-XXXX XXXX';
  const address = business.address || `${area}, Delhi`;
  const services = business.services && business.services.length > 0
    ? business.services
    : ['General Dentistry', 'Cosmetic Dentistry', 'Dental Implants', 'Root Canal Treatment'];

  // Update assistant config
  content = content.replace(/name: "Shree"/, `name: "${assistantName}"`);
  content = content.replace(/clinicName: "Sculpted Enamel"/, `clinicName: "${displayName}"`);

  // Update clinic info in system instruction
  content = content.replace(
    /- Location: 123 Dental Avenue, Suite 100, New York, NY 10001/g,
    `- Location: ${address}, ${area}, ${business.city || 'Delhi'} ${business.pincode || ''}`
  );

  content = content.replace(
    /- Phone: \+1 \(555\) 123-4567/g,
    `- Phone: ${phone}`
  );

  // Update greeting
  content = content.replace(
    /"Hello! This is Shree from Sculpted Enamel\. How can I help you today\?"/g,
    `"Hello! This is ${assistantName} from ${displayName}. How can I help you today?"`
  );

  // Update service information based on business data
  const servicesList = services.slice(0, 6).map(s => `- **${s}**`).join('\n');
  content = content.replace(
    /### Service Information[\s\S]*?(?=### Clinic Information)/,
    `### Service Information\nOur services include:\n${servicesList}\n\n`
  );

  // Update goodbye messages
  content = content.replace(/Sculpted Enamel/g, displayName);

  return content;
}

// Customize geminiService.ts
function customizeGeminiService(content, config) {
  const { business } = config;
  const displayName = business.business_name.replace(/['']/g, "'");

  content = content.replace(
    /You are the AI assistant for Sculpted Enamel \(Aether Dental\)/g,
    `You are the AI assistant for ${displayName}`
  );

  return content;
}

// Customize index.html
function customizeIndexHtml(content, config) {
  const { business, colorTheme } = config;
  const displayName = business.business_name.replace(/['']/g, "'");

  content = content.replace(
    /<title>Sculpted Enamel \| Aether Dental<\/title>/g,
    `<title>${displayName}</title>`
  );

  // Update theme color in tailwind config
  if (colorTheme.name !== 'cyan') {
    content = content.replace(/'enamel-white': '#fdfdfd',/g, `'enamel-white': '#fdfdfd',\n            '${colorTheme.name}': '${colorTheme.primary}',`);
  }

  return content;
}

// Customize metadata.json
function customizeMetadata(content, config) {
  const { business, slug } = config;
  const displayName = business.business_name.replace(/['']/g, "'");

  const metadata = {
    name: displayName,
    description: business.description || `${displayName} - Premium dental care in ${business.area || 'Delhi'} with ${business.experience_years || 10}+ years of experience.`,
    requestFramePermissions: ["microphone"]
  };

  return JSON.stringify(metadata, null, 2);
}

// Customize package.json
function customizePackageJson(content, config) {
  const { slug } = config;

  const pkg = JSON.parse(content);
  pkg.name = slug;

  return JSON.stringify(pkg, null, 2);
}

// Customize App.tsx to include LeadPopup
function customizeApp(content, config) {
  const { business, colorTheme } = config;
  const displayName = business.business_name.replace(/['']/g, "'").replace(/'/g, "\\'");

  // Add LeadPopup import
  if (!content.includes("import { LeadPopup }")) {
    content = content.replace(
      "import { FloatingRobotHead } from './components/FloatingRobotHead';",
      "import { FloatingRobotHead } from './components/FloatingRobotHead';\nimport { LeadPopup } from './components/LeadPopup';"
    );
  }

  // Add LeadPopup component before closing div
  if (!content.includes("<LeadPopup")) {
    content = content.replace(
      "{/* AI Integration Components */}",
      `{/* Lead Capture Popup */}\n      <LeadPopup clinicName="${displayName}" accentColor="${colorTheme.primary}" />\n\n      {/* AI Integration Components */}`
    );
  }

  return content;
}

// Helper to convert hex to rgba format
function hexToRgba(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 'rgba(0, 229, 255';
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}`;
}

// Run the generator
generateWebsites().catch(console.error);
