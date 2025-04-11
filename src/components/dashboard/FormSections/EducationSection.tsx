import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { Education } from "@/lib/types";

type EducationSectionProps = {
  data: Education;
  onChange: (data: Partial<Education>) => void;
};

export const EducationSection: React.FC<EducationSectionProps> = ({
  data,
  onChange,
}) => {
  const handleInputChange = (key: keyof Education) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ [key]: e.target.value });
    };
  };

  const handleYesNoDetailChange = (key: keyof Education) => {
    return (value: unknown) => {
      onChange({ [key]: value });
    };
  };

  return (
    <FormSection
      title="Educação"
      description="Informações sobre a vida escolar da criança"
      id="education"
    >
      <div className="space-y-6">
        <YesNoDetailField
          id="attends-school"
          label="Frequenta escola"
          value={data.attendsSchool}
          onChange={handleYesNoDetailChange("attendsSchool")}
        />

        {data.attendsSchool.yes && (
          <div className="space-y-4">
            <Input
              id="school-name"
              label="Nome da escola"
              value={data.schoolName}
              onChange={handleInputChange("schoolName")}
              fullWidth
            />

            <Input
              id="grade"
              label="Série/Turma"
              value={data.grade}
              onChange={handleInputChange("grade")}
              fullWidth
            />

            <YesNoDetailField
              id="support-teacher"
              label="Possui professor de apoio"
              value={data.supportTeacher}
              onChange={handleYesNoDetailChange("supportTeacher")}
            />

            <YesNoDetailField
              id="participates-in-activities"
              label="Participa das atividades escolares"
              value={data.participatesInActivities}
              onChange={handleYesNoDetailChange("participatesInActivities")}
            />

            <YesNoDetailField
              id="good-peer-relationships"
              label="Bom relacionamento com colegas"
              value={data.goodPeerRelationships}
              onChange={handleYesNoDetailChange("goodPeerRelationships")}
            />
          </div>
        )}
      </div>
    </FormSection>
  );
};
