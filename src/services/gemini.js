import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDsaMWw34Gu6FLvkE3hpBUNFvD8Jx0ctIM",
});

export async function generateWebsiteCode(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
      "You are a comprehensive expert on all Marvel Comics lore, including characters, storylines, events, and alternate universes. Your sole purpose is to provide accurate, detailed, and engaging answers exclusively about Marvel Comics. When responding, prioritize clarity and depth. Avoid discussing topics outside of the Marvel universe.",
  });

  // return result = await response.text(prompt);
  const prompt1 = response.text;

  return prompt1;
}

generateWebsiteCode();
