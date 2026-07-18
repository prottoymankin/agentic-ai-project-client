import Link from "next/link";
import { Sparkles, PenTool, Globe, UserCheck } from "lucide-react";

export const metadata = {
  title: "About InkAI | AI Blog Platform",
  description: "Learn about InkAI, the AI-powered blogging platform bridging human creativity and artificial intelligence to refine modern writing.",
};

export default function AboutPage() {
  const pillars = [
    {
      title: "AI-Powered Assistance",
      description: "Draft entire articles, brainstorm title ideas, or refine your paragraphs instantly using our cutting-edge AI models.",
      icon: Sparkles,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      title: "Seamless Content Editing",
      description: "Write manually or edit generated copy easily inside a clean writing layout optimized for readability.",
      icon: PenTool,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Effortless Publishing",
      description: "Share your knowledge and perspective to the global community with our simple database publishing model.",
      icon: Globe,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Focus on Creators",
      description: "A platform created by writers for writers. No complicated setups, just straight-forward drafting and reading.",
      icon: UserCheck,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-slate-50 py-16 md:py-24 flex-1">
      {/* Background soft gradients */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-100/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[450px] w-[450px] rounded-full bg-indigo-100/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              InkAI
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Bridging human expression and artificial intelligence to create a seamless, distraction-free writing environment.
          </p>
        </div>

        {/* Brand Mission & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 md:mb-24">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Our Mission
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              At InkAI, our mission is to empower writers to communicate their ideas clearly and efficiently. We believe that technology should support human storytelling, not get in its way.
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Whether you are writing a software engineering tutorial, a business growth case study, or a personal travel log, InkAI gives you the flexibility to write manually or employ AI to generate, proofread, and outline content in real-time.
            </p>
          </div>
          <div className="lg:col-span-5 bg-white p-8 border border-slate-200 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              InkAI at a Glance
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span>Tailwind CSS Light-Mode Colors</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span>Better Auth Email/Password Sessions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span>Next.js App Routing Structure</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span>Real-Time Blog CRUD Operations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Pillars Grid */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Our Core Pillars
            </h2>
            <p className="mt-3 text-slate-600">
              What sets InkAI apart from traditional blogging CMS platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 border border-slate-200 rounded-3xl shadow-sm flex gap-6 items-start transition-all duration-300 hover:shadow-md hover:border-blue-500/10"
                >
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border ${pillar.color} shadow-sm`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="text-sm font-medium text-slate-600 mb-4">
            Want to see InkAI in action?
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-blue-700 transition-colors"
          >
            Explore Recent Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}
