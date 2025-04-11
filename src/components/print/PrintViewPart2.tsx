// src/components/print/PrintViewPart2.tsx
import React from "react";
import { Anamnese } from "@/lib/types";
import {
  renderField,
  renderSection,
  renderYesNoDetail,
  renderYesNoMonths,
  renderList,
} from "./PrintViewUtils";

type PrintViewPart2Props = {
  data: Anamnese;
};

export const PrintViewPart2: React.FC<PrintViewPart2Props> = ({ data }) => {
  return (
    <>
      {/* 5. Histórico da Gestação */}
      {renderSection(
        "Histórico da Gestação",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Gestação planejada",
              renderYesNoDetail(data.pregnancyHistory.plannedPregnancy)
            )}
            {renderField(
              "Gestação desejada",
              renderYesNoDetail(data.pregnancyHistory.wantedPregnancy)
            )}
            {renderField(
              "Realizou pré-natal",
              renderYesNoDetail(data.pregnancyHistory.prenatalCare)
            )}
          </div>

          <div className="mt-2 print:mt-1">
            <span className="font-semibold">Tipo de parto:</span>{" "}
            <span>
              {data.pregnancyHistory.deliveryType.normal
                ? "Normal"
                : data.pregnancyHistory.deliveryType.cSection
                ? "Cesárea"
                : "-"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1 mt-2">
            {renderField(
              "Tempo de gestação (semanas)",
              data.pregnancyHistory.gestationalWeeks
            )}
            {renderField(
              "Complicações durante a gestação",
              data.pregnancyHistory.pregnancyComplications
            )}
            {renderField(
              "Período neonatal",
              data.pregnancyHistory.neonatalPeriod
            )}
            {renderField(
              "Amamentação",
              renderYesNoDetail(data.pregnancyHistory.breastfeedingDuration)
            )}
          </div>
        </>,
        "pregnancy-history-section"
      )}

      {/* 6. Desenvolvimento do Bebê */}
      {renderSection(
        "Desenvolvimento do Bebê",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Sustentação da cabeça",
              renderYesNoMonths(data.babyDevelopment.headControl)
            )}
            {renderField(
              "Rolou",
              renderYesNoMonths(data.babyDevelopment.rolledOver)
            )}
            {renderField(
              "Engatinhou",
              renderYesNoMonths(data.babyDevelopment.crawled)
            )}
            {renderField(
              "Sentou",
              renderYesNoMonths(data.babyDevelopment.satUp)
            )}
            {renderField(
              "Andou",
              renderYesNoMonths(data.babyDevelopment.walked)
            )}
            {renderField(
              "Falou",
              renderYesNoMonths(data.babyDevelopment.spoke)
            )}
          </div>
        </>,
        "baby-development-section"
      )}

      {/* 7. Desenvolvimento da Criança */}
      {renderSection(
        "Desenvolvimento da Criança",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Sobe escadas",
              renderYesNoDetail(data.childDevelopment.climbsStairs)
            )}
            {renderField(
              "Movimenta-se independentemente",
              renderYesNoDetail(data.childDevelopment.movesIndependently)
            )}
            {renderField(
              "Pula com os dois pés",
              renderYesNoDetail(data.childDevelopment.jumpsWithBothFeet)
            )}
            {renderField(
              "Transfere objetos entre as mãos",
              renderYesNoDetail(
                data.childDevelopment.transfersObjectsBetweenHands
              )
            )}
            {renderField(
              "Encaixa objetos",
              renderYesNoDetail(data.childDevelopment.fitsObjectsTogether)
            )}
            {renderField(
              "Preensão de lápis",
              renderYesNoDetail(data.childDevelopment.pencilGrip)
            )}
            {renderField(
              "Explora brinquedos",
              renderYesNoDetail(data.childDevelopment.exploresToys)
            )}
            {renderField(
              "Atribui função aos objetos",
              renderYesNoDetail(data.childDevelopment.assignsFunctionToObjects)
            )}
            {renderField(
              "Mantém contato visual com objetos",
              renderYesNoDetail(
                data.childDevelopment.maintainsEyeContactWithObjects
              )
            )}
          </div>

          <div className="mt-2 print:mt-1">
            <span className="font-semibold">Lateralidade:</span>{" "}
            <span>
              {data.childDevelopment.laterality["left-hand"]
                ? "Canhoto"
                : data.childDevelopment.laterality["right-hand"]
                ? "Destro"
                : data.childDevelopment.laterality.ambidextrous
                ? "Ambidestro"
                : "-"}
            </span>
          </div>
        </>,
        "child-development-section"
      )}

      {/* 8. Rotina Diária */}
      {renderSection(
        "Rotina Diária",
        <>
          {renderField("Atividades pela manhã", data.dailyRoutine.morning)}
          {renderField("Atividades à tarde", data.dailyRoutine.afternoon)}
          {renderField("Atividades à noite", data.dailyRoutine.night)}
        </>,
        "daily-routine-section"
      )}

      {/* 9. Interação Social */}
      {renderSection(
        "Interação Social",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Mantém contato visual",
              renderYesNoDetail(data.socialInteraction.eyeContact)
            )}
            {renderField(
              "Interage com outras pessoas",
              renderYesNoDetail(data.socialInteraction.interactsWithOthers)
            )}
            {renderField(
              "Atenção compartilhada",
              renderYesNoDetail(data.socialInteraction.sharedAttention)
            )}
            {renderField(
              "Segue comandos simples",
              renderYesNoDetail(data.socialInteraction.followsSimpleCommands)
            )}
            {renderField(
              "Segue comandos complexos",
              renderYesNoDetail(data.socialInteraction.followsComplexCommands)
            )}
            {renderField(
              "Frequenta festas",
              renderYesNoDetail(data.socialInteraction.attendsParties)
            )}
            {renderField(
              "Vai a shopping centers",
              renderYesNoDetail(data.socialInteraction.visitsShoppingMalls)
            )}
            {renderField(
              "Vai a supermercados",
              renderYesNoDetail(data.socialInteraction.visitsSupermarkets)
            )}
            {renderField(
              "É cooperativo na escola",
              renderYesNoDetail(data.socialInteraction.cooperativeAtSchool)
            )}
            {renderField(
              "Usa a fala para se comunicar",
              renderYesNoDetail(data.socialInteraction.usesSpeechToCommunicate)
            )}
            {renderField(
              "Brinca com outras crianças",
              renderYesNoDetail(data.socialInteraction.playsWithOtherChildren)
            )}
            {renderField(
              "Bate em outras crianças",
              renderYesNoDetail(data.socialInteraction.hitsPeers)
            )}
            {renderField(
              "Bate em adultos",
              renderYesNoDetail(data.socialInteraction.hitsAdults)
            )}
          </div>

          <div className="mt-3 print:mt-2">
            <h3 className="font-semibold mb-2 print:mb-1">
              Perfil da criança:
            </h3>
            <div className="pl-4 print:pl-2">
              {data.socialInteraction.childProfile.agitated && (
                <div className="mb-1 print:mb-0.5">- Agitada</div>
              )}
              {data.socialInteraction.childProfile.calm && (
                <div className="mb-1 print:mb-0.5">- Calma</div>
              )}
              {data.socialInteraction.childProfile.insecure && (
                <div className="mb-1 print:mb-0.5">- Insegura</div>
              )}
              {data.socialInteraction.childProfile.impatient && (
                <div className="mb-1 print:mb-0.5">- Impaciente</div>
              )}
              {data.socialInteraction.childProfile.defiant && (
                <div className="mb-1 print:mb-0.5">- Desafiadora</div>
              )}
              {data.socialInteraction.childProfile.details && (
                <div className="mt-1 print:mt-0.5 text-sm">
                  {data.socialInteraction.childProfile.details}
                </div>
              )}
            </div>
          </div>
        </>,
        "social-interaction-section"
      )}

      {/* 10. Manifestações Comportamentais */}
      {renderSection(
        "Manifestações Comportamentais",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Dificuldade em fazer amigos",
              renderYesNoDetail(
                data.behavioralManifestations.difficultyMakingFriends
              )
            )}
            {renderField(
              "Chora para conseguir o que quer",
              data.behavioralManifestations.criesToGetWhatTheyWant
                ? "Sim"
                : "Não"
            )}
            {renderField(
              "Chora quando contrariado",
              renderYesNoDetail(data.behavioralManifestations.criesWhenDenied)
            )}
            {renderField(
              "Fica confortável longe dos pais",
              renderYesNoDetail(
                data.behavioralManifestations.comfortableAwayFromParents
              )
            )}
            {renderField(
              "Necessita de estímulos extras",
              renderYesNoDetail(
                data.behavioralManifestations.needsExtraStimulation
              )
            )}
            {renderField(
              "Comportamento solitário",
              renderYesNoDetail(data.behavioralManifestations.solitaryBehavior)
            )}
            {renderField(
              "Adapta-se a mudanças na rotina",
              renderYesNoDetail(
                data.behavioralManifestations.adaptsToRoutineChanges
              )
            )}
            {renderField(
              "Comportamentos repetitivos",
              renderYesNoDetail(
                data.behavioralManifestations.repetitiveBehaviors
              )
            )}
            {renderField(
              "Autoagressão",
              renderYesNoDetail(data.behavioralManifestations.selfHarm)
            )}
          </div>

          {data.behavioralManifestations.notes && (
            <div className="mt-2 print:mt-1">
              <span className="font-semibold">Observações adicionais:</span>
              <div className="mt-1 print:mt-0.5 ml-4 print:ml-2 text-sm">
                {data.behavioralManifestations.notes}
              </div>
            </div>
          )}
        </>,
        "behavioral-manifestations-section"
      )}
    </>
  );
};
