import axios from "axios";

export async function translateText(text, targetLang, apiKey) {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  const headers = {
    "Content-Type": "application/json",
    "X-goog-api-key": apiKey,
  };
  const prompt = `Translate this message to ${targetLang}: ${text} if it is already in ${targetLang} then return the same text.Also just give the translation without any additional text or explanation not even a single extra word.`;
  const data = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };
  try {
    const response = await axios.post(url, data, { headers });
    return response.data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("Translation error:", error?.response?.data || error.message);
    return text; // fallback to original
  }
}
