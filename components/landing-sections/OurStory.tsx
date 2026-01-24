import { Dot } from "lucide-react";
import TitleSpan from "../ui/typography/title-span";
import Paragraph from "../ui/typography/paragraph";
import UnderlineLink from "../ui/btns/underline-cta";
import ProductImage from "../ui/images/product-image";

const OurStory = () => {
  return (
    <section className="px-16 pt-25 pb-18.75">
      <div>
        <div className="flex justify-between">
          <TitleSpan
            title="ULTIMATE SOPHISTICATION AND TIMELESS"
            className="text-[22px] leading-7 w-76"
            span="LUXURY"
          />
          <div className="border text-[#3B3B3B] border-[#3B3B3B] text-sm rounded-full w-28.5 h-10.5 items-center justify-center flex">
            <Dot size={18} />
            <h4>Our Story</h4>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-12.5 items-end ">
          <div
            className="bg-[#F5F5F5] rounded-[30px] px-6.25
          py-6.25 flex flex-col gap-6.25 max-w-87.5 "
          >
            <div className="flex items-end flex-col  ">
              <TitleSpan
                title="Exploring a life written in perfume from the key qualities that colors the world of"
                className="text-sm leading-5.5  text-[#6F6E6C] w-55.75 "
                span="SERENA BRAIDE "
              >
                perfumes
              </TitleSpan>
            </div>

            <ProductImage
              src="/story-img1.png"
              alt="image of model spraying perfume"
              width={300}
              height={257}
              className="rounded-[15px]"
            />
          </div>

          <ProductImage
            src="/story-img2.png"
            alt="image of model spraying perfume"
            width={450}
            height={546}
            className="rounded-[30px]"
          />
          <div className="flex flex-col gap-4 max-w-105.25">
            <TitleSpan
              title="Conscious"
              className="text-[40px] leading-12  "
              span="Fragrance"
            >
              Creation
            </TitleSpan>
            <Paragraph
              content="For 30 years we have been selling the widest range of women's perfumes 
            and men's aftershaves at affordable prices. We stock the fragrances of nearly 130 
            brands including Hugo Boss, Paco Rabanne, Gucci, Ariana Grande, Mugler and Marc Jacobs 
            both online and across our network of over 215 nationwide stores. We also stock the luxury 
            perfume brands Dior, Tom Ford, Viktor & Rolf, Hermès and Maison Margiela."
              className="text-[#6F6E6C] font-normal text-base leading-6"
            />

            <UnderlineLink
              href="/our-story"
              text="  Read more of our story"
              className={`text-[12px] text-[#3B3B3B] font-semibold  w-17  leading-4.5 `}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
