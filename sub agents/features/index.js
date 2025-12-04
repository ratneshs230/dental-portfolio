/**
 * Feature Integrator
 * Manages integration of all features into generated websites
 */

import fs from 'fs-extra';
import path from 'path';
import { AppointmentBookingFeature } from './appointment-booking.js';
import { BillGenerationFeature } from './bill-generation.js';
import { FileUploadFeature } from './file-upload.js';
import { AIChatbotFeature } from './ai-chatbot.js';
import { VoiceAssistantFeature } from './voice-assistant.js';
import { SEOGeoFeature } from './seo-geo.js';
import { MultiLanguageFeature } from './multi-language.js';
import { SmileAssessmentFeature } from './smile-assessment.js';

export class FeatureIntegrator {
  constructor() {
    this.features = {
      'appointment-booking': new AppointmentBookingFeature(),
      'bill-generation': new BillGenerationFeature(),
      'file-upload': new FileUploadFeature(),
      'ai-chatbot': new AIChatbotFeature(),
      'voice-assistant': new VoiceAssistantFeature(),
      'seo-geo': new SEOGeoFeature(),
      'multi-language': new MultiLanguageFeature(),
      'smile-assessment': new SmileAssessmentFeature()
    };
  }

  async integrate(outputPath, selectedFeatures, clinicInfo) {
    const featuresDir = path.join(outputPath, 'components', 'features');
    await fs.ensureDir(featuresDir);

    const libDir = path.join(outputPath, 'lib');
    await fs.ensureDir(libDir);

    // Integrate each selected feature
    for (const feature of selectedFeatures) {
      const featureHandler = this.features[feature.id];
      if (featureHandler) {
        await featureHandler.integrate(outputPath, clinicInfo);
      }
    }

    // Generate feature manifest
    await this.generateManifest(outputPath, selectedFeatures);
  }

  async generateManifest(outputPath, selectedFeatures) {
    const manifest = {
      integratedFeatures: selectedFeatures.map(f => ({
        id: f.id,
        name: f.name,
        integratedAt: new Date().toISOString()
      })),
      totalFeatures: selectedFeatures.length
    };

    await fs.writeJson(
      path.join(outputPath, 'features-manifest.json'),
      manifest,
      { spaces: 2 }
    );
  }
}

export default FeatureIntegrator;
