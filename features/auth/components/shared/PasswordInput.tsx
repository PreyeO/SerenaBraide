"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    placeholder?: string;
    name?: string;
    className?: string;
}

/**
 * Password input with toggle visibility
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    (
        {
            value,
            onChange,
            onBlur,
            placeholder = "******",
            name,
            className = "",
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="relative">
                <Input
                    ref={ref}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    className={`rounded-[50px] border focus:border-[#3B3B3B] focus:bg-[#F5F5F5] h-12.5 ${className}`}
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
