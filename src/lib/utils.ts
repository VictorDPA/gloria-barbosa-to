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

// Função melhorada para exportar para PDF
export async function exportToPdf(
  elementId: string,
  anamnese: Anamnese,
  customFilename?: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Elemento não encontrado");
  }

  try {
    // Configurações para melhorar a qualidade da captura
    const canvas = await html2canvas(element, {
      scale: 2, // Aumentar a escala para melhor qualidade
      useCORS: true,
      logging: false,
      allowTaint: true,
      removeContainer: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    // Dimensões de página A4 em mm
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; // Largura A4
    const pageHeight = 297; // Altura A4
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Quebrar em múltiplas páginas se necessário
    let heightLeft = imgHeight;
    let position = 0;

    // Adiciona a primeira página
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Adiciona páginas adicionais se necessário
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Usar o nome personalizado se fornecido, caso contrário usar o nome gerado automaticamente
    const fileName = customFilename
      ? `${customFilename}.pdf`
      : `${generatePdfFilename(anamnese)}.pdf`;

    pdf.save(fileName);
    return Promise.resolve();
  } catch (error) {
    console.error("Erro na exportação para PDF:", error);
    return Promise.reject(error);
  }
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
