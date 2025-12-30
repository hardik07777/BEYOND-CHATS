import "dotenv/config";

import { fetchArticles } from "./config/services/articleService.js"
import { searchTopBlogs } from "./config/services/googleSearch.js";
import { scrapeArticle } from "./config/services/scraper.js";
import {
  buildRewritePrompt,
  rewriteWithGroq
} from "./config/services/llmService.js";
// import { injectReferences } from "./utils/citations.js";
import { publishArticle } from "./config/services/publisher.js";

async function run() {
  const articles = await fetchArticles();

  for (const article of articles) {
    try {
      console.log(`\n📝 Processing: ${article.title}`);

      // 1️⃣ Google Search
      const links = await searchTopBlogs(article.title);

      // 2️⃣ Scrape sources
      const sources = [];
      for (const link of links.slice(0, 2)) {
        const content = await scrapeArticle(link.link);
        if (content.length > 1000) {
          sources.push({
            title: link.title,
            url: link.link,
            content : content.slice(0,1500)
          });
        }
      }

      if (sources.length === 0) {
        console.log("⚠️ Skipped: no usable sources");
        continue;
      }

      // 3️⃣ Prompt
      const prompt = buildRewritePrompt({
        originalTitle: article.title,
        originalContent: article.content,
        externalSources: sources
      });

      // 4️⃣ Groq rewrite
      const rewritten = await rewriteWithGroq(prompt);

      // 5️⃣ Inject references
      // const finalContent = injectReferences(
      //   rewritten.content,
      //   rewritten.references
      // );
      const finalContent = rewritten;


      // 6️⃣ Publish to Laravel
      await publishArticle(article.id, {
        title: article.title,
        updated_content: finalContent
      });

      console.log("✅ Published successfully");

    } catch (err) {
      console.error("❌ Error:", err.message);
    }
  }
}

run();
