"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAddresses } from "../service/checkout.service";
import { Address } from "../type/checkout.type";

export const useGetAddresses = () => {
  return useQuery<Address[], AxiosError<{ message?: string }>>({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
};



