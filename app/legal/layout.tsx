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
    <div className="min-h-screen lg:px-16 px-6 flex md:flex-row flex-col  pt-38">
      <aside className="w-55.75 h-143 border-r border-[#F0F0F0] py-6.25 md:flex flex-col hidden">
        <nav className="flex  flex-col lg:pl-6.25 gap-2.5">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-base font-medium text-[#6F6E6C] hover:text-[#3B3B3B]  transition-colors",
                pathname === link.href
                  ? "text-[#3B3B3B] underline"
                  : "text-[#6F6E6C]",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:flex-1 lg:pl-15 lg:w-187.5 lg:mx-auto ">
        {children}
      </main>
    </div>
  );
}
