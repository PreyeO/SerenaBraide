"use client";

import React from "react";

interface OtpInputProps {
    value: string[];
    onChange: (newOtp: string[]) => void;
    length?: number;
    className?: string;
}

/**
 * 6-digit OTP input with auto-focus navigation
 */
const OtpInput: React.FC<OtpInputProps> = ({
    value,
    onChange,
    length = 6,
    className = "",
}) => {
    const handleChange = (index: number, inputValue: string) => {
        const newOtp = [...value];
        newOtp[index] = inputValue.slice(-1); // Only take last character
        onChange(newOtp);

        // Auto-focus next input
        if (inputValue && index < length - 1) {
            const nextInput = document.getElementById(
                `otp-${index + 1}`
            ) as HTMLInputElement;
            nextInput?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        // Handle backspace navigation
        if (e.key === "Backspace" && !value[index] && index > 0) {
            const prevInput = document.getElementById(
                `otp-${index - 1}`
            ) as HTMLInputElement;
            prevInput?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, length);
        const newOtp = [...value];

        for (let i = 0; i < pastedData.length; i++) {
            if (/^\d$/.test(pastedData[i])) {
                newOtp[i] = pastedData[i];
            }
        }

        onChange(newOtp);

        // Focus last filled input or next empty
        const lastIndex = Math.min(pastedData.length, length - 1);
        const lastInput = document.getElementById(
            `otp-${lastIndex}`
        ) as HTMLInputElement;
        lastInput?.focus();
    };

    return (
        <div className={`flex gap-2 justify-center ${className}`}>
            {value.map((char, index) => (
                <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    id={`otp-${index}`}
                    className="w-12.5 h-12.5 text-center border border-[#E0E0E0] focus:border-[#3B3B3B] rounded-full outline-none focus:bg-[#F5F5F5]"
                    value={char}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                />
            ))}
        </div>
    );
};

export default OtpInput;
