import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { TextArea } from "@/components/ui/TextArea";
import { Checkbox } from "@/components/ui/Checkbox";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { BehavioralManifestations } from "@/lib/types";

type BehavioralManifestationsSectionProps = {
  data: BehavioralManifestations;
  onChange: (data: Partial<BehavioralManifestations>) => void;
};

export const BehavioralManifestationsSection: React.FC<
  BehavioralManifestationsSectionProps
> = ({ data, onChange }) => {
  const handleYesNoDetailChange = (key: keyof BehavioralManifestations) => {
    return (value: any) => {
      onChange({ [key]: value });
    };
  };

  const handleBooleanChange = (key: keyof BehavioralManifestations) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ [key]: e.target.checked });
    };
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ notes: e.target.value });
  };

  return (
    <FormSection
      title="Manifestações Comportamentais"
      description="Comportamentos específicos e estratégias de enfrentamento"
      id="behavioral-manifestations"
    >
      <div className="space-y-6">
        <YesNoDetailField
          id="difficulty-making-friends"
          label="Dificuldade em fazer amigos"
          value={data.difficultyMakingFriends}
          onChange={handleYesNoDetailChange("difficultyMakingFriends")}
        />

        <Checkbox
          id="cries-to-get-what-they-want"
          label="Chora para conseguir o que quer"
          checked={data.criesToGetWhatTheyWant}
          onChange={handleBooleanChange("criesToGetWhatTheyWant")}
        />

        <YesNoDetailField
          id="cries-when-denied"
          label="Chora quando contrariado"
          value={data.criesWhenDenied}
          onChange={handleYesNoDetailChange("criesWhenDenied")}
        />

        <YesNoDetailField
          id="comfortable-away-from-parents"
          label="Fica confortável longe dos pais"
          value={data.comfortableAwayFromParents}
          onChange={handleYesNoDetailChange("comfortableAwayFromParents")}
        />

        <YesNoDetailField
          id="needs-extra-stimulation"
          label="Necessita de estímulos extras"
          value={data.needsExtraStimulation}
          onChange={handleYesNoDetailChange("needsExtraStimulation")}
        />

        <YesNoDetailField
          id="solitary-behavior"
          label="Comportamento solitário"
          value={data.solitaryBehavior}
          onChange={handleYesNoDetailChange("solitaryBehavior")}
        />

        <YesNoDetailField
          id="adapts-to-routine-changes"
          label="Adapta-se a mudanças na rotina"
          value={data.adaptsToRoutineChanges}
          onChange={handleYesNoDetailChange("adaptsToRoutineChanges")}
        />

        <YesNoDetailField
          id="repetitive-behaviors"
          label="Comportamentos repetitivos"
          value={data.repetitiveBehaviors}
          onChange={handleYesNoDetailChange("repetitiveBehaviors")}
        />

        <YesNoDetailField
          id="self-harm"
          label="Autoagressão"
          value={data.selfHarm}
          onChange={handleYesNoDetailChange("selfHarm")}
        />

        <TextArea
          id="behavioral-notes"
          label="Observações adicionais sobre o comportamento"
          value={data.notes}
          onChange={handleNotesChange}
          rows={4}
          fullWidth
        />
      </div>
    </FormSection>
  );
};
