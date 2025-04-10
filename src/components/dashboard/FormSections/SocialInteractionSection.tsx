import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { TextArea } from "@/components/ui/TextArea";
import { Checkbox } from "@/components/ui/Checkbox";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { SocialInteraction, ChildProfile } from "@/lib/types";

type SocialInteractionSectionProps = {
  data: SocialInteraction;
  onChange: (data: Partial<SocialInteraction>) => void;
};

export const SocialInteractionSection: React.FC<
  SocialInteractionSectionProps
> = ({ data, onChange }) => {
  const handleYesNoDetailChange = (key: keyof SocialInteraction) => {
    return (value: any) => {
      onChange({ [key]: value });
    };
  };

  const handleChildProfileChange = (key: keyof ChildProfile) => {
    if (key === "details") {
      return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange({
          childProfile: {
            ...data.childProfile,
            details: e.target.value,
          },
        });
      };
    }

    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        childProfile: {
          ...data.childProfile,
          [key]: e.target.checked,
        },
      });
    };
  };

  return (
    <FormSection
      title="Interação Social"
      description="Como a criança interage com pessoas e o ambiente ao seu redor"
      id="social-interaction"
    >
      <div className="space-y-6">
        <YesNoDetailField
          id="eye-contact"
          label="Mantém contato visual"
          value={data.eyeContact}
          onChange={handleYesNoDetailChange("eyeContact")}
        />

        <YesNoDetailField
          id="interacts-with-others"
          label="Interage com outras pessoas"
          value={data.interactsWithOthers}
          onChange={handleYesNoDetailChange("interactsWithOthers")}
        />

        <YesNoDetailField
          id="shared-attention"
          label="Atenção compartilhada"
          value={data.sharedAttention}
          onChange={handleYesNoDetailChange("sharedAttention")}
        />

        <YesNoDetailField
          id="follows-simple-commands"
          label="Segue comandos simples"
          value={data.followsSimpleCommands}
          onChange={handleYesNoDetailChange("followsSimpleCommands")}
        />

        <YesNoDetailField
          id="follows-complex-commands"
          label="Segue comandos complexos"
          value={data.followsComplexCommands}
          onChange={handleYesNoDetailChange("followsComplexCommands")}
        />

        <YesNoDetailField
          id="attends-parties"
          label="Frequenta festas"
          value={data.attendsParties}
          onChange={handleYesNoDetailChange("attendsParties")}
        />

        <YesNoDetailField
          id="visits-shopping-malls"
          label="Vai a shopping centers"
          value={data.visitsShoppingMalls}
          onChange={handleYesNoDetailChange("visitsShoppingMalls")}
        />

        <YesNoDetailField
          id="visits-supermarkets"
          label="Vai a supermercados"
          value={data.visitsSupermarkets}
          onChange={handleYesNoDetailChange("visitsSupermarkets")}
        />

        <YesNoDetailField
          id="cooperative-at-school"
          label="É cooperativo na escola"
          value={data.cooperativeAtSchool}
          onChange={handleYesNoDetailChange("cooperativeAtSchool")}
        />

        <YesNoDetailField
          id="uses-speech-to-communicate"
          label="Usa a fala para se comunicar"
          value={data.usesSpeechToCommunicate}
          onChange={handleYesNoDetailChange("usesSpeechToCommunicate")}
        />

        <YesNoDetailField
          id="plays-with-other-children"
          label="Brinca com outras crianças"
          value={data.playsWithOtherChildren}
          onChange={handleYesNoDetailChange("playsWithOtherChildren")}
        />

        <YesNoDetailField
          id="hits-peers"
          label="Bate em outras crianças"
          value={data.hitsPeers}
          onChange={handleYesNoDetailChange("hitsPeers")}
        />

        <YesNoDetailField
          id="hits-adults"
          label="Bate em adultos"
          value={data.hitsAdults}
          onChange={handleYesNoDetailChange("hitsAdults")}
        />

        <div className="space-y-4">
          <p className="font-medium text-slate-900">Perfil da criança:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Checkbox
              id="child-agitated"
              label="Agitada"
              checked={data.childProfile.agitated}
              onChange={handleChildProfileChange("agitated")}
            />
            <Checkbox
              id="child-calm"
              label="Calma"
              checked={data.childProfile.calm}
              onChange={handleChildProfileChange("calm")}
            />
            <Checkbox
              id="child-insecure"
              label="Insegura"
              checked={data.childProfile.insecure}
              onChange={handleChildProfileChange("insecure")}
            />
            <Checkbox
              id="child-impatient"
              label="Impaciente"
              checked={data.childProfile.impatient}
              onChange={handleChildProfileChange("impatient")}
            />
            <Checkbox
              id="child-defiant"
              label="Desafiadora"
              checked={data.childProfile.defiant}
              onChange={handleChildProfileChange("defiant")}
            />
          </div>

          <TextArea
            id="child-profile-details"
            label="Observações adicionais sobre o perfil"
            value={data.childProfile.details}
            onChange={handleChildProfileChange("details")}
            rows={3}
            fullWidth
          />
        </div>
      </div>
    </FormSection>
  );
};
