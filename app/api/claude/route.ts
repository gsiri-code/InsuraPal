import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();
    
    const formattedMessages = messages.map((message: { role: string; content: string }) => ({
      role: message.role,
      content: message.content
    }));

    const requestBody: any = {
      model: 'claude-3-haiku-20240307',
      messages: formattedMessages,
      max_tokens: 1000,
      temperature: 0.7,
    };

    if (context) {
      requestBody.system = context;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Claude API error:', data);
      return NextResponse.json(
        { error: 'Error from Claude API', details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply: data.content[0].text });
  } catch (error) {
    console.error('Error in Claude API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
