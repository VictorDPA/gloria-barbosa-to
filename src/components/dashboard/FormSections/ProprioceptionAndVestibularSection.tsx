import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { ProprioceptionAndVestibular } from "@/lib/types";

type ProprioceptionVestibularSectionProps = {
  data: ProprioceptionAndVestibular;
  onChange: (data: Partial<ProprioceptionAndVestibular>) => void;
};

export const ProprioceptionVestibularSection: React.FC<
  ProprioceptionVestibularSectionProps
> = ({ data, onChange }) => {
  const handleYesNoDetailChange = (key: keyof ProprioceptionAndVestibular) => {
    return (value: any) => {
      onChange({ [key]: value });
    };
  };

  return (
    <FormSection
      title="Propriocepção e Sistema Vestibular"
      description="Avaliação da percepção corporal e equilíbrio"
      id="proprioception-vestibular"
    >
      <div className="space-y-6">
        <YesNoDetailField
          id="likes-tight-hugs"
          label="Gosta de abraços apertados"
          value={data.likesTightHugs}
          onChange={handleYesNoDetailChange("likesTightHugs")}
        />

        <YesNoDetailField
          id="dislikes-tight-clothes"
          label="Não gosta de roupas apertadas"
          value={data.dislikesTightClothes}
          onChange={handleYesNoDetailChange("dislikesTightClothes")}
        />

        <YesNoDetailField
          id="enjoys-swinging-or-rocking"
          label="Gosta de balançar ou embalar"
          value={data.enjoysSwingingOrRocking}
          onChange={handleYesNoDetailChange("enjoysSwingingOrRocking")}
        />

        <YesNoDetailField
          id="spins-around-by-themselves"
          label="Gira em torno de si mesmo"
          value={data.spinsAroundByThemselves}
          onChange={handleYesNoDetailChange("spinsAroundByThemselves")}
        />

        <YesNoDetailField
          id="bumps-into-objects-or-people"
          label="Esbarra em objetos ou pessoas"
          value={data.bumpsIntoObjectsOrPeople}
          onChange={handleYesNoDetailChange("bumpsIntoObjectsOrPeople")}
        />
      </div>
    </FormSection>
  );
};
