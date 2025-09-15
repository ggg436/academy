import { AI_CONFIG, AIFeature } from './ai-config';

// Utility functions for AI features

export interface AIRequestConfig {
  prompt: string;
  feature: AIFeature;
  customConfig?: {
    temperature?: number;
    maxTokens?: number;
    topK?: number;
    topP?: number;
  };
}

export interface AIResponse {
  success: boolean;
  data?: string;
  error?: string;
  details?: any;
}

/**
 * Generic function to make AI API calls
 * @param config - Configuration for the AI request
 * @returns Promise<AIResponse>
 */
export async function makeAICall(config: AIRequestConfig): Promise<AIResponse> {
  try {
    const featureConfig = AI_CONFIG.getConfig(config.feature);
    
    // Use custom config if provided, otherwise use default feature config
    const finalConfig = {
      temperature: config.customConfig?.temperature ?? featureConfig.temperature,
      topK: config.customConfig?.topK ?? featureConfig.topK,
      topP: config.customConfig?.topP ?? featureConfig.topP,
      maxOutputTokens: config.customConfig?.maxTokens ?? featureConfig.maxTokens,
    };

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: config.prompt
            }
          ]
        }
      ],
      generationConfig: finalConfig,
    };

    const response = await fetch(AI_CONFIG.getApiUrl(config.feature), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`AI API error for ${config.feature}:`, errorData);
      
      // Handle rate limiting
      if (response.status === 429) {
        return {
          success: false,
          error: 'AI service is temporarily unavailable due to high usage. Please try again later.',
          details: 'Rate limit exceeded'
        };
      }
      
      return {
        success: false,
        error: 'Failed to get response from AI',
        details: errorData
      };
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      return {
        success: false,
        error: 'Invalid response from AI',
        details: data
      };
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    return {
      success: true,
      data: aiResponse
    };
  } catch (error) {
    console.error(`AI call error for ${config.feature}:`, error);
    return {
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Get API key usage information
 * @returns Object with API key usage details
 */
export function getAPIKeyUsage() {
  return {
    chatbot: {
      key: AI_CONFIG.getApiKey('CHATBOT'),
      usage: 'Chatbot assistant for coding help'
    },
    textExplanation: {
      key: AI_CONFIG.getApiKey('TEXT_EXPLANATION'),
      usage: 'Text explanation for selected content'
    },
    futureFeatures: {
      key: AI_CONFIG.API_KEYS.FUTURE_FEATURES,
      usage: 'Reserved for future AI features'
    }
  };
}

/**
 * Check if a feature is available
 * @param feature - The AI feature to check
 * @returns boolean
 */
export function isFeatureAvailable(feature: AIFeature): boolean {
  return feature in AI_CONFIG.FEATURES;
}

/**
 * Get available features
 * @returns Array of available feature names
 */
export function getAvailableFeatures(): AIFeature[] {
  return Object.keys(AI_CONFIG.FEATURES) as AIFeature[];
} 