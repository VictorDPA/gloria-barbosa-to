import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { TextArea } from "@/components/ui/TextArea";
import { DailyRoutine } from "@/lib/types";

type DailyRoutineSectionProps = {
  data: DailyRoutine;
  onChange: (data: Partial<DailyRoutine>) => void;
};

export const DailyRoutineSection: React.FC<DailyRoutineSectionProps> = ({
  data,
  onChange,
}) => {
  const handleInputChange = (key: keyof DailyRoutine) => {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange({ [key]: e.target.value });
    };
  };

  return (
    <FormSection
      title="Rotina Diária"
      description="Descrição das atividades diárias da criança"
      id="daily-routine"
    >
      <div className="space-y-6">
        <TextArea
          id="morning-routine"
          label="Atividades pela manhã"
          value={data.morning}
          onChange={handleInputChange("morning")}
          rows={4}
          fullWidth
          placeholder="Descreva as atividades, horários e rotinas matinais"
        />

        <TextArea
          id="afternoon-routine"
          label="Atividades à tarde"
          value={data.afternoon}
          onChange={handleInputChange("afternoon")}
          rows={4}
          fullWidth
          placeholder="Descreva as atividades, horários e rotinas vespertinas"
        />

        <TextArea
          id="night-routine"
          label="Atividades à noite"
          value={data.night}
          onChange={handleInputChange("night")}
          rows={4}
          fullWidth
          placeholder="Descreva as atividades, horários e rotinas noturnas, incluindo rotina de sono"
        />
      </div>
    </FormSection>
  );
};
