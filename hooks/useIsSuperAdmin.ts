import { useAuthStore } from "@/features/auth/auth.store";

const SUPER_ADMIN_EMAILS = [
    "test1@gmail.com",
    "serenabraideofficial@gmail.com",
];

export const useIsSuperAdmin = (): boolean => {
    const user = useAuthStore((state) => state.user);
    if (!user?.email) return false;
    return SUPER_ADMIN_EMAILS.includes(user.email.toLowerCase());
};
