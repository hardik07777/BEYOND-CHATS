import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("original");

  useEffect(() => {
    api.get(`/articles/${id}`)
      .then(res => {
        // If your API wraps data, change to res.data.data
        setArticle(res.data.data ?? res.data);
      })
      .catch(err => {
        console.error("Failed to fetch article", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading article...</p>;
  }

  if (!article) {
    return <p className="p-6 text-red-500">Article not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">
        {article.title}
      </h1>

      {/* Meta */}
      <p className="text-sm text-gray-500 mb-6">
        Published on {new Date(article.created_at).toDateString()}
      </p>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setTab("original")}
          className={`pb-2 font-medium ${
            tab === "original"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Original
        </button>

        <button
          onClick={() => setTab("updated")}
          className={`pb-2 font-medium ${
            tab === "updated"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
          }`}
        >
          Updated
        </button>
      </div>

      {/* Content */}
      {tab === "original" && (
        <div className="prose max-w-none">
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                Original content is hosted on BeyondChats.
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Read original article →
              </a>
            </div>
          )}
        </div>
      )}

      {tab === "updated" && (
        <div className="prose max-w-none">
          {article.updated_content ? (
            <div dangerouslySetInnerHTML={{ __html: article.updated_content }} />
          ) : (
            <p className="text-gray-500">
              Updated / AI-rewritten version not available yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
