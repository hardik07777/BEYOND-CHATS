import axios from "axios";

const SERP_API = "https://serpapi.com/search";

export async function searchTopBlogs(query) {
  const response = await axios.get(SERP_API, {
    params: {
      q: query,
      engine: "google",
      api_key: process.env.SERP_API_KEY,
      num: 5
    }
  });

  const results = response.data.organic_results || [];

  // Filter only blog/article links
  const blogs = results
    .filter(r =>
      r.link &&
      !r.link.includes("beyondchats.com") &&
      !r.link.includes("youtube.com") &&
      !r.link.includes("reddit.com")
    )
    .slice(0, 2)
    .map(r => ({
      title: r.title,
      link: r.link
    }));

  return blogs;
}
