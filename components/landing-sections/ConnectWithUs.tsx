import React from "react";
import SubHeading from "../ui/typography/subHeading";
import ProductImage from "../ui/images/product-image";
import { Instagram } from "lucide-react";
import Paragraph from "../ui/typography/paragraph";
import Image from "next/image";

const ConnectWithUs = () => {
  return (
    <section className="px-6 lg:px-16 py-6 lg:py-20  ">
      <div className="flex flex-col lg:flex-row lg:gap-6 xl:gap-12.5 items-center justify-center lg:items-start">
        {/* Left Image */}
        <div className="flex-col items-center lg:items-start hidden lg:flex">
          <Image
            className=" object-contain max-w-45 lg:max-w-55 xl:max-w-61.75"
            alt="product image"
            src="/insta-product-3.png"
            width={247}
            height={180}
          />

          <Paragraph
            content="Get the latest news about perfume tips and new products launch."
            className="text-[#6F6E6C] text-xs md:text-sm leading-4.5 mt-6 text-center lg:text-left max-w-55"
          />
        </div>

        {/* Center Content */}
        <div className="relative flex flex-col items-center  mt-4 lg:mt-20">
          <SubHeading
            title="Connect With Us"
            className="
            lg:absolute lg:-top-24   lg:left-1/2 lg:-translate-x-1/2
              text-[#141210] font-medium
              text-[40px] lg:text-[54px]
              leading-10 lg:leading-13.5
              text-center w-43  lg:w-83
              z-20
            "
          />

          <Image
            className=" object-contain w-full xl:max-h-179.75  max-h-51.75 max-w-81.75 xl:max-w-179.75  relative z-10"
            alt="product image"
            src="/insta-product-1.png"
            width={719}
            height={450}
          />

          {/* Bottom CTA */}
          <div className="lg:absolute lg:-bottom-30 lg:left-1/2 lg:-translate-x-1/2 z-20  lg:mt-0">
            <SubHeading
              title="On Socials"
              className="
                text-[#141210] font-PPEditorialNew italic font-normal
                text-[40px] lg:text-[76px]
                leading-10 lg:leading-12.25
                text-center w-43 lg:w-81.5
              "
            />

            <div className="flex gap-3   mt-8 lg:mt-12.5 justify-center">
              <a
                href="https://www.instagram.com/serenabraide?igsh=MWQ1ZTB2eDk0NHVpcQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#3B3B3B] size-10 flex justify-center items-center"
              >
                <Instagram color="white" className="size-6" />
              </a>
              <a
                href="https://www.tiktok.com/@serenabraide?_r=1&_t=ZS-93jT9cDC5R6"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#3B3B3B] size-10 flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 290"
                >
                  <path
                    fill="#ffffff"
                    d="M189.72 104.421c18.678 13.345 41.56 21.197 66.273 21.197v-47.53a67 67 0 0 1-13.918-1.456v37.413c-24.711 0-47.59-7.851-66.272-21.195v96.996c0 48.523-39.356 87.855-87.9 87.855c-18.113 0-34.949-5.473-48.934-14.86c15.962 16.313 38.222 26.432 62.848 26.432c48.548 0 87.905-39.332 87.905-87.857v-96.995zm17.17-47.952c-9.546-10.423-15.814-23.893-17.17-38.785v-6.113h-13.189c3.32 18.927 14.644 35.097 30.358 44.898M69.673 225.607a40 40 0 0 1-8.203-24.33c0-22.192 18.001-40.186 40.21-40.186a40.3 40.3 0 0 1 12.197 1.883v-48.593c-4.61-.631-9.262-.9-13.912-.801v37.822a40.3 40.3 0 0 0-12.203-1.882c-22.208 0-40.208 17.992-40.208 40.187c0 15.694 8.997 29.281 22.119 35.9"
                  />
                  <path d="M175.803 92.849c18.683 13.344 41.56 21.195 66.272 21.195V76.631c-13.794-2.937-26.005-10.141-35.186-20.162c-15.715-9.802-27.038-25.972-30.358-44.898h-34.643v189.843c-.079 22.132-18.049 40.052-40.21 40.052c-13.058 0-24.66-6.221-32.007-15.86c-13.12-6.618-22.118-20.206-22.118-35.898c0-22.193 18-40.187 40.208-40.187c4.255 0 8.356.662 12.203 1.882v-37.822c-47.692.985-86.047 39.933-86.047 87.834c0 23.912 9.551 45.589 25.053 61.428c13.985 9.385 30.82 14.86 48.934 14.86c48.545 0 87.9-39.335 87.9-87.857z" />
                  <path
                    fill="#ffffff"
                    d="M242.075 76.63V66.516a66.3 66.3 0 0 1-35.186-10.047a66.47 66.47 0 0 0 35.186 20.163M176.53 11.57a68 68 0 0 1-.728-5.457V0h-47.834v189.845c-.076 22.13-18.046 40.05-40.208 40.05a40.06 40.06 0 0 1-18.09-4.287c7.347 9.637 18.949 15.857 32.007 15.857c22.16 0 40.132-17.918 40.21-40.05V11.571zM99.966 113.58v-10.769a89 89 0 0 0-12.061-.818C39.355 101.993 0 141.327 0 189.845c0 30.419 15.467 57.227 38.971 72.996c-15.502-15.838-25.053-37.516-25.053-61.427c0-47.9 38.354-86.848 86.048-87.833"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:flex items-end relative">
          <Image
            className="object-contain relative xl:top-45 top-45 lg:top-25 max-w-45 lg:max-w-55 xl:max-w-61.75"
            alt="product image"
            src="/insta-product-2.png"
            width={247}
            height={300}
          />
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUs;
