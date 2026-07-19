"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { AlertCircle, BookOpen, PenTool, Sparkles, RefreshCw } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export default function MyBlogsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URI || "http://localhost:5000";

  const fetchMyBlogs = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${baseUrl}/api/my-blogs?id=${session.user.id}`);
      if (response.data && Array.isArray(response.data.blogs)) {
        setBlogs(response.data.blogs);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching my blogs:", err);
      setError("Failed to fetch your blog posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if user is not authenticated, otherwise fetch blogs
  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/login");
      } else {
        fetchMyBlogs();
      }
    }
  }, [session, isPending, router]);

  // Loading spinner for auth check and initial fetch
  if (isPending || (loading && !error && session)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100/30 blur-3xl" />
      <div className="absolute bottom-10 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-100/20 blur-3xl" />

      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            <Sparkles className="h-3 w-3" />
            Your Dashboard
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
            My Published{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Articles
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Manage, review, and view all the blog posts you have written and published on InkAI.
          </p>
        </div>

        {/* Content Section */}
        {error ? (
          /* Error State */
          <div className="bg-red-50 border border-red-200/60 rounded-2xl p-8 max-w-lg mx-auto text-center shadow-sm">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Error Loading Blogs</h3>
            <p className="text-sm text-red-700 mb-6">{error}</p>
            <button
              onClick={fetchMyBlogs}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm shadow-md shadow-red-500/15 hover:bg-red-700 transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Connection
            </button>
          </div>
        ) : blogs.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 max-w-xl mx-auto text-center shadow-sm">
            <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">You haven't written any blogs yet</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
              Create your very first blog post manually or generate it instantly with the assistance of AI.
            </p>
            <Link
              href="/blogs/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all duration-200"
            >
              <PenTool className="h-4 w-4" />
              Write Your First Blog
            </Link>
          </div>
        ) : (
          /* My Blogs Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
