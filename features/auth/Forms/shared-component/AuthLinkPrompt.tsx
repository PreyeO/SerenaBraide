"use client";

import Link from "next/link";

interface AuthLinkPromptProps {
  message: string;
  linkText: string;
  href: string;
}

export default function AuthLinkPrompt({
  message,
  linkText,
  href,
}: AuthLinkPromptProps) {
  return (
    <span className="text-sm text-[#6F6E6C] font-normal">
      {message}{" "}
      <Link href={href}>
        <span className={`underline cursor-pointer text-[#3B3B3B] `}>
          {linkText}
        </span>
      </Link>
    </span>
  );
}
