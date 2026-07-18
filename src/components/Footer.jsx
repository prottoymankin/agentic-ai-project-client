"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-12 md:py-16 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-black tracking-tight text-transparent">
                InkAI
              </span>
            </Link>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Create high-quality blogs manually or generate them instantly with AI. Edit, refine, and publish your content effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Contact
            </h4>
            <p className="text-sm text-slate-600">
              Email: support@inkai.com
            </p>
            <p className="text-sm text-slate-600 font-medium">
              Write smarter, publish faster.
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} InkAI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
              Privacy Policy
            </a>
            <span className="text-slate-200">|</span>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
