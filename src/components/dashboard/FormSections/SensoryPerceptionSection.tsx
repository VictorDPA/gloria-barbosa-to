import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { SensoryPerception } from "@/lib/types";

type SensoryPerceptionSectionProps = {
  data: SensoryPerception;
  onChange: (data: Partial<SensoryPerception>) => void;
};

export const SensoryPerceptionSection: React.FC<
  SensoryPerceptionSectionProps
> = ({ data, onChange }) => {
  const handleYesNoDetailChange = (key: keyof SensoryPerception) => {
    return (value: unknown) => {
      onChange({ [key]: value });
    };
  };

  return (
    <FormSection
      title="Percepção Sensorial"
      description="Avaliação da percepção e processamento sensorial"
      id="sensory-perception"
    >
      <div className="space-y-6">
        <YesNoDetailField
          id="sensitive-to-noise"
          label="Sensível a ruídos"
          value={data.sensitiveToNoise}
          onChange={handleYesNoDetailChange("sensitiveToNoise")}
        />

        <YesNoDetailField
          id="imitates-sounds"
          label="Imita sons"
          value={data.imitatesSounds}
          onChange={handleYesNoDetailChange("imitatesSounds")}
        />

        <YesNoDetailField
          id="sensitive-to-lights"
          label="Sensível a luzes"
          value={data.sensitiveToLights}
          onChange={handleYesNoDetailChange("sensitiveToLights")}
        />

        <YesNoDetailField
          id="stares-at-spinning-objects"
          label="Fixa-se em objetos que giram"
          value={data.staresAtSpinningObjects}
          onChange={handleYesNoDetailChange("staresAtSpinningObjects")}
        />
      </div>
    </FormSection>
  );
};
