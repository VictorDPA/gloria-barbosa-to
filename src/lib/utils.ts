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

// Função corrigida para exportar para PDF usando jsPDF
export async function exportToPdf(
  elementId: string,
  anamnese: Anamnese,
  customFilename?: string
): Promise<void> {
  try {
    // Obter o elemento que contém o conteúdo a ser exportado
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Elemento não encontrado");
    }

    // Configurar o documento PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // Dimensões de página A4 em mm
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15; // margem em mm
    const contentWidth = pageWidth - margin * 2;

    // Configurar a captura de HTML para PDF
    const options = {
      scale: 2, // Aumentar qualidade
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#FFFFFF",
      logging: false,
    };

    // Usar html2canvas para renderizar o elemento
    const canvas = await html2canvas(element, options);

    // Converter o canvas para imagem
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    // Obter dimensões proporcionais
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Calcular número de páginas
    const pageCount = Math.ceil(imgHeight / (pageHeight - margin * 2));

    // Adicionar páginas com recortes apropriados da imagem
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      // Calcular posição do recorte
      const srcY = i * (canvas.height / pageCount);
      const srcHeight = canvas.height / pageCount;

      // Adicionar imagem para esta página
      pdf.addImage(
        imgData,
        "JPEG",
        margin,
        margin,
        imgWidth,
        imgHeight / pageCount,
        `page-${i}`,
        "MEDIUM",
        0,
        -srcY * (imgWidth / canvas.width)
      );
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
