import BestSeller from "@/components/landing-sections/BestSeller";
import GiftCard from "@/components/landing-sections/GiftCard";
import GiftSet from "@/components/landing-sections/GiftSet";
import Hero from "@/components/landing-sections/Hero";
import OurStory from "@/components/landing-sections/OurStory";
import ProductCategory from "@/components/landing-sections/ProductCategory";

export default function Home() {
  return (
    <>
      <Hero />
      <OurStory />
      <ProductCategory />
      <BestSeller />
      <GiftSet />
      <GiftCard />
    </>
  );
}
