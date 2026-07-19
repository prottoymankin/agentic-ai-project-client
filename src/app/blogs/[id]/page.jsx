"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Calendar, User, Tag, Mail, Sparkles, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Category color mappings matching the theme
const categoryStyles = {
  Technology: "bg-blue-50 text-blue-700 border-blue-200/60",
  Programming: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  AI: "bg-purple-50 text-purple-700 border-purple-200/60",
  Business: "bg-amber-50 text-amber-700 border-amber-200/60",
  Lifestyle: "bg-rose-50 text-rose-700 border-rose-200/60",
  Education: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
};

export default function BlogDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URI || "http://localhost:5000";

  useEffect(() => {
    if (!id) return;

    const fetchBlogDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${baseUrl}/api/blogs/${id}`);
        // API returns { message: "...", blog: {...} }
        if (response.data && response.data.blog) {
          setBlog(response.data.blog);
        } else {
          setError("Blog post not found.");
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError(err.response?.data?.message || "Failed to load blog details. Make sure the server is online.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id, baseUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-sm font-semibold text-slate-500">Loading blog details...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 max-w-md w-full text-center shadow-md">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Notice</h3>
          <p className="text-sm text-slate-600 mb-6">{error || "We couldn't retrieve the blog details."}</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => router.push("/blogs")}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  const {
    title = "Untitled Post",
    content = "",
    coverImage,
    category = "Technology",
    createdAt,
    authorName = "Anonymous",
    authorEmail = "",
  } = blog;

  // Format creation date
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Recent Post";

  // Calculate reading time
  const wordCount = content ? content.split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Category style
  const badgeStyle = categoryStyles[category] || "bg-slate-50 text-slate-700 border-slate-200";

  // Initials for avatar fallback
  const authorInitials = authorName
    ? authorName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic background gradients */}
      <div className="absolute top-0 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-blue-100/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-100/20 blur-3xl" />

      <div className="max-w-7xl mx-auto">
        {/* Navigation Row */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/blogs")}
            className="group flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Blogs
          </button>

          <Link
            href="/blogs/create"
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-indigo-600 bg-blue-50/50 hover:bg-blue-50 px-3.5 py-1.5 rounded-xl border border-blue-100/50 transition-all shadow-sm"
          >
            <Sparkles className="h-3 w-3" />
            Write with AI
          </Link>
        </div>

        {/* Blog Details Box */}
        <article className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50">
          
          {/* Large cover image header */}
          <div className="relative w-full h-[240px] sm:h-[380px] md:h-[440px] bg-slate-100">
            {coverImage ? (
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}

            {/* Fallback gradient banner */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600/90 to-indigo-700/90 p-8 text-center"
              style={{ display: coverImage ? "none" : "flex" }}
            >
              <Tag className="h-16 w-16 text-white/50 mb-3 animate-pulse" />
              <span className="text-sm font-semibold tracking-widest uppercase text-white/80">
                {category}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10 md:p-12">
            {/* Category and Reading Time info */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyle} shadow-sm`}>
                {category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/50">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} min read ({wordCount} words)
              </span>
            </div>

            {/* Large title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-8">
              {title}
            </h1>

            {/* Author Profile Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 bg-slate-50 border border-slate-200/60 rounded-2xl mb-8">
              <div className="flex items-center gap-4">
                {/* User Avatar */}
                <div className="h-12 w-12 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-blue-500/10">
                  {authorInitials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    {authorName}
                  </h4>
                  {authorEmail && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Mail className="h-3 w-3 text-slate-400" />
                      {authorEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Published Date */}
              <div className="text-sm text-slate-500 flex items-center gap-1.5 sm:self-auto self-end">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>Published on {formattedDate}</span>
              </div>
            </div>

            {/* Rendered Blog Content */}
            <div className="text-slate-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {content}
            </div>

            {/* Footer Prompt */}
            <div className="border-t border-slate-150 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Enjoyed this article?</h4>
                <p className="text-xs text-slate-500 mt-1">Generate your own blog post instantly using our AI assistant.</p>
              </div>
              <Link
                href="/blogs/create"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-lg transition-all"
              >
                <Sparkles className="h-4 w-4" />
                Generate Blog
              </Link>
            </div>

          </div>
        </article>
      </div>
    </div>
  );
}
