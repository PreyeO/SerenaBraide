import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../service/admin/general";

export const useGetReviews = () => {
  return useQuery({
    queryKey: ["admin-reviews"],
    queryFn: getReviews,
  });
};

