import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { Referral, YesNoDetail } from "@/lib/types";

type ReferralSectionProps = {
  data: Referral;
  onChange: (data: Partial<Referral>) => void;
};

export const ReferralSection: React.FC<ReferralSectionProps> = ({
  data,
  onChange,
}) => {
  const handleInputChange = (key: keyof Referral) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ [key]: e.target.value });
    };
  };

  const handleFollowUpChange = (key: keyof Referral["followUps"]) => {
    return (value: YesNoDetail) => {
      onChange({
        followUps: {
          ...data.followUps,
          [key]: value,
        },
      });
    };
  };

  return (
    <FormSection
      title="Encaminhamento"
      description="Informações sobre diagnóstico e encaminhamentos médicos"
      id="referral"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="diagnosis"
          label="Diagnóstico"
          value={data.diagnosis}
          onChange={handleInputChange("diagnosis")}
          fullWidth
        />

        <Input
          id="responsible-doctor"
          label="Médico Responsável"
          value={data.responsibleDoctor}
          onChange={handleInputChange("responsibleDoctor")}
          fullWidth
        />
      </div>

      <div className="mt-4">
        <TextArea
          id="current-medication"
          label="Medicação Atual"
          value={data.currentMedication}
          onChange={handleInputChange("currentMedication")}
          fullWidth
          rows={2}
        />
      </div>

      <div className="mt-4">
        <TextArea
          id="main-complaint"
          label="Queixa Principal"
          value={data.mainComplaint}
          onChange={handleInputChange("mainComplaint")}
          fullWidth
          rows={3}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Acompanhamentos
        </h3>

        <div className="space-y-4">
          <YesNoDetailField
            id="speech-therapy"
            label="Fonoaudiologia"
            value={data.followUps.speechTherapy}
            onChange={handleFollowUpChange("speechTherapy")}
          />

          <YesNoDetailField
            id="psychological"
            label="Psicologia"
            value={data.followUps.psychological}
            onChange={handleFollowUpChange("psychological")}
          />

          <YesNoDetailField
            id="psychopedagogy"
            label="Psicopedagogia"
            value={data.followUps.psychopedagogy}
            onChange={handleFollowUpChange("psychopedagogy")}
          />

          <YesNoDetailField
            id="physiotherapy"
            label="Fisioterapia"
            value={data.followUps.physiotherapy}
            onChange={handleFollowUpChange("physiotherapy")}
          />

          <YesNoDetailField
            id="music-therapy"
            label="Musicoterapia"
            value={data.followUps.musicTherapy}
            onChange={handleFollowUpChange("musicTherapy")}
          />

          <YesNoDetailField
            id="nutrition"
            label="Nutrição"
            value={data.followUps.nutrition}
            onChange={handleFollowUpChange("nutrition")}
          />

          <YesNoDetailField
            id="art-therapy"
            label="Arteterapia"
            value={data.followUps.artTherapy}
            onChange={handleFollowUpChange("artTherapy")}
          />

          <YesNoDetailField
            id="occupational-therapy"
            label="Terapia Ocupacional"
            value={data.followUps.occupationalTherapy}
            onChange={handleFollowUpChange("occupationalTherapy")}
          />

          <YesNoDetailField
            id="other-therapies"
            label="Outras Terapias"
            value={data.followUps.otherTherapies}
            onChange={handleFollowUpChange("otherTherapies")}
          />
        </div>
      </div>
    </FormSection>
  );
};
