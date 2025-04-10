import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = {
  id?: string;
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange">;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      helperText,
      error,
      className = "",
      disabled = false,
      checked,
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={cn("flex items-start", className)}>
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            className={cn(
              "h-4 w-4 text-slate-900 focus:ring-slate-500 border-slate-300 rounded",
              {
                "opacity-50 cursor-not-allowed": disabled,
              }
            )}
            {...rest}
          />
        </div>
        <div className="ml-2 text-sm">
          {label && (
            <label
              htmlFor={id}
              className={cn("font-medium text-slate-900", {
                "opacity-50": disabled,
              })}
            >
              {label}
            </label>
          )}
          {helperText && !error && (
            <p className="text-xs text-slate-500">{helperText}</p>
          )}
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
