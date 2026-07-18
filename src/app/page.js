import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import WhyChoose from "@/components/WhyChoose";
import CTA from "@/components/CTA";
import HowItWorks from "@/components/HowItWorks";
import AIFeatures from "@/components/AIFeatures";

export default function Home() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <AIFeatures />
      <Categories />
      <WhyChoose />
      <CTA />
    </div>
  );
}