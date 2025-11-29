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
      parent: null,
    },
  });
  const onSubmit = (values: CreateCategoryValues) => {
    createCategoryMutation(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
      >
        {/* CATEGORY NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Fragrances" {...field} />
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

        {/* PARENT INPUT (optional) */}
        <FormField
          control={form.control}
          name="parent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category ID (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Leave empty for no parent"
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? null : Number(e.target.value)
                    )
                  }
                />
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
