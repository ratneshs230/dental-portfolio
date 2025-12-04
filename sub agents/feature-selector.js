/**
 * Feature Selector
 * Randomly selects features for each dental website
 */

export class FeatureSelector {
  constructor() {
    this.selectionHistory = new Map();
  }

  /**
   * Select random features for a website
   * @param {Array} features - Available features
   * @param {number} min - Minimum features to select
   * @param {number} max - Maximum features to select
   * @returns {Array} Selected features
   */
  selectFeatures(features, min = 4, max = 6) {
    const count = this.randomInt(min, max);
    const shuffled = this.shuffleArray([...features]);
    return shuffled.slice(0, count);
  }

  /**
   * Select features with weighted probability
   * Some features are more important for dental clinics
   */
  selectWeightedFeatures(features, min = 4, max = 6) {
    const weights = {
      'appointment-booking': 3,    // Most important
      'seo-geo': 3,               // Critical for local business
      'ai-chatbot': 2,            // High engagement
      'multi-language': 2,        // Delhi is multilingual
      'smile-assessment': 2,      // Lead generation
      'bill-generation': 1,       // Useful
      'file-upload': 1,           // Standard
      'voice-assistant': 1        // Nice to have
    };

    // Create weighted pool
    const weightedPool = [];
    features.forEach(feature => {
      const weight = weights[feature.id] || 1;
      for (let i = 0; i < weight; i++) {
        weightedPool.push(feature);
      }
    });

    // Select unique features
    const selected = new Set();
    const count = this.randomInt(min, max);

    while (selected.size < count && weightedPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * weightedPool.length);
      const feature = weightedPool[randomIndex];
      selected.add(feature);
      // Remove all instances of this feature from pool
      for (let i = weightedPool.length - 1; i >= 0; i--) {
        if (weightedPool[i].id === feature.id) {
          weightedPool.splice(i, 1);
        }
      }
    }

    return Array.from(selected);
  }

  /**
   * Ensure certain features are always included
   */
  selectWithRequired(features, requiredIds, min = 4, max = 6) {
    const required = features.filter(f => requiredIds.includes(f.id));
    const optional = features.filter(f => !requiredIds.includes(f.id));

    const additionalCount = Math.max(0, this.randomInt(min, max) - required.length);
    const shuffledOptional = this.shuffleArray(optional);

    return [...required, ...shuffledOptional.slice(0, additionalCount)];
  }

  /**
   * Get feature distribution statistics
   */
  getDistribution(allSelections) {
    const distribution = {};

    allSelections.forEach(selection => {
      selection.forEach(feature => {
        distribution[feature.id] = (distribution[feature.id] || 0) + 1;
      });
    });

    return distribution;
  }

  // Utility: Fisher-Yates shuffle
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Utility: Random integer in range
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export default FeatureSelector;
