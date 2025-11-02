import Image from "next/image";

interface ProductHeroProps {
  title: string;
  description: string;
  alt: string;
  src: string;
}

export default function ProductHero({
  alt,
  description,
  src,
  title,
}: ProductHeroProps) {
  return (
    <section className="pt-[152px]  px-16">
      <div className="flex justify-between items-center">
        <div className="max-w-[743px] leading-[22px] font-GeneralSans font-normal flex flex-col gap-[16px]">
          <h2 className="text-[40px]  font-PPEditorialNew text-[#3B3B3B]">
            {title}
          </h2>
          <p className="text-sm text-[#6F6E6C] ">{description}</p>
        </div>
        <Image
          src={src}
          alt={alt}
          width={379.98}
          height={381}
          className="max-w-[379.89px]"
        />
      </div>
    </section>
  );
}
