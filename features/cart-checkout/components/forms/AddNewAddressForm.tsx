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
import { AddressSchema } from "../schema/checkout.schema";
import { AddressFormValues } from "../../type/checkout.type";
import LinkCta from "@/components/ui/btns/link-cta";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const AddNewAddressForm = () => {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
      country: "",
      address_title: "",
      state: "",
      LGA: "",
      zipcode: "",
      city: "",
      street_name: "",
      unit_info: "",
    },
  });

  const onSubmit = (data: AddressFormValues) => {
    console.log("ADDRESS DATA:", data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col  text-[#3B3B3B] font-medium text-sm"
        >
          <div className="flex gap-4 pb-6">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold text-[#3B3B3B]">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nigeria"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address_title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold text-[#3B3B3B]">
                    Address Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Home, Office etc"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <span className="font-semibold pb-4 text-sm text-[#3B3B3B]">
            Contact Information
          </span>

          {/* Row: Country & Address Title */}
          <div className="flex gap-4 pb-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className=" font-medium text-sm text-[#3B3B3B] ">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Contact name*"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className=" font-medium text-sm text-[#3B3B3B]">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Phone number*"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <span className="font-semibold pb-4 text-sm text-[#3B3B3B]">
            Address
          </span>

          <div className="flex gap-4 pb-4">
            <FormField
              control={form.control}
              name="street_name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-medium text-sm text-[#3B3B3B]">
                    Street Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Street, house/apartment*"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit_info"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-medium text-sm text-[#3B3B3B]">
                    Apt / Suite / Unit
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Apt, suit, unit, etc (optional)"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 pb-[30px]">
            {/* Left: State + LGA stacked */}
            <div className="flex-1 flex  gap-4">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sm text-[#3B3B3B]">
                      State/City
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="State"
                        className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="LGA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sm text-[#3B3B3B]">
                      LGA
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="LGA"
                        className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-medium text-sm text-[#3B3B3B]">
                    Zipcode
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Zip code*"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-[6px] items-center">
            <Checkbox className="border border-[#9A9A98]" />
            <Label className="text-sm text-[#3B3B3B] font-normal">
              Set as default shipping address
            </Label>
          </div>

          <div className="mt-[40px] grid grid-cols-2 gap-4">
            <SubmitButton
              label="Add Address"
              isPending={false}
              loadingLabel="Adding..."
              className="w-full"
            />

            <LinkCta
              className="w-full text-[#3B3B3B] border border-[#6F6E6C] bg-white"
              label="Cancel"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddNewAddressForm;
