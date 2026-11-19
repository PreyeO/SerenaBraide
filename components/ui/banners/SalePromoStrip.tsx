import { SALE_CAMPAIGN } from "@/constant/data";

/**
 * Slim sale strip for landing pages (ads point at All products), so visitors
 * see the offer they clicked on confirmed straight away. Message only — no link,
 * since the products are right below it. Renders nothing when SALE_CAMPAIGN is
 * switched off.
 */
const SalePromoStrip = ({ className = "" }: { className?: string }) => {
  if (!SALE_CAMPAIGN.active) return null;
  const { title, message } = SALE_CAMPAIGN.strip;

  return (
    <div
      className={`rounded-[15px] text-white font-GeneralSans px-5 py-4 lg:px-8 lg:py-5 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 ${className}`}
      style={{ background: SALE_CAMPAIGN.heroBanner.background }}
    >
      <p className="font-semibold uppercase tracking-wide text-base lg:text-lg">
        {title}
      </p>
      <p className="text-sm lg:text-base text-white/85">{message}</p>
    </div>
  );
};

export default SalePromoStrip;
