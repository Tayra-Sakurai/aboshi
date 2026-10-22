import { GoogleGenAI } from "@google/genai";

export function createClient() {
  return new GoogleGenAI({
    apiKey: process.env.VITE_GEMINI_API_KEY,
  });
}