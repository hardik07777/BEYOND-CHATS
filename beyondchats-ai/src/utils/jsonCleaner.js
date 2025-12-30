export function cleanGeminiJSON(text) {
  // remove ```json ``` wrappers
  let cleaned = text.replace(/```json|```/g, "").trim();

  // extract first JSON block safely
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No valid JSON found in Gemini response");
  }

  cleaned = cleaned.substring(firstBrace, lastBrace + 1);

  return JSON.parse(cleaned);
}