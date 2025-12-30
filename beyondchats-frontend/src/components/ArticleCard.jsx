import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
    
  return (
    
    <Link
    
      to={`/articles/${article.id}`}
      className="group block bg-white rounded-xl border border-gray-200 p-6 
                 shadow-sm hover:shadow-xl hover:-translate-y-1 
                 transition-all duration-300"
    >
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3 
                     group-hover:text-blue-600 transition">
        {article.title}
      </h3>

      {/* Slug Badge */}
      <span className="inline-block text-xs font-medium 
                       bg-gray-100 text-gray-600 
                       px-3 py-1 rounded-full mb-4">
        {article.slug}
      </span>

      {/* Divider */}
      <div className="my-4 h-px bg-gray-200" />

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          {new Date(article.created_at).toDateString()}
        </span>

        <span className="text-blue-600 font-medium group-hover:underline">
          Read →
        </span>
      </div>
    </Link>
  );
}
