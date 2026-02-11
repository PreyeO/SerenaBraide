"use client";

import { useQuery } from "@tanstack/react-query";
import { getShippingAreas } from "../../service/admin/order.service";

export const useGetShippingAreas = () => {
    return useQuery({
        queryKey: ["shipping-areas"],
        queryFn: getShippingAreas,
    });
};
