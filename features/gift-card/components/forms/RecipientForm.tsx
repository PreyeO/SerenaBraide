"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { RecipientSchema } from "../../giftcard.schema";
import { RecipientFormValues } from "../../giftcard.type";
import { Textarea } from "@/components/ui/textarea";
import Paragraph from "@/components/ui/typography/paragraph";
import { usePurchaseGiftCard } from "../../hooks/usePurchaseGiftCard";
import { useGiftCardStore } from "../../giftcard.store";
import { useRouter } from "next/navigation";

interface RecipientFormProps {
  closeModal: () => void;
}
const RecipientForm = ({ closeModal }: RecipientFormProps) => {
  const router = useRouter();
  const { selectedAmount } = useGiftCardStore();
  const purchaseMutation = usePurchaseGiftCard();

  const form = useForm<RecipientFormValues>({
    resolver: zodResolver(RecipientSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: RecipientFormValues) => {
    if (!selectedAmount) return;

    const payload = {
      initial_amount: selectedAmount,
      recipient_first_name: data.first_name,
      recipient_last_name: data.last_name,
      recipient_email: data.email,
      message: data.message || undefined,
    };

    purchaseMutation.mutate(payload, {
      onSuccess: (giftCardData) => {
        // Store the gift card data
        useGiftCardStore.getState().setGiftCardData(giftCardData);
        closeModal();
        // Redirect to gift card checkout
        router.push("/giftcard-checkout");
      },
    });
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-[#3B3B3B] font-medium text-sm w-full "
        >
          {/* FIRST NAME */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  Add recipient delivery details
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your first name"
                    className="rounded-[50px] border h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* LAST NAME */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your last name"
                    className="rounded-[50px] border h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="john@example.com"
                    className="rounded-[50px] border h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MESSAGE */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  Add optional message
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Leave a short message..."
                    className="border rounded-xl min-h-[120px] p-4 focus:border-[#3B3B3B] focus:bg-[#F5F5F5]"
                  />
                </FormControl>
                <FormMessage className="flex justify-between">
                  <Paragraph
                    className=" text-[12px] font-normal text-[#6F6E6C]"
                    content="Enter a personalized message for the recipient."
                  />
                  <Paragraph
                    className="text-[12px] font-normal text-[#6F6E6C]"
                    content="0/250"
                  />{" "}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* SUBMIT */}
          <div className="mt-2">
            <SubmitButton
              label="Proceed to checkout"
              isPending={purchaseMutation.isPending}
              loadingLabel="Proceeding to checkout"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RecipientForm;
