import { Hero } from "@/components/theme/Hero";
import { Marquee } from "@/components/theme/Marquee";
import { FeaturedProducts } from "@/components/theme/FeaturedProducts";
import { RitualQuiz } from "@/components/theme/RitualQuiz";
import { ShoppableGallery } from "@/components/theme/ShoppableGallery";
import { WeekBox } from "@/components/theme/WeekBox";
import { LifestyleStory } from "@/components/theme/LifestyleStory";
import { CategoryNav } from "@/components/theme/CategoryNav";
import { FeaturedSpotlight } from "@/components/theme/FeaturedSpotlight";
import { Testimonials } from "@/components/theme/Testimonials";
import { PromoCards } from "@/components/theme/PromoCards";
import { BlogSection } from "@/components/theme/BlogSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <RitualQuiz />
      <ShoppableGallery />
      <WeekBox />
      <LifestyleStory />
      <CategoryNav />
      <FeaturedSpotlight />
      <Testimonials />
      <PromoCards />
      <BlogSection />
    </>
  );
}
