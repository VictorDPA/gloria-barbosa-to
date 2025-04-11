import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { Checkbox } from "@/components/ui/Checkbox";
import { ChildDevelopment } from "@/lib/types";

type ChildDevelopmentSectionProps = {
  data: ChildDevelopment;
  onChange: (data: Partial<ChildDevelopment>) => void;
};

export const ChildDevelopmentSection: React.FC<
  ChildDevelopmentSectionProps
> = ({ data, onChange }) => {
  const handleYesNoDetailChange = (key: keyof ChildDevelopment) => {
    return (value: unknown) => {
      onChange({ [key]: value });
    };
  };

  const handleLateralityChange = (
    key: keyof ChildDevelopment["laterality"]
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      // Se o novo checkbox for marcado, desmarca os outros
      if (e.target.checked) {
        const updatedLaterality = {
          "left-hand": key === "left-hand",
          "right-hand": key === "right-hand",
          ambidextrous: key === "ambidextrous",
        };

        onChange({
          laterality: updatedLaterality,
        });
      } else {
        // Se desmarcar, atualiza apenas esse checkbox
        onChange({
          laterality: {
            ...data.laterality,
            [key]: false,
          },
        });
      }
    };
  };

  return (
    <FormSection
      title="Desenvolvimento da Criança"
      description="Avaliação do desenvolvimento motor e habilidades"
      id="child-development"
    >
      <div className="space-y-6">
        <YesNoDetailField
          id="climbs-stairs"
          label="Sobe escadas"
          value={data.climbsStairs}
          onChange={handleYesNoDetailChange("climbsStairs")}
        />

        <YesNoDetailField
          id="moves-independently"
          label="Movimenta-se independentemente"
          value={data.movesIndependently}
          onChange={handleYesNoDetailChange("movesIndependently")}
        />

        <YesNoDetailField
          id="jumps-with-both-feet"
          label="Pula com os dois pés"
          value={data.jumpsWithBothFeet}
          onChange={handleYesNoDetailChange("jumpsWithBothFeet")}
        />

        <YesNoDetailField
          id="transfers-objects-between-hands"
          label="Transfere objetos entre as mãos"
          value={data.transfersObjectsBetweenHands}
          onChange={handleYesNoDetailChange("transfersObjectsBetweenHands")}
        />

        <YesNoDetailField
          id="fits-objects-together"
          label="Encaixa objetos"
          value={data.fitsObjectsTogether}
          onChange={handleYesNoDetailChange("fitsObjectsTogether")}
        />

        <YesNoDetailField
          id="pencil-grip"
          label="Preensão de lápis"
          value={data.pencilGrip}
          onChange={handleYesNoDetailChange("pencilGrip")}
        />

        <YesNoDetailField
          id="explores-toys"
          label="Explora brinquedos"
          value={data.exploresToys}
          onChange={handleYesNoDetailChange("exploresToys")}
        />

        <YesNoDetailField
          id="assigns-function-to-objects"
          label="Atribui função aos objetos"
          value={data.assignsFunctionToObjects}
          onChange={handleYesNoDetailChange("assignsFunctionToObjects")}
        />

        <YesNoDetailField
          id="maintains-eye-contact-with-objects"
          label="Mantém contato visual com objetos"
          value={data.maintainsEyeContactWithObjects}
          onChange={handleYesNoDetailChange("maintainsEyeContactWithObjects")}
        />

        <div className="space-y-2">
          <p className="font-medium text-slate-900">Lateralidade:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Checkbox
              id="left-hand"
              label="Canhoto"
              checked={data.laterality["left-hand"]}
              onChange={handleLateralityChange("left-hand")}
            />
            <Checkbox
              id="right-hand"
              label="Destro"
              checked={data.laterality["right-hand"]}
              onChange={handleLateralityChange("right-hand")}
            />
            <Checkbox
              id="ambidextrous"
              label="Ambidestro"
              checked={data.laterality.ambidextrous}
              onChange={handleLateralityChange("ambidextrous")}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};
