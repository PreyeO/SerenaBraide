// components/ui/modal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const GeneralModal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-hidden">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[calc(90vh-4rem)] pr-1">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GeneralModal;
