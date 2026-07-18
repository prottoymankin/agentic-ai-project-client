import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import WhyChoose from "@/components/WhyChoose";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <WhyChoose />
      <CTA />
    </div>
  );
}