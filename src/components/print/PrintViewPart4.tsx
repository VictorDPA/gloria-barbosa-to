// src/components/print/PrintViewPart4.tsx
import React from "react";
import { Anamnese } from "@/lib/types";
import {
  renderField,
  renderSection,
  renderYesNoDetail,
  renderYesNoDependency,
} from "./PrintViewUtils";
import { formatDate } from "@/lib/utils";

type PrintViewPart4Props = {
  data: Anamnese;
};

export const PrintViewPart4: React.FC<PrintViewPart4Props> = ({ data }) => {
  return (
    <>
      {/* 17. Atividades de Vida Diária - Vestuário */}
      {renderSection(
        "Atividades de Vida Diária - Vestuário",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Ajuda a se vestir",
              renderYesNoDetail(data.dailyLivingActivities.dressing.helpsDress)
            )}
            {renderField(
              "Ajuda a se despir",
              renderYesNoDetail(
                data.dailyLivingActivities.dressing.helpsUndress
              )
            )}
            {renderField(
              "Veste camisas com mangas",
              renderYesNoDetail(
                data.dailyLivingActivities.dressing.wearsSleevedShirts
              )
            )}
            {renderField(
              "Veste camisas com botões",
              renderYesNoDetail(
                data.dailyLivingActivities.dressing.wearsButtonedShirts
              )
            )}
            {renderField(
              "Manipula zíperes e velcro",
              renderYesNoDependency(
                data.dailyLivingActivities.dressing.handlesZippersAndVelcro
              )
            )}
            {renderField(
              "Veste roupa íntima",
              renderYesNoDependency(
                data.dailyLivingActivities.dressing.wearsUnderwear
              )
            )}
            {renderField(
              "Veste shorts ou calças",
              renderYesNoDependency(
                data.dailyLivingActivities.dressing.wearsShortsOrPants
              )
            )}
            {renderField(
              "Coloca e tira meias",
              renderYesNoDependency(
                data.dailyLivingActivities.dressing.putsOnAndTakesOffSocks
              )
            )}
            {renderField(
              "Manipula calçados",
              renderYesNoDependency(
                data.dailyLivingActivities.dressing.handlesShoes
              )
            )}
          </div>

          {data.dailyLivingActivities.dressing.notes && (
            <div className="mt-2 print:mt-1">
              <span className="font-semibold">
                Observações sobre vestuário:
              </span>
              <div className="mt-1 print:mt-0.5 ml-4 print:ml-2 text-sm">
                {data.dailyLivingActivities.dressing.notes}
              </div>
            </div>
          )}
        </>,
        "dressing-section"
      )}

      {/* 18. Atividades de Vida Diária - Alimentação */}
      {renderSection(
        "Atividades de Vida Diária - Alimentação",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Seletivo com alimentação",
              renderYesNoDetail(data.dailyLivingActivities.feeding.pickyEater)
            )}

            <div className="md:col-span-2">
              <span className="font-semibold">Come todo tipo de alimento:</span>{" "}
              <span>
                {[
                  data.dailyLivingActivities.feeding.eatsEveryTypeOfFood.solid
                    ? "Sólido"
                    : null,
                  data.dailyLivingActivities.feeding.eatsEveryTypeOfFood.pureed
                    ? "Pastoso"
                    : null,
                  data.dailyLivingActivities.feeding.eatsEveryTypeOfFood.liquid
                    ? "Líquido"
                    : null,
                ]
                  .filter(Boolean)
                  .join(", ") || "-"}
              </span>
            </div>

            {renderField(
              "Usa mamadeira",
              renderYesNoDetail(data.dailyLivingActivities.feeding.usesBottle)
            )}
            {renderField(
              "Alimenta-se sozinho",
              renderYesNoDetail(
                data.dailyLivingActivities.feeding.feedsThemselves
              )
            )}

            <div className="md:col-span-2">
              <span className="font-semibold">Utiliza talheres:</span>{" "}
              <span>
                {[
                  data.dailyLivingActivities.feeding.usesUtensils.fork
                    ? "Garfo"
                    : null,
                  data.dailyLivingActivities.feeding.usesUtensils.knife
                    ? "Faca"
                    : null,
                  data.dailyLivingActivities.feeding.usesUtensils.spoon
                    ? "Colher"
                    : null,
                ]
                  .filter(Boolean)
                  .join(", ") || "-"}
              </span>
            </div>

            {renderField(
              "Mastiga os alimentos",
              renderYesNoDetail(data.dailyLivingActivities.feeding.chewsFood)
            )}
            {renderField(
              "Utiliza copo",
              renderYesNoDetail(data.dailyLivingActivities.feeding.usesCup)
            )}
            {renderField(
              "Faz refeições com a família",
              renderYesNoDetail(
                data.dailyLivingActivities.feeding.eatsWithFamily
              )
            )}
            {renderField(
              "Local das refeições",
              data.dailyLivingActivities.feeding.mealSetting
            )}
            {renderField(
              "Utiliza telas durante refeições",
              renderYesNoDetail(
                data.dailyLivingActivities.feeding.usesScreensDuringMeals
              )
            )}
          </div>

          {data.dailyLivingActivities.feeding.notes && (
            <div className="mt-2 print:mt-1">
              <span className="font-semibold">
                Observações sobre alimentação:
              </span>
              <div className="mt-1 print:mt-0.5 ml-4 print:ml-2 text-sm">
                {data.dailyLivingActivities.feeding.notes}
              </div>
            </div>
          )}
        </>,
        "feeding-section"
      )}

      {/* 19. Habilidades Motoras */}
      {renderSection(
        "Habilidades Motoras",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Pega e solta objetos",
              renderYesNoDetail(data.motorSkills.grabsAndReleasesObjects)
            )}
            {renderField(
              "Rosqueia e desrosqueia",
              renderYesNoDetail(data.motorSkills.screwsAndUnscrews)
            )}
            {renderField(
              "Rasga papel",
              renderYesNoDetail(data.motorSkills.tearsPaper)
            )}
            {renderField(
              "Arremessa objetos",
              renderYesNoDetail(data.motorSkills.throwsObjects)
            )}
            {renderField(
              "Utiliza tesoura",
              renderYesNoDetail(data.motorSkills.usesScissors)
            )}
          </div>
        </>,
        "motor-skills-section"
      )}

      {/* 20. Percepção Sensorial */}
      {renderSection(
        "Percepção Sensorial",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Sensível a ruídos",
              renderYesNoDetail(data.sensoryPerception.sensitiveToNoise)
            )}
            {renderField(
              "Imita sons",
              renderYesNoDetail(data.sensoryPerception.imitatesSounds)
            )}
            {renderField(
              "Sensível a luzes",
              renderYesNoDetail(data.sensoryPerception.sensitiveToLights)
            )}
            {renderField(
              "Fixa-se em objetos que giram",
              renderYesNoDetail(data.sensoryPerception.staresAtSpinningObjects)
            )}
          </div>
        </>,
        "sensory-perception-section"
      )}

      {/* 21. Propriocepção e Sistema Vestibular */}
      {renderSection(
        "Propriocepção e Sistema Vestibular",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Gosta de abraços apertados",
              renderYesNoDetail(data.proprioceptionAndVestibular.likesTightHugs)
            )}
            {renderField(
              "Não gosta de roupas apertadas",
              renderYesNoDetail(
                data.proprioceptionAndVestibular.dislikesTightClothes
              )
            )}
            {renderField(
              "Gosta de balançar ou embalar",
              renderYesNoDetail(
                data.proprioceptionAndVestibular.enjoysSwingingOrRocking
              )
            )}
            {renderField(
              "Gira em torno de si mesmo",
              renderYesNoDetail(
                data.proprioceptionAndVestibular.spinsAroundByThemselves
              )
            )}
            {renderField(
              "Esbarra em objetos ou pessoas",
              renderYesNoDetail(
                data.proprioceptionAndVestibular.bumpsIntoObjectsOrPeople
              )
            )}
          </div>
        </>,
        "proprioception-vestibular-section"
      )}

      {/* 22. Percepção Tátil */}
      {renderSection(
        "Percepção Tátil",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Responde a carícias",
              renderYesNoDetail(data.tactilePerception.respondsToCaresses)
            )}
            {renderField(
              "Identifica local da dor",
              renderYesNoDetail(data.tactilePerception.identifiesPainLocation)
            )}
            {renderField(
              "Anda na ponta dos pés",
              renderYesNoDetail(data.tactilePerception.walksOnTiptoes)
            )}
            {renderField(
              "Evita sujeira",
              renderYesNoDetail(data.tactilePerception.avoidsDirt)
            )}
            {renderField(
              "Reage agressivamente ao toque",
              renderYesNoDetail(
                data.tactilePerception.reactsAggressivelyToTouch
              )
            )}
          </div>
        </>,
        "tactile-perception-section"
      )}

      {/* 23. Diagnóstico Terapêutico Ocupacional */}
      {renderSection(
        "Diagnóstico Terapêutico Ocupacional",
        <>
          <div className="whitespace-pre-line print:leading-snug">
            {data.therapeuticOccupationalDiagnosis || "-"}
          </div>
        </>,
        "therapeutic-diagnosis-section"
      )}

      {/* 24. Prognóstico */}
      {renderSection(
        "Prognóstico",
        <>
          <div className="whitespace-pre-line print:leading-snug">
            {data.prognosis || "-"}
          </div>
        </>,
        "prognosis-section"
      )}

      {/* 25. Plano Terapêutico Ocupacional */}
      {renderSection(
        "Plano Terapêutico Ocupacional",
        <>
          <div className="space-y-2 print:space-y-1">
            {renderField(
              "Objetivos do tratamento",
              data.occupationalTherapyPlan.goals
            )}
            {renderField(
              "Sessões Previstas",
              data.occupationalTherapyPlan.expectedSessions
            )}
            <div className="mt-2 print:mt-1">
              <span className="font-semibold">Procedimentos Terapêuticos:</span>
              <div className="mt-1 print:mt-0.5 whitespace-pre-line print:leading-snug">
                {data.occupationalTherapyPlan.procedures || "-"}
              </div>
            </div>
          </div>
        </>,
        "therapy-plan-section"
      )}

      {/* 26. Informações Adicionais */}
      {renderSection(
        "Informações Adicionais",
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 print:gap-1">
            {renderField("Local", data.additionalInformation.location)}
            {renderField("Data", formatDate(data.additionalInformation.date))}
            {renderField(
              "Terapeuta Responsável",
              data.additionalInformation.therapist
            )}
          </div>
        </>,
        "additional-information-section"
      )}
    </>
  );
};
