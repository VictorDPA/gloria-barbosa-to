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
          <EvaluationSection
            data={currentAnamnese.evaluation}
            onChange={(data) => handleSectionChange("evaluation", data)}
          />

          <PatientSection
            data={currentAnamnese.patientIdentification}
            onChange={(data) =>
              handleSectionChange("patientIdentification", data)
            }
          />

          <ReferralSection
            data={currentAnamnese.referral}
            onChange={(data) => handleSectionChange("referral", data)}
          />

          {/* Adicione aqui as demais seções do formulário */}
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
