// src/components/print/PrintViewPart1.tsx
import React from "react";
import { Anamnese } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  renderField,
  renderSection,
  renderYesNoDetail,
} from "./PrintViewUtils";

type PrintViewPart1Props = {
  data: Anamnese;
};

export const PrintViewPart1: React.FC<PrintViewPart1Props> = ({ data }) => {
  return (
    (
      <>
        {/* 1. Avaliação */}
        {renderSection(
          "Avaliação",
          <>
            {renderField("Data", formatDate(data.evaluation.evaluationDate))}
            {renderField("Dia da Semana", data.evaluation.weekDay)}
            {renderField("Horário", data.evaluation.time)}
          </>,
          "evaluation-section"
        )}

        {/* 2. Identificação do Paciente */}
        {renderSection(
          "Identificação do Paciente",
          <>
            {renderField("Nome", data.patientIdentification.name)}
            {renderField(
              "Data de Nascimento",
              formatDate(data.patientIdentification.dateOfBirth)
            )}
            {renderField("Idade", data.patientIdentification.age)}
            {renderField(
              "Local de Nascimento",
              data.patientIdentification.placeOfBirth
            )}
            {renderField("Endereço", data.patientIdentification.address)}
            {renderField("Telefone", data.patientIdentification.phone)}
            {renderField(
              "Cidade/Bairro",
              data.patientIdentification.cityDistrict
            )}

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Informações do Pai:</h3>
              <div className="pl-4">
                {renderField("Nome", data.patientIdentification.father.name)}
                {renderField("Idade", data.patientIdentification.father.age)}
                {renderField(
                  "Profissão",
                  data.patientIdentification.father.profession
                )}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Informações da Mãe:</h3>
              <div className="pl-4">
                {renderField("Nome", data.patientIdentification.mother.name)}
                {renderField("Idade", data.patientIdentification.mother.age)}
                {renderField(
                  "Profissão",
                  data.patientIdentification.mother.profession
                )}
              </div>
            </div>
          </>,
          "patient-identification-section"
        )}

        {/* 3. Encaminhamento */}
        {renderSection(
          "Encaminhamento",
          <>
            {renderField("Diagnóstico", data.referral.diagnosis)}
            {renderField("Médico Responsável", data.referral.responsibleDoctor)}
            {renderField("Medicação Atual", data.referral.currentMedication)}
            {renderField("Queixa Principal", data.referral.mainComplaint)}

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Acompanhamentos:</h3>
              <div className="pl-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {renderField(
                    "Fonoaudiologia",
                    renderYesNoDetail(data.referral.followUps.speechTherapy)
                  )}
                </div>
                <div>
                  {renderField(
                    "Psicologia",
                    renderYesNoDetail(data.referral.followUps.psychological)
                  )}
                </div>
                <div>
                  {renderField(
                    "Psicopedagogia",
                    renderYesNoDetail(data.referral.followUps.psychopedagogy)
                  )}
                </div>
                <div>
                  {renderField(
                    "Fisioterapia",
                    renderYesNoDetail(data.referral.followUps.physiotherapy)
                  )}
                </div>
                <div>
                  {renderField(
                    "Musicoterapia",
                    renderYesNoDetail(data.referral.followUps.musicTherapy)
                  )}
                </div>
                <div>
                  {renderField(
                    "Nutrição",
                    renderYesNoDetail(data.referral.followUps.nutrition)
                  )}
                </div>
                <div>
                  {renderField(
                    "Arteterapia",
                    renderYesNoDetail(data.referral.followUps.artTherapy)
                  )}
                </div>
                <div>
                  {renderField(
                    "Terapia Ocupacional",
                    renderYesNoDetail(
                      data.referral.followUps.occupationalTherapy
                    )
                  )}
                </div>
                <div>
                  {renderField(
                    "Outras Terapias",
                    renderYesNoDetail(data.referral.followUps.otherTherapies)
                  )}
                </div>
              </div>
            </div>
          </>,
          "referral-section"
        )}

        {/* 4. Histórico Médico */}
        {renderSection(
          "Histórico Médico",
          <>
            {renderField(
              "Tratamentos anteriores",
              renderYesNoDetail(data.medicalHistory.previousTreatments)
            )}
            {renderField(
              "Reabilitação",
              renderYesNoDetail(data.medicalHistory.rehabilitation)
            )}
            {renderField(
              "Histórico familiar",
              renderYesNoDetail(data.medicalHistory.familyHistory)
            )}
            {renderField(
              "Internações",
              renderYesNoDetail(data.medicalHistory.hospitalizations)
            )}
            {renderField(
              "Cirurgias",
              renderYesNoDetail(data.medicalHistory.surgeries)
            )}
            {renderField(
              "Convulsões",
              renderYesNoDetail(data.medicalHistory.seizures)
            )}
            {renderField(
              "Estereotipia",
              renderYesNoDetail(data.medicalHistory.stereotypy)
            )}
            {renderField(
              "Problemas respiratórios",
              renderYesNoDetail(data.medicalHistory.respiratoryIssues)
            )}
            {renderField(
              "Problemas cardíacos",
              renderYesNoDetail(data.medicalHistory.heartConditions)
            )}
            {renderField(
              "Ecolalia",
              renderYesNoDetail(data.medicalHistory.echolalia)
            )}
            {renderField(
              "Deficiência visual",
              renderYesNoDetail(data.medicalHistory.visualImpairment)
            )}
            {renderField(
              "Deficiência auditiva",
              renderYesNoDetail(data.medicalHistory.hearingImpairment)
            )}
          </>
        )}
      </>
    ),
    "medical-history-section"
  );
};
