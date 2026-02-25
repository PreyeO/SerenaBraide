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
import { usePurchaseGiftCard } from "../../hooks/usePurchaseGiftCard";
import { useGiftCardStore } from "../../giftcard.store";
import { useRouter } from "next/navigation";
import { cardDesign } from "../../general.data";

interface RecipientFormProps {
  closeModal: () => void;
  buttonLabel?: string;
}
const RecipientForm = ({
  closeModal,
  buttonLabel = "Proceed to checkout",
}: RecipientFormProps) => {
  const router = useRouter();
  const { selectedAmount, selectedDesign } = useGiftCardStore();
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
      colour: cardDesign.find(d => d.name === selectedDesign)?.colour || undefined,
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
          className="flex flex-col lg:gap-6 gap-4 text-[#3B3B3B] font-medium text-sm w-full "
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Recipient Details
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="First name*"
                    className="rounded-[50px] border py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Last name*"
                    className="rounded-[50px] border py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email*"
                    className="rounded-[50px] border py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Include a Personal Note
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    placeholder="Write a message to accompany their gift"
                    className="border rounded-xl min-h-30 p-4 focus:border-[#3B3B3B] focus:bg-[#F5F5F5]"
                  />
                </FormControl>
                <div className="text-end text-[12px] font-normal text-[#6F6E6C]">
                  <span>0/250</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-2">
            <SubmitButton
              label={buttonLabel}
              isPending={purchaseMutation.isPending}
              loadingLabel="Processing..."
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RecipientForm;
