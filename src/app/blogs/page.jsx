"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Search, AlertCircle, BookOpen, RefreshCw, PenTool, Sparkles } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

const CATEGORIES = ["All", "Technology", "Programming", "AI", "Business", "Lifestyle", "Education"];

// Shimmer skeleton loading effect
function BlogSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      {/* Cover Image Placeholder */}
      <div className="h-48 bg-slate-200 w-full" />
      {/* Content Placeholder */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata placeholder */}
          <div className="flex gap-4 mb-3">
            <div className="h-3.5 bg-slate-200 rounded w-1/4" />
            <div className="h-3.5 bg-slate-200 rounded w-1/4" />
          </div>
          {/* Title placeholder */}
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
          {/* Description placeholder */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
          </div>
        </div>
        {/* Button placeholder */}
        <div className="h-6 bg-slate-200 rounded w-1/4 mt-auto pt-4 border-t border-slate-100" />
      </div>
    </div>
  );
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URI || "http://localhost:5000";

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${baseUrl}/api/blogs`);
      // API returns { message: "...", blogs: [...] }
      if (response.data && Array.isArray(response.data.blogs)) {
        setBlogs(response.data.blogs);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to fetch blog posts. Please check if backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter and search logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase());

    const titleLower = (blog.title || "").toLowerCase();
    const contentLower = (blog.content || "").toLowerCase();
    const categoryLower = (blog.category || "").toLowerCase();
    const authorLower = (blog.authorName || "").toLowerCase();
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch =
      titleLower.includes(searchLower) ||
      contentLower.includes(searchLower) ||
      categoryLower.includes(searchLower) ||
      authorLower.includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-100/20 blur-3xl" />

      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            <Sparkles className="h-3 w-3" />
            Explore InkAI Blogs
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
            Discover Articles &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Insights
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest in technology, AI-assisted writing, programming tips, and business strategies from our contributors.
          </p>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 mb-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search blogs by title, keywords or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          {/* Create New Blog shortcut */}
          <Link
            href="/blogs/create"
            className="flex items-center justify-center gap-2 self-start md:self-auto rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-200 shrink-0"
          >
            <PenTool className="h-4 w-4" />
            Write a Blog
          </Link>
        </div>

        {/* Category filtering tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Content Section */}
        {loading ? (
          /* Loading Skeletal State */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <BlogSkeleton key={idx} />
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="bg-red-50 border border-red-200/60 rounded-2xl p-8 max-w-lg mx-auto text-center shadow-sm">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Error Loading Blogs</h3>
            <p className="text-sm text-red-700 mb-6">{error}</p>
            <button
              onClick={fetchBlogs}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm shadow-md shadow-red-500/15 hover:bg-red-700 transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Connection
            </button>
          </div>
        ) : filteredBlogs.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 max-w-xl mx-auto text-center shadow-sm">
            <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No blogs found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
              {searchQuery || selectedCategory !== "All"
                ? "We couldn't find any blogs matching your search query or selected category filter. Try clearing filters or searching for something else."
                : "It looks like there are no published blogs yet. Be the first one to write and share an amazing article!"}
            </p>
            <div className="flex justify-center gap-4">
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  Clear Filters
                </button>
              )}
              <Link
                href="/blogs/create"
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-sm shadow-md transition-all"
              >
                Write a Blog
              </Link>
            </div>
          </div>
        ) : (
          /* Blogs Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
