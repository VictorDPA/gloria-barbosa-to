// src/components/print/PrintViewPart2.tsx
import React from "react";
import { Anamnese } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  renderField,
  renderSection,
  renderYesNoDetail,
  renderYesNoMonths,
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

          <div className="mb-2">
            <span className="font-semibold">Tipo de parto:</span>{" "}
            <span>
              {data.pregnancyHistory.deliveryType.normal
                ? "Normal"
                : data.pregnancyHistory.deliveryType.cSection
                ? "Cesárea"
                : "-"}
            </span>
          </div>

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
        </>
      )}

      {/* 6. Desenvolvimento do Bebê */}
      {renderSection(
        "Desenvolvimento do Bebê",
        <>
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
          {renderField("Sentou", renderYesNoMonths(data.babyDevelopment.satUp))}
          {renderField("Andou", renderYesNoMonths(data.babyDevelopment.walked))}
          {renderField("Falou", renderYesNoMonths(data.babyDevelopment.spoke))}
        </>
      )}

      {/* 7. Desenvolvimento da Criança */}
      {renderSection(
        "Desenvolvimento da Criança",
        <>
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

          <div className="mb-2">
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
        </>
      )}

      {/* 8. Rotina Diária */}
      {renderSection(
        "Rotina Diária",
        <>
          {renderField("Atividades pela manhã", data.dailyRoutine.morning)}
          {renderField("Atividades à tarde", data.dailyRoutine.afternoon)}
          {renderField("Atividades à noite", data.dailyRoutine.night)}
        </>
      )}

      {/* 9. Interação Social */}
      {renderSection(
        "Interação Social",
        <>
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

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Perfil da criança:</h3>
            <div className="pl-4">
              {data.socialInteraction.childProfile.agitated && (
                <div className="mb-1">- Agitada</div>
              )}
              {data.socialInteraction.childProfile.calm && (
                <div className="mb-1">- Calma</div>
              )}
              {data.socialInteraction.childProfile.insecure && (
                <div className="mb-1">- Insegura</div>
              )}
              {data.socialInteraction.childProfile.impatient && (
                <div className="mb-1">- Impaciente</div>
              )}
              {data.socialInteraction.childProfile.defiant && (
                <div className="mb-1">- Desafiadora</div>
              )}
              {data.socialInteraction.childProfile.details && (
                <div className="mt-2">
                  {data.socialInteraction.childProfile.details}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* 10. Manifestações Comportamentais */}
      {renderSection(
        "Manifestações Comportamentais",
        <>
          {renderField(
            "Dificuldade em fazer amigos",
            renderYesNoDetail(
              data.behavioralManifestations.difficultyMakingFriends
            )
          )}
          {renderField(
            "Chora para conseguir o que quer",
            data.behavioralManifestations.criesToGetWhatTheyWant ? "Sim" : "Não"
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
            renderYesNoDetail(data.behavioralManifestations.repetitiveBehaviors)
          )}
          {renderField(
            "Autoagressão",
            renderYesNoDetail(data.behavioralManifestations.selfHarm)
          )}
          {renderField(
            "Observações adicionais",
            data.behavioralManifestations.notes
          )}
        </>
      )}
    </>
  );
};
