/**
 * Generate portfolio data from all dental clinic websites
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const websitesDir = path.resolve(__dirname, '../../websites');
const outputFile = path.resolve(__dirname, '../data/clinics.json');

async function generatePortfolioData() {
  console.log('Scanning websites directory...');

  const websites = [];
  const folders = fs.readdirSync(websitesDir);

  for (const folder of folders) {
    const folderPath = path.join(websitesDir, folder);
    const stat = fs.statSync(folderPath);

    if (!stat.isDirectory()) continue;

    // Read generation log
    const logPath = path.join(folderPath, 'generation-log.json');
    const manifestPath = path.join(folderPath, 'features-manifest.json');
    const clinicDataPath = path.join(folderPath, 'data', 'clinic.json');

    if (!fs.existsSync(logPath)) continue;

    try {
      const log = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
      const manifest = fs.existsSync(manifestPath)
        ? JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
        : { integratedFeatures: [] };

      let clinicData = {};
      if (fs.existsSync(clinicDataPath)) {
        clinicData = JSON.parse(fs.readFileSync(clinicDataPath, 'utf-8'));
      }

      websites.push({
        id: log.clinic?.id || folder,
        folder,
        name: log.clinic?.name || folder,
        area: log.clinic?.area || 'Delhi',
        design: log.design || {},
        features: manifest.integratedFeatures || [],
        featureCount: manifest.totalFeatures || 0,
        framework: log.framework || {},
        generatedAt: log.generatedAt,
        // Additional clinic info
        phone: clinicData.phones?.[0] || '',
        experience: clinicData.experience || 0,
        rating: clinicData.avgRating || 0,
        reviews: clinicData.totalReviews || 0,
        consultationFee: clinicData.consultationFee || '₹500',
      });
    } catch (err) {
      console.error(`Error processing ${folder}:`, err.message);
    }
  }

  // Sort by name
  websites.sort((a, b) => a.name.localeCompare(b.name));

  // Ensure data directory exists
  const dataDir = path.dirname(outputFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write output
  fs.writeFileSync(outputFile, JSON.stringify({
    totalWebsites: websites.length,
    generatedAt: new Date().toISOString(),
    websites
  }, null, 2));

  console.log(`Generated portfolio data for ${websites.length} websites`);
  console.log(`Output: ${outputFile}`);
}

generatePortfolioData();
