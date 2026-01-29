import { useQuery } from "@tanstack/react-query";
import { getReview } from "../../service/admin/general";

export const useGetReview = (id: number | null) => {
  return useQuery({
    queryKey: ["admin-review", id],
    queryFn: () => getReview(id!),
    enabled: !!id,
  });
};

