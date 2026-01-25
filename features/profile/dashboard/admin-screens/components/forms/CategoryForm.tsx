"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { CreateCategorySchema } from "@/features/profile/schema/admin.schema";
import {
  Category,
  CreateCategoryValues,
} from "@/features/profile/type/admin/product.type";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { useCreateCategory } from "@/features/profile/hooks/admin/useCreateCategory";
import { useGetCategories } from "@/features/profile/hooks/admin/useGetCategories";
import { Upload, X } from "lucide-react";
import Image from "next/image";

const CategoryForm = () => {
  const { mutate: createCategoryMutation, isPending } = useCreateCategory();
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategories();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<CreateCategoryValues>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      parent: null,
      image_url: undefined,
      image_alt_text: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("image_url", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    form.setValue("image_url", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (values: CreateCategoryValues) => {
    const submitData = {
      ...values,
      image_url: selectedFile || undefined,
    };
    createCategoryMutation(submitData, {
      onSuccess: () => {
        form.reset();
        setSelectedFile(null);
        setImagePreview(null);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-150 border px-6 py-6 rounded-[25px] border-[#F0F0F0]"
      >
        {/* PARENT CATEGORY */}
        <FormField
          control={form.control}
          name="parent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                Parent Category{" "}
              </FormLabel>
              <Select
                value={field.value ? String(field.value) : "none"}
                onValueChange={(v) =>
                  field.onChange(v === "none" ? null : Number(v))
                }
                disabled={categoriesLoading}
              >
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select parent category (or leave empty for root)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">
                    No Parent (Root Category)
                  </SelectItem>
                  {(categories as Category[]).map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CATEGORY NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                Category Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Perfume, Body mist"
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
                Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Category description..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CATEGORY IMAGE */}
        <FormField
          control={form.control}
          name="image_url"
          render={() => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                Category Image
              </FormLabel>
              <FormControl>
                <div className="space-y-3">
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Image preview or upload button */}
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <Image
                        src={imagePreview}
                        alt="Category preview"
                        width={200}
                        height={150}
                        className="rounded-lg object-cover border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedFile?.name}
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
                    >
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload category image
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}

                  {/* Change image button when image exists */}
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change Image
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* IMAGE ALT TEXT */}
        <FormField
          control={form.control}
          name="image_alt_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                Image Alt Text
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Describe the image for accessibility"
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SUBMIT */}
        <div className="pt-4">
          <SubmitButton
            label="Create Category"
            loadingLabel="Creating category..."
            isPending={isPending}
          />
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
