import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(url) {
  try {
    const { data: html } = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    const $ = cheerio.load(html);

    // Remove junk
    $("script, style, nav, footer, header, aside, noscript").remove();

    // Try common article containers
    let content =
      $("article").text() ||
      $("main").text() ||
      $(".post-content").text() ||
      $(".entry-content").text() ||
      $("body").text();

    // Clean text
    content = content
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 5000); // limit size for LLM

    return content;
  } catch (err) {
    console.error(`Failed to scrape ${url}`);
    return "";
  }
}
