// src/components/print/PrintViewPart3.tsx
import React from "react";
import { Anamnese } from "@/lib/types";
import {
  renderField,
  renderSection,
  renderYesNoDetail,
  renderYesNoDependency,
} from "./PrintViewUtils";

type PrintViewPart3Props = {
  data: Anamnese;
};

export const PrintViewPart3: React.FC<PrintViewPart3Props> = ({ data }) => {
  return (
    <>
      {/* 11. Educação */}
      {renderSection(
        "Educação",
        <>
          {renderField(
            "Frequenta escola",
            renderYesNoDetail(data.education.attendsSchool)
          )}
          {data.education.attendsSchool.yes && (
            <>
              {renderField("Nome da escola", data.education.schoolName)}
              {renderField("Série/Turma", data.education.grade)}
              {renderField(
                "Possui professor de apoio",
                renderYesNoDetail(data.education.supportTeacher)
              )}
              {renderField(
                "Participa das atividades escolares",
                renderYesNoDetail(data.education.participatesInActivities)
              )}
              {renderField(
                "Bom relacionamento com colegas",
                renderYesNoDetail(data.education.goodPeerRelationships)
              )}
            </>
          )}
        </>
      )}

      {/* 12. Habilidades de Reconhecimento */}
      {renderSection(
        "Habilidades de Reconhecimento",
        <>
          {renderField(
            "Reconhece objetos",
            renderYesNoDetail(data.recognitionSkills.objects)
          )}
          {renderField(
            "Reconhece animais",
            renderYesNoDetail(data.recognitionSkills.animals)
          )}
          {renderField(
            "Reconhece cores",
            renderYesNoDetail(data.recognitionSkills.colors)
          )}
          {renderField(
            "Reconhece números",
            renderYesNoDetail(data.recognitionSkills.numbers)
          )}
          {renderField(
            "Reconhece formas",
            renderYesNoDetail(data.recognitionSkills.shapes)
          )}
          {renderField(
            "Reconhece letras",
            renderYesNoDetail(data.recognitionSkills.letters)
          )}
          {renderField(
            "Leitura e escrita",
            renderYesNoDetail(data.recognitionSkills.readingWriting)
          )}
        </>
      )}

      {/* 13. Dinâmica Familiar */}
      {renderSection(
        "Dinâmica Familiar",
        <>
          {renderField(
            "Possui irmãos",
            renderYesNoDetail(data.familyDynamics.hasSiblings)
          )}
          {data.familyDynamics.hasSiblings.yes &&
            renderField(
              "Idade(s) dos irmãos",
              data.familyDynamics.hasSiblings.age
            )}
          {renderField("Com quem mora", data.familyDynamics.livesWith)}
          {renderField(
            "Dorme sozinho",
            renderYesNoDetail(data.familyDynamics.sleepsAlone)
          )}
          {renderField("Qualidade do sono", data.familyDynamics.sleepQuality)}
          {renderField(
            "Brinquedos e jogos favoritos",
            data.familyDynamics.favoriteToysAndGames
          )}
          {renderField("Brinca com", data.familyDynamics.playsWith)}
          {renderField(
            "Interesses específicos/hiperfoco",
            data.familyDynamics.hyperfocus
          )}
        </>
      )}

      {/* 14. Exames Complementares */}
      {renderSection(
        "Exames Complementares",
        <>
          {renderField(
            "Relatório escolar",
            data.complementaryExams.schoolReport ? "Sim" : "Não"
          )}
          {renderField(
            "Relatório médico",
            data.complementaryExams.medicalReport ? "Sim" : "Não"
          )}
          {renderField(
            "Avaliação neuropsicológica",
            data.complementaryExams.neuropsychologicalAssessment ? "Sim" : "Não"
          )}
          {renderField("Outros documentos", data.complementaryExams.other)}
        </>
      )}

      {/* 15. Atividades de Vida Diária - Higiene */}
      {renderSection(
        "Atividades de Vida Diária - Higiene",
        <>
          {renderField(
            "Usa fraldas",
            renderYesNoDetail(data.dailyLivingActivities.hygiene.wearsDiapers)
          )}
          {renderField(
            "Tem controle de esfíncteres",
            renderYesNoDetail(data.dailyLivingActivities.hygiene.bladderControl)
          )}
          {renderField(
            "Pede para ir ao banheiro",
            renderYesNoDetail(
              data.dailyLivingActivities.hygiene.asksToUseBathroom
            )
          )}
          {renderField(
            "Realiza higiene íntima",
            renderYesNoDetail(
              data.dailyLivingActivities.hygiene.performsIntimateHygiene
            )
          )}
          {renderField(
            "Lava as mãos",
            renderYesNoDependency(
              data.dailyLivingActivities.hygiene.washesHands
            )
          )}
          {renderField(
            "Usa sabonete",
            renderYesNoDetail(data.dailyLivingActivities.hygiene.usesSoap)
          )}
          {data.dailyLivingActivities.hygiene.usesSoap.yes &&
            renderField(
              "Usa sabonete líquido",
              data.dailyLivingActivities.hygiene.usesSoap.liquid ? "Sim" : "Não"
            )}
          {renderField(
            "Brinca com água",
            renderYesNoDetail(data.dailyLivingActivities.hygiene.playsWithWater)
          )}
          {renderField(
            "Seca as mãos",
            renderYesNoDependency(data.dailyLivingActivities.hygiene.driesHands)
          )}
          {renderField(
            "Escova os dentes",
            renderYesNoDependency(
              data.dailyLivingActivities.hygiene.brushesTeeth
            )
          )}
          {renderField(
            "Sabe onde fica a escova de dentes",
            renderYesNoDetail(
              data.dailyLivingActivities.hygiene.knowsWhereToothbrushIs
            )
          )}
          {renderField(
            "Aplica pasta de dente",
            renderYesNoDependency(
              data.dailyLivingActivities.hygiene.appliesToothpaste
            )
          )}
          {renderField(
            "Limpa a boca adequadamente",
            renderYesNoDependency(
              data.dailyLivingActivities.hygiene.cleansMouthProperly
            )
          )}
          {renderField(
            "Penteia o cabelo",
            renderYesNoDependency(data.dailyLivingActivities.hygiene.combsHair)
          )}
          {renderField(
            "Permite cortar as unhas",
            renderYesNoDetail(
              data.dailyLivingActivities.hygiene.allowsNailCutting
            )
          )}
          {renderField(
            "Permite cortar o cabelo",
            renderYesNoDetail(data.dailyLivingActivities.hygiene.allowsHaircuts)
          )}
          {renderField(
            "Observações sobre higiene",
            data.dailyLivingActivities.hygiene.notes
          )}
        </>
      )}

      {/* 16. Atividades de Vida Diária - Banho */}
      {renderSection(
        "Atividades de Vida Diária - Banho",
        <>
          {renderField(
            "Gosta de tomar banho",
            renderYesNoDetail(data.dailyLivingActivities.bathing.likesTakeBath)
          )}
          {renderField(
            "Toma banho sozinho",
            renderYesNoDependency(
              data.dailyLivingActivities.bathing.takesBathAlone
            )
          )}
          {renderField(
            "Ensaboa todas as partes do corpo",
            renderYesNoDependency(
              data.dailyLivingActivities.bathing.soapsEveryPartOfTheBody
            )
          )}
          {renderField(
            "Observações sobre o banho",
            data.dailyLivingActivities.bathing.notes
          )}
        </>
      )}
    </>
  );
};
