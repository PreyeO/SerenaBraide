import { Dot } from "lucide-react";
import TitleSpan from "../ui/typography/title-span";
import Image from "next/image";
import Paragraph from "../ui/typography/paragraph";

const OurStory = () => {
  return (
    <section className="px-16 pt-[100px] pb-[75px]">
      <div>
        <div className="flex justify-between">
          <TitleSpan
            title="ULTIMATE SOPHISTICATION AND TIMELESS"
            className="text-[22px] leading-7 w-[304px]"
            span="LUXURY"
          />
          <div className="border text-[#3B3B3B] border-[#3B3B3B] text-sm rounded-full w-[114px] h-[42px] items-center justify-center flex">
            <Dot size={18} />
            <h4>Our Story</h4>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[50px] items-end ">
          <div
            className="bg-[#F5F5F5] rounded-[30px] px-[25px] 
          py-[25px] flex flex-col gap-[25px] max-w-[350px] "
          >
            <div className="flex items-end flex-col  ">
              <TitleSpan
                title="Exploring a life written in perfume from the key qualities that colors the world of"
                className="text-sm leading-[22px]  text-[#6F6E6C] w-[223px]  "
                span="SERENA BRAIDE "
              >
                perfumes
              </TitleSpan>
            </div>
            <Image
              src="/story-img1.png"
              alt="image of model spraying perfume"
              width={300}
              height={257}
              className="rounded-[15px]"
            />
          </div>
          <Image
            src="/story-img2.png"
            alt="image of model spraying perfume"
            width={450}
            height={546}
            className="rounded-[30px]"
          />
          <div className="flex flex-col gap-4 max-w-[421px]">
            <TitleSpan
              title="Conscious"
              className="text-[40px] leading-[48px]  "
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
            <div className=" w-[68px]  leading-[18px] ">
              <button className=" font-semibold text-[12px] text-[#3B3B3B] underline ">
                Read more of our story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
