import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { YesNoMonthsField } from "@/components/ui/YesNoMonthsField";
import { BabyDevelopment } from "@/lib/types";

type BabyDevelopmentSectionProps = {
  data: BabyDevelopment;
  onChange: (data: Partial<BabyDevelopment>) => void;
};

export const BabyDevelopmentSection: React.FC<BabyDevelopmentSectionProps> = ({
  data,
  onChange,
}) => {
  const handleFieldChange = (key: keyof BabyDevelopment) => {
    return (value: (typeof data)[typeof key]) => {
      onChange({ [key]: value });
    };
  };

  return (
    <FormSection
      title="Desenvolvimento do Bebê"
      description="Marcos do desenvolvimento infantil"
      id="baby-development"
    >
      <div className="space-y-6">
        <YesNoMonthsField
          id="head-control"
          label="Sustentação da cabeça"
          value={data.headControl}
          onChange={handleFieldChange("headControl")}
        />

        <YesNoMonthsField
          id="rolled-over"
          label="Rolou"
          value={data.rolledOver}
          onChange={handleFieldChange("rolledOver")}
        />

        <YesNoMonthsField
          id="crawled"
          label="Engatinhou"
          value={data.crawled}
          onChange={handleFieldChange("crawled")}
        />

        <YesNoMonthsField
          id="sat-up"
          label="Sentou"
          value={data.satUp}
          onChange={handleFieldChange("satUp")}
        />

        <YesNoMonthsField
          id="walked"
          label="Andou"
          value={data.walked}
          onChange={handleFieldChange("walked")}
        />

        <YesNoMonthsField
          id="spoke"
          label="Falou"
          value={data.spoke}
          onChange={handleFieldChange("spoke")}
        />
      </div>
    </FormSection>
  );
};
