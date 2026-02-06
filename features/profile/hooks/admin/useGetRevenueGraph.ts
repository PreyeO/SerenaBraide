import { useQuery } from "@tanstack/react-query";
import { getRevenueGraph } from "../../service/admin/general";

export const useGetRevenueGraph = (year?: number) => {
    return useQuery({
        queryKey: ["revenue-graph", year],
        queryFn: () => getRevenueGraph(year),
    });
};
