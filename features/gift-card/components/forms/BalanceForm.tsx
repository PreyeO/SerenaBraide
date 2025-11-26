"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { BalanceSchema } from "../../giftcard.schema";
import { BalanceFormValues } from "../../giftcard.type";
import AuthSpan from "@/components/ui/typography/auth-span";
import Link from "next/link";
import Modal from "@/components/ui/modals/modal";
import SubHeading from "@/components/ui/typography/subHeading";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import Paragraph from "@/components/ui/typography/paragraph";

const BalanceForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm<BalanceFormValues>({
    resolver: zodResolver(BalanceSchema),
    defaultValues: {
      card_number: "",
      pin: "",
    },
  });

  const onSubmit = (data: BalanceFormValues) => {
    console.log("SUBMITTED DATA:", data);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-[#3B3B3B] font-medium text-sm w-full pt-[29px]"
        >
          <FormField
            control={form.control}
            name="card_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Gift card number"
                    className="rounded-[50px] border h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Pin"
                    className="rounded-[50px] border h-[50px]"
                  />
                </FormControl>
                <FormMessage />
                <AuthSpan className="font-normal text-sm leading-[22px]">
                  <Link href="/">
                    <span className="font-medium text-black">
                      {" "}
                      Need Help? {" "}
                    </span>
                  </Link>{" "}
                  Your gift card number and PIN were sent to the email address
                  you used at the time of purchase.
                </AuthSpan>
              </FormItem>
            )}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Gift card balance"
            icon={
              <CircleCheck size={24} className="text-white" fill="#01AD73" />
            }
          >
            <div className="bg-[#F0F3F7] my-[40px] border rounded-[10px] py-[25px] flex flex-col items-center">
              <SubHeading
                className="text-[40px] font-semibold"
                title="$350.00"
              />
              <h3 className="font-medium text-[#6F6E6C] text-[22px] pt-[10px] pb-4">
                Available balance
              </h3>
              <Paragraph
                className="text-[#3B3B3B] font-normal text-base  italic"
                content="This balance can be used across Serena Braid products"
              />
            </div>
            <SubmitButton label="Continue shopping" isPending={false} />

            <Paragraph
              className="text-[#3B3B3B] font-normal text-sm pb-[30px]"
              content="Gift card balance is valid for 12 months from date of purchase"
            />
          </Modal>
        </form>
      </Form>
    </div>
  );
};

export default BalanceForm;
