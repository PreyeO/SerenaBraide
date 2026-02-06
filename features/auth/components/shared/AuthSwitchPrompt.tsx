"use client";

import { useSearchParams } from "next/navigation";
import Paragraph from "@/components/ui/typography/paragraph";
import UnderlineLink from "@/components/ui/btns/underline-cta";

interface AuthSwitchPromptProps {
  message: string;
  linkText: string;
  href: string;
}

const AuthSwitchPrompt = ({
  message,
  linkText,
  href,
}: AuthSwitchPromptProps) => {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("return_url");

  // Preserve return_url when switching between login/register
  const finalHref = returnUrl
    ? `${href}?return_url=${encodeURIComponent(returnUrl)}`
    : href;

  return (
    <div className="flex flex-col gap-0.75 items-center lg:pt-12.5  font-normal">
      <Paragraph
        className="text-[#9A9A98] lg:text-sm text-xs leading-4.5 font-normal pt-1"
        content={message}
      />
      <UnderlineLink
        href={finalHref}
        text={linkText}
        className="text-[#3B3B3B] lg:text-sm text-xs"
      />
    </div>
  );
};
export default AuthSwitchPrompt;
