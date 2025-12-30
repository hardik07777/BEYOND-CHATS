import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-gray-900">
          BeyondChats
        </Link>

        {/* Links */}
        <div className="space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Articles
          </Link>

          <a
            href="https://beyondchats.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Website
          </a>
        </div>
      </div>
    </nav>
  );
}
