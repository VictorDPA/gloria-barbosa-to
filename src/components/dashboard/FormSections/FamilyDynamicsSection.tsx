import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { FamilyDynamics } from "@/lib/types";

type FamilyDynamicsSectionProps = {
  data: FamilyDynamics;
  onChange: (data: Partial<FamilyDynamics>) => void;
};

export const FamilyDynamicsSection: React.FC<FamilyDynamicsSectionProps> = ({
  data,
  onChange,
}) => {
  const handleInputChange = (key: keyof FamilyDynamics) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ [key]: e.target.value });
    };
  };

  const handleYesNoDetailChange = (key: keyof FamilyDynamics) => {
    return (value: any) => {
      onChange({ [key]: value });
    };
  };

  const handleSiblingsChange = (field: string) => {
    if (field === "yes" || field === "details") {
      return (value: any) => {
        onChange({
          hasSiblings: {
            ...data.hasSiblings,
            [field]: typeof value === "boolean" ? value : value.yes,
            details:
              typeof value === "boolean"
                ? data.hasSiblings.details
                : value.details,
          },
        });
      };
    } else if (field === "age") {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
          hasSiblings: {
            ...data.hasSiblings,
            age: e.target.value,
          },
        });
      };
    }
    return () => {};
  };

  return (
    <FormSection
      title="Dinâmica Familiar"
      description="Informações sobre a dinâmica familiar e rotinas em casa"
      id="family-dynamics"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <YesNoDetailField
            id="has-siblings"
            label="Possui irmãos"
            value={{
              yes: data.hasSiblings.yes,
              details: data.hasSiblings.details,
            }}
            onChange={handleSiblingsChange("details")}
          />

          {data.hasSiblings.yes && (
            <div className="ml-8 mt-2">
              <Input
                id="siblings-age"
                label="Idade(s) do(s) irmão(s)"
                value={data.hasSiblings.age}
                onChange={handleSiblingsChange("age")}
                placeholder="Ex: 5 e 10 anos"
                fullWidth
              />
            </div>
          )}
        </div>

        <Input
          id="lives-with"
          label="Com quem mora"
          value={data.livesWith}
          onChange={handleInputChange("livesWith")}
          placeholder="Pai, mãe, irmãos, avós, etc."
          fullWidth
        />

        <YesNoDetailField
          id="sleeps-alone"
          label="Dorme sozinho"
          value={data.sleepsAlone}
          onChange={handleYesNoDetailChange("sleepsAlone")}
        />

        <TextArea
          id="sleep-quality"
          label="Qualidade do sono"
          value={data.sleepQuality}
          onChange={handleInputChange("sleepQuality")}
          placeholder="Descreva como é o sono da criança, horários, dificuldades, etc."
          rows={3}
          fullWidth
        />

        <TextArea
          id="favorite-toys-and-games"
          label="Brinquedos e jogos favoritos"
          value={data.favoriteToysAndGames}
          onChange={handleInputChange("favoriteToysAndGames")}
          rows={3}
          fullWidth
        />

        <TextArea
          id="plays-with"
          label="Brinca com"
          value={data.playsWith}
          onChange={handleInputChange("playsWith")}
          placeholder="Quem são os parceiros de brincadeira (amigos, familiares, sozinho)?"
          rows={3}
          fullWidth
        />

        <TextArea
          id="hyperfocus"
          label="Interesses específicos/hiperfoco"
          value={data.hyperfocus}
          onChange={handleInputChange("hyperfocus")}
          placeholder="Há algum assunto, objeto ou atividade de interesse intenso?"
          rows={3}
          fullWidth
        />
      </div>
    </FormSection>
  );
};
