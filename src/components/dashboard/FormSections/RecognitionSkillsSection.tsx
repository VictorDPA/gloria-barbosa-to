import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { RecognitionSkills } from "@/lib/types";

type RecognitionSkillsSectionProps = {
  data: RecognitionSkills;
  onChange: (data: Partial<RecognitionSkills>) => void;
};

export const RecognitionSkillsSection: React.FC<
  RecognitionSkillsSectionProps
> = ({ data, onChange }) => {
  const handleYesNoDetailChange = (key: keyof RecognitionSkills) => {
    return (value: any) => {
      onChange({ [key]: value });
    };
  };

  return (
    <FormSection
      title="Habilidades de Reconhecimento"
      description="Capacidade de reconhecer e identificar elementos"
      id="recognition-skills"
    >
      <div className="space-y-6">
        <YesNoDetailField
          id="objects"
          label="Reconhece objetos"
          value={data.objects}
          onChange={handleYesNoDetailChange("objects")}
        />

        <YesNoDetailField
          id="animals"
          label="Reconhece animais"
          value={data.animals}
          onChange={handleYesNoDetailChange("animals")}
        />

        <YesNoDetailField
          id="colors"
          label="Reconhece cores"
          value={data.colors}
          onChange={handleYesNoDetailChange("colors")}
        />

        <YesNoDetailField
          id="numbers"
          label="Reconhece números"
          value={data.numbers}
          onChange={handleYesNoDetailChange("numbers")}
        />

        <YesNoDetailField
          id="shapes"
          label="Reconhece formas"
          value={data.shapes}
          onChange={handleYesNoDetailChange("shapes")}
        />

        <YesNoDetailField
          id="letters"
          label="Reconhece letras"
          value={data.letters}
          onChange={handleYesNoDetailChange("letters")}
        />

        <YesNoDetailField
          id="reading-writing"
          label="Leitura e escrita"
          value={data.readingWriting}
          onChange={handleYesNoDetailChange("readingWriting")}
        />
      </div>
    </FormSection>
  );
};
