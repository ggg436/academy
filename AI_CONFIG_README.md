# AI Configuration System

This document explains how the AI configuration system works in the Softcode application, which uses multiple Google AI Studio API keys to avoid rate limits.

## Overview

The AI configuration system distributes different API keys across various AI features to prevent hitting rate limits on individual keys. Each feature uses its own dedicated API key.

## API Key Distribution

### Current Features

1. **Chatbot** (`CHATBOT`)
   - API Key: `AIzaSyBDVapy9XTw7j-iGXdQzslOZwiYeRjRBEU`
   - Usage: Chatbot assistant for coding help
   - Max Tokens: 1024
   - Temperature: 0.7

2. **Text Explanation** (`TEXT_EXPLANATION`)
   - API Key: `AIzaSyDKrZ7iKQxiNoZyBKx3yyOx43KdiaBUexk`
   - Usage: Text explanation for selected content
   - Max Tokens: 200
   - Temperature: 0.7

3. **Future Features** (`FUTURE_FEATURES`)
   - API Key: `AIzaSyDEsq66aySpFESOcqIZ-GYs_hi4OuZvTNw`
   - Usage: Reserved for future AI features
   - Status: Available for new features

## Files

### Core Configuration
- `lib/ai-config.ts` - Main configuration file with API keys and settings
- `lib/ai-utils.ts` - Utility functions for AI features

### API Routes
- `app/api/chatbot/route.ts` - Chatbot API using CHATBOT key
- `app/api/text-explanation/route.ts` - Text explanation API using TEXT_EXPLANATION key

## Usage

### Basic Usage

```typescript
import { AI_CONFIG } from '@/lib/ai-config';

// Get API key for a specific feature
const chatbotKey = AI_CONFIG.getApiKey('CHATBOT');

// Get full configuration for a feature
const config = AI_CONFIG.getConfig('TEXT_EXPLANATION');

// Get API URL with key
const apiUrl = AI_CONFIG.getApiUrl('CHATBOT');
```

### Using Utility Functions

```typescript
import { makeAICall } from '@/lib/ai-utils';

const response = await makeAICall({
  prompt: "Explain what HTML is",
  feature: 'TEXT_EXPLANATION',
  customConfig: {
    maxTokens: 150,
    temperature: 0.5
  }
});

if (response.success) {
  console.log(response.data);
} else {
  console.error(response.error);
}
```

## Adding New AI Features

To add a new AI feature:

1. **Update the configuration** in `lib/ai-config.ts`:
   ```typescript
   FEATURES: {
     // ... existing features
     NEW_FEATURE: {
       apiKey: 'YOUR_NEW_API_KEY',
       maxTokens: 500,
       temperature: 0.7,
       topK: 40,
       topP: 0.95,
     },
   }
   ```

2. **Update the type definitions**:
   ```typescript
   export type AIFeature = 'CHATBOT' | 'TEXT_EXPLANATION' | 'NEW_FEATURE';
   ```

3. **Create the API route** using the utility functions:
   ```typescript
   import { makeAICall } from '@/lib/ai-utils';
   
   const response = await makeAICall({
     prompt: "Your prompt here",
     feature: 'NEW_FEATURE'
   });
   ```

## Rate Limiting

Each API key has its own rate limits:
- **Free tier**: 50 requests/day per key
- **Paid tier**: Higher limits based on your Google AI Studio plan

By using different keys for different features, you can:
- Distribute the load across multiple keys
- Avoid hitting limits on a single key
- Provide better user experience with dedicated keys per feature

## Monitoring

To monitor API key usage:

```typescript
import { getAPIKeyUsage } from '@/lib/ai-utils';

const usage = getAPIKeyUsage();
console.log(usage);
```

## Best Practices

1. **Never commit API keys to version control** - Use environment variables in production
2. **Monitor usage** - Keep track of which features use which keys
3. **Plan ahead** - Reserve keys for future features
4. **Handle errors gracefully** - Implement fallbacks when rate limits are hit
5. **Use appropriate token limits** - Don't waste tokens on simple responses

## Environment Variables (Production)

In production, you should use environment variables:

```typescript
// In lib/ai-config.ts
API_KEYS: {
  CHATBOT: process.env.CHATBOT_API_KEY || 'fallback_key',
  TEXT_EXPLANATION: process.env.TEXT_EXPLANATION_API_KEY || 'fallback_key',
  FUTURE_FEATURES: process.env.FUTURE_FEATURES_API_KEY || 'fallback_key',
}
```

## Troubleshooting

### Rate Limit Errors
- Check which feature is hitting limits
- Consider redistributing API keys
- Implement caching for repeated requests

### API Key Issues
- Verify API keys are valid in Google AI Studio
- Check if keys have the necessary permissions
- Ensure keys are not expired

### Configuration Errors
- Verify all required fields are present in `ai-config.ts`
- Check TypeScript types match the configuration
- Ensure API routes are using the correct feature names 