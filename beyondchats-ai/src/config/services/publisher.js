import fetch from "node-fetch";

const API_BASE = process.env.LARAVEL_API_BASE;

export async function publishArticle(id, payload) {
  const response = await fetch(`${API_BASE}/articles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json" // 🔥 THIS FIXES 419
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Publish failed (${id}): ${err}`);
  }

  return await response.json();
}
