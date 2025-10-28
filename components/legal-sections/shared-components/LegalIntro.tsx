import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import React from "react";

interface LegalIntoProps {
  title: string;
  content: string;
}

const LegalIntro: React.FC<LegalIntoProps> = ({ title, content }) => {
  return (
    <div className="gap-[6px] flex flex-col text-[#3B3B3B] font-normal">
      <SubHeading className=" text-[26px]" title={title} />
      <Paragraph
        className="text-sm leading-[22px] w-[832px] "
        content={content}
      />
    </div>
  );
};

export default LegalIntro;
