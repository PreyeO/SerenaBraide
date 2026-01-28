import { pros } from "@/constant/data";
import React from "react";
import Paragraph from "../ui/typography/paragraph";
import Image from "next/image";

const Delivery = () => {
  return (
    <section className="px-11.5 py-8.5 bg-[#F5F5F5] ">
      <div className="flex justify-center gap-14.5 items-center  flex-wrap ">
        {pros.map((pro, index) => (
          <div key={index} className="flex flex-col gap-1.25 max-w-18.5  ">
            <div className="p-1 rounded-full w-7.5 bg-[#F0F0F0] flex justify-center items-center">
              <Image
                src={pro.src}
                height={16}
                width={16}
                alt="pros"
                className="h-5 w-5 text-[#6F6E6C] "
              />
            </div>
            <Paragraph
              content={pro.name}
              className="text-sm text-[#989898] font-normal"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Delivery;
