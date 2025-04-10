import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { MedicalHistory } from "@/lib/types";

type MedicalHistorySectionProps = {
  data: MedicalHistory;
  onChange: (data: Partial<MedicalHistory>) => void;
};

export const MedicalHistorySection: React.FC<MedicalHistorySectionProps> = ({
  data,
  onChange,
}) => {
  const handleFieldChange = (key: keyof MedicalHistory) => {
    return (value: (typeof data)[typeof key]) => {
      onChange({ [key]: value });
    };
  };

  return (
    <FormSection
      title="Histórico Médico"
      description="Informações sobre histórico médico do paciente"
      id="medical-history"
    >
      <div className="space-y-6">
        <YesNoDetailField
          id="previous-treatments"
          label="Tratamentos anteriores"
          value={data.previousTreatments}
          onChange={handleFieldChange("previousTreatments")}
        />

        <YesNoDetailField
          id="rehabilitation"
          label="Reabilitação"
          value={data.rehabilitation}
          onChange={handleFieldChange("rehabilitation")}
        />

        <YesNoDetailField
          id="family-history"
          label="Histórico familiar de doenças"
          value={data.familyHistory}
          onChange={handleFieldChange("familyHistory")}
        />

        <YesNoDetailField
          id="hospitalizations"
          label="Internações"
          value={data.hospitalizations}
          onChange={handleFieldChange("hospitalizations")}
        />

        <YesNoDetailField
          id="surgeries"
          label="Cirurgias"
          value={data.surgeries}
          onChange={handleFieldChange("surgeries")}
        />

        <YesNoDetailField
          id="seizures"
          label="Convulsões"
          value={data.seizures}
          onChange={handleFieldChange("seizures")}
        />

        <YesNoDetailField
          id="stereotypy"
          label="Estereotipia"
          value={data.stereotypy}
          onChange={handleFieldChange("stereotypy")}
        />

        <YesNoDetailField
          id="respiratory-issues"
          label="Problemas respiratórios"
          value={data.respiratoryIssues}
          onChange={handleFieldChange("respiratoryIssues")}
        />

        <YesNoDetailField
          id="heart-conditions"
          label="Problemas cardíacos"
          value={data.heartConditions}
          onChange={handleFieldChange("heartConditions")}
        />

        <YesNoDetailField
          id="echolalia"
          label="Ecolalia"
          value={data.echolalia}
          onChange={handleFieldChange("echolalia")}
        />

        <YesNoDetailField
          id="visual-impairment"
          label="Deficiência visual"
          value={data.visualImpairment}
          onChange={handleFieldChange("visualImpairment")}
        />

        <YesNoDetailField
          id="hearing-impairment"
          label="Deficiência auditiva"
          value={data.hearingImpairment}
          onChange={handleFieldChange("hearingImpairment")}
        />
      </div>
    </FormSection>
  );
};
