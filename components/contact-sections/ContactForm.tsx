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
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { contactSchema } from "../../lib/schemas/schema";
import SubHeading from "@/components/ui/typography/subHeading";
import { useContact } from "@/hooks/useContact";
import { ContactFormValues } from "@/types/auth";
import Paragraph from "../ui/typography/paragraph";

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      Subject: "",
      country: "",
      message: "",
    },
  });

  const { mutate, isPending } = useContact();

  function onSubmit(values: ContactFormValues) {
    mutate(values);
    console.log(values);
  }

  return (
    <div className="pt-[50px] w-full gap-[34px] mb-[111px] flex flex-col items-center">
      {/* Heading Section */}
      <div className="w-full max-w-[700px] flex flex-col gap-[6px] font-normal items-start">
        <SubHeading
          className="text-[#3B3B3B] text-[26px]"
          title="We'd Love to Hear from You"
        />
        <Paragraph
          className="text-black text-sm"
          content="Feel free to reach out with questions, feedback, or special requests."
        />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#3B3B3B] font-normal w-full max-w-[700px]"
        >
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  FULL NAME
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">EMAIL</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[12px] font-medium">
                  PHONE NUMBER
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+234 801 234 5678"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-[12px] font-medium">
                  COUNTRY
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your country"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Subject */}
          <FormField
            control={form.control}
            name="Subject"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-[12px] font-medium">
                  SUBJECT
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter subject"
                    {...field}
                    className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-[12px] font-medium">
                  MESSAGE
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Write your message here..."
                    {...field}
                    className="rounded-[20px] h-[130px] border  focus:border-[#3B3B3B] focus:bg-[#F5F5F5]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="mt-4 w-full flex justify-center md:col-span-2">
            <div className="w-[400px] flex justify-center">
              <SubmitButton
                label="Send Message"
                loadingLabel="Sending..."
                isPending={isPending}
                className="w-full"
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
