"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateShippingAreaSchema } from "@/features/profile/schema/admin.schema";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { useCreateShippingArea } from "@/features/profile/hooks/admin/useCreateShippingArea";
import { useUpdateShippingArea } from "@/features/profile/hooks/admin/useUpdateShippingArea";
import { z } from "zod";
import { ShippingArea } from "@/features/profile/type/admin/general.type";

type ShippingAreaFormValues = z.infer<typeof CreateShippingAreaSchema>;

interface ShippingFormProps {
    onSuccess?: () => void;
    initialData?: ShippingArea | null;
}

const ShippingForm = ({ onSuccess, initialData }: ShippingFormProps) => {
    const isEditMode = !!initialData;

    const { mutate: createMutation, isPending: isCreating } = useCreateShippingArea({
        onSuccess: () => {
            form.reset();
            onSuccess?.();
        },
    });

    const { mutate: updateMutation, isPending: isUpdating } = useUpdateShippingArea({
        onSuccess: () => {
            onSuccess?.();
        },
    });

    const isPending = isCreating || isUpdating;

    const form = useForm<ShippingAreaFormValues>({
        resolver: zodResolver(CreateShippingAreaSchema),
        defaultValues: {
            name: initialData?.name || "",
            fee: initialData?.fee || "",
        },
    });

    const onSubmit = (values: ShippingAreaFormValues) => {
        if (isEditMode && initialData) {
            updateMutation({ id: initialData.id, payload: values });
        } else {
            createMutation(values);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full max-w-md"
            >
                {/* Area Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                                Area Name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. South-East"
                                    className="h-11"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Shipping Fee */}
                <FormField
                    control={form.control}
                    name="fee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-normal text-[#3B3B3B]">
                                Shipping Fee (₦) <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="e.g. 5000"
                                    className="h-11"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit */}
                <div className="pt-4">
                    <SubmitButton
                        label={isEditMode ? "Update Area" : "Add Area"}
                        loadingLabel={isEditMode ? "Updating..." : "Adding..."}
                        isPending={isPending}
                        className="w-full"
                    />
                </div>
            </form>
        </Form>
    );
};

export default ShippingForm;
