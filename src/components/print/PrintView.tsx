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
    <div className="bg-white print:shadow-none print:p-0 print-content">
      <div className="text-center mb-6 no-break">
        <h1 className="header-title text-2xl font-bold text-slate-900 mb-2">
          ANAMNESE
        </h1>
        {data.patientIdentification.name && (
          <p className="header-subtitle text-lg font-medium mt-1">
            {data.patientIdentification.name}
          </p>
        )}
        <p className="header-date text-sm mt-1">
          {formatDate(data.evaluation.evaluationDate) || "Data não informada"}
        </p>
      </div>

      {/* Parte 1 - Informações básicas */}
      <div className="print-section part-1">
        <PrintViewPart1 data={data} />
      </div>

      {/* Quebra de página após a primeira parte */}
      <div className="page-break"></div>

      {/* Parte 2 - Desenvolvimento */}
      <div className="print-section part-2">
        <PrintViewPart2 data={data} />
      </div>

      {/* Quebra de página após a segunda parte */}
      <div className="page-break"></div>

      {/* Parte 3 - Atividades diárias */}
      <div className="print-section part-3">
        <PrintViewPart3 data={data} />
      </div>

      {/* Quebra de página após a terceira parte */}
      <div className="page-break"></div>

      {/* Parte 4 - Avaliação sensorial e plano terapêutico */}
      <div className="print-section part-4">
        <PrintViewPart4 data={data} />
      </div>

      {/* Assinatura - Adicionar quebra de página antes se necessário */}
      <div className="mt-12 text-center border-t border-slate-300 pt-6 no-break">
        <div className="signature-line"></div>
        <p className="signature-name">
          {data.additionalInformation.therapist || "Terapeuta Ocupacional"}
        </p>
        <p className="text-sm mt-1">
          {data.additionalInformation.location
            ? `${data.additionalInformation.location}, `
            : ""}
          {formatDate(data.additionalInformation.date) || ""}
        </p>
      </div>
    </div>
  );
};
