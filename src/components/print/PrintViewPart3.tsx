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
            <div className="mt-2 print:mt-1 pl-4 print:pl-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
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
              </div>
            </div>
          )}
        </>,
        "education-section"
      )}

      {/* 12. Habilidades de Reconhecimento */}
      {renderSection(
        "Habilidades de Reconhecimento",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
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
          </div>
        </>,
        "recognition-skills-section"
      )}

      {/* 13. Dinâmica Familiar */}
      {renderSection(
        "Dinâmica Familiar",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Possui irmãos",
              renderYesNoDetail(data.familyDynamics.hasSiblings)
            )}

            {data.familyDynamics.hasSiblings.yes && (
              <div className="md:col-span-2">
                {renderField(
                  "Idade(s) dos irmãos",
                  data.familyDynamics.hasSiblings.age
                )}
              </div>
            )}

            {renderField("Com quem mora", data.familyDynamics.livesWith)}
            {renderField(
              "Dorme sozinho",
              renderYesNoDetail(data.familyDynamics.sleepsAlone)
            )}

            <div className="md:col-span-2">
              {renderField(
                "Qualidade do sono",
                data.familyDynamics.sleepQuality
              )}
            </div>

            <div className="md:col-span-2">
              {renderField(
                "Brinquedos e jogos favoritos",
                data.familyDynamics.favoriteToysAndGames
              )}
            </div>

            <div className="md:col-span-2">
              {renderField("Brinca com", data.familyDynamics.playsWith)}
            </div>

            <div className="md:col-span-2">
              {renderField(
                "Interesses específicos/hiperfoco",
                data.familyDynamics.hyperfocus
              )}
            </div>
          </div>
        </>,
        "family-dynamics-section"
      )}

      {/* 14. Exames Complementares */}
      {renderSection(
        "Exames Complementares",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
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
              data.complementaryExams.neuropsychologicalAssessment
                ? "Sim"
                : "Não"
            )}

            <div className="md:col-span-2">
              {renderField("Outros documentos", data.complementaryExams.other)}
            </div>
          </div>
        </>,
        "complementary-exams-section"
      )}

      {/* 15. Atividades de Vida Diária - Higiene */}
      {renderSection(
        "Atividades de Vida Diária - Higiene",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Usa fraldas",
              renderYesNoDetail(data.dailyLivingActivities.hygiene.wearsDiapers)
            )}
            {renderField(
              "Tem controle de esfíncteres",
              renderYesNoDetail(
                data.dailyLivingActivities.hygiene.bladderControl
              )
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

            {data.dailyLivingActivities.hygiene.usesSoap.yes && (
              <div>
                {renderField(
                  "Usa sabonete líquido",
                  data.dailyLivingActivities.hygiene.usesSoap.liquid
                    ? "Sim"
                    : "Não"
                )}
              </div>
            )}

            {renderField(
              "Brinca com água",
              renderYesNoDetail(
                data.dailyLivingActivities.hygiene.playsWithWater
              )
            )}
            {renderField(
              "Seca as mãos",
              renderYesNoDependency(
                data.dailyLivingActivities.hygiene.driesHands
              )
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
              renderYesNoDependency(
                data.dailyLivingActivities.hygiene.combsHair
              )
            )}
            {renderField(
              "Permite cortar as unhas",
              renderYesNoDetail(
                data.dailyLivingActivities.hygiene.allowsNailCutting
              )
            )}
            {renderField(
              "Permite cortar o cabelo",
              renderYesNoDetail(
                data.dailyLivingActivities.hygiene.allowsHaircuts
              )
            )}
          </div>

          {data.dailyLivingActivities.hygiene.notes && (
            <div className="mt-2 print:mt-1">
              <span className="font-semibold">Observações sobre higiene:</span>
              <div className="mt-1 print:mt-0.5 ml-4 print:ml-2 text-sm">
                {data.dailyLivingActivities.hygiene.notes}
              </div>
            </div>
          )}
        </>,
        "hygiene-section"
      )}

      {/* 16. Atividades de Vida Diária - Banho */}
      {renderSection(
        "Atividades de Vida Diária - Banho",
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
            {renderField(
              "Gosta de tomar banho",
              renderYesNoDetail(
                data.dailyLivingActivities.bathing.likesTakeBath
              )
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
          </div>

          {data.dailyLivingActivities.bathing.notes && (
            <div className="mt-2 print:mt-1">
              <span className="font-semibold">Observações sobre o banho:</span>
              <div className="mt-1 print:mt-0.5 ml-4 print:ml-2 text-sm">
                {data.dailyLivingActivities.bathing.notes}
              </div>
            </div>
          )}
        </>,
        "bathing-section"
      )}
    </>
  );
};
