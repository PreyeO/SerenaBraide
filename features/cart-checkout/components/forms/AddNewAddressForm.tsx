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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { CreateAddressSchema } from "../../schema/checkout.schema";
import {
  CreateAddressFormValues,
  CreateAddressPayload,
} from "../../type/checkout.type";
import LinkCta from "@/components/ui/btns/link-cta";
import { useCreateAddress } from "../../hooks/useCreateAddress";
import { countries } from "../../data/countries";

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
      phone_number: "",
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
      phone_number: data.phone_number || null,
    };
    createAddressMutation.mutate(payload);
  };

  return (
    <div className="w-full mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col text-[#3B3B3B] font-medium text-sm"
        >
          <div className="flex flex-col lg:flex-row gap-4 pb-4 lg:pb-6">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold text-sm lg:text-base text-[#3B3B3B]">
                    Country
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-3 lg:py-5 text-sm lg:text-base">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name} ({country.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold text-sm lg:text-base text-[#3B3B3B]">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="City"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-3 lg:py-5 text-sm lg:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 pb-4 lg:pb-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-medium text-sm text-[#3B3B3B]">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Street, house/apartment, etc*"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-3 lg:py-5 text-sm lg:text-base"
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
                  <FormLabel className="font-medium text-sm text-[#3B3B3B]">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Phone number (optional)"
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-3 lg:py-5 text-sm lg:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 pb-4 lg:pb-6">
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
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-3 lg:py-5 text-sm lg:text-base"
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
                      className="rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] py-3 lg:py-5 text-sm lg:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 lg:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
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
