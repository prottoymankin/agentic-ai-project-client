"use client";

import { FileText, Sparkles, Globe } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      stepNumber: "01",
      title: "Write Manually",
      content: "Start with your own ideas using our clean and intuitive editor. Create engaging blog posts from scratch with complete creative control.",
      icon: FileText,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      stepNumber: "02",
      title: "Generate with AI",
      content: "Enter a topic or a few keywords, and let AI generate a high-quality blog draft tailored to your needs in seconds.",
      icon: Sparkles,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      stepNumber: "03",
      title: "Publish Your Story",
      content: "Review, edit, and publish your blog to share your knowledge and ideas with readers around the world.",
      icon: Globe,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600">
            Create, enhance, and publish your blog in just a few simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="relative bg-slate-50 p-8 border border-slate-200 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white"
              >
                {/* Step indicator */}
                <div className="absolute top-6 right-8 text-3xl font-black text-slate-200 select-none">
                  {step.stepNumber}
                </div>

                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${step.color} shadow-sm mb-6`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
