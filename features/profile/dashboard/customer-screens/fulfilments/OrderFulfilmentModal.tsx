import FulfilmentDetails from "./FulfilmentDetails";
import { FulfilmentType } from "@/features/profile/type/customers/profile.type";
import GeneralModal from "@/components/ui/modals/general-modal";

interface Props {
  open: boolean;
  onClose: () => void;
  statusType: FulfilmentType;
  orderNumber: number | null;
}

const OrderFulfilmentModal = ({ open, onClose, statusType, orderNumber }: Props) => {
  return (
    <GeneralModal open={open} onClose={onClose}>
      <FulfilmentDetails statusType={statusType} orderNumber={orderNumber} />
    </GeneralModal>
  );
};

export default OrderFulfilmentModal;
