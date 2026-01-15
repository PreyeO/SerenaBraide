"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

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
import { UpdateAddressSchema } from "../../schema/checkout.schema";
import { UpdateAddressFormValues, Address, UpdateAddressPayload } from "../../type/checkout.type";
import LinkCta from "@/components/ui/btns/link-cta";
import { useUpdateAddress } from "../../hooks/useUpdateAddress";

interface UpdateAddressFormProps {
  address: Address;
  onSuccess?: () => void;
}

const UpdateAddressForm = ({ address, onSuccess }: UpdateAddressFormProps) => {
  const updateAddressMutation = useUpdateAddress({
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const form = useForm<UpdateAddressFormValues>({
    resolver: zodResolver(UpdateAddressSchema),
    defaultValues: {
      address: address.address || "",
      city: address.city || "",
      state: address.state || "",
      zip_code: address.zip_code || "",
      country: address.country || "",
    },
  });

  useEffect(() => {
    form.reset({
      address: address.address || "",
      city: address.city || "",
      state: address.state || "",
      zip_code: address.zip_code || "",
      country: address.country || "",
    });
  }, [address, form]);

  const onSubmit = (data: UpdateAddressFormValues) => {
    const payload: UpdateAddressPayload = {};
    if (data.address) payload.address = data.address;
    if (data.city) payload.city = data.city;
    if (data.state) payload.state = data.state;
    if (data.zip_code) {
      // Convert zip_code string to number if it's a valid number, otherwise keep as string
      payload.zip_code = data.zip_code && !isNaN(Number(data.zip_code))
        ? Number(data.zip_code)
        : data.zip_code;
    }
    if (data.country) payload.country = data.country;

    updateAddressMutation.mutate({
      id: address.id,
      payload,
    });
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
                      placeholder="NG"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold text-[#3B3B3B]">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="City"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5 "
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

          <div className="pb-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm text-[#3B3B3B]">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Street, house/apartment, etc*"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-5 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 pb-7.5">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-medium text-sm text-[#3B3B3B]">
                    State
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
              name="zip_code"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-medium text-sm text-[#3B3B3B]">
                    Zip Code
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

          <div className="mt-10 grid grid-cols-2 gap-4">
            <SubmitButton
              label="Update Address"
              isPending={updateAddressMutation.isPending}
              loadingLabel="Updating..."
              className="w-full"
            />

            <LinkCta
              className="w-full text-[#3B3B3B] border border-[#6F6E6C] bg-white"
              label="Cancel"
              onClick={onSuccess}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateAddressForm;
