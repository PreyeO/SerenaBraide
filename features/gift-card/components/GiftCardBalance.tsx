import ProductImage from "@/components/ui/images/product-image";
import BalanceForm from "./forms/BalanceForm";
import SubHeading from "@/components/ui/typography/subHeading";

const GiftCardBalance = () => {
  return (
    <section className="lg:pt-63 pt-36 lg:px-16 px-6 lg:pb-75.5 pb-12.5">
      <div className="flex lg:gap-10 justify-center">
        <ProductImage
          alt="Product image"
          src="/giftcard-balance.png"
          width={282}
          height={400}
          className="hidden lg:block"
        />
        <div className="flex flex-col lg:gap-7.5 lg:max-w-138 w-full">
          <SubHeading
            className="font-PPEditorialNew lg:text-[40px] text-[26px] text-[#3B3B3B] font-normal "
            title="Check your Gift Card Balance"
          />
          <BalanceForm />
        </div>
      </div>
    </section>
  );
};

export default GiftCardBalance;
