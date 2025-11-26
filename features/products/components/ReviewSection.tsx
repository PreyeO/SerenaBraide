import BorderLine from "@/components/ui/border-line";
import ProductImage from "@/components/ui/images/product-image";
import Caption from "@/components/ui/typography/caption";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Star, Verified } from "lucide-react";

const ReviewSection = () => {
  return (
    <section className=" px-16 text-[#3B3B3B] ">
      <BorderLine className="" />
      <div className="pt-[50px] flex flex-col gap-[6px] max-w-[503px] justify-center mx-auto items-center font-normal text-base ">
        <SubHeading
          title="What customers are saying"
          className="text-[40px] font-medium"
        />
        <Paragraph
          className="leading-6"
          content="96% of respondents would recommend this to a friend"
        />
      </div>

      <div className="flex pt-[50px] items-center mb-[25px]">
        <Paragraph
          className="font-medium text-lg"
          content="Reviewed by 198 customers"
        />
        <div className="border border-[#3B3B3B] flex justify-center h-4 ml-[10px] " />
        <div className="flex items-center gap-[6px]">
          <h3 className="text-lg font-medium pl-[10px]">4.4</h3>
          <Star className="size-6 text-[#D97705]" fill="#D97705" />
          <Star className="size-6 text-[#D97705]" fill="#D97705" />
          <Star className="size-6 text-[#D97705]" fill="#D97705" />
          <Star className="size-6 text-[#D97705]" fill="#D97705" />
          <Star className="size-6 text-[#D1D5DB]" />
          <Caption title="878 ratings" className="font-normal text-sm" />
        </div>
      </div>
      <BorderLine className="" />
      <div className="flex justify-between pt-[32px] items-center">
        <div className="flex gap-[10px]  ">
          <span className="rounded-full bg-[#F5F5F5] text-black font-normal text-base py-4 px-4">
            PO
          </span>
          <div className="flex flex-col gap-[3px]">
            <Paragraph
              className="font-medium text-base"
              content="Preye Omusuku"
            />
            <div className="flex gap-[6px]">
              <Paragraph
                className="font-normal text-base"
                content="Verified Buyer "
              />
              <Verified className="size-6 text-white" fill="#1DAE42" />
            </div>
          </div>
        </div>
        <Caption
          title="3 weeks ago"
          className="text-sm text-[#6F6E6C] font-normal"
        />
      </div>
      <div className="pt-4">
        <div className="flex items-center gap-[6px]">
          <Star className="size-4 text-[#D97705]" fill="#D97705" />
          <Star className="size-4 text-[#D97705]" fill="#D97705" />
          <Star className="size-4 text-[#D97705]" fill="#D97705" />
          <Star className="size-4 text-[#D1D5DB]" />
          <SubHeading title="Very Unique!" className="text-base font-medium" />
        </div>
      </div>
      <Paragraph
        content="They are comfy and pretty and will go with my summer clothes. 
        However, they don't have the round toe as indicated in the Manitoba image. 
        The toe is more of a viper head form, which I don't find as attractive but 
        I will definitely wear them. Thus, the reason for the 4 stars. My fav shoes are 
        the white modern moccasin on the left. I'll leave a review for them."
        className="font-normal text-base leading-6 pt-[10px]"
      />

      <ProductImage
        className="mt-4  mb-[26px]"
        src="/review-product-1.png"
        alt="Image of product selected"
        width={200}
        height={150}
      />
      <BorderLine className="" />

      {/* add pagination */}
    </section>
  );
};

export default ReviewSection;
