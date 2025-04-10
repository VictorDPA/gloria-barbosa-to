import React from "react";
import { Checkbox } from "./Checkbox";
import { TextArea } from "./TextArea";
import { YesNoDetail } from "@/lib/types";

type YesNoDetailFieldProps = {
  id: string;
  label: string;
  value: YesNoDetail;
  onChange: (value: YesNoDetail) => void;
  disabled?: boolean;
};

export const YesNoDetailField: React.FC<YesNoDetailFieldProps> = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, yes: e.target.checked });
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...value, details: e.target.value });
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
        <TextArea
          id={`${id}-details`}
          placeholder="Detalhes..."
          value={value.details}
          onChange={handleDetailsChange}
          disabled={disabled}
          fullWidth
          rows={2}
        />
      )}
    </div>
  );
};
