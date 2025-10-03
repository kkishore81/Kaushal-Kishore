
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client.
// Per guidelines, the API_KEY environment variable is assumed to be set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const systemInstruction = `You are the AI financial advisor for "Indian Money Code." Your goal is to provide clear, insightful, and unbiased investment advice to help users make informed decisions. 
- Do not provide legally binding financial advice. Always include a disclaimer that users should consult with a qualified professional.
- Keep your responses concise and easy to understand for a general audience.
- Be encouraging and positive in your tone.`;

export const getInvestmentAdvice = async (prompt: string): Promise<string> => {
  try {
    // Generate content using the recommended model and structure.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    // Extract text directly from the response object.
    return response.text;
  } catch (error) {
    console.error("Error fetching investment advice from Gemini API:", error);
    // Provide a generic error message to the user.
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};
