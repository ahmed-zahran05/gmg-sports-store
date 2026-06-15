import { HomeHero } from "@/components/home-hero";
import { HomeCategories } from "@/components/home-categories";
import { HomeFeatured } from "@/components/home-featured";
import { HomeBrands } from "@/components/home-brands";
import { HomeWhy } from "@/components/home-why";
import { HomeNewsletter } from "@/components/home-newsletter";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeCategories />
      <HomeFeatured />
      <HomeBrands />
      <HomeWhy />
      <HomeNewsletter />
    </main>
  );
}
