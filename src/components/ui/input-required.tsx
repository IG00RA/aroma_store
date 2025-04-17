
import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputRequiredProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const InputRequired = forwardRef<HTMLInputElement, InputRequiredProps>(
  ({ className, value, onChange, error, required = true, disabled, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className="relative">
        <Input
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          required={required}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
        {required && (
          <span className="absolute text-red-500 text-lg leading-none top-1 right-3">*</span>
        )}
      </div>
    );
  }
);

InputRequired.displayName = "InputRequired";

export { InputRequired };
