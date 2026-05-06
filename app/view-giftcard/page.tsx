import ViewGiftCard from "@/features/gift-card/components/ViewGiftCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Your Gift Card",
  description: "View your Serena Braide e-gift card details and balance.",
};

export default function ViewGiftCardPage() {
  return (
    <main className="min-h-screen bg-white">
      <ViewGiftCard />
    </main>
  );
}
