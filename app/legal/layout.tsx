// app/legal/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { legalLinks } from "@/components/legal-sections/data/legal";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section className="min-h-screen px-16 flex flex-row  pt-[152px]">
      {/* Sidebar */}
      <aside className="w-[223px] h-[572px] border-r border-[#F0F0F0] py-[25px]">
        <nav className="flex  flex-col pl-[25px] gap-[10px]">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-base font-medium text-[#6F6E6C] hover:text-[#3B3B3B]  transition-colors",
                pathname === link.href
                  ? "text-[#3B3B3B] underline"
                  : "text-[#6F6E6C]"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-[60px] max-w-[750px] mx-auto md:mx-0">
        {children}
      </main>
    </section>
  );
}
