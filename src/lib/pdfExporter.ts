// src/lib/pdfExporter.ts
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Anamnese } from "./types";
import { format } from "date-fns";

/**
 * Gera um nome de arquivo para o PDF baseado nos dados da anamnese
 */
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

/**
 * Função otimizada para exportar para PDF com tamanho reduzido
 */
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

    // Prepara o documento para melhor renderização
    const originalStyles = prepareElementForExport(element);

    // Criar o documento PDF - usando compressão
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // Dimensões da página A4
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;

    // Dividir o conteúdo em seções
    const sections = Array.from(element.querySelectorAll(".print-section"));

    let pageCount = 0;

    // Processamento otimizado por seções
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement;
      if (!section.offsetHeight) continue;

      // Adicionar nova página (exceto para a primeira seção)
      if (pageCount > 0) {
        pdf.addPage();
      }
      pageCount++;

      try {
        // Configurações otimizadas para html2canvas
        const canvas = await html2canvas(section, {
          scale: 1.5, // Equilíbrio entre qualidade e tamanho
          useCORS: true,
          logging: false,
          backgroundColor: "#FFFFFF",
          imageTimeout: 15000,
          onclone: (clonedDoc) => {
            // Ajustar estilos no clone para melhorar qualidade
            const clonedElement = clonedDoc.getElementById(section.id);
            if (clonedElement) {
              clonedElement.style.margin = "0";
              clonedElement.style.padding = "15px";
              clonedElement.style.fontSize = "10pt";
            }
          },
        });

        // Comprimir a imagem como JPEG com qualidade média
        const imgData = canvas.toDataURL("image/jpeg", 0.8);

        // Calcular altura proporcional
        const imgHeight = (canvas.height * contentWidth) / canvas.width;

        // Adicionar imagem ao PDF com configurações otimizadas
        pdf.addImage(
          imgData,
          "JPEG",
          margin,
          margin,
          contentWidth,
          imgHeight,
          undefined,
          "FAST"
        );
      } catch (sectionError) {
        console.error(`Erro ao processar seção ${i}:`, sectionError);
      }
    }

    // Restaurar os estilos originais
    restoreElementStyles(element, originalStyles);

    // Gerar nome do arquivo
    const fileName = customFilename
      ? `${customFilename}.pdf`
      : `${generatePdfFilename(anamnese)}.pdf`;

    // Otimizar e salvar o PDF
    pdf.save(fileName);

    return Promise.resolve();
  } catch (error) {
    console.error("Erro na exportação para PDF:", error);
    return Promise.reject(error);
  }
}

/**
 * Prepara o elemento para exportação, retornando os estilos originais
 */
function prepareElementForExport(element: HTMLElement): {
  display: string;
  width: string;
  fontSize: string;
} {
  const computedStyle = window.getComputedStyle(element);
  const originalStyles = {
    display: computedStyle.display,
    width: computedStyle.width,
    fontSize: computedStyle.fontSize,
  };

  // Aplicar estilos otimizados para exportação
  element.style.display = "block";
  element.style.width = "210mm";
  element.style.fontSize = "10pt";

  // Adicionar classe para estilização específica
  document.body.classList.add("exporting-pdf");

  return originalStyles;
}

/**
 * Restaura os estilos originais do elemento
 */
function restoreElementStyles(
  element: HTMLElement,
  originalStyles: { display: string; width: string; fontSize: string }
): void {
  element.style.display = originalStyles.display;
  element.style.width = originalStyles.width;
  element.style.fontSize = originalStyles.fontSize;

  // Remover classe de estilização
  document.body.classList.remove("exporting-pdf");
}
