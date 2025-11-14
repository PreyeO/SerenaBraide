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
  return (
    <div className="flex flex-col gap-[3px] items-center pt-[50px] font-normal">
      <Paragraph
        className="text-[#9A9A98] text-sm leading-[18px] font-normal pt-1"
        content={message}
      />
      <UnderlineLink href={href} text={linkText} className="text-[#3B3B3B]" />
    </div>
  );
};
export default AuthSwitchPrompt;
