"use client";

import { useState, useEffect } from "react";
import {
  ControllerRenderProps,
  Control,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

interface ImageUploadFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  index: number;
  fileInputRef: (el: HTMLInputElement | null) => void;
  onButtonClick: () => void;
  useNextImage?: boolean;
}

export const ImageUploadField = <T extends FieldValues>({
  field,
  fileInputRef,
  onButtonClick,
  useNextImage = false,
}: ImageUploadFieldProps<T>) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (field.value && (field.value as unknown) instanceof File) {
      const objectUrl = URL.createObjectURL(field.value as File);
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
            {useNextImage ? (
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover rounded-lg border border-gray-300"
              />
            ) : (
              <Image
                src={preview}
                alt="Preview"
                fill
                className="w-full h-full object-cover rounded-lg border border-gray-300"
              />
            )}
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

interface ImageMetadataFieldsProps<T extends FieldValues> {
  control: Control<T>;
  index: number;
  baseName: string;
}

export const ImageMetadataFields = <T extends FieldValues>({
  control,
  index,
  baseName,
}: ImageMetadataFieldsProps<T>) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
      <FormField
        control={control}
        name={`${baseName}.${index}.alt_text` as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Alt Text (Optional)</FormLabel>
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
        control={control}
        name={`${baseName}.${index}.order` as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Order</FormLabel>
            <FormControl>
              <Input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="h-9 text-sm"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${baseName}.${index}.is_primary` as Path<T>}
        render={({ field }) => (
          <FormItem className="flex items-center gap-3 pt-6">
            <FormLabel className="text-sm">Primary Image</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

interface ToggleFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: string;
  label: string;
  className?: string;
}

export const ToggleField = <T extends FieldValues>({
  control,
  name,
  label,
  className = "flex items-center gap-4",
}: ToggleFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-sm font-normal text-[#3B3B3B]">
            {label}
          </FormLabel>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
