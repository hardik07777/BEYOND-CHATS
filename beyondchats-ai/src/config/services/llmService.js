import Groq from "groq-sdk";

/**
 * Groq client (FREE)
 */
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Prompt builder (UNCHANGED)
 */
export function buildRewritePrompt({
  originalTitle,
  originalContent,
  externalSources = []   // 👈 DEFAULT VALUE (IMPORTANT)
}) {
  const sourcesText = externalSources.length
    ? externalSources
        .map((s, i) => `[${i + 1}] ${s.title} (${s.url})`)
        .join("\n")
    : "No external references available.";

  return `
You are an expert blog editor.

TASK:
- Fully rewrite the article in your own words
- Improve clarity and structure
- Do NOT copy sentences
- Do NOT hallucinate facts
- Preserve meaning
- Write a COMPLETE markdown article (not summary)

ORIGINAL TITLE:
${originalTitle}

ORIGINAL CONTENT:
${(originalContent || "").slice(0, 2000)}

REFERENCE SOURCES:
${sourcesText}
`;
}


/**
 * Rewrite using GROQ (FREE)
 */
export async function rewriteWithGroq(prompt) {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You are an expert blog editor."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3,
  });

  const text = response.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Groq returned empty content");
  }

  return text;
}
