import { NextRequest, NextResponse } from 'next/server';
import { AI_CONFIG } from '@/lib/ai-config';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are Softcode Assistant, a helpful AI assistant for a coding learning platform. You help users with programming questions, explain code concepts, and provide guidance on their learning journey. Be friendly, encouraging, and educational.

User message: ${message}

Please provide a helpful response that would assist someone learning to code.`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: AI_CONFIG.getConfig('CHATBOT').temperature,
        topK: AI_CONFIG.getConfig('CHATBOT').topK,
        topP: AI_CONFIG.getConfig('CHATBOT').topP,
        maxOutputTokens: AI_CONFIG.getConfig('CHATBOT').maxTokens,
      },
    };

    const response = await fetch(AI_CONFIG.getApiUrl('CHATBOT'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Invalid response structure:', data);
      return NextResponse.json(
        { error: 'Invalid response from AI' },
        { status: 500 }
      );
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 