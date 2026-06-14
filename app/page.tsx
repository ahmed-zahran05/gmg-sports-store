import { PremiumHero } from "@/components/premium-hero";
import { FeaturedBrands } from "@/components/featured-brands";
import { FeaturedCollections } from "@/components/featured-collections";
import { FeaturedProducts } from "@/components/featured-products";
import { BestSellers } from "@/components/best-sellers";
import { NewArrivals } from "@/components/new-arrivals";
import { WhyChooseGMG } from "@/components/why-choose-gmg";
import { Testimonials } from "@/components/testimonials";
import { Newsletter } from "@/components/newsletter";

export default function HomePage() {
  return (
    <main>
      <PremiumHero />
      <FeaturedBrands />
      <FeaturedCollections />
      <FeaturedProducts />
      <BestSellers />
      <NewArrivals />
      <WhyChooseGMG />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
