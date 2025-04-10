import React from "react";
import { Checkbox } from "./Checkbox";
import { TextArea } from "./TextArea";
import { YesNoDependency } from "@/lib/types";

type YesNoDependencyFieldProps = {
  id: string;
  label: string;
  value: YesNoDependency;
  onChange: (value: YesNoDependency) => void;
  disabled?: boolean;
};

export const YesNoDependencyField: React.FC<YesNoDependencyFieldProps> = ({
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

  const handleDependencyChange = (
    key: keyof YesNoDependency["dependencyLevel"]
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      // Se o novo checkbox for marcado, desmarca os outros
      if (e.target.checked) {
        const updatedDependencyLevel = {
          dependent: key === "dependent",
          semiDependent: key === "semiDependent",
          independent: key === "independent",
        };

        onChange({
          ...value,
          dependencyLevel: updatedDependencyLevel,
        });
      } else {
        // Se desmarcar, atualiza apenas esse checkbox
        onChange({
          ...value,
          dependencyLevel: {
            ...value.dependencyLevel,
            [key]: false,
          },
        });
      }
    };
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
        <>
          <TextArea
            id={`${id}-details`}
            placeholder="Detalhes..."
            value={value.details}
            onChange={handleDetailsChange}
            disabled={disabled}
            fullWidth
            rows={2}
          />

          <div className="mt-2">
            <p className="text-sm font-medium text-slate-900 mb-1">
              Nível de dependência:
            </p>
            <div className="flex flex-col space-y-2">
              <Checkbox
                id={`${id}-dependent`}
                label="Dependente"
                checked={value.dependencyLevel.dependent}
                onChange={handleDependencyChange("dependent")}
                disabled={disabled}
              />
              <Checkbox
                id={`${id}-semi-dependent`}
                label="Semi-dependente"
                checked={value.dependencyLevel.semiDependent}
                onChange={handleDependencyChange("semiDependent")}
                disabled={disabled}
              />
              <Checkbox
                id={`${id}-independent`}
                label="Independente"
                checked={value.dependencyLevel.independent}
                onChange={handleDependencyChange("independent")}
                disabled={disabled}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
