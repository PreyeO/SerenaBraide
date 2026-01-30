"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateStaffInviteSchema } from "@/features/profile/schema/admin.schema";
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
import { useCreateAdminInvite } from "@/features/profile/hooks/admin/useCreateAdminInvite";
import { z } from "zod";

type CreateStaffInviteFormValues = z.infer<typeof CreateStaffInviteSchema>;

interface StaffFormProps {
  onSuccess?: () => void;
}

const StaffForm = ({ onSuccess }: StaffFormProps) => {
  const { mutate: createInviteMutation, isPending } = useCreateAdminInvite({
    onSuccess: () => {
      form.reset();
      onSuccess?.();
    },
  });

  const form = useForm<CreateStaffInviteFormValues>({
    resolver: zodResolver(CreateStaffInviteSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  });

  const onSubmit = (values: CreateStaffInviteFormValues) => {
    createInviteMutation(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="e.g. john.doe@example.com"
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* First Name */}
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                First Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. John"
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                Last Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Doe"
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                Phone Number <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="e.g. 09082976913"
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="pt-4">
          <SubmitButton
            label="Send Invitation"
            loadingLabel="Sending invitation..."
            isPending={isPending}
            className="w-full"
          />
        </div>
      </form>
    </Form>
  );
};

export default StaffForm;

