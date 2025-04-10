import React from "react";
import { cn } from "@/lib/utils";

type FormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className = "",
  id,
}) => {
  return (
    <div
      id={id}
      className={cn(
        "bg-white p-4 md:p-6 rounded-lg shadow-sm border border-slate-200 mb-6",
        className
      )}
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};
