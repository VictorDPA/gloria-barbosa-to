// src/components/print/PrintViewUtils.tsx
import React from "react";
import { YesNoDetail, YesNoDependency, YesNoMonths } from "@/lib/types";

// Função para renderizar campos yes/no com detalhes
export const renderYesNoDetail = (item: YesNoDetail | undefined) => {
  if (!item) return "Não";

  if (item.yes) {
    return (
      <>
        <span className="font-semibold">Sim</span>
        {item.details && (
          <div className="mt-1 ml-4 text-sm">{item.details}</div>
        )}
      </>
    );
  }

  return "Não";
};

// Função para renderizar campos yes/no com meses
export const renderYesNoMonths = (item: YesNoMonths | undefined) => {
  if (!item) return "Não";

  if (item.yes) {
    return (
      <>
        <span className="font-semibold">Sim</span>
        {item.months && <span className="ml-2">({item.months} meses)</span>}
      </>
    );
  }

  return "Não";
};

// Função para renderizar campos yes/no com dependência
export const renderYesNoDependency = (item: YesNoDependency | undefined) => {
  if (!item) return "Não";

  if (item.yes) {
    let dependencyText = "";

    if (item.dependencyLevel.dependent) {
      dependencyText = "Dependente";
    } else if (item.dependencyLevel.semiDependent) {
      dependencyText = "Semi-dependente";
    } else if (item.dependencyLevel.independent) {
      dependencyText = "Independente";
    }

    return (
      <>
        <span className="font-semibold">Sim</span>
        {dependencyText && <span className="ml-2">({dependencyText})</span>}
        {item.details && (
          <div className="mt-1 ml-4 text-sm">{item.details}</div>
        )}
      </>
    );
  }

  return "Não";
};

// Função para renderizar um campo do formulário
export const renderField = (
  label: string,
  value: string | number | boolean | null | undefined
) => {
  return (
    <div className="mb-2">
      <span className="font-semibold">{label}:</span>{" "}
      <span>{value ? value.toString() : "-"}</span>
    </div>
  );
};

// Função para renderizar uma seção do formulário
export const renderSection = (title: string, children: React.ReactNode) => {
  return (
    <div className="mb-6 break-inside-avoid">
      <h2 className="text-xl font-bold border-b border-slate-900 pb-1 mb-3">
        {title}
      </h2>
      <div className="pl-4">{children}</div>
    </div>
  );
};
