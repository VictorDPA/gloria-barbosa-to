// src/components/ui/YesNoMonthsField.tsx
import React from "react";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import { YesNoMonths } from "@/lib/types";

type YesNoMonthsFieldProps = {
  id: string;
  label: string;
  value: YesNoMonths;
  onChange: (value: YesNoMonths) => void;
  disabled?: boolean;
};

export const YesNoMonthsField: React.FC<YesNoMonthsFieldProps> = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, yes: e.target.checked });
  };

  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, months: e.target.value });
  };

  return (
    <div className="space-y-2">
      <Checkbox
        id={`${id}-checkbox`}
        label={label}
        checked={value.yes}
        onChange={handleCheckboxChange}
        disabled={disabled}
      />

      {value.yes && (
        <div className="flex items-center">
          <div className="w-24">
            <Input
              id={`${id}-months`}
              type="number"
              placeholder="Meses"
              value={value.months}
              onChange={handleMonthsChange}
              disabled={disabled}
              min={0}
              max={120}
            />
          </div>
          <span className="ml-2 text-sm text-slate-700">meses</span>
        </div>
      )}
    </div>
  );
};
