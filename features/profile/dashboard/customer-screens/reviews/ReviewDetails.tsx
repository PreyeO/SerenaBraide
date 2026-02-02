"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import {
  CreateRatingPayload,
  OrderInfo,
} from "@/features/profile/type/customers/profile.type";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { useCreateRating } from "@/features/profile/hooks/customer/useCreateRating";
import {
  CreateRatingSchema,
  CreateRatingFormValues,
} from "@/features/profile/schema/customer.schema";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface ReviewDetailsProps {
  order: OrderInfo;
  onSuccess?: () => void;
}

const ReviewDetails: React.FC<ReviewDetailsProps> = ({ order, onSuccess }) => {
  const createRatingMutation = useCreateRating({
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const form = useForm<CreateRatingFormValues>({
    resolver: zodResolver(CreateRatingSchema),
    defaultValues: {
      order_item: order.id || 0,
      rating: 0,
      review: "",
    },
  });

  useEffect(() => {
    if (order.id) {
      form.setValue("order_item", order.id);
    }
  }, [order.id, form]);

  const ratingLabels: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  const handleRatingClick = (value: number) => {
    form.setValue("rating", value, { shouldValidate: true });
  };

  const onSubmit = (data: CreateRatingFormValues) => {
    console.log("Form submitted with data:", data);
    if (!order.id) {
      console.error("Order item ID is missing");
      return;
    }

    const payload: CreateRatingPayload = {
      order_item: order.id,
      rating: data.rating,
      review: data.review?.trim() || undefined,
    };

    console.log("Submitting payload:", payload);
    createRatingMutation.mutate(payload);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <SubHeading
        title="Order Review"
        className="text-base lg:text-lg font-medium text-[#3B3B3B]"
      />

      {/* Product Card */}
      <div className="border border-[#D1D5DB] py-3 lg:py-3.75 px-3 lg:px-3.75 rounded-md">
        {/* Mobile: Status badge at top */}
        <div className="flex lg:hidden mb-3">
          <Badge
            variant="secondary"
            className="flex items-center gap-1.5 px-0 py-0 text-xs bg-transparent"
            style={{ color: order.color }}
          >
            {order.icon && (
              <order.icon className="size-4" color={order.iconBg} />
            )}
            <span className="whitespace-nowrap">{order.title}</span>
          </Badge>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2.5">
            <ProductImage
              src={order.src}
              alt={order.alt}
              width={102}
              height={102}
              imageClassName="w-16 lg:w-25.5 h-full object-cover rounded-[5px]"
            />

            <div className="flex flex-col gap-0.5 lg:gap-1">
              <Paragraph
                content={order.productName}
                className="text-sm font-medium text-[#3B3B3B] line-clamp-2"
              />

              <div className="flex gap-2 lg:gap-4">
                <Paragraph
                  content={order.price}
                  className="text-sm text-[#3B3B3B]"
                />
                <Paragraph
                  content={order.quantity}
                  className="text-sm text-[#3B3B3B]"
                />
              </div>

              <Paragraph
                content={order.size}
                className="text-sm text-[#6F6E6C]"
              />

              <Paragraph
                content={
                  order.date.includes("Order date:")
                    ? order.date
                    : `Order date: ${order.date}`
                }
                className="text-sm text-[#9A9A98]"
              />
            </div>
          </div>

          {/* Desktop only: Badge on right */}
          <div className="hidden lg:block">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1 text-xs"
              style={{
                backgroundColor: `${order.color}10`,
                color: order.color,
              }}
            >
              {order.icon && (
                <order.icon className="size-4" color={order.iconBg} />
              )}
              <span className="whitespace-nowrap">{order.title}</span>
            </Badge>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-6"
        >
          {/* Content Section */}
          <div className="space-y-3 lg:space-y-4">
            <SubHeading
              title="Content"
              className="text-base lg:text-lg font-medium text-[#3B3B3B]"
            />

            {/* Review Textarea */}
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        {...field}
                        placeholder="Share your thoughts about this product"
                        className="min-h-24 lg:min-h-30 rounded-lg border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] resize-none text-sm lg:text-base"
                        maxLength={3000}
                      />
                      <div className="absolute bottom-2 lg:bottom-3 right-2 lg:right-3 text-xs text-[#6F6E6C]">
                        {field.value?.length || 0}/3000
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Rating Section */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <SubHeading
                  title="Rating*"
                  className="text-base lg:text-lg font-medium text-[#3B3B3B]"
                />
                <FormControl>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingClick(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className="size-5 lg:size-6 cursor-pointer transition-colors"
                            fill={
                              star <= (field.value || 0) ? "#D97705" : "none"
                            }
                            stroke={
                              star <= (field.value || 0) ? "#D97705" : "#D1D5DB"
                            }
                          />
                        </button>
                      ))}
                    </div>
                    {field.value && field.value > 0 && (
                      <Paragraph
                        content={ratingLabels[field.value]}
                        className="text-sm text-[#3B3B3B] font-medium"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="pt-2 lg:pt-4">
            <SubmitButton
              label="Submit"
              isPending={createRatingMutation.isPending}
              loadingLabel="Submitting..."
              className="w-full rounded-full cursor-pointer"
              onClick={() => {
                console.log("Submit button clicked");
                // Manually trigger form validation and submission
                form.trigger().then((isValid) => {
                  console.log("Form validation result:", isValid);
                  if (isValid) {
                    const formData = form.getValues();
                    console.log("Form values:", formData);
                    onSubmit(formData);
                  } else {
                    console.log("Form errors:", form.formState.errors);
                  }
                });
              }}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReviewDetails;
