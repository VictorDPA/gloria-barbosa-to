import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Checkbox } from "@/components/ui/Checkbox";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { PregnancyHistory } from "@/lib/types";

type PregnancyHistorySectionProps = {
  data: PregnancyHistory;
  onChange: (data: Partial<PregnancyHistory>) => void;
};

export const PregnancyHistorySection: React.FC<
  PregnancyHistorySectionProps
> = ({ data, onChange }) => {
  const handleInputChange = (key: keyof PregnancyHistory) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ [key]: e.target.value });
    };
  };

  const handleYesNoDetailChange = (key: keyof PregnancyHistory) => {
    return (value: any) => {
      onChange({ [key]: value });
    };
  };

  const handleDeliveryTypeChange = (
    type: keyof PregnancyHistory["deliveryType"]
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        deliveryType: {
          ...data.deliveryType,
          [type]: e.target.checked,
        },
      });
    };
  };

  return (
    <FormSection
      title="Histórico da Gestação"
      description="Informações sobre a gestação e parto"
      id="pregnancy-history"
    >
      <div className="space-y-6">
        <YesNoDetailField
          id="planned-pregnancy"
          label="Gestação planejada"
          value={data.plannedPregnancy}
          onChange={handleYesNoDetailChange("plannedPregnancy")}
        />

        <YesNoDetailField
          id="wanted-pregnancy"
          label="Gestação desejada"
          value={data.wantedPregnancy}
          onChange={handleYesNoDetailChange("wantedPregnancy")}
        />

        <YesNoDetailField
          id="prenatal-care"
          label="Realizou pré-natal"
          value={data.prenatalCare}
          onChange={handleYesNoDetailChange("prenatalCare")}
        />

        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-900">Tipo de parto:</p>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Checkbox
              id="normal-delivery"
              label="Normal"
              checked={data.deliveryType.normal}
              onChange={handleDeliveryTypeChange("normal")}
            />
            <Checkbox
              id="c-section-delivery"
              label="Cesárea"
              checked={data.deliveryType.cSection}
              onChange={handleDeliveryTypeChange("cSection")}
            />
          </div>
        </div>

        <Input
          id="gestational-weeks"
          label="Tempo de gestação (semanas)"
          value={data.gestationalWeeks}
          onChange={handleInputChange("gestationalWeeks")}
          fullWidth
          type="number"
        />

        <TextArea
          id="pregnancy-complications"
          label="Complicações durante a gestação"
          value={data.pregnancyComplications}
          onChange={handleInputChange("pregnancyComplications")}
          fullWidth
          rows={3}
        />

        <TextArea
          id="neonatal-period"
          label="Período neonatal"
          value={data.neonatalPeriod}
          onChange={handleInputChange("neonatalPeriod")}
          fullWidth
          rows={3}
          helperText="Descreva intercorrências ou observações relevantes do período logo após o nascimento"
        />

        <YesNoDetailField
          id="breastfeeding-duration"
          label="Amamentação"
          value={data.breastfeedingDuration}
          onChange={handleYesNoDetailChange("breastfeedingDuration")}
        />
      </div>
    </FormSection>
  );
};
