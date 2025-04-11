// src/components/print/PrintViewUtils.tsx
import React from "react";
import { YesNoDetail, YesNoDependency, YesNoMonths } from "@/lib/types";

// Função para renderizar campos yes/no com detalhes de forma mais estruturada
export const renderYesNoDetail = (item: YesNoDetail | undefined) => {
  if (!item) return "Não";

  if (item.yes) {
    return (
      <>
        <span className="font-semibold">Sim</span>
        {item.details && (
          <div className="mt-1 ml-4 text-sm print:pl-2">{item.details}</div>
        )}
      </>
    );
  }

  return "Não";
};

// Função para renderizar campos yes/no com meses de forma mais compacta
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

// Função para renderizar campos yes/no com dependência de forma mais estruturada
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
          <div className="mt-1 ml-4 text-sm print:pl-2">{item.details}</div>
        )}
      </>
    );
  }

  return "Não";
};

// Função para renderizar um campo do formulário com espaçamento melhorado
export const renderField = (
  label: string,
  value: string | number | boolean | React.ReactNode | null | undefined
) => {
  // Se valor for vazio ou undefined
  const isEmpty =
    value === undefined ||
    value === null ||
    value === "" ||
    (typeof value === "string" && value.trim() === "");

  return (
    <div className="mb-2 print:mb-1 print:leading-tight">
      <span className="font-semibold">{label}:</span>{" "}
      <span className={isEmpty ? "text-gray-500 italic" : ""}>
        {isEmpty ? "-" : typeof value === "boolean" ? value.toString() : value}
      </span>
    </div>
  );
};

// Função para renderizar uma seção do formulário com melhor controle de espaço
export const renderSection = (
  title: string,
  children: React.ReactNode,
  sectionClass?: string
) => {
  // Converta o título para uma classe CSS
  const titleSlug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/gi, "")
    .replace(/\s+/g, "-");

  const defaultClass = `${titleSlug}-section`;
  const className = sectionClass || defaultClass;

  return (
    <div className={`mb-4 print-section ${className}`}>
      <h2 className="text-xl font-bold border-b border-slate-700 pb-1 mb-3 print:text-lg print:mb-2">
        {title}
      </h2>
      <div className="pl-4 print:pl-2">{children}</div>
    </div>
  );
};

// Função para renderizar listas de forma mais compacta
export const renderList = (
  items: Array<{
    label: string;
    value: string | number | boolean | React.ReactNode;
  }>,
  columns: number = 1
) => {
  // Filtrar apenas itens com valores válidos
  const validItems = items.filter(
    (item) =>
      item.value !== undefined &&
      item.value !== null &&
      item.value !== "" &&
      (typeof item.value !== "string" || item.value.trim() !== "")
  );

  if (validItems.length === 0) {
    return (
      <div className="text-gray-500 italic">Nenhuma informação disponível</div>
    );
  }

  // Criar classe de grid baseada no número de colunas
  const gridClass =
    columns > 1
      ? `grid grid-cols-1 md:grid-cols-${columns} gap-x-4 gap-y-1 print:gap-x-2 print:gap-y-0`
      : "";

  return (
    <div className={gridClass}>
      {validItems.map((item, index) => (
        <div key={index} className="mb-1 print:leading-tight">
          <span className="font-semibold">{item.label}:</span>{" "}
          <span>
            {typeof item.value === "boolean"
              ? item.value
                ? "Sim"
                : "Não"
              : item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// Função para renderizar tabelas de forma mais compacta para impressão
export const renderTable = (
  headers: string[],
  rows: (string | number | boolean | React.ReactNode)[][],
  widths?: string[]
) => {
  return (
    <table className="w-full border-collapse mb-2 print:text-sm">
      <thead>
        <tr className="bg-gray-100 print:bg-gray-200">
          {headers.map((header, index) => (
            <th
              key={index}
              className="border border-gray-300 p-2 print:p-1 text-left font-semibold"
              style={widths ? { width: widths[index] } : {}}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="border border-gray-300 p-2 print:p-1"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Função para lidar com quebras de página
export const pageBreak = () => {
  return <div className="page-break"></div>;
};
