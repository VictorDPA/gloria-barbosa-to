import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";
import { AdditionalInformation } from "@/lib/types";

type AdditionalInformationSectionProps = {
  data: AdditionalInformation;
  onChange: (data: Partial<AdditionalInformation>) => void;
};

export const AdditionalInformationSection: React.FC<
  AdditionalInformationSectionProps
> = ({ data, onChange }) => {
  const handleInputChange = (key: keyof AdditionalInformation) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ [key]: e.target.value });
    };
  };

  return (
    <FormSection
      title="Informações Adicionais"
      description="Detalhes sobre a localização, data e responsável"
      id="additional-information"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="location"
          label="Local"
          value={data.location}
          onChange={handleInputChange("location")}
          placeholder="Ex: Nome da clínica, cidade, etc."
          fullWidth
        />

        <Input
          id="date"
          label="Data"
          type="date"
          value={data.date}
          onChange={handleInputChange("date")}
          fullWidth
        />

        <Input
          id="therapist"
          label="Terapeuta Responsável"
          value={data.therapist}
          onChange={handleInputChange("therapist")}
          placeholder="Nome completo do terapeuta"
          fullWidth
        />
      </div>
    </FormSection>
  );
};
