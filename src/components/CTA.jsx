"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function CTA() {
  const { data: session } = authClient.useSession();

  const startWritingHref = session ? "/blogs/create" : "/register";

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 rounded-3xl py-12 px-6 sm:px-12 md:py-16 shadow-xl text-center">
          {/* Decorative blur rings */}
          <div className="absolute top-0 left-0 -z-10 h-32 w-32 rounded-full bg-white/10 blur-xl translate-x-[-20%] translate-y-[-20%]" />
          <div className="absolute bottom-0 right-0 -z-10 h-48 w-48 rounded-full bg-white/15 blur-2xl translate-x-[20%] translate-y-[20%]" />

          <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to Write Your Next Blog?
            </h2>
            
            <p className="text-blue-50/90 text-base sm:text-lg leading-relaxed">
              Create engaging blogs manually or let AI help you generate content in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={startWritingHref}
                className="flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-bold text-blue-600 shadow-lg hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                Start Writing
              </Link>
              <Link
                href="/blogs"
                className="flex items-center justify-center rounded-xl border-2 border-white/80 bg-white/10 px-8 py-3 text-base font-bold text-white shadow-sm hover:bg-white hover:text-indigo-600 hover:border-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              >
                Explore Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
