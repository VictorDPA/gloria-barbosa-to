import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { TextArea } from "@/components/ui/TextArea";

type TherapeuticDiagnosisSectionProps = {
  data: string;
  onChange: (data: string) => void;
};

export const TherapeuticDiagnosisSection: React.FC<
  TherapeuticDiagnosisSectionProps
> = ({ data, onChange }) => {
  const handleDiagnosisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <FormSection
      title="Diagnóstico Terapêutico Ocupacional"
      description="Avaliação do quadro clínico e funcional"
      id="therapeutic-diagnosis"
    >
      <div className="space-y-6">
        <TextArea
          id="therapeutic-occupational-diagnosis"
          label="Diagnóstico Terapêutico Ocupacional"
          value={data}
          onChange={handleDiagnosisChange}
          rows={6}
          fullWidth
          placeholder="Descreva o diagnóstico terapêutico ocupacional baseado nas observações clínicas..."
        />
      </div>
    </FormSection>
  );
};
