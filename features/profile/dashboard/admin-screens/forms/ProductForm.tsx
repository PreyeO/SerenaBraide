"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductSchema } from "@/features/profile/schema/admin.schema";
import {
  Category,
  CreateProductValues,
} from "@/features/profile/type/admin/product.type";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { useCreateProduct } from "@/features/profile/hooks/admin/useCreateProduct";
import { useGetCategories } from "@/features/profile/hooks/admin/useGetCategories";

const ProductForm = () => {
  const { mutate, isPending } = useCreateProduct();
  const { data: categories = [], isLoading } = useGetCategories();

  const form = useForm<CreateProductValues>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: 1,
      base_price: "",
      is_featured: false,
      images: [
        {
          file: undefined,
          is_primary: true,
          alt_text: "",
          order: 1,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const onSubmit = (values: CreateProductValues) => {
    values.images.forEach((img, index) => {
      if (!img.file) {
        form.setError(`images.${index}.file`, {
          message: "Image file is required",
        });
        throw new Error("Missing image file");
      }
    });

    mutate(values);
  };

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
      >
        {/* PRODUCT NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CATEGORY SELECT */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(v) => field.onChange(Number(v))}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((option: Category) => (
                    <SelectItem key={option.id} value={String(option.id)}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <Textarea
                  placeholder="Enter product description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BASE PRICE */}
        <FormField
          control={form.control}
          name="base_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Price</FormLabel>
              <FormControl>
                <Input placeholder="70000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* FEATURED SWITCH */}
        <FormField
          control={form.control}
          name="is_featured"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4 mt-10">
              <FormLabel>Featured Product?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* IMAGE ARRAY */}
        <div className="md:col-span-2">
          <h3 className="mb-2 font-medium">Product Images</h3>

          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded-lg"
            >
              <FormField
                control={form.control}
                name={`images.${index}.file`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`images.${index}.alt_text`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`images.${index}.order`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`images.${index}.is_primary`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4 mt-6">
                    <FormLabel>Primary</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="mt-2 bg-black text-white px-4 py-2 rounded"
            onClick={() =>
              append({
                file: undefined as unknown as File,
                is_primary: false,
                alt_text: "",
                order: fields.length + 1,
              })
            }
          >
            + Add Another Image
          </button>
        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2">
          <SubmitButton
            label="Create Product"
            loadingLabel="Creating product..."
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
