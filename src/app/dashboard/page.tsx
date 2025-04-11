"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { useAnamneseStore } from "@/lib/store";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Importação das seções do formulário
import { EvaluationSection } from "@/components/dashboard/FormSections/EvaluationSection";
import { PatientSection } from "@/components/dashboard/FormSections/PatientSection";
import { ReferralSection } from "@/components/dashboard/FormSections/ReferralSection";
import { MedicalHistorySection } from "@/components/dashboard/FormSections/MedicalHistorySection";
import { PregnancyHistorySection } from "@/components/dashboard/FormSections/PregnancyHistorySection";
import { BabyDevelopmentSection } from "@/components/dashboard/FormSections/BabyDevelopmentSection";
import { ChildDevelopmentSection } from "@/components/dashboard/FormSections/ChildDevelopmentSection";
import { DailyRoutineSection } from "@/components/dashboard/FormSections/DailyRoutineSection";
import { SocialInteractionSection } from "@/components/dashboard/FormSections/SocialInteractionSection";
import { BehavioralManifestationsSection } from "@/components/dashboard/FormSections/BehavioralManifestationSection";
import { EducationSection } from "@/components/dashboard/FormSections/EducationSection";
import { RecognitionSkillsSection } from "@/components/dashboard/FormSections/RecognitionSkillsSection";
import { FamilyDynamicsSection } from "@/components/dashboard/FormSections/FamilyDynamicsSection";
import { ComplementaryExamsSection } from "@/components/dashboard/FormSections/ComplementaryExamsSection";
import { DailyLivingActivitiesSection } from "@/components/dashboard/FormSections/DailyLivingActivitiesSection";
import { MotorSkillsSection } from "@/components/dashboard/FormSections/MotorSkilsSection";
import { SensoryPerceptionSection } from "@/components/dashboard/FormSections/SensoryPerceptionSection";
import { ProprioceptionVestibularSection } from "@/components/dashboard/FormSections/ProprioceptionAndVestibularSection";
import { TactilePerceptionSection } from "@/components/dashboard/FormSections/TactilePerceptionSection";
import { TherapeuticDiagnosisSection } from "@/components/dashboard/FormSections/TherapeuticDiagnosisSection";
import { PrognosisSection } from "@/components/dashboard/FormSections/PrognosisSection";
import { OccupationalTherapyPlanSection } from "@/components/dashboard/FormSections/OccupationalTherapyPlanSection";
import { AdditionalInformationSection } from "@/components/dashboard/FormSections/AdditionalInformationSection";

// Tipos
import { Anamnese } from "@/lib/types";

