export interface CartItemProps {
  image: string;
  name: string;
  price: string;
  quantity?: number;
  showQuantity?: boolean;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
  editLink?: string;
  metaLabel: React.ReactNode;
  width: number;
  height: number;
  showRemoveButton?: boolean;
  showQuantityBox?: boolean;
  showRemoveEdit?: boolean;
  className: string;
}
