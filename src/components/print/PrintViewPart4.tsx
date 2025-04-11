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
          {renderField(
            "Ajuda a se vestir",
            renderYesNoDetail(data.dailyLivingActivities.dressing.helpsDress)
          )}
          {renderField(
            "Ajuda a se despir",
            renderYesNoDetail(data.dailyLivingActivities.dressing.helpsUndress)
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
          {renderField(
            "Observações sobre vestuário",
            data.dailyLivingActivities.dressing.notes
          )}
        </>,
        "dressing-section"
      )}

      {/* 18. Atividades de Vida Diária - Alimentação */}
      {renderSection(
        "Atividades de Vida Diária - Alimentação",
        <>
          {renderField(
            "Seletivo com alimentação",
            renderYesNoDetail(data.dailyLivingActivities.feeding.pickyEater)
          )}
          <div className="mb-2">
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
          <div className="mb-2">
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
            renderYesNoDetail(data.dailyLivingActivities.feeding.eatsWithFamily)
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
          {renderField(
            "Observações sobre alimentação",
            data.dailyLivingActivities.feeding.notes
          )}
        </>,
        "feeding-section"
      )}

      {/* 19. Habilidades Motoras */}
      {renderSection(
        "Habilidades Motoras",
        <>
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
        </>,
        "motor-skills-section"
      )}

      {/* 20. Percepção Sensorial */}
      {renderSection(
        "Percepção Sensorial",
        <>
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
        </>,
        "sensory-perception-section"
      )}

      {/* 21. Propriocepção e Sistema Vestibular */}
      {renderSection(
        "Propriocepção e Sistema Vestibular",
        <>
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
        </>,
        "proprioception-vestibular-section"
      )}

      {/* 22. Percepção Tátil */}
      {renderSection(
        "Percepção Tátil",
        <>
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
            renderYesNoDetail(data.tactilePerception.reactsAggressivelyToTouch)
          )}
        </>,
        "tactile-perception-section"
      )}

      {/* 23. Diagnóstico Terapêutico Ocupacional */}
      {renderSection(
        "Diagnóstico Terapêutico Ocupacional",
        <>
          <div className="whitespace-pre-line">
            {data.therapeuticOccupationalDiagnosis || "-"}
          </div>
        </>,
        "therapeutic-diagnosis-section"
      )}

      {/* 24. Prognóstico */}
      {renderSection(
        "Prognóstico",
        <>
          <div className="whitespace-pre-line">{data.prognosis || "-"}</div>
        </>,
        "prognosis-section"
      )}

      {/* 25. Plano Terapêutico Ocupacional */}
      {renderSection(
        "Plano Terapêutico Ocupacional",
        <>
          {renderField(
            "Objetivos do tratamento",
            data.occupationalTherapyPlan.goals
          )}
          {renderField(
            "Sessões Previstas",
            data.occupationalTherapyPlan.expectedSessions
          )}
          {renderField(
            "Procedimentos Terapêuticos",
            data.occupationalTherapyPlan.procedures
          )}
        </>,
        "therapy-plan-section"
      )}

      {/* 26. Informações Adicionais */}
      {renderSection(
        "Informações Adicionais",
        <>
          {renderField("Local", data.additionalInformation.location)}
          {renderField("Data", formatDate(data.additionalInformation.date))}
          {renderField(
            "Terapeuta Responsável",
            data.additionalInformation.therapist
          )}
        </>,
        "additional-information-section"
      )}
    </>
  );
};
