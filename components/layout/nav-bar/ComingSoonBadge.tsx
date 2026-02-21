// Shared Coming Soon badge with configurable colors
type CaptionColor = "amber" | "blue" | "purple" | "slate" | "pink" | "teal";

const BADGE_COLORS: Record<CaptionColor, string> = {
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  slate: "bg-slate-100 text-slate-600",
  pink: "bg-pink-100 text-pink-600",
  teal: "bg-teal-100 text-teal-700",
};

interface ComingSoonBadgeProps {
  caption?: string;
  captionColor?: CaptionColor;
  className?: string;
}

export const ComingSoonBadge = ({
  caption = "Coming soon",
  captionColor = "amber",
  className = "",
}: ComingSoonBadgeProps) => {
  const colors = BADGE_COLORS[captionColor] || BADGE_COLORS.amber;
  const text = caption || "Coming soon";
  const displayText =
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${colors} ${className}`}
    >
      {displayText}
    </span>
  );
};

export { BADGE_COLORS };

