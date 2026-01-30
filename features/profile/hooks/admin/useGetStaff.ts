import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../service/admin/general";
import { Staff } from "../../type/admin/general.type";

export const useGetStaff = () => {
  return useQuery({
    queryKey: ["staff"],
    queryFn: getUsers,
    select: (data) => {
      // Filter for staff/admin users (is_admin === true or is_staff === true)
      const staff = (data?.results || []).filter(
        (user: Staff) => user.is_admin === true || user.is_staff === true,
      );
      return {
        ...data,
        results: staff,
        count: staff.length,
      };
    },
  });
};

