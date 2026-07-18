"use client";

import { Zap, Brain, Send, Smartphone } from "lucide-react";

export default function WhyChoose() {
  const features = [
    {
      title: "Fast Writing",
      description: "Quickly create outline drafts or full paragraphs with advanced layout setups.",
      icon: Zap,
    },
    {
      title: "AI Assistance",
      description: "Harness modern LLM logic to brainstorm hooks, rewrite paragraphs, or generate copy in seconds.",
      icon: Brain,
    },
    {
      title: "Easy Publishing",
      description: "Draft, edit, format, and share your thoughts to the world with single-click publishing.",
      icon: Send,
    },
    {
      title: "Responsive Design",
      description: "Enjoy a fully responsive user interface built dynamically for phones, tablets, and desktops.",
      icon: Smartphone,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Why Choose InkAI
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600">
            Empowering writers with modern AI capabilities and a seamless publishing workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-500/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 mb-6 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
