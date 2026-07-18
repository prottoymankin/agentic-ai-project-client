"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Hero() {
  const { data: session } = authClient.useSession();

  const startWritingHref = session ? "/blogs/create" : "/login";

  return (
    <div className="relative overflow-hidden bg-slate-50 py-12 md:py-24 flex-1 flex items-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-100/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Text Column */}
          <div className="space-y-6 md:space-y-8 flex flex-col items-center justify-center lg:items-start">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl leading-tight">
              Write Smarter with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI
              </span>
            </h1>
            
            <p className="max-w-lg text-lg text-slate-600 md:text-xl md:leading-relaxed text-center lg:text-left">
              Create high-quality blogs manually or generate them instantly with AI. Edit, refine, and publish your content effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={startWritingHref}
                className="flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 "
              >
                Start Writing
              </Link>
              <Link
                href="/blogs"
                className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-base font-bold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
              >
                Explore Blogs
              </Link>
            </div>
          </div>

          {/* Right Image/Illustration Column */}
          <div className="relative flex justify-center">
            {/* Visual glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-3xl blur-2xl -z-10" />
            <img
              src="/assets/robo.png"
              alt="AI Writing Assistant Illustration"
              className="w-full max-w-md md:max-w-lg object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}