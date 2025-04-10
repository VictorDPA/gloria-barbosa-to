import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";
import { Evaluation } from "@/lib/types";

type EvaluationSectionProps = {
  data: Evaluation;
  onChange: (data: Partial<Evaluation>) => void;
};

export const EvaluationSection: React.FC<EvaluationSectionProps> = ({
  data,
  onChange,
}) => {
  const handleInputChange = (key: keyof Evaluation) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ [key]: e.target.value });
    };
  };

  // Opções para o dia da semana
  const weekDayOptions = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo",
  ];

  return (
    <FormSection
      title="Avaliação"
      description="Informações sobre a data e horário da avaliação"
      id="evaluation"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          id="evaluation-date"
          label="Data da Avaliação"
          type="date"
          value={data.evaluationDate}
          onChange={handleInputChange("evaluationDate")}
          fullWidth
        />

        <div className="w-full">
          <label
            htmlFor="week-day"
            className="block text-sm font-medium text-slate-900 mb-1"
          >
            Dia da Semana
          </label>
          <select
            id="week-day"
            value={data.weekDay}
            onChange={(e) => onChange({ weekDay: e.target.value })}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm"
          >
            <option value="">Selecione o dia</option>
            {weekDayOptions.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <Input
          id="evaluation-time"
          label="Horário"
          type="time"
          value={data.time}
          onChange={handleInputChange("time")}
          fullWidth
        />
      </div>
    </FormSection>
  );
};
