import FulfilmentDetails from "./FulfilmentDetails";
import { FulfilmentType } from "@/features/profile/type/customers/profile.type";
import GeneralModal from "@/components/ui/modals/general-modal";

interface Props {
  open: boolean;
  onClose: () => void;
  statusType: FulfilmentType;
}

const OrderFulfilmentModal = ({ open, onClose, statusType }: Props) => {
  return (
    <GeneralModal open={open} onClose={onClose}>
      <FulfilmentDetails statusType={statusType} />
    </GeneralModal>
  );
};

export default OrderFulfilmentModal;
