import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { MotorSkills } from "@/lib/types";

type MotorSkillsSectionProps = {
  data: MotorSkills;
  onChange: (data: Partial<MotorSkills>) => void;
};

export const MotorSkillsSection: React.FC<MotorSkillsSectionProps> = ({
  data,
  onChange,
}) => {
  const handleYesNoDetailChange = (key: keyof MotorSkills) => {
    return (value: any) => {
      onChange({ [key]: value });
    };
  };

  return (
    <FormSection
      title="Habilidades Motoras"
      description="Avaliação das habilidades motoras e coordenação"
      id="motor-skills"
    >
      <div className="space-y-6">
        <YesNoDetailField
          id="grabs-and-releases-objects"
          label="Pega e solta objetos"
          value={data.grabsAndReleasesObjects}
          onChange={handleYesNoDetailChange("grabsAndReleasesObjects")}
        />

        <YesNoDetailField
          id="screws-and-unscrews"
          label="Rosqueia e desrosqueia"
          value={data.screwsAndUnscrews}
          onChange={handleYesNoDetailChange("screwsAndUnscrews")}
        />

        <YesNoDetailField
          id="tears-paper"
          label="Rasga papel"
          value={data.tearsPaper}
          onChange={handleYesNoDetailChange("tearsPaper")}
        />

        <YesNoDetailField
          id="throws-objects"
          label="Arremessa objetos"
          value={data.throwsObjects}
          onChange={handleYesNoDetailChange("throwsObjects")}
        />

        <YesNoDetailField
          id="uses-scissors"
          label="Utiliza tesoura"
          value={data.usesScissors}
          onChange={handleYesNoDetailChange("usesScissors")}
        />
      </div>
    </FormSection>
  );
};
