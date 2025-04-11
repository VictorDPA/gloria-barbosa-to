import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { TextArea } from "@/components/ui/TextArea";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { YesNoDetailField } from "@/components/ui/YesNoDetailField";
import { YesNoDependencyField } from "@/components/ui/YesNoDependencyField";
import {
  DailyLivingActivities,
  Hygiene,
  Bathing,
  Dressing,
  Feeding,
  YesNoDetail,
} from "@/lib/types";

type DailyLivingActivitiesSectionProps = {
  data: DailyLivingActivities;
  onChange: (data: Partial<DailyLivingActivities>) => void;
};

export const DailyLivingActivitiesSection: React.FC<
  DailyLivingActivitiesSectionProps
> = ({ data, onChange }) => {
  // Hygiene section handlers
  const handleHygieneChange = (key: keyof Hygiene, value: unknown) => {
    onChange({
      hygiene: {
        ...data.hygiene,
        [key]: value,
      },
    });
  };

  const handleHygieneYesNoDetail = (key: keyof Hygiene) => {
    return (value: YesNoDetail) => {
      handleHygieneChange(key, value);
    };
  };

  const handleHygieneNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleHygieneChange("notes", e.target.value);
  };

  const handleSoapLiquidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      hygiene: {
        ...data.hygiene,
        usesSoap: {
          ...data.hygiene.usesSoap,
          liquid: e.target.checked,
        },
      },
    });
  };

  // Bathing section handlers
  const handleBathingChange = (key: keyof Bathing, value: unknown) => {
    onChange({
      bathing: {
        ...data.bathing,
        [key]: value,
      },
    });
  };

  const handleBathingYesNoDetail = (key: keyof Bathing) => {
    return (value: unknown) => {
      handleBathingChange(key, value);
    };
  };

  const handleBathingNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleBathingChange("notes", e.target.value);
  };

  // Dressing section handlers
  const handleDressingChange = (key: keyof Dressing, value: unknown) => {
    onChange({
      dressing: {
        ...data.dressing,
        [key]: value,
      },
    });
  };

  const handleDressingYesNoDetail = (key: keyof Dressing) => {
    return (value: unknown) => {
      handleDressingChange(key, value);
    };
  };

  const handleDressingNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleDressingChange("notes", e.target.value);
  };

  // Feeding section handlers
  const handleFeedingChange = (key: keyof Feeding, value: unknown) => {
    onChange({
      feeding: {
        ...data.feeding,
        [key]: value,
      },
    });
  };

  const handleFeedingYesNoDetail = (key: keyof Feeding) => {
    return (value: unknown) => {
      handleFeedingChange(key, value);
    };
  };

  const handleFeedingFoodTypeChange = (
    type: keyof Feeding["eatsEveryTypeOfFood"]
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        feeding: {
          ...data.feeding,
          eatsEveryTypeOfFood: {
            ...data.feeding.eatsEveryTypeOfFood,
            [type]: e.target.checked,
          },
        },
      });
    };
  };

  const handleFeedingUtensilsChange = (type: keyof Feeding["usesUtensils"]) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        feeding: {
          ...data.feeding,
          usesUtensils: {
            ...data.feeding.usesUtensils,
            [type]: e.target.checked,
          },
        },
      });
    };
  };

  const handleFeedingMealSetting = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFeedingChange("mealSetting", e.target.value);
  };

  const handleFeedingNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleFeedingChange("notes", e.target.value);
  };

  return (
    <FormSection
      title="Atividades de Vida Diária"
      description="Avaliação das atividades cotidianas e independência"
      id="daily-living-activities"
    >
      {/* Higiene */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Higiene</h3>
        <div className="space-y-4 pl-4">
          <YesNoDetailField
            id="wears-diapers"
            label="Usa fraldas"
            value={data.hygiene.wearsDiapers}
            onChange={handleHygieneYesNoDetail("wearsDiapers")}
          />

          <YesNoDetailField
            id="bladder-control"
            label="Tem controle de esfíncteres"
            value={data.hygiene.bladderControl}
            onChange={handleHygieneYesNoDetail("bladderControl")}
          />

          <YesNoDetailField
            id="asks-to-use-bathroom"
            label="Pede para ir ao banheiro"
            value={data.hygiene.asksToUseBathroom}
            onChange={handleHygieneYesNoDetail("asksToUseBathroom")}
          />

          <YesNoDetailField
            id="performs-intimate-hygiene"
            label="Realiza higiene íntima"
            value={data.hygiene.performsIntimateHygiene}
            onChange={handleHygieneYesNoDetail("performsIntimateHygiene")}
          />

          <YesNoDependencyField
            id="washes-hands"
            label="Lava as mãos"
            value={data.hygiene.washesHands}
            onChange={handleHygieneYesNoDetail("washesHands")}
          />

          <div className="space-y-2">
            <YesNoDetailField
              id="uses-soap"
              label="Usa sabonete"
              value={data.hygiene.usesSoap}
              onChange={handleHygieneYesNoDetail("usesSoap")}
            />

            {data.hygiene.usesSoap.yes && (
              <div className="ml-8">
                <Checkbox
                  id="uses-liquid-soap"
                  label="Usa sabonete líquido"
                  checked={data.hygiene.usesSoap.liquid}
                  onChange={handleSoapLiquidChange}
                />
              </div>
            )}
          </div>

          <YesNoDetailField
            id="plays-with-water"
            label="Brinca com água"
            value={data.hygiene.playsWithWater}
            onChange={handleHygieneYesNoDetail("playsWithWater")}
          />

          <YesNoDependencyField
            id="dries-hands"
            label="Seca as mãos"
            value={data.hygiene.driesHands}
            onChange={handleHygieneYesNoDetail("driesHands")}
          />

          <YesNoDependencyField
            id="brushes-teeth"
            label="Escova os dentes"
            value={data.hygiene.brushesTeeth}
            onChange={handleHygieneYesNoDetail("brushesTeeth")}
          />

          <YesNoDetailField
            id="knows-where-toothbrush-is"
            label="Sabe onde fica a escova de dentes"
            value={data.hygiene.knowsWhereToothbrushIs}
            onChange={handleHygieneYesNoDetail("knowsWhereToothbrushIs")}
          />

          <YesNoDependencyField
            id="applies-toothpaste"
            label="Aplica pasta de dente"
            value={data.hygiene.appliesToothpaste}
            onChange={handleHygieneYesNoDetail("appliesToothpaste")}
          />

          <YesNoDependencyField
            id="cleans-mouth-properly"
            label="Limpa a boca adequadamente"
            value={data.hygiene.cleansMouthProperly}
            onChange={handleHygieneYesNoDetail("cleansMouthProperly")}
          />

          <YesNoDependencyField
            id="combs-hair"
            label="Penteia o cabelo"
            value={data.hygiene.combsHair}
            onChange={handleHygieneYesNoDetail("combsHair")}
          />

          <YesNoDetailField
            id="allows-nail-cutting"
            label="Permite cortar as unhas"
            value={data.hygiene.allowsNailCutting}
            onChange={handleHygieneYesNoDetail("allowsNailCutting")}
          />

          <YesNoDetailField
            id="allows-haircuts"
            label="Permite cortar o cabelo"
            value={data.hygiene.allowsHaircuts}
            onChange={handleHygieneYesNoDetail("allowsHaircuts")}
          />

          <TextArea
            id="hygiene-notes"
            label="Observações sobre higiene"
            value={data.hygiene.notes}
            onChange={handleHygieneNotes}
            rows={3}
            fullWidth
          />
        </div>
      </div>

      {/* Banho */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Banho</h3>
        <div className="space-y-4 pl-4">
          <YesNoDetailField
            id="likes-take-bath"
            label="Gosta de tomar banho"
            value={data.bathing.likesTakeBath}
            onChange={handleBathingYesNoDetail("likesTakeBath")}
          />

          <YesNoDependencyField
            id="takes-bath-alone"
            label="Toma banho sozinho"
            value={data.bathing.takesBathAlone}
            onChange={handleBathingYesNoDetail("takesBathAlone")}
          />

          <YesNoDependencyField
            id="soaps-every-part-of-the-body"
            label="Ensaboa todas as partes do corpo"
            value={data.bathing.soapsEveryPartOfTheBody}
            onChange={handleBathingYesNoDetail("soapsEveryPartOfTheBody")}
          />

          <TextArea
            id="bathing-notes"
            label="Observações sobre o banho"
            value={data.bathing.notes}
            onChange={handleBathingNotes}
            rows={3}
            fullWidth
          />
        </div>
      </div>

      {/* Vestir-se */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Vestuário</h3>
        <div className="space-y-4 pl-4">
          <YesNoDetailField
            id="helps-dress"
            label="Ajuda a se vestir"
            value={data.dressing.helpsDress}
            onChange={handleDressingYesNoDetail("helpsDress")}
          />

          <YesNoDetailField
            id="helps-undress"
            label="Ajuda a se despir"
            value={data.dressing.helpsUndress}
            onChange={handleDressingYesNoDetail("helpsUndress")}
          />

          <YesNoDetailField
            id="wears-sleeved-shirts"
            label="Veste camisas com mangas"
            value={data.dressing.wearsSleevedShirts}
            onChange={handleDressingYesNoDetail("wearsSleevedShirts")}
          />

          <YesNoDetailField
            id="wears-buttoned-shirts"
            label="Veste camisas com botões"
            value={data.dressing.wearsButtonedShirts}
            onChange={handleDressingYesNoDetail("wearsButtonedShirts")}
          />

          <YesNoDependencyField
            id="handles-zippers-and-velcro"
            label="Manipula zíperes e velcro"
            value={data.dressing.handlesZippersAndVelcro}
            onChange={handleDressingYesNoDetail("handlesZippersAndVelcro")}
          />

          <YesNoDependencyField
            id="wears-underwear"
            label="Veste roupa íntima"
            value={data.dressing.wearsUnderwear}
            onChange={handleDressingYesNoDetail("wearsUnderwear")}
          />

          <YesNoDependencyField
            id="wears-shorts-or-pants"
            label="Veste shorts ou calças"
            value={data.dressing.wearsShortsOrPants}
            onChange={handleDressingYesNoDetail("wearsShortsOrPants")}
          />

          <YesNoDependencyField
            id="puts-on-and-takes-off-socks"
            label="Coloca e tira meias"
            value={data.dressing.putsOnAndTakesOffSocks}
            onChange={handleDressingYesNoDetail("putsOnAndTakesOffSocks")}
          />

          <YesNoDependencyField
            id="handles-shoes"
            label="Manipula calçados"
            value={data.dressing.handlesShoes}
            onChange={handleDressingYesNoDetail("handlesShoes")}
          />

          <TextArea
            id="dressing-notes"
            label="Observações sobre vestuário"
            value={data.dressing.notes}
            onChange={handleDressingNotes}
            rows={3}
            fullWidth
          />
        </div>
      </div>

      {/* Alimentação */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Alimentação
        </h3>
        <div className="space-y-4 pl-4">
          <YesNoDetailField
            id="picky-eater"
            label="Seletivo com alimentação"
            value={data.feeding.pickyEater}
            onChange={handleFeedingYesNoDetail("pickyEater")}
          />

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-900">
              Come todo tipo de alimento:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Checkbox
                id="eats-solid"
                label="Sólido"
                checked={data.feeding.eatsEveryTypeOfFood.solid}
                onChange={handleFeedingFoodTypeChange("solid")}
              />
              <Checkbox
                id="eats-pureed"
                label="Pastoso"
                checked={data.feeding.eatsEveryTypeOfFood.pureed}
                onChange={handleFeedingFoodTypeChange("pureed")}
              />
              <Checkbox
                id="eats-liquid"
                label="Líquido"
                checked={data.feeding.eatsEveryTypeOfFood.liquid}
                onChange={handleFeedingFoodTypeChange("liquid")}
              />
            </div>
          </div>

          <YesNoDetailField
            id="uses-bottle"
            label="Usa mamadeira"
            value={data.feeding.usesBottle}
            onChange={handleFeedingYesNoDetail("usesBottle")}
          />

          <YesNoDetailField
            id="feeds-themselves"
            label="Alimenta-se sozinho"
            value={data.feeding.feedsThemselves}
            onChange={handleFeedingYesNoDetail("feedsThemselves")}
          />

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-900">
              Utiliza talheres:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Checkbox
                id="uses-fork"
                label="Garfo"
                checked={data.feeding.usesUtensils.fork}
                onChange={handleFeedingUtensilsChange("fork")}
              />
              <Checkbox
                id="uses-knife"
                label="Faca"
                checked={data.feeding.usesUtensils.knife}
                onChange={handleFeedingUtensilsChange("knife")}
              />
              <Checkbox
                id="uses-spoon"
                label="Colher"
                checked={data.feeding.usesUtensils.spoon}
                onChange={handleFeedingUtensilsChange("spoon")}
              />
            </div>
          </div>

          <YesNoDetailField
            id="chews-food"
            label="Mastiga os alimentos"
            value={data.feeding.chewsFood}
            onChange={handleFeedingYesNoDetail("chewsFood")}
          />

          <YesNoDetailField
            id="uses-cup"
            label="Utiliza copo"
            value={data.feeding.usesCup}
            onChange={handleFeedingYesNoDetail("usesCup")}
          />

          <YesNoDetailField
            id="eats-with-family"
            label="Faz refeições com a família"
            value={data.feeding.eatsWithFamily}
            onChange={handleFeedingYesNoDetail("eatsWithFamily")}
          />

          <Input
            id="meal-setting"
            label="Local das refeições"
            value={data.feeding.mealSetting}
            onChange={handleFeedingMealSetting}
            placeholder="Ex: mesa, sofá, etc."
            fullWidth
          />

          <YesNoDetailField
            id="uses-screens-during-meals"
            label="Utiliza telas durante refeições"
            value={data.feeding.usesScreensDuringMeals}
            onChange={handleFeedingYesNoDetail("usesScreensDuringMeals")}
          />

          <TextArea
            id="feeding-notes"
            label="Observações sobre alimentação"
            value={data.feeding.notes}
            onChange={handleFeedingNotes}
            rows={3}
            fullWidth
          />
        </div>
      </div>
    </FormSection>
  );
};
