"use client";

import { Wand2, Highlighter } from "lucide-react";

export default function AIFeatures() {
  const features = [
    {
      title: "AI Blog Generator",
      content: "Generate complete, well-structured blog posts from a simple topic, title, or keywords using advanced AI.",
      icon: Wand2,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "AI Blog Improver",
      content: "Refine your writing by improving grammar, clarity, tone, and readability while keeping your original ideas intact.",
      icon: Highlighter,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            AI-Powered Writing Features
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600">
            Boost your productivity with intelligent tools designed to help you create better content faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 sm:p-10 border border-slate-200 rounded-3xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-500/20"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${feature.color} shadow-sm mb-6`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed sm:text-base">
                  {feature.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
