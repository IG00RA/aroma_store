
import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputEmailProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const InputEmail = forwardRef<HTMLInputElement, InputEmailProps>(
  ({ className, value, onChange, error, disabled, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    return (
      <div className="relative">
        <Input
          type="email"
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

InputEmail.displayName = "InputEmail";

export { InputEmail };