export default function Dashboard() {
  const router = useRouter();

  // Use o hook do Zustand com funções seletoras individuais e estáveis
  const currentAnamnese = useAnamneseStore((state) => state.currentAnamnese);
  const updateAnamnese = useAnamneseStore((state) => state.updateAnamnese);
  const resetAnamnese = useAnamneseStore((state) => state.resetAnamnese);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Configurar a data atual para a avaliação, se não estiver definida
  useEffect(() => {
    if (!currentAnamnese.evaluation.evaluationDate) {
      const today = new Date();
      updateAnamnese({
        evaluation: {
          ...currentAnamnese.evaluation,
          evaluationDate: format(today, "yyyy-MM-dd"),
          weekDay: format(today, "EEEE", { locale: ptBR }),
          time: format(today, "HH:mm"),
        },
      });
    }
  }, [currentAnamnese.evaluation, updateAnamnese]);

  const handleSectionChange = <K extends keyof Anamnese>(
    section: K,
    data: Partial<Anamnese[K]>
  ) => {
    updateAnamnese({
      [section]: {
        ...currentAnamnese[section],
        ...data,
      },
    });
  };

  const handleSave = () => {
    setIsSaving(true);

    try {
      // Salvar no localStorage é automático por causa do persist do Zustand
      // Portanto, apenas mostramos uma mensagem de sucesso
      setSaveMessage({ type: "success", text: "Anamnese salva com sucesso!" });

      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setSaveMessage({
        type: "error",
        text: "Erro ao salvar. Tente novamente.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrintPreview = () => {
    router.push("/imprimir");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita."
      )
    ) {
      resetAnamnese();
    }
  };

  const handleDiagnosisChange = (value: string) => {
    updateAnamnese({
      therapeuticOccupationalDiagnosis: value,
    });
  };

  const handlePrognosisChange = (value: string) => {
    updateAnamnese({
      prognosis: value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Formulário de Anamnese
          </h1>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleReset}>
              Limpar Formulário
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
            <Button variant="secondary" onClick={handlePrintPreview}>
              Visualizar Impressão
            </Button>
          </div>
        </div>

        {saveMessage && (
          <div
            className={`p-4 mb-6 rounded-md ${
              saveMessage.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {saveMessage.text}
          </div>
        )}

        <div className="space-y-6">
          {/* Seção 1: Avaliação */}
          <EvaluationSection
            data={currentAnamnese.evaluation}
            onChange={(data) => handleSectionChange("evaluation", data)}
          />

          {/* Seção 2: Identificação do Paciente */}
          <PatientSection
            data={currentAnamnese.patientIdentification}
            onChange={(data) =>
              handleSectionChange("patientIdentification", data)
            }
          />

          {/* Seção 3: Encaminhamento */}
          <ReferralSection
            data={currentAnamnese.referral}
            onChange={(data) => handleSectionChange("referral", data)}
          />

          {/* Seção 4: Histórico Médico */}
          <MedicalHistorySection
            data={currentAnamnese.medicalHistory}
            onChange={(data) => handleSectionChange("medicalHistory", data)}
          />

          {/* Seção 5: Histórico da Gestação */}
          <PregnancyHistorySection
            data={currentAnamnese.pregnancyHistory}
            onChange={(data) => handleSectionChange("pregnancyHistory", data)}
          />

          {/* Seção 6: Desenvolvimento do Bebê */}
          <BabyDevelopmentSection
            data={currentAnamnese.babyDevelopment}
            onChange={(data) => handleSectionChange("babyDevelopment", data)}
          />

          {/* Seção 7: Desenvolvimento da Criança */}
          <ChildDevelopmentSection
            data={currentAnamnese.childDevelopment}
            onChange={(data) => handleSectionChange("childDevelopment", data)}
          />

          {/* Seção 8: Rotina Diária */}
          <DailyRoutineSection
            data={currentAnamnese.dailyRoutine}
            onChange={(data) => handleSectionChange("dailyRoutine", data)}
          />

          {/* Seção 9: Interação Social */}
          <SocialInteractionSection
            data={currentAnamnese.socialInteraction}
            onChange={(data) => handleSectionChange("socialInteraction", data)}
          />

          {/* Seção 10: Manifestações Comportamentais */}
          <BehavioralManifestationsSection
            data={currentAnamnese.behavioralManifestations}
            onChange={(data) =>
              handleSectionChange("behavioralManifestations", data)
            }
          />

          {/* Seção 11: Educação */}
          <EducationSection
            data={currentAnamnese.education}
            onChange={(data) => handleSectionChange("education", data)}
          />

          {/* Seção 12: Habilidades de Reconhecimento */}
          <RecognitionSkillsSection
            data={currentAnamnese.recognitionSkills}
            onChange={(data) => handleSectionChange("recognitionSkills", data)}
          />

          {/* Seção 13: Dinâmica Familiar */}
          <FamilyDynamicsSection
            data={currentAnamnese.familyDynamics}
            onChange={(data) => handleSectionChange("familyDynamics", data)}
          />

          {/* Seção 14: Exames Complementares */}
          <ComplementaryExamsSection
            data={currentAnamnese.complementaryExams}
            onChange={(data) => handleSectionChange("complementaryExams", data)}
          />

          {/* Seção 15: Atividades de Vida Diária */}
          <DailyLivingActivitiesSection
            data={currentAnamnese.dailyLivingActivities}
            onChange={(data) =>
              handleSectionChange("dailyLivingActivities", data)
            }
          />

          {/* Seção 16: Habilidades Motoras */}
          <MotorSkillsSection
            data={currentAnamnese.motorSkills}
            onChange={(data) => handleSectionChange("motorSkills", data)}
          />

          {/* Seção 17: Percepção Sensorial */}
          <SensoryPerceptionSection
            data={currentAnamnese.sensoryPerception}
            onChange={(data) => handleSectionChange("sensoryPerception", data)}
          />

          {/* Seção 18: Propriocepção e Sistema Vestibular */}
          <ProprioceptionVestibularSection
            data={currentAnamnese.proprioceptionAndVestibular}
            onChange={(data) =>
              handleSectionChange("proprioceptionAndVestibular", data)
            }
          />

          {/* Seção 19: Percepção Tátil */}
          <TactilePerceptionSection
            data={currentAnamnese.tactilePerception}
            onChange={(data) => handleSectionChange("tactilePerception", data)}
          />

          {/* Seção 20: Diagnóstico Terapêutico Ocupacional */}
          <TherapeuticDiagnosisSection
            data={currentAnamnese.therapeuticOccupationalDiagnosis}
            onChange={handleDiagnosisChange}
          />

          {/* Seção 21: Prognóstico */}
          <PrognosisSection
            data={currentAnamnese.prognosis}
            onChange={handlePrognosisChange}
          />

          {/* Seção 22: Plano Terapêutico Ocupacional */}
          <OccupationalTherapyPlanSection
            data={currentAnamnese.occupationalTherapyPlan}
            onChange={(data) =>
              handleSectionChange("occupationalTherapyPlan", data)
            }
          />

          {/* Seção 23: Informações Adicionais */}
          <AdditionalInformationSection
            data={currentAnamnese.additionalInformation}
            onChange={(data) =>
              handleSectionChange("additionalInformation", data)
            }
          />
        </div>

        <div className="mt-8 flex justify-end space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Limpar Formulário
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
          <Button variant="secondary" onClick={handlePrintPreview}>
            Visualizar Impressão
          </Button>
        </div>
      </main>
    </div>
  );
}
