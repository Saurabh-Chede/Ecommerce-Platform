

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey:''});

export async function generateWebsiteCode(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "generate html and css code only",
  });

   

  // return result = await response.text(prompt);
  const prompt1 = response.text

  return prompt1
  
  
}
 
generateWebsiteCode();
