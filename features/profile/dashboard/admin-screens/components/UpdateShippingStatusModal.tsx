"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormModal from "@/components/ui/modals/form-modals";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { useUpdateOrderStatus } from "@/features/profile/hooks/admin/useUpdateOrderStatus";

const updateShippingStatusSchema = z.object({
  order_number: z.string(),
  status: z.enum(["paid", "shipped", "delivered"]),
});

type UpdateShippingStatusValues = z.infer<typeof updateShippingStatusSchema>;

interface UpdateShippingStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: number;
  currentStatus: string;
}

const UpdateShippingStatusModal = ({
  isOpen,
  onClose,
  orderNumber,
  currentStatus,
}: UpdateShippingStatusModalProps) => {
  const { mutate, isPending } = useUpdateOrderStatus({
    orderNumber,
    onSuccess: () => {
      onClose();
    },
  });

  const form = useForm<UpdateShippingStatusValues>({
    resolver: zodResolver(updateShippingStatusSchema),
    defaultValues: {
      order_number: orderNumber.toString(),
      status: currentStatus as "paid" | "shipped" | "delivered",
    },
  });

  // Update form values when modal opens or orderNumber/currentStatus changes
  useEffect(() => {
    if (isOpen) {
      form.reset({
        order_number: orderNumber.toString(),
        status: currentStatus as "paid" | "shipped" | "delivered",
      });
    }
  }, [isOpen, orderNumber, currentStatus, form]);

  const onSubmit = (values: UpdateShippingStatusValues) => {
    mutate({
      status: values.status,
    });
  };

  return (
    <FormModal open={isOpen} onClose={onClose} title="Update Shipping Status">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="order_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Order Number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled
                    className="bg-[#F5F5F5] cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Shipping Status
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="paid">Paid (Processing)</SelectItem>
                    <SelectItem value="shipped">
                      Shipped (In Transit)
                    </SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3 justify-end pt-4 w-full">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#6F6E6C] hover:text-[#3B3B3B] transition-colors"
            >
              Cancel
            </button>
            <SubmitButton
              label="Update Shipping Status"
              loadingLabel="Updating..."
              isPending={isPending}
              onClick={() => {}}
            />
          </div>
        </form>
      </Form>
    </FormModal>
  );
};

export default UpdateShippingStatusModal;
