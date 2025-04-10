import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { ComplementaryExams } from "@/lib/types";

type ComplementaryExamsSectionProps = {
  data: ComplementaryExams;
  onChange: (data: Partial<ComplementaryExams>) => void;
};

export const ComplementaryExamsSection: React.FC<
  ComplementaryExamsSectionProps
> = ({ data, onChange }) => {
  const handleCheckboxChange = (
    key: keyof Omit<ComplementaryExams, "other">
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ [key]: e.target.checked });
    };
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ other: e.target.value });
  };

  return (
    <FormSection
      title="Exames Complementares"
      description="Documentos e exames anexados ao processo"
      id="complementary-exams"
    >
      <div className="space-y-4">
        <p className="text-sm font-medium text-slate-800 mb-2">
          Marque os documentos que foram apresentados:
        </p>

        <Checkbox
          id="school-report"
          label="Relatório escolar"
          checked={data.schoolReport}
          onChange={handleCheckboxChange("schoolReport")}
        />

        <Checkbox
          id="medical-report"
          label="Relatório médico"
          checked={data.medicalReport}
          onChange={handleCheckboxChange("medicalReport")}
        />

        <Checkbox
          id="neuropsychological-assessment"
          label="Avaliação neuropsicológica"
          checked={data.neuropsychologicalAssessment}
          onChange={handleCheckboxChange("neuropsychologicalAssessment")}
        />

        <Input
          id="other-exams"
          label="Outros documentos ou exames"
          value={data.other}
          onChange={handleOtherChange}
          placeholder="Liste outros documentos complementares"
          fullWidth
        />
      </div>
    </FormSection>
  );
};
