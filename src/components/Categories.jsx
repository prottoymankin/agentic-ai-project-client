"use client";

import Link from "next/link";
import { Cpu, Code, Sparkles, Briefcase, Heart, GraduationCap } from "lucide-react";

export default function Categories() {
  const categoriesList = [
    {
      name: "Technology",
      icon: Cpu,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      description: "Tech updates & trends.",
      href: "/blogs?category=technology",
    },
    {
      name: "Programming",
      icon: Code,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      description: "Code, guides & snippets.",
      href: "/blogs?category=programming",
    },
    {
      name: "AI",
      icon: Sparkles,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      description: "AI generation & logic.",
      href: "/blogs?category=ai",
    },
    {
      name: "Business",
      icon: Briefcase,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      description: "Marketing & growth.",
      href: "/blogs?category=business",
    },
    {
      name: "Lifestyle",
      icon: Heart,
      color: "text-rose-600 bg-rose-50 border-rose-100",
      description: "Art, health & designs.",
      href: "/blogs?category=lifestyle",
    },
    {
      name: "Education",
      icon: GraduationCap,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      description: "Learning & tutorials.",
      href: "/blogs?category=education",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Explore by Category
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600">
            Discover curated articles, news, and insights tailored to your favorite topics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="group relative flex flex-col items-center text-center p-6 bg-slate-50 border border-slate-200/80 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-500/30 hover:bg-white"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${category.color} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
