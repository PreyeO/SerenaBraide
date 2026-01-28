import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import React from "react";

interface LegalIntoProps {
  title: string;
  content: string;
}

const LegalIntro: React.FC<LegalIntoProps> = ({ title, content }) => {
  return (
    <div className="gap-1.5 flex flex-col  ">
      <SubHeading
        className=" lg:text-[26px] text-[22px] text-[#3B3B3B] font-normal"
        title={title}
      />
      <Paragraph
        className="text-sm leading-5.5 md:max-w-208 max-w-81.75 text-[#3B3B3B] font-normal "
        content={content}
      />
    </div>
  );
};

export default LegalIntro;
