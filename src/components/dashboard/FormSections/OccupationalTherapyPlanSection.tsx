import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { TextArea } from "@/components/ui/TextArea";
import { Input } from "@/components/ui/Input";
import { OccupationalTherapyPlan } from "@/lib/types";

type OccupationalTherapyPlanSectionProps = {
  data: OccupationalTherapyPlan;
  onChange: (data: Partial<OccupationalTherapyPlan>) => void;
};

export const OccupationalTherapyPlanSection: React.FC<
  OccupationalTherapyPlanSectionProps
> = ({ data, onChange }) => {
  const handleInputChange = (key: keyof OccupationalTherapyPlan) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ [key]: e.target.value });
    };
  };

  return (
    <FormSection
      title="Plano Terapêutico Ocupacional"
      description="Definição de objetivos, frequência e procedimentos terapêuticos"
      id="occupational-therapy-plan"
    >
      <div className="space-y-6">
        <TextArea
          id="goals"
          label="Objetivos do tratamento"
          value={data.goals}
          onChange={handleInputChange("goals")}
          rows={4}
          fullWidth
          placeholder="Descreva os objetivos terapêuticos a serem alcançados..."
        />

        <Input
          id="expected-sessions"
          label="Sessões Previstas"
          value={data.expectedSessions}
          onChange={handleInputChange("expectedSessions")}
          placeholder="Ex: 2x por semana, 16 sessões, etc."
          fullWidth
        />

        <TextArea
          id="procedures"
          label="Procedimentos Terapêuticos"
          value={data.procedures}
          onChange={handleInputChange("procedures")}
          rows={6}
          fullWidth
          placeholder="Descreva os procedimentos e técnicas a serem utilizados..."
        />
      </div>
    </FormSection>
  );
};
