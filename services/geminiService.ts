
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function analyzeClothingImage(base64Image: string): Promise<any> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: 'Analyze this piece of clothing. Provide the category (e.g., T-shirt, Jeans), condition (e.g., Good, Fair, Like New), material, and suggest whether it is better to "Donate" to an NGO or "Exchange" for a brand voucher based on its quality. Return as JSON.' }
      ]
    },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          condition: { type: Type.STRING },
          material: { type: Type.STRING },
          suggestedPath: { type: Type.STRING },
          estimatedValue: { type: Type.STRING }
        },
        required: ['category', 'condition', 'material', 'suggestedPath']
      }
    }
  });

  return JSON.parse(response.text || '{}');
}

export async function editClothingImage(base64Image: string, prompt: string): Promise<string | null> {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: prompt }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
