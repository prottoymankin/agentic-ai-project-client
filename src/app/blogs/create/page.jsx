"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { Sparkles, Image as ImageIcon, Send, BrainCircuit, CheckCircle, AlertCircle, Trash, PenTool } from "lucide-react";

export default function CreateBlogPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URI;

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");

  // AI Assistant states
  const [aiTopic, setAiTopic] = useState("");
  const [aiKeywords, setAiKeywords] = useState("");
  const [aiTone, setAiTone] = useState("Professional");
  const [aiLength, setAiLength] = useState("Medium");

  // UX states
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Upload image to ImgBB via Axios
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      setError("ImgBB API key is missing in client environment variables.");
      return;
    }

    setIsUploadingImage(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);

      const resData = response.data;
      if (resData.success && resData.data && resData.data.url) {
        setCoverImage(resData.data.url);
        setSuccess("Cover image uploaded successfully to ImgBB!");
      } else {
        throw new Error("ImgBB upload returned unsuccessful status.");
      }
    } catch (err) {
      console.error("ImgBB upload error:", err);
      setError(err.response?.data?.error?.message || err.message || "Failed to upload image. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // AI Generator API Call via Axios
  const handleGenerateAI = async () => {
    if (!aiTopic) {
      setError("Please specify a Topic in the AI Assistant panel.");
      return;
    }

    setIsGenerating(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${baseUrl}/api/ai/generate`, {
        topic: aiTopic,
        keywords: aiKeywords,
        tone: aiTone,
        length: aiLength,
      });

      const data = response.data;
      if (data.content) {
        setContent(data.content);
        setTitle(data.title || aiTopic);
        setSuccess("AI Content generated and populated in the editor!");
      } else {
        throw new Error("AI did not return any content.");
      }
    } catch (err) {
      console.error("AI Generation error:", err);
      setError(err.response?.data?.message || err.message || "Failed to generate blog content.");
    } finally {
      setIsGenerating(false);
    }
  };

  // AI Improver API Call via Axios
  const handleImproveAI = async () => {
    if (!content) {
      setError("Write some content first or generate a draft using the AI Assistant.");
      return;
    }

    setIsImproving(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${baseUrl}/api/ai/improve`, {
        title,
        content,
      });

      const data = response.data;
      if (data.content) {
        setContent(data.content);
        setSuccess("AI editor improvements applied successfully!");
      } else {
        throw new Error("AI did not return improved content.");
      }
    } catch (err) {
      console.error("AI Improver error:", err);
      setError(err.response?.data?.message || err.message || "Failed to improve content.");
    } finally {
      setIsImproving(false);
    }
  };

  // Publish Blog API Call via Axios
  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and Content are required to publish.");
      return;
    }

    setIsPublishing(true);
    setError("");
    setSuccess("");

    try {
      const { data: tokenData } = await authClient.token();

      await axios.post(`${baseUrl}/api/blogs`, {
        title,
        category,
        coverImage,
        content,
        authorName: session.user.name,
        authorEmail: session.user.email,
        authorId: session.user.id,
        createdAt: new Date().toISOString(),
      }, {
        headers: {
          Authorization: `Bearer ${tokenData?.token}`,
          "Content-Type": "application/json"
        }
      });

      setSuccess("Blog post published successfully!");
      setTitle("");
      setContent("");
      setCoverImage("");
      
      setTimeout(() => {
        router.push("/blogs");
      }, 1500);
    } catch (err) {
      console.error("Publishing error:", err);
      setError(err.response?.data?.message || err.message || "Failed to publish blog post.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Create a New Blog
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Write your thoughts manually or generate content instantly with AI assistance.
          </p>
        </div>

        {/* Feedback alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-xl flex items-center gap-3 text-sm font-medium">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Section 1: Create Blog (Left side, 2/3 width on desktop) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2">
              <PenTool className="h-5 w-5 text-blue-600" />
              Blog Editor
            </h2>

            <form onSubmit={handlePublish} className="space-y-6">
              {/* Blog Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-1.5">
                  Blog Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Navigating the Future of Web Architectures"
                  className="block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm text-slate-900 bg-white"
                />
              </div>

              {/* Category Select */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-slate-900 mb-1.5">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm text-slate-900 bg-white"
                >
                  <option value="Technology">Technology</option>
                  <option value="Programming">Programming</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Cover Image Upload */}
              <div>
                <span className="block text-sm font-semibold text-slate-900 mb-1.5">
                  Cover Image
                </span>
                {isUploadingImage ? (
                  <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                    <svg className="animate-spin h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <p className="text-sm font-semibold text-slate-700">Uploading to ImgBB...</p>
                  </div>
                ) : coverImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-72">
                    <img
                      src={coverImage}
                      alt="Cover Preview"
                      className="w-full object-cover max-h-72"
                    />
                    <button
                      type="button"
                      onClick={() => setCoverImage("")}
                      className="absolute top-4 right-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-colors"
                      title="Remove image"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="h-10 w-10 text-slate-400 mb-3" />
                      <p className="mb-1 text-sm font-semibold text-slate-700">
                        Click to upload cover image
                      </p>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, or WEBP (Max 2MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Content Textarea */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="content" className="block text-sm font-semibold text-slate-900">
                    Content
                  </label>
                  <button
                    type="button"
                    onClick={handleImproveAI}
                    disabled={isImproving || !content}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-indigo-200 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {isImproving ? "Improving..." : "Improve with AI"}
                  </button>
                </div>
                <textarea
                  id="content"
                  required
                  rows={15}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog content here (Markdown supported)..."
                  className="block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm text-slate-900 bg-white font-mono leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isPublishing}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50"
                >
                  {isPublishing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Publishing blog...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Publish Blog
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: AI Assistant (Right side, 1/3 width on desktop) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-600" />
              AI Assistant
            </h2>

            <div className="space-y-5">
              {/* Topic Input */}
              <div>
                <label htmlFor="topic" className="block text-sm font-semibold text-slate-900 mb-1.5">
                  Topic
                </label>
                <input
                  type="text"
                  id="topic"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="e.g. NextJS 16 compilation updates"
                  className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white"
                />
              </div>

              {/* Keywords Input */}
              <div>
                <label htmlFor="keywords" className="block text-sm font-semibold text-slate-900 mb-1.5">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  id="keywords"
                  value={aiKeywords}
                  onChange={(e) => setAiKeywords(e.target.value)}
                  placeholder="e.g. React 19, compiler, speed"
                  className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white"
                />
              </div>

              {/* Tone Select */}
              <div>
                <label htmlFor="tone" className="block text-sm font-semibold text-slate-900 mb-1.5">
                  Tone
                </label>
                <select
                  id="tone"
                  value={aiTone}
                  onChange={(e) => setAiTone(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white"
                >
                  <option value="Professional">Professional</option>
                  <option value="Casual">Casual</option>
                  <option value="Friendly">Friendly</option>
                  <option value="Creative">Creative</option>
                  <option value="Informative">Informative</option>
                </select>
              </div>

              {/* Length Select */}
              <div>
                <label htmlFor="length" className="block text-sm font-semibold text-slate-900 mb-1.5">
                  Length
                </label>
                <select
                  id="length"
                  value={aiLength}
                  onChange={(e) => setAiLength(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-900 bg-white"
                >
                  <option value="Short">Short</option>
                  <option value="Medium">Medium</option>
                  <option value="Long">Long</option>
                </select>
              </div>

              {/* Generate Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50"
                >
                  {isGenerating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating draft...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" />
                      Generate with AI
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
