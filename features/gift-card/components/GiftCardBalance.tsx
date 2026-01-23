import ProductImage from "@/components/ui/images/product-image";
import BalanceForm from "./forms/BalanceForm";
import SubHeading from "@/components/ui/typography/subHeading";

const GiftCardBalance = () => {
  return (
    <section className="pt-63 px-16 pb-75.5">
      <div className="flex gap-10 justify-center">
        <ProductImage
          alt="Product image"
          src="/giftcard-balance.png"
          width={282}
          height={400}
          className=""
        />
        <div className="flex flex-col gap-7.5 max-w-138">
          <SubHeading
            className="font-PPEditorialNew text-[40px] text-[#3B3B3B] font-normal leading-tight"
            title="Check your Gift Card Balance"
          />
          <BalanceForm />
        </div>
      </div>
    </section>
  );
};

export default GiftCardBalance;
