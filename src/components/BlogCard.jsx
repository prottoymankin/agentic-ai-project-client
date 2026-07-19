"use client";

import Link from "next/link";
import { Calendar, ArrowRight, User, Tag } from "lucide-react";

// Category color mappings matching the theme
const categoryStyles = {
  Technology: {
    badge: "bg-blue-50 text-blue-700 border-blue-200/60",
    text: "text-blue-600",
  },
  Programming: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    text: "text-emerald-600",
  },
  AI: {
    badge: "bg-purple-50 text-purple-700 border-purple-200/60",
    text: "text-purple-600",
  },
  Business: {
    badge: "bg-amber-50 text-amber-700 border-amber-200/60",
    text: "text-amber-600",
  },
  Lifestyle: {
    badge: "bg-rose-50 text-rose-700 border-rose-200/60",
    text: "text-rose-600",
  },
  Education: {
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    text: "text-indigo-600",
  },
};

export default function BlogCard({ blog }) {
  const {
    _id,
    title = "Untitled Post",
    content = "",
    coverImage,
    category = "Technology",
    createdAt,
    authorName = "Anonymous",
  } = blog;

  // Format creation date
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recent Post";

  // Get matching category style or default
  const style = categoryStyles[category] || {
    badge: "bg-slate-50 text-slate-700 border-slate-200",
    text: "text-slate-600",
  };

  // Get content for the snippet
  const plainTextContent = content || "No preview available for this blog post.";

  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-100 hover:border-blue-500/30">
      {/* Cover Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // Failback if image path breaks
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        {/* Fallback illustration using gradient */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-indigo-400 p-4 text-center"
          style={{ display: coverImage ? "none" : "flex" }}
        >
          <Tag className="h-10 w-10 mb-2 opacity-60 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-600/80">
            {category}
          </span>
        </div>

        {/* Category Badge overlay */}
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${style.badge} backdrop-blur-md shadow-sm`}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Author & Date Metadata */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span className="font-medium truncate max-w-[120px]">{authorName}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </span>
        </div>

        {/* Title (Line clamp 1) */}
        <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1 mb-2">
          <Link href={`/blogs/${_id}`}>
            {title}
          </Link>
        </h3>

        {/* Description/Snippet (Line clamp 3) */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
          {plainTextContent}
        </p>

        {/* Action Link (Read More) */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            href={`/blogs/${_id}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-colors duration-200 hover:text-indigo-600 group/btn"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
