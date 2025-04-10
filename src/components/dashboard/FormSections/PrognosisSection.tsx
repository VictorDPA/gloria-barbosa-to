import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { TextArea } from "@/components/ui/TextArea";

type PrognosisSectionProps = {
  data: string;
  onChange: (data: string) => void;
};

export const PrognosisSection: React.FC<PrognosisSectionProps> = ({
  data,
  onChange,
}) => {
  const handlePrognosisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <FormSection
      title="Prognóstico"
      description="Expectativas de evolução e avanços esperados"
      id="prognosis"
    >
      <div className="space-y-6">
        <TextArea
          id="prognosis"
          label="Prognóstico"
          value={data}
          onChange={handlePrognosisChange}
          rows={4}
          fullWidth
          placeholder="Descreva o prognóstico e as perspectivas de evolução..."
        />
      </div>
    </FormSection>
  );
};
