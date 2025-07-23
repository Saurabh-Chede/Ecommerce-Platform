import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDsaMWw34Gu6FLvkE3hpBUNFvD8Jx0ctIM",
});

export async function generateWebsiteCode(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
      "write only html and css code only",
  });

  
  const prompt1 = response.text;

  return prompt1;
}

generateWebsiteCode();
