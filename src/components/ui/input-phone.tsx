
import React, { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputPhoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(
  ({ className, value, onChange, error, disabled, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let phoneValue = e.target.value;
      
      // Убираем все, кроме цифр
      phoneValue = phoneValue.replace(/\D/g, "");
      
      // Удаляем префикс из введенных данных для правильной обработки
      if (phoneValue.startsWith("380")) {
        phoneValue = phoneValue.slice(3);
      }
      
      // Ограничиваем длину до 9 цифр (без учета +380)
      if (phoneValue.length > 9) {
        phoneValue = phoneValue.slice(0, 9);
      }
      
      // Форматируем номер
      let formattedPhone = "+380";
      if (phoneValue.length > 0) {
        formattedPhone += " " + phoneValue;
      }
      
      onChange(formattedPhone);
    };

    return (
      <div className="relative">
        <Input
          type="tel"
          className={cn(
            "pl-14",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        <div className="absolute left-0 top-0 flex h-10 items-center justify-center px-3 text-sm font-medium text-gray-500">
          +380
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

InputPhone.displayName = "InputPhone";

export { InputPhone };
