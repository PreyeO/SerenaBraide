import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-lg",
  lg: "w-14 h-14 sm:w-17 sm:h-17 text-lg sm:text-xl",
} as const;

interface InitialsAvatarProps {
  firstName?: string;
  lastName?: string;
  fallback?: string;
  size?: keyof typeof sizeClasses;
  className?: string;
}

const getInitials = (
  firstName?: string,
  lastName?: string,
  fallback?: string,
): string => {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (fallback) {
    return fallback[0]?.toUpperCase() || "";
  }
  return "";
};

const InitialsAvatar = ({
  firstName,
  lastName,
  fallback,
  size = "md",
  className,
}: InitialsAvatarProps) => {
  const initials = getInitials(firstName, lastName, fallback);

  return (
    <div
      className={cn(
        "rounded-full  flex items-center justify-center font-medium shrink-0",
        sizeClasses[size],
        className,
      )}
    >
      {initials}
    </div>
  );
};

export default InitialsAvatar;
