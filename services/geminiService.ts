
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this example, we'll throw an error if the key is missing.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are the AI financial advisor for "Indian Money Code." Your goal is to provide clear, insightful, and unbiased investment advice to help users make informed decisions. 
- Do not provide legally binding financial advice. Always include a disclaimer that users should consult with a qualified professional.
- Keep your responses concise and easy to understand for a general audience.
- When suggesting funds or strategies, briefly explain the rationale behind your recommendations.
- Be encouraging and positive in your tone.`;


export const getInvestmentAdvice = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "API key is not configured. Please set the API_KEY environment variable.";
  }
  
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        },
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching investment advice:", error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};