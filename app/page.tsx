import BestSeller from "@/components/landing-sections/BestSeller";
import ConnectWithUs from "@/components/landing-sections/ConnectWithUs";
import Delivery from "@/components/landing-sections/Delivery";
import GiftCard from "@/components/landing-sections/GiftCard";
import GiftSet from "@/components/landing-sections/GiftSet";
import Hero from "@/components/landing-sections/Hero";
import OurStory from "@/components/landing-sections/OurStory";
import ProductCategory from "@/components/landing-sections/ProductCategory";
import Wholesale from "@/components/landing-sections/Wholesale";

export default function Home() {
  return (
    <>
      <Hero />
      <OurStory />
      <ProductCategory />
      {/* <BestSeller />
      <GiftSet /> */}
      <GiftCard />
      <Wholesale />
      <ConnectWithUs />
      {/* <div className="lg:hidden block">
        <Delivery />
      </div> */}
    </>
  );
}
