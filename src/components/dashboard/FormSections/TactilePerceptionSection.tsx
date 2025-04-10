import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { TactilePerception } from "@/lib/types";

type TactilePerceptionSectionProps = {
  data: TactilePerception;
  onChange: (data: Partial<TactilePerception>) => void;
};

export const TactilePerceptionSection: React.FC<
  TactilePerceptionSectionProps
> = ({ data, onChange }) => {
  const handleYesNoDetailChange = (key: keyof TactilePerception) => {
    return (value: any) => {
      onChange({ [key]: value });
    };
  };

  return (
    <FormSection
      title="Percepção Tátil"
      description="Avaliação da percepção e processamento tátil"
      id="tactile-perception"
    >
      <div className="space-y-6">
        <YesNoDetailField
          id="responds-to-caresses"
          label="Responde a carícias"
          value={data.respondsToCaresses}
          onChange={handleYesNoDetailChange("respondsToCaresses")}
        />

        <YesNoDetailField
          id="identifies-pain-location"
          label="Identifica local da dor"
          value={data.identifiesPainLocation}
          onChange={handleYesNoDetailChange("identifiesPainLocation")}
        />

        <YesNoDetailField
          id="walks-on-tiptoes"
          label="Anda na ponta dos pés"
          value={data.walksOnTiptoes}
          onChange={handleYesNoDetailChange("walksOnTiptoes")}
        />

        <YesNoDetailField
          id="avoids-dirt"
          label="Evita sujeira"
          value={data.avoidsDirt}
          onChange={handleYesNoDetailChange("avoidsDirt")}
        />

        <YesNoDetailField
          id="reacts-aggressively-to-touch"
          label="Reage agressivamente ao toque"
          value={data.reactsAggressivelyToTouch}
          onChange={handleYesNoDetailChange("reactsAggressivelyToTouch")}
        />
      </div>
    </FormSection>
  );
};
