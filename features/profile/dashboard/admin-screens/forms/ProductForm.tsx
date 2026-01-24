"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
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
import SubmitButton from "@/components/ui/btns/submit-cta";
import { useCreateProduct } from "@/features/profile/hooks/admin/useCreateProduct";
import { useGetCategories } from "@/features/profile/hooks/admin/useGetCategories";
import {
  ImageUploadField,
  ImageMetadataFields,
  ToggleField,
} from "../shared/ImageComponents";

interface ProductFormProps {
  onProductCreated?: (productId: number) => void;
}

const ProductForm = ({ onProductCreated }: ProductFormProps) => {
  const [isProductCreated, setIsProductCreated] = useState(false);
  const { mutate, isPending } = useCreateProduct({
    onSuccess: (data) => {
      setIsProductCreated(true);
      if (onProductCreated && data?.id) {
        onProductCreated(data.id);
      }
    },
  });
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

  // Create refs for file inputs
  const fileInputRefs = useRef<Map<number, HTMLInputElement>>(new Map());
  const setFileInputRef = (index: number, element: HTMLInputElement | null) => {
    if (element) {
      fileInputRefs.current.set(index, element);
    } else {
      fileInputRefs.current.delete(index);
    }
  };

  const onSubmit = (values: CreateProductValues) => {
    // Validate that all images have files
    const hasInvalidImage = values.images.some((img) => !img.file);
    if (hasInvalidImage) {
      values.images.forEach((img, index) => {
        if (!img.file) {
          form.setError(`images.${index}.file`, {
            message: "Image file is required",
          });
        }
      });
      return; // Stop submission if validation fails
    }

    // Ensure is_featured is always a boolean
    const submitData = {
      ...values,
      is_featured: Boolean(values.is_featured ?? false),
    };

    mutate(submitData);
  };

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-150 border px-6 py-6 rounded-[25px] border-[#F0F0F0]"
      >
        {/* PRODUCT NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                Product name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product name"
                  className="h-11"
                  {...field}
                />
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
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                Product description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a product description"
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MEDIA SECTION */}
        <div className="space-y-3">
          <FormLabel className="text-sm font-normal text-[#3B3B3B]">
            Media
          </FormLabel>
          <div className="space-y-4">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <FormField
                    control={form.control}
                    name={`images.${index}.file`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <ImageUploadField
                            field={field}
                            index={index}
                            fileInputRef={(el) => setFileInputRef(index, el!)}
                            onButtonClick={() =>
                              fileInputRefs.current.get(index)?.click()
                            }
                            useNextImage={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Additional image metadata fields */}
                  <ImageMetadataFields
                    control={form.control}
                    index={index}
                    baseName="images"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors mt-2"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="text-[#3B3B3B] hover:text-[#2B2B2B] text-sm font-medium transition-colors"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#3B3B3B]">
                  Category
                </FormLabel>
                <Select
                  value={field.value ? String(field.value) : undefined}
                  onValueChange={(v) => field.onChange(Number(v))}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Choose a product category" />
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

          <FormField
            control={form.control}
            name="base_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#3B3B3B]">
                  Base Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter base price"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ToggleField
            control={form.control}
            name="is_featured"
            label="Featured Product?"
          />
        </div>

        {/* SUBMIT */}
        <div className="pt-4">
          <SubmitButton
            label="Continue"
            loadingLabel="Continue to variant..."
            isPending={isPending}
            disabled={isProductCreated}
          />
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
