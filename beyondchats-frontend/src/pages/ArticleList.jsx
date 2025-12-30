import { useEffect, useState } from "react";
import api from "../api/axios";
import ArticleCard from "../components/ArticleCard";
// import InfiniteGrid from "@/components/infinite-grid-integration";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/articles")
      .then(res => {
        setArticles(res.data.data);
      })
      .catch(err => {
        console.error("Failed to fetch articles", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6">Loading articles...</p>;
  }

  return (
   <div className="min-h-screen bg-gray-50">
  <section className="max-w-6xl mx-auto px-6 py-12">
    <div className="mb-10">
      <h2 className="text-4xl font-bold text-gray-900">
        Articles
      </h2>
      <p className="mt-2 text-gray-600">
        Read the latest insights and updates
      </p>
    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  </section>
</div>

  );
}
