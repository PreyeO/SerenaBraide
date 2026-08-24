"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import Image from "next/image";
import { UpdateProductSchema } from "@/features/profile/schema/admin.schema";
import {
  Category,
  UpdateProductValues,
} from "@/features/profile/type/admin/product.type";
import { ProductDetail } from "@/features/products/product.type";
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
import { useUpdateProduct } from "@/features/profile/hooks/admin/useUpdateProduct";
import { useGetCategories } from "@/features/profile/hooks/admin/useGetCategories";
import {
  ImageUploadField,
  ImageMetadataFields,
  ToggleField,
} from "../shared/ImageComponents";

interface EditProductFormProps {
  product: ProductDetail;
  onSuccess?: () => void;
}

const EditProductForm = ({ product, onSuccess }: EditProductFormProps) => {
  const { mutate, isPending } = useUpdateProduct({ onSuccess });
  const { data: categories = [], isLoading } = useGetCategories();

  const form = useForm<UpdateProductValues>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      category: product.category,
      base_price: product.base_price,
      is_featured: product.is_featured,
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const fileInputRefs = useRef<Map<number, HTMLInputElement>>(new Map());
  const filesRef = useRef<Map<number, File>>(new Map());
  const setFileInputRef = (index: number, element: HTMLInputElement | null) => {
    if (element) {
      fileInputRefs.current.set(index, element);
    } else {
      fileInputRefs.current.delete(index);
    }
  };

  const onSubmit = (values: UpdateProductValues) => {
    const images = (values.images ?? [])
      .map((img, index) => ({ ...img, file: filesRef.current.get(index) }))
      .filter((img) => img.file instanceof File);

    mutate({
      productId: product.id,
      data: { ...values, images },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-150"
      >
        {/* PRODUCT NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                Product name <span className="text-red-500">*</span>
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
                Product description <span className="text-red-500">*</span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Category <span className="text-red-500">*</span>
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
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Base Price <span className="text-red-500">*</span>
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

        {/* EXISTING IMAGES */}
        {product.images.length > 0 && (
          <div className="space-y-3">
            <FormLabel className="text-sm font-normal text-[#3B3B3B]">
              Current Images
            </FormLabel>
            <div className="flex flex-wrap gap-3">
              {product.images.map((img) => (
                <div
                  key={img.id}
                  className="relative w-20 h-20 rounded-md overflow-hidden border border-[#F0F0F0]"
                >
                  <Image
                    src={img.image_url}
                    alt={img.alt_text}
                    fill
                    className="object-cover"
                  />
                  {img.is_primary && (
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-[#6F6E6C]">
              Existing images stay as they are. Add new images below if needed.
            </p>
          </div>
        )}

        {/* NEW IMAGES */}
        <div className="space-y-3">
          <FormLabel className="text-sm font-normal text-[#3B3B3B]">
            Add New Images (optional)
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
                            useNextImage
                            onFileChange={(file) => {
                              if (file) {
                                filesRef.current.set(index, file);
                              } else {
                                filesRef.current.delete(index);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ImageMetadataFields
                    control={form.control}
                    index={index}
                    baseName="images"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      filesRef.current.delete(index);
                      remove(index);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="text-[#3B3B3B] hover:text-[#2B2B2B] text-sm font-medium transition-colors"
            onClick={() =>
              append({
                file: null,
                is_primary: false,
                alt_text: "",
                order: product.images.length + fields.length + 1,
              })
            }
          >
            + Add Another Image
          </button>
        </div>

        {/* SUBMIT */}
        <div className="pt-4">
          <SubmitButton
            label="Save Changes"
            loadingLabel="Saving..."
            isPending={isPending}
            className="w-full"
          />
        </div>
      </form>
    </Form>
  );
};

export default EditProductForm;
