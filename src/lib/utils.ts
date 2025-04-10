// src/lib/utils.ts
import { format } from "date-fns";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Anamnese } from "./types";

// Função para combinar classes com Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Função para formatar a data
export function formatDate(date: string | Date): string {
  if (!date) return "";
  return format(new Date(date), "dd/MM/yyyy");
}

// Função para gerar o nome do arquivo PDF
export function generatePdfFilename(anamnese: Anamnese): string {
  if (!anamnese.patientIdentification.name) {
    return `Anamnese_${format(new Date(), "yyyy_MM_dd")}`;
  }

  const nameParts = anamnese.patientIdentification.name.split(" ");
  let fileName = "";

  if (nameParts.length >= 2) {
    fileName = `${nameParts[0]}_${nameParts[nameParts.length - 1]}`;
  } else {
    fileName = nameParts[0];
  }

  return `${fileName}_${format(new Date(), "yyyy_MM_dd")}`;
}

// Função para exportar para PDF
export async function exportToPdf(
  elementId: string,
  anamnese: Anamnese
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Element not found");
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  const pdf = new jsPDF("p", "mm", "a4");
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Se o conteúdo for maior que uma página, adicionar páginas adicionais
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  const fileName = generatePdfFilename(anamnese);
  pdf.save(`${fileName}.pdf`);
}

// Verificar autenticação
export function verifyPassword(
  inputPassword: string,
  vercelPassword: string
): boolean {
  return inputPassword === vercelPassword;
}

// Tradução de campos específicos para exibição
export const fieldTranslations: Record<string, string> = {
  // Identificação do paciente
  name: "Nome",
  dateOfBirth: "Data de Nascimento",
  age: "Idade",
  placeOfBirth: "Local de Nascimento",
  address: "Endereço",
  phone: "Telefone",
  cityDistrict: "Cidade/Bairro",

  // Encaminhamento
  diagnosis: "Diagnóstico",
  responsibleDoctor: "Médico Responsável",
  currentMedication: "Medicação Atual",
  mainComplaint: "Queixa Principal",

  // E outros campos conforme necessário...
};
