
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeExpression(expression: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze this mathematical expression and provide a scientific breakdown: ${expression}`,
    config: {
      thinkingConfig: { thinkingBudget: 2000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          explanation: { type: Type.STRING, description: "A plain text explanation of the expression." },
          steps: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Step-by-step simplification or evaluation."
          },
          suggestedFormulas: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Related scientific or mathematical formulas."
          }
        },
        required: ["explanation", "steps", "suggestedFormulas"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function solveWordProblem(problem: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Solve this scientific/math word problem with detailed steps: ${problem}`,
    config: {
      thinkingConfig: { thinkingBudget: 4000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          explanation: { type: Type.STRING },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedFormulas: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["explanation", "steps", "suggestedFormulas"]
      }
    }
  });

  return JSON.parse(response.text);
}
