'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function optimizePrompt(inputPrompt: string) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return {
      success: false,
      error: 'API Key not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to .env',
      optimizedPrompt: ''
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are an expert Prompt Engineer. Your task is to rewrite the given user prompt into a highly optimized System Prompt for an LLM.
    
    Follow this structure:
    1. **Role**: Define the AI's persona.
    2. **Context**: Provide necessary background.
    3. **Task**: Clearly state the objective.
    4. **Constraints**: List absolute rules (dos and don'ts).
    5. **Output Format**: Define how the response should look.
    6. **Examples** (Optional): Provide few-shot examples if implied.

    Return ONLY the optimized prompt text. Do not add markdown code blocks like \`\`\` or conversational filler.`;

    const result = await model.generateContent([systemPrompt, `User Prompt to Optimize:\n${inputPrompt}`]);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      optimizedPrompt: text.trim()
    };
  } catch (error: any) {
    console.error('Gemini Optimization Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to optimize prompt',
      optimizedPrompt: ''
    };
  }
}
