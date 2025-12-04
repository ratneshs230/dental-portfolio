/**
 * Main Orchestrator for Dental Website Generation
 * Coordinates all sub-agents to build 100 dental clinic websites
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { CONFIG } from './config.js';
import { ClinicParser } from './clinic-parser.js';
import { FeatureSelector } from './feature-selector.js';
import { DesignMapper } from './design-mapper.js';
import { WebsiteGenerator } from './website-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Orchestrator {
  constructor() {
    this.clinicParser = new ClinicParser();
    this.featureSelector = new FeatureSelector();
    this.designMapper = new DesignMapper();
    this.websiteGenerator = new WebsiteGenerator();
    this.stats = {
      total: 0,
      generated: 0,
      failed: 0,
      startTime: null
    };
  }

  async initialize() {
    console.log('\n🦷 Dental Website Generator - Initializing...\n');

    // Ensure output directory exists
    const outputPath = path.resolve(__dirname, CONFIG.paths.outputDir);
    await fs.ensureDir(outputPath);

    // Load clinic data
    const clinicDataPath = path.resolve(__dirname, CONFIG.paths.clinicData);
    this.clinics = await this.clinicParser.loadClinics(clinicDataPath);
    this.stats.total = this.clinics.length;

    // Load design concepts
    const designPath = path.resolve(__dirname, CONFIG.paths.designConcepts);
    this.designConcepts = await this.designMapper.loadConcepts(designPath);

    console.log(`✅ Loaded ${this.clinics.length} dental clinics`);
    console.log(`✅ Loaded ${this.designConcepts.archetypes.length} design archetypes`);
    console.log(`✅ ${CONFIG.features.length} features available for integration\n`);
  }

  async generateAllWebsites() {
    this.stats.startTime = Date.now();
    console.log('🚀 Starting website generation for all clinics...\n');
    console.log('═'.repeat(60));

    for (let i = 0; i < this.clinics.length; i++) {
      const clinic = this.clinics[i];
      const progress = `[${i + 1}/${this.stats.total}]`;

      try {
        console.log(`\n${progress} Processing: ${clinic.business_name}`);
        await this.generateWebsite(clinic, i);
        this.stats.generated++;
        console.log(`   ✅ Generated successfully`);
      } catch (error) {
        this.stats.failed++;
        console.error(`   ❌ Failed: ${error.message}`);
      }
    }

    this.printSummary();
  }

  async generateWebsite(clinic, index) {
    // 1. Create folder name from clinic
    const folderName = this.clinicParser.generateFolderName(clinic);
    const outputPath = path.resolve(__dirname, CONFIG.paths.outputDir, folderName);

    // 2. Select random features (4-6)
    const selectedFeatures = this.featureSelector.selectFeatures(
      CONFIG.features,
      CONFIG.minFeatures,
      CONFIG.maxFeatures
    );

    // 3. Map design archetype (rotate through archetypes)
    const archetypeIndex = index % CONFIG.dentalArchetypes.length;
    const archetype = this.designMapper.getArchetype(
      this.designConcepts,
      CONFIG.dentalArchetypes[archetypeIndex]
    );

    // 4. Select color scheme
    const colorSchemes = Object.keys(CONFIG.colorSchemes);
    const colorKey = colorSchemes[index % colorSchemes.length];
    const colorScheme = CONFIG.colorSchemes[colorKey];

    // 5. Generate website
    const websiteConfig = {
      clinic,
      features: selectedFeatures,
      archetype,
      colorScheme,
      colorSchemeName: colorKey,
      outputPath
    };

    await this.websiteGenerator.generate(websiteConfig);

    // 6. Log the generation details
    await this.logGeneration(websiteConfig);
  }

  async generateSingleWebsite(clinicId) {
    const clinic = this.clinics.find(c => c.id === clinicId);
    if (!clinic) {
      throw new Error(`Clinic with ID ${clinicId} not found`);
    }

    const index = this.clinics.indexOf(clinic);
    await this.generateWebsite(clinic, index);
    console.log(`\n✅ Generated website for: ${clinic.business_name}`);
  }

  async logGeneration(config) {
    const logPath = path.join(config.outputPath, 'generation-log.json');
    const log = {
      generatedAt: new Date().toISOString(),
      clinic: {
        id: config.clinic.id,
        name: config.clinic.business_name,
        area: config.clinic.location?.area
      },
      design: {
        archetype: config.archetype?.id,
        colorScheme: config.colorSchemeName
      },
      features: config.features.map(f => ({
        id: f.id,
        name: f.name
      })),
      framework: {
        base: 'Next.js',
        styling: 'Tailwind CSS',
        ui: 'shadcn/ui',
        animations: 'Framer Motion'
      }
    };

    await fs.writeJson(logPath, log, { spaces: 2 });
  }

  printSummary() {
    const duration = ((Date.now() - this.stats.startTime) / 1000).toFixed(2);

    console.log('\n' + '═'.repeat(60));
    console.log('\n📊 Generation Summary\n');
    console.log(`   Total Clinics:     ${this.stats.total}`);
    console.log(`   ✅ Generated:      ${this.stats.generated}`);
    console.log(`   ❌ Failed:         ${this.stats.failed}`);
    console.log(`   ⏱️  Duration:       ${duration}s`);
    console.log(`   📁 Output:         ${path.resolve(__dirname, CONFIG.paths.outputDir)}`);
    console.log('\n' + '═'.repeat(60) + '\n');
  }
}

// Main execution
const args = process.argv.slice(2);
const orchestrator = new Orchestrator();

(async () => {
  try {
    await orchestrator.initialize();

    if (args.includes('--single') && args[args.indexOf('--single') + 1]) {
      const clinicId = args[args.indexOf('--single') + 1];
      await orchestrator.generateSingleWebsite(clinicId);
    } else if (args.includes('--preview')) {
      console.log('Preview mode - showing first 3 clinics configuration...\n');
      for (let i = 0; i < 3; i++) {
        const clinic = orchestrator.clinics[i];
        console.log(`${i + 1}. ${clinic.business_name} (${clinic.location?.area})`);
      }
    } else {
      await orchestrator.generateAllWebsites();
    }
  } catch (error) {
    console.error('❌ Orchestrator Error:', error.message);
    process.exit(1);
  }
})();

export { Orchestrator };
