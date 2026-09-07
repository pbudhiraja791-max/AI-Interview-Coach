import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

export function getGeminiModel(customApiKey = null, modelName = "gemini-1.5-flash") {
  const apiKey = (customApiKey || process.env.GEMINI_API_KEY || "").trim();
  if (!apiKey) {
    return null;
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: 0.4,
        topP: 0.9,
        responseMimeType: "application/json"
      }
    });
  } catch (err) {
    console.warn("Failed to initialize GoogleGenerativeAI model:", err.message);
    return null;
  }
}

export async function generateJSONWithGemini(prompt, systemInstruction = "", customApiKey = null) {
  const model = getGeminiModel(customApiKey);
  if (!model) {
    return null; // Signals fallback to smart mock AI engine
  }

  try {
    const fullPrompt = `${systemInstruction ? `System Instructions:\n${systemInstruction}\n\n` : ''}Prompt:\n${prompt}\n\nStrict requirement: Output valid, parseable JSON matching the required schema only. Do not wrap in markdown quotes if possible, or wrap cleanly in \`\`\`json.`;
    
    const result = await model.generateContent(fullPrompt);
    const text = result?.response?.text ? result.response.text() : "";
    
    if (!text || text.trim() === "") {
      return null;
    }

    // Clean potential markdown wrappers
    let cleanJson = text.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    try {
      return JSON.parse(cleanJson);
    } catch (parseErr) {
      // Attempt regex extraction of the first JSON object or array
      const jsonMatch = cleanJson.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw parseErr;
    }
  } catch (error) {
    console.warn("Gemini API call warning/error:", error.message || error);
    return null; // Return null so fallback engine seamlessly provides realistic dynamic results
  }
}
