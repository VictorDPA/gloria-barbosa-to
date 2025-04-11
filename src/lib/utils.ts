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
  try {
    return format(new Date(date), "dd/MM/yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
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

  // Remover caracteres especiais que podem causar problemas em nomes de arquivo
  fileName = fileName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  fileName = fileName.replace(/[^\w\s-]/gi, "");

  return `Anamnese_${fileName}_${format(new Date(), "yyyy_MM_dd")}`;
}

// Função melhorada para exportar para PDF
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

    // Aplicar estilos de impressão ao elemento temporariamente
    const originalDisplay = window.getComputedStyle(element).display;
    element.style.display = "block";
    element.style.width = "210mm"; // Largura de uma página A4
    document.body.classList.add("printing-pdf");

    // Preparar o documento PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // Dimensões e margens da página A4
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;

    // Altura máxima de conteúdo por página
    const maxContentHeight = pageHeight - margin * 2;

    // Obter a altura total do conteúdo
    const contentSections = element.querySelectorAll(".print-section");

    // Configurações para html2canvas
    const canvasOptions = {
      scale: 2, // Aumentar qualidade
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#FFFFFF",
      logging: false,
    };

    // Variável para controlar se já adicionamos uma página
    let isFirstPage = true;

    // Processar cada seção separadamente para evitar problemas de memória
    for (let i = 0; i < contentSections.length; i++) {
      const section = contentSections[i] as HTMLElement;

      // Pular seções vazias
      if (!section.offsetHeight) continue;

      // Adicionar nova página se não for a primeira seção
      if (!isFirstPage) {
        pdf.addPage();
      } else {
        isFirstPage = false;
      }

      try {
        // Capturar a seção atual
        const canvas = await html2canvas(section, canvasOptions);

        // Converter o canvas para imagem
        const imgData = canvas.toDataURL("image/jpeg", 0.95);

        // Calcular dimensões proporcionais para caber na página
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Adicionar a imagem ao PDF
        pdf.addImage(
          imgData,
          "JPEG",
          margin,
          margin,
          imgWidth,
          imgHeight,
          undefined,
          "MEDIUM"
        );
      } catch (sectionError) {
        console.error(`Erro ao processar seção ${i}:`, sectionError);
        // Continuar com a próxima seção
      }
    }

    // Restaurar os estilos originais
    element.style.display = originalDisplay;
    document.body.classList.remove("printing-pdf");

    // Gerar o nome do arquivo
    const fileName = customFilename
      ? `${customFilename}.pdf`
      : `${generatePdfFilename(anamnese)}.pdf`;

    // Salvar o PDF
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
