import { useQuery } from "@tanstack/react-query";
import { getDashboardCards } from "../../service/admin/general";

interface DashboardCardsParams {
    startDate?: string;
    endDate?: string;
}

export const useGetDashboardCards = (params?: DashboardCardsParams) => {
    return useQuery({
        queryKey: ["dashboard-cards", params?.startDate, params?.endDate],
        queryFn: () =>
            getDashboardCards({
                start_date: params?.startDate,
                end_date: params?.endDate,
            }),
    });
};
