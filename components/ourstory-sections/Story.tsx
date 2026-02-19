import React from "react";
import { Sparkle } from "lucide-react";
import Paragraph from "../ui/typography/paragraph";
import Image from "next/image";
import SubHeading from "../ui/typography/subHeading";

const Story = () => {
  return (
    <section className="py-6 lg:py-20 ">
      <div className="grid lg:grid-cols-2  grid-cols-1">
        <div className="flex flex-col items-center  justify-center  gap-10  pb-10 lg:pb-26.75">
          <div className="max-[235px] flex flex-col gap-6 items-center px-7.5 ">
            <Sparkle className="size-7.5" fill="#3B3B3B" stroke="none" />
            <SubHeading
              title="Founder’s Note"
              className="text-[32px] lg:px-8.5 px-6 lg:text-start text-center font-PPEditorialNew font-medium"
            />
          </div>
          <div className="flex flex-col lg:gap-12.5 gap-10 items-center text-center justify-center  ">
            <Paragraph
              className="px-6 lg:text-base text-sm leading-5.5 font-normal lg:leading-6 max-w-125 text-[#6F6E6C]"
              content="To me, perfume has always been more than a scent, and beauty more than a routine. They are the invisible armor we wear into the world, a liquid personality and a finishing touch that capture who we are in a way words never could."
            />

            <Paragraph
              className="px-6  lg:text-base text-sm leading-5.5 font-normal lg:leading-6 max-w-125 text-[#6F6E6C]"
              content="From a young age, I understood that the right fragrance and the perfect, hydrating gloss are not about masking your identity, but amplifying it. That realization is what built Serena Braide. I wanted to create a house that honors the attributes of Identity, Power, and Memory in equal measure."
            />
            <Paragraph
              className="px-6  lg:text-base text-sm leading-5.5 font-normal lg:leading-6 max-w-125 text-[#6F6E6C]"
              content="Whether it is the perfume you spray on your pulse points to command a room, or the lip care you apply to refine your presence, every essential we craft serves a single purpose: to give you the tools for self-definition."
            />
            <Paragraph
              className="px-6  lg:text-base text-sm leading-5.5 font-normal lg:leading-6 max-w-125 text-[#6F6E6C]"
              content="I believe that anyone can make an entrance, but not everyone is remembered. That is the exact signature I wanted to create. Simple. Classy. And designed to linger long after you are gone. I built this for the individual, never the crowd, because while your physical presence in a space might be temporary, the mark you leave behind should be timeless."
            />
            <Paragraph
              className="px-6  lg:text-base text-sm leading-5.5 font-normal lg:leading-6 max-w-125 text-[#6F6E6C]"
              content="This brand carries my name, but the legacy it creates is entirely yours."
            />
          </div>
        </div>
        <div className="relative w-full h-142.25 lg:h-full">
          <Image
            src="/about-image2.png"
            alt="about us image"
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Story;
