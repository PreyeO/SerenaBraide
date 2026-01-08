import { fulfilmentDetails } from "@/features/profile/data/data.profile";
import FulfilmentStatus from "../shared/FulfilmentStatus";
import { Props } from "@/features/profile/type/customers/profile.type";

const FulfilmentDetails = ({ statusType }: Props) => {
  const filtered = fulfilmentDetails.filter(
    (item) => item.statusType === statusType
  );

  return (
    <div className="space-y-6">
      {filtered.map((item, index) => (
        <FulfilmentStatus
          key={index}
          statusType={item.statusType}
          header={item.header}
          status={item.status ?? ""}
          title={item.title}
          src={item.src}
          alt={item.alt}
          color={item.color}
          icon={item.icon}
          iconBg={item.iconBg}
          price={item.price}
          quantity={item.quantity}
          size={item.size}
        />
      ))}
    </div>
  );
};

export default FulfilmentDetails;
