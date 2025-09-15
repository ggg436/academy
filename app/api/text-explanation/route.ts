import { NextRequest, NextResponse } from 'next/server';
import { AI_CONFIG } from '@/lib/ai-config';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Fallback explanations for common terms when API is rate limited
const FALLBACK_EXPLANATIONS: Record<string, string> = {
  'HTML': 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of websites, using tags to define elements like headings, paragraphs, links, and images.',
  'CSS': 'CSS (Cascading Style Sheets) is a styling language used to control the appearance and layout of HTML elements. It handles colors, fonts, spacing, and responsive design to make websites look attractive.',
  'JavaScript': 'JavaScript is a programming language that adds interactivity and dynamic behavior to websites. It runs in web browsers and can manipulate HTML elements, handle user events, and make web pages responsive.',
  'React': 'React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM when data changes, making web development faster and more organized.',
  'API': 'API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other. It defines how to request and exchange data between systems.',
  'Database': 'A database is an organized collection of structured information or data, typically stored electronically. It allows for efficient storage, retrieval, and management of data for applications and websites.',
  'Node.js': 'Node.js is a JavaScript runtime environment that allows you to run JavaScript on the server-side. It enables developers to build scalable network applications and backend services using JavaScript.',
  'Python': 'Python is a high-level, interpreted programming language known for its simplicity and readability. It\'s widely used in web development, data science, artificial intelligence, and automation.',
  'Git': 'Git is a distributed version control system that tracks changes in source code during software development. It allows multiple developers to collaborate on projects and maintain a history of code changes.',
  'SQL': 'SQL (Structured Query Language) is a standard language for managing and manipulating relational databases. It\'s used to create, read, update, and delete data in database systems.'
};

export async function POST(request: NextRequest) {
  try {
    console.log("=== TEXT EXPLANATION API CALLED ===");
    
    const { text, context } = await request.json();
    console.log("Received request:", { text, context });

    if (!text || !text.trim()) {
      console.log("❌ No text provided");
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const prompt = `You are a helpful AI assistant for a coding learning platform. A user has selected some text and wants a simple, educational explanation.

${context || ''}

Selected text: "${text}"

Please provide a clear, simple explanation of this text that would help someone learning to code. Keep it concise (2-3 sentences) and educational. If it's a technical term, explain it in simple terms. If it's code, explain what it does. If it's a concept, break it down simply.`;

    console.log("Making request to Gemini API...");
    console.log("Prompt:", prompt);

    const response = await fetch(AI_CONFIG.getApiUrl('TEXT_EXPLANATION'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: AI_CONFIG.getConfig('TEXT_EXPLANATION').temperature,
          topK: AI_CONFIG.getConfig('TEXT_EXPLANATION').topK,
          topP: AI_CONFIG.getConfig('TEXT_EXPLANATION').topP,
          maxOutputTokens: AI_CONFIG.getConfig('TEXT_EXPLANATION').maxTokens,
        },
      }),
    });

    console.log("Gemini API response status:", response.status);
    console.log("Gemini API response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Gemini API error:', errorData);
      
      // Handle rate limiting specifically
      if (response.status === 429) {
        return NextResponse.json(
          { 
            error: 'AI service is temporarily unavailable due to high usage. Please try again later.',
            details: 'Rate limit exceeded (free tier: 50 requests/day)',
            rateLimited: true
          },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to get explanation from AI', details: errorData },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("✅ Gemini API response data:", JSON.stringify(data, null, 2));
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('❌ Invalid response structure:', data);
      return NextResponse.json(
        { error: 'Invalid response from AI', details: data },
        { status: 500 }
      );
    }

    const explanation = data.candidates[0].content.parts[0].text;
    console.log("✅ Final explanation:", explanation);
    console.log("=== TEXT EXPLANATION API COMPLETED ===");

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error('❌ CRITICAL ERROR in text explanation API:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : "Unknown"
    });
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 