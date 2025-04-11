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
    <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto print:shadow-none print:p-0">
      <div className="text-center mb-8">
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

      {/* Renderizar as partes do formulário */}
      <PrintViewPart1 data={data} />
      <PrintViewPart2 data={data} />
      <PrintViewPart3 data={data} />
      <PrintViewPart4 data={data} />

      {/* Assinatura */}
      <div className="mt-16 text-center border-t border-slate-300 pt-8">
        <div className="border-b border-slate-900 mx-auto w-64 mb-2"></div>
        <p className="text-sm">
          {data.additionalInformation.therapist || "Terapeuta Ocupacional"}
        </p>
      </div>
    </div>
  );
};
