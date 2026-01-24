"use client";

import { useForm, useFieldArray, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useEffect } from "react";
import { CreateVariantSchema } from "@/features/profile/schema/admin.schema";
import { CreateVariantValues } from "@/features/profile/type/admin/product.type";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { useCreateVariant } from "@/features/profile/hooks/admin/useCreateVariant";

interface VariantFormProps {
  productId: number;
  onVariantCreated?: () => void;
}

// Separate component for image upload field to properly use hooks
interface VariantImageUploadFieldProps {
  field: ControllerRenderProps<CreateVariantValues, `images.${number}.file`>;
  index: number;
  fileInputRef: (el: HTMLInputElement | null) => void;
  onButtonClick: () => void;
}

const VariantImageUploadField = ({
  field,

  fileInputRef,
  onButtonClick,
}: VariantImageUploadFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (field.value) {
      const objectUrl = URL.createObjectURL(field.value);
      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else {
      setPreview(null);
    }
  }, [field.value]);

  return (
    <div className="flex flex-col items-center space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => field.onChange(e.target.files?.[0])}
      />
      {preview ? (
        <div className="w-full space-y-3">
          <div className="relative w-full max-w-xs mx-auto h-48">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg border border-gray-300"
            />
          </div>
          <button
            type="button"
            onClick={onButtonClick}
            className="bg-[#3B3B3B] hover:bg-[#2B2B2B] text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors"
          >
            Change image
          </button>
          <p className="text-xs text-[#6F6E6C] text-center">
            {field.value?.name}
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={onButtonClick}
          className="bg-[#3B3B3B] hover:bg-[#2B2B2B] text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors"
        >
          + Upload new image
        </button>
      )}
    </div>
  );
};

const VariantForm = ({ productId, onVariantCreated }: VariantFormProps) => {
  const { mutate, isPending } = useCreateVariant();

  const form = useForm<CreateVariantValues>({
    resolver: zodResolver(CreateVariantSchema),
    defaultValues: {
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
      { productId, data: values },
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

          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4 pt-8">
                <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                  Active Variant?
                </FormLabel>
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
                          <VariantImageUploadField
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
                    <FormField
                      control={form.control}
                      name={`images.${index}.alt_text`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">
                            Alt Text (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Image alt text"
                              className="h-9 text-sm"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`images.${index}.order`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Order</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              className="h-9 text-sm"
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
                        <FormItem className="flex items-center gap-3 pt-6">
                          <FormLabel className="text-sm">
                            Primary Image
                          </FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
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
