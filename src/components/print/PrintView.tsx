// src/components/print/PrintView.tsx
import React from "react";
import { Anamnese } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { PrintViewPart1 } from "./PrintViewPart1";
import { PrintViewPart2 } from "./PrintViewPart2";
import { PrintViewPart3 } from "./PrintViewPart3";
import { PrintViewPart4 } from "./PrintViewPart4";

type PrintViewProps = {
  data: Anamnese;
};

export const PrintView: React.FC<PrintViewProps> = ({ data }) => {
  return (
    <div className="bg-white print:shadow-none print:p-0">
      <div className="text-center mb-8 no-break">
        <h1 className="text-2xl font-bold text-slate-900">ANAMNESE</h1>
        {data.patientIdentification.name && (
          <p className="text-lg font-medium mt-2">
            {data.patientIdentification.name}
          </p>
        )}
        <p className="text-sm mt-1">
          {formatDate(data.evaluation.evaluationDate) || "Data não informada"}
        </p>
      </div>

      {/* Parte 1 - Informações básicas */}
      <div className="print-section">
        <PrintViewPart1 data={data} />
      </div>

      {/* Adicionar quebra de página antes da Parte 2 */}
      <div className="page-break"></div>

      {/* Parte 2 - Desenvolvimento */}
      <div className="print-section">
        <PrintViewPart2 data={data} />
      </div>

      {/* Adicionar quebra de página antes da Parte 3 */}
      <div className="page-break"></div>

      {/* Parte 3 - Atividades diárias */}
      <div className="print-section">
        <PrintViewPart3 data={data} />
      </div>

      {/* Adicionar quebra de página antes da Parte 4 */}
      <div className="page-break"></div>

      {/* Parte 4 - Avaliação sensorial e plano terapêutico */}
      <div className="print-section">
        <PrintViewPart4 data={data} />
      </div>

      {/* Assinatura */}
      <div className="mt-16 text-center border-t border-slate-300 pt-8 no-break">
        <div className="border-b border-slate-900 mx-auto w-64 mb-2"></div>
        <p className="text-sm">
          {data.additionalInformation.therapist || "Terapeuta Ocupacional"}
        </p>
      </div>
    </div>
  );
};
