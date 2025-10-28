// app/legal/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { legalLinks } from "@/constant/data";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section className="min-h-screen flex flex-col md:flex-row px-6 md:px-[60px] py-[80px] text-[#3B3B3B] bg-white">
      {/* Sidebar */}
      <aside className="w-full md:w-[250px] mb-10 md:mb-0">
        <nav className="flex md:flex-col gap-4 md:gap-2">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-medium hover:text-[#111] transition-colors",
                pathname === link.href
                  ? "text-[#111] font-semibold"
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
