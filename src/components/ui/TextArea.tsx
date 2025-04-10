import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type TextAreaProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      label,
      placeholder,
      helperText,
      error,
      fullWidth = false,
      className = "",
      disabled = false,
      required = false,
      rows = 3,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={cn("mb-4", fullWidth ? "w-full" : "")}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-900 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          className={cn(
            "px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400",
            "focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900",
            {
              "w-full": fullWidth,
              "opacity-50 cursor-not-allowed": disabled,
              "border-red-500 focus:border-red-500 focus:ring-red-500": error,
            },
            className
          )}
          {...rest}
        />
        {helperText && !error && (
          <p className="mt-1 text-xs text-slate-500">{helperText}</p>
        )}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
