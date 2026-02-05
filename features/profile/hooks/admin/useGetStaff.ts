import { useQuery } from "@tanstack/react-query";
import { getAdminProfiles } from "../../service/admin/general";

export const useGetStaff = () => {
  return useQuery({
    queryKey: ["admin-profiles"],
    queryFn: getAdminProfiles,
  });
};

