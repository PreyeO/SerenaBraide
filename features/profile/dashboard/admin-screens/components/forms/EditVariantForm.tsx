"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import Image from "next/image";
import { UpdateVariantSchema } from "@/features/profile/schema/admin.schema";
import {
  ProductVariant,
  UpdateVariantValues,
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
import SubmitButton from "@/components/ui/btns/submit-cta";
import { useUpdateVariant } from "@/features/profile/hooks/admin/useUpdateVariant";
import {
  ImageUploadField,
  ImageMetadataFields,
  ToggleField,
} from "../shared/ImageComponents";

interface EditVariantFormProps {
  productId: number;
  variant: ProductVariant;
  onSuccess?: () => void;
}

const EditVariantForm = ({
  productId,
  variant,
  onSuccess,
}: EditVariantFormProps) => {
  const { mutate, isPending } = useUpdateVariant({ onSuccess });

  const form = useForm<UpdateVariantValues>({
    resolver: zodResolver(UpdateVariantSchema),
    defaultValues: {
      product_id: productId,
      sku: variant.sku,
      size: variant.size,
      color: variant.color || "",
      price: variant.price,
      stock_quantity: variant.stock_quantity,
      is_active: variant.is_active,
      ingredients: null,
      inspiration: null,
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

  const onSubmit = (values: UpdateVariantValues) => {
    // Only newly-added image rows need a real File attached — drop any that
    // never got one (e.g. an added-then-untouched row).
    const images = (values.images ?? [])
      .map((img, index) => ({ ...img, file: filesRef.current.get(index) }))
      .filter((img) => img.file instanceof File);

    mutate({
      productId,
      variantId: variant.id,
      data: { ...values, images },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-150"
      >
        {/* SKU, SIZE, COLOR, PRICE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  SKU <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., FRAG-MEN-100ML-BLUE"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Size <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 100ML" className="h-11" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Color (optional)
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={field.value || "#000000"}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-12 h-11 rounded-md cursor-pointer border border-gray-200 p-1"
                    />
                    <Input
                      placeholder="Leave empty if no color"
                      className="h-11 flex-1"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    {field.value && (
                      <button
                        type="button"
                        onClick={() => field.onChange("")}
                        className="text-gray-400 hover:text-gray-600 text-sm"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Price <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="30.00"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* STOCK QUANTITY AND IS ACTIVE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="stock_quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Stock Quantity <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="15"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ToggleField
            control={form.control}
            name="is_active"
            label="Active Variant?"
            className="flex items-center gap-4 pt-8"
          />
        </div>

        {/* INGREDIENTS AND INSPIRATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Ingredients
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Leave blank to keep unchanged"
                    className="min-h-[100px]"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inspiration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Inspiration
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Leave blank to keep unchanged"
                    className="min-h-[100px]"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* EXISTING IMAGES */}
        {variant.images.length > 0 && (
          <div className="space-y-3">
            <FormLabel className="text-sm font-normal text-[#3B3B3B]">
              Current Images
            </FormLabel>
            <div className="flex flex-wrap gap-3">
              {variant.images.map((img) => (
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
            className="text-[#3B3B3B] hover:text-[#2B2B2B] text-sm font-normal transition-colors"
            onClick={() =>
              append({
                file: null,
                is_primary: false,
                alt_text: "",
                order: variant.images.length + fields.length + 1,
              })
            }
          >
            + Add New Image
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

export default EditVariantForm;
