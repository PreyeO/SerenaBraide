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
      <DialogContent className="w-full h-full lg:h-auto lg:max-h-[90vh] max-w-none lg:max-w-xl rounded-none lg:rounded-lg overflow-hidden p-4 lg:p-6">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        {/* Scrollable content */}
        <div className="overflow-y-auto h-[calc(100vh-4rem)] lg:max-h-[calc(90vh-4rem)] pr-1">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GeneralModal;

