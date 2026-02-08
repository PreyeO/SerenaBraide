import { Dot } from "lucide-react";
import TitleSpan from "../ui/typography/title-span";
import Paragraph from "../ui/typography/paragraph";
import UnderlineLink from "../ui/btns/underline-cta";
import Image from "next/image";

const OurStory = () => {
  return (
    <section className="lg:px-16 px-6 lg:pt-25 pt-8.5 pb-18.75">
      <div>
        <div className="flex justify-between">
          <TitleSpan
            title="IDENTITY. POWER. "
            className="lg:text-[22px] text-base lg:leading-7 leading-6 max-w-76"
            span="MEMORY."
          />
          <div className="hidden lg:flex border text-[#3B3B3B] border-[#3B3B3B] text-sm rounded-full w-28.5 h-10.5 items-center justify-center ">
            <Dot size={18} />
            <h4>Our Story</h4>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap xl:gap-12.5 gap-6 items-end justify-center pt-6">
          {/* First box (A) - always first */}
          <div
            className="order-1 bg-[#F5F5F5] rounded-[30px] lg:px-6.25 px-3.5 py-3.5
          lg:py-6.25 flex flex-col gap-6.25 w-full md:max-w-[48%] lg:max-w-87.5"
          >
            <div className="flex items-end flex-col">
              <TitleSpan
                title="Scent is a liquid personality. "
                className="text-sm leading-5.5  text-[#6F6E6C] max-w-55.75"
                span="An invisible armor. A silent introduction."
              />
            </div>

            <Image
              src="/story-img1.png"
              alt="image of model spraying perfume"
              width={300}
              height={257}
              className="rounded-[15px] w-full xl:w-75 xl:h-64.25 h-64.25 object-cover"
            />
          </div>

          {/* Middle image (B) - last on mobile, middle on desktop */}
          <div className="order-3 lg:order-2 w-full md:max-w-[48%] lg:max-w-none">
            <Image
              src="/story-img2.png"
              alt="image of model spraying perfume"
              width={450}
              height={546}
              className="rounded-[30px] w-full xl:w-112.5 xl:h-136.5 h-99.25 object-cover"
            />
          </div>

          {/* Text content (C) - middle on mobile, last on desktop */}
          <div className="order-2 lg:order-3 flex flex-col gap-4 w-full md:max-w-[48%] lg:max-w-105.25">
            <div className="lg:hidden flex border text-[#3B3B3B] border-[#3B3B3B] text-sm rounded-full w-28.5 h-10.5 items-center justify-center ">
              <Dot size={18} />
              <h4>Our Story</h4>
            </div>
            <TitleSpan
              title="The Art of"
              className="lg:text-[40px] text-[26px] lg:leading-12 leading-8"
              span="Being Remembered"
            />

            <Paragraph
              content="We believe that while anyone can make an entrance, very few are truly remembered. We create for the latter. Simple. Classy. Unforgettable."
              className="text-[#6F6E6C] font-normal lg:text-base text-sm lg:leading-6 leading-5.5"
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
