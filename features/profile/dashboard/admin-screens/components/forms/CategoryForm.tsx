"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCategorySchema } from "@/features/profile/schema/admin.schema";
import { CreateCategoryValues } from "@/features/profile/type/admin/product.type";

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
import { useCreateCategory } from "@/features/profile/hooks/admin/useCreateCategory";

const CategoryForm = () => {
  const { mutate: createCategoryMutation, isPending } = useCreateCategory();

  const form = useForm<CreateCategoryValues>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      parent_name: "",
    },
  });
  const onSubmit = (values: CreateCategoryValues) => {
    createCategoryMutation(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-150 border px-6 py-6 rounded-[25px] border-[#F0F0F0]"
      >
        {/* CATEGORY NAME */}
        <FormField
          control={form.control}
          name="parent_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Fragrances, Lips" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Perfume, Body mist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DESCRIPTION */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Category description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBMIT */}
        <div className="md:col-span-2">
          <SubmitButton
            label="Create Category"
            loadingLabel="Creating category..."
            isPending={isPending}
            onClick={() => {}}
          />
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
