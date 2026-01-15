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
import { CreateAddressSchema } from "../../schema/checkout.schema";
import {
  CreateAddressFormValues,
  CreateAddressPayload,
} from "../../type/checkout.type";
import LinkCta from "@/components/ui/btns/link-cta";
import { useCreateAddress } from "../../hooks/useCreateAddress";

interface AddNewAddressFormProps {
  onSuccess?: () => void;
}

const AddNewAddressForm = ({ onSuccess }: AddNewAddressFormProps) => {
  const createAddressMutation = useCreateAddress({
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const form = useForm<CreateAddressFormValues>({
    resolver: zodResolver(CreateAddressSchema),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
    },
  });

  const onSubmit = (data: CreateAddressFormValues) => {
    // Convert zip_code string to number if it's a valid number, otherwise keep as string
    const zipCode =
      data.zip_code && !isNaN(Number(data.zip_code))
        ? Number(data.zip_code)
        : data.zip_code;

    const payload: CreateAddressPayload = {
      address: data.address,
      city: data.city,
      state: data.state,
      zip_code: zipCode,
      country: data.country,
    };
    createAddressMutation.mutate(payload);
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
              label="Add Address"
              isPending={createAddressMutation.isPending}
              loadingLabel="Adding..."
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

export default AddNewAddressForm;
