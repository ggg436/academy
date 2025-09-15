// AI Configuration for Google AI Studio API Keys
// This file manages different API keys for different features to avoid rate limits

interface AIConfig {
  API_KEYS: {
    CHATBOT: string;
    TEXT_EXPLANATION: string;
    FUTURE_FEATURES: string;
  };
  GEMINI_API_URL: string;
  FEATURES: {
    CHATBOT: {
      apiKey: string;
      maxTokens: number;
      temperature: number;
      topK: number;
      topP: number;
    };
    TEXT_EXPLANATION: {
      apiKey: string;
      maxTokens: number;
      temperature: number;
      topK: number;
      topP: number;
    };
  };
  getApiKey: (feature: 'CHATBOT' | 'TEXT_EXPLANATION') => string;
  getConfig: (feature: 'CHATBOT' | 'TEXT_EXPLANATION') => AIConfig['FEATURES']['CHATBOT' | 'TEXT_EXPLANATION'];
  getApiUrl: (feature: 'CHATBOT' | 'TEXT_EXPLANATION') => string;
}

export const AI_CONFIG: AIConfig = {
  // API Keys for different features
  API_KEYS: {
    CHATBOT: 'AIzaSyBDVapy9XTw7j-iGXdQzslOZwiYeRjRBEU',
    TEXT_EXPLANATION: 'AIzaSyDKrZ7iKQxiNoZyBKx3yyOx43KdiaBUexk',
    FUTURE_FEATURES: 'AIzaSyDEsq66aySpFESOcqIZ-GYs_hi4OuZvTNw', // Reserved for future AI features
  },
  
  // Base API URL
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
  
  // Feature-specific configurations
  FEATURES: {
    CHATBOT: {
      apiKey: 'AIzaSyBDVapy9XTw7j-iGXdQzslOZwiYeRjRBEU',
      maxTokens: 1024,
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    },
    TEXT_EXPLANATION: {
      apiKey: 'AIzaSyDKrZ7iKQxiNoZyBKx3yyOx43KdiaBUexk',
      maxTokens: 200,
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    },
  },
  
  // Helper function to get API key for a specific feature
  getApiKey: (feature: keyof typeof AI_CONFIG.FEATURES) => {
    return AI_CONFIG.FEATURES[feature].apiKey;
  },
  
  // Helper function to get configuration for a specific feature
  getConfig: (feature: keyof typeof AI_CONFIG.FEATURES) => {
    return AI_CONFIG.FEATURES[feature];
  },
  
  // Helper function to get API URL with key
  getApiUrl: (feature: keyof typeof AI_CONFIG.FEATURES) => {
    const apiKey = AI_CONFIG.getApiKey(feature);
    return `${AI_CONFIG.GEMINI_API_URL}?key=${apiKey}`;
  },
};

// Type definitions for better TypeScript support
export type AIFeature = 'CHATBOT' | 'TEXT_EXPLANATION';

// Export individual keys for backward compatibility (if needed)
export const CHATBOT_API_KEY = AI_CONFIG.API_KEYS.CHATBOT;
export const TEXT_EXPLANATION_API_KEY = AI_CONFIG.API_KEYS.TEXT_EXPLANATION;
export const FUTURE_FEATURES_API_KEY = AI_CONFIG.API_KEYS.FUTURE_FEATURES; 