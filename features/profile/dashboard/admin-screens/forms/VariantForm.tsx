"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { CreateVariantSchema } from "@/features/profile/schema/admin.schema";
import {
  AllProduct,
  CreateVariantValues,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { useCreateVariant } from "@/features/profile/hooks/admin/useCreateVariant";
import { useGetProducts } from "@/features/profile/hooks/admin/useGetProducts";
import {
  ImageUploadField,
  ImageMetadataFields,
  ToggleField,
} from "../shared/ImageComponents";

interface VariantFormProps {
  productId?: number;
  onVariantCreated?: () => void;
}

const VariantForm = ({ productId, onVariantCreated }: VariantFormProps) => {
  const { mutate, isPending } = useCreateVariant();
  const { data: products = [] } = useGetProducts();

  const form = useForm<CreateVariantValues>({
    resolver: zodResolver(CreateVariantSchema),
    defaultValues: {
      product_id: productId || 0,
      sku: "",
      size: "",
      color: "",
      price: "",
      stock_quantity: 0,
      is_active: true,
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

  const onSubmit = (values: CreateVariantValues) => {
    values.images.forEach((img, index) => {
      if (!img.file) {
        form.setError(`images.${index}.file`, {
          message: "Image file is required",
        });
        throw new Error("Missing image file");
      }
    });

    mutate(
      { productId: values.product_id, data: values },
      {
        onSuccess: () => {
          form.reset();
          onVariantCreated?.();
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-150 border px-6 py-6 rounded-[25px] border-[#F0F0F0]"
      >
        {/* PRODUCT SELECT */}
        <FormField
          control={form.control}
          name="product_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                Product
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(products as AllProduct[]).map((product: AllProduct) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SKU, SIZE, COLOR, PRICE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  SKU
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
                  Size
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 100ML"
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
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Color (Optional)
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Blue" className="h-11" {...field} />
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
                  Price
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
                  Stock Quantity
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

        {/* MEDIA SECTION */}
        <div className="space-y-3">
          <FormLabel className="text-sm font-medium text-[#3B3B3B]">
            Variant Images
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
            className="text-[#3B3B3B] hover:text-[#2B2B2B] text-sm font-normal transition-colors"
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
        <div className="pt-4">
          <SubmitButton
            label="Create Variant"
            loadingLabel="Creating variant..."
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};

export default VariantForm;
