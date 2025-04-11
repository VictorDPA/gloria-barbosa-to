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
 * Exporta o conteúdo HTML para PDF com melhor qualidade e formatação
 */
// Função corrigida para exportar conteúdo HTML para PDF
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

    // Aplicar classe para estilos específicos de exportação PDF
    document.body.classList.add("exporting-pdf");

    // Criar o documento PDF com melhor qualidade
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // Configurações de página
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    const contentHeight = pageHeight - 2 * margin;

    // Capturar o conteúdo inteiro como uma única imagem
    // Esta abordagem simplificada ajuda a evitar problemas de paginação
    const canvas = await html2canvas(element, {
      scale: 2, // Maior escala para melhor qualidade
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#FFFFFF",
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Determinar o número de páginas necessário baseado na altura do conteúdo
    const imgHeight = (canvas.height * contentWidth) / canvas.width;
    const pageCount = Math.ceil(imgHeight / contentHeight);

    // Adicionar cada segmento do conteúdo como uma página separada
    for (let i = 0; i < pageCount; i++) {
      // Se não for a primeira página, adicionar uma nova página
      if (i > 0) {
        pdf.addPage();
      }

      // Calcular a porção do canvas para esta página
      const sourceY = i * (canvas.height / pageCount);
      const sourceHeight = canvas.height / pageCount;

      // Criar um canvas temporário para esta página
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = sourceHeight;

      // Desenhar a porção relevante no canvas temporário
      const ctx = tempCanvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sourceHeight,
          0,
          0,
          tempCanvas.width,
          tempCanvas.height
        );

        // Adicionar a imagem ao PDF
        const imgData = tempCanvas.toDataURL("image/jpeg", 1.0);
        const imgWidth = contentWidth;
        const imgPageHeight = (tempCanvas.height * contentWidth) / canvas.width;

        pdf.addImage(
          imgData,
          "JPEG",
          margin,
          margin,
          imgWidth,
          imgPageHeight,
          undefined,
          "FAST"
        );
      }
    }

    // Adicionar assinatura se existir
    const signatureElement =
      document.querySelector(".signature-line")?.parentElement;
    if (signatureElement && pageCount > 0) {
      // Adicionar na última página se houver espaço, ou adicionar uma nova página
      const signatureCanvas = await html2canvas(
        signatureElement as HTMLElement,
        {
          scale: 2,
          backgroundColor: "#FFFFFF",
        }
      );

      const signatureWidth = contentWidth / 2;
      const signatureHeight =
        (signatureCanvas.height * signatureWidth) / signatureCanvas.width;

      // Verificar se precisa de uma nova página para a assinatura
      const lastPageY = (pageCount - 1) * contentHeight;
      const remainingSpace = contentHeight - (imgHeight - lastPageY);

      if (remainingSpace < signatureHeight + 20) {
        pdf.addPage();
      }

      pdf.addImage(
        signatureCanvas.toDataURL("image/jpeg", 1.0),
        "JPEG",
        margin + contentWidth / 4, // Centralizar
        margin + contentHeight / 2, // Posicionar na metade inferior da página
        signatureWidth,
        signatureHeight,
        undefined,
        "FAST"
      );
    }

    // Remover classe de estilização
    document.body.classList.remove("exporting-pdf");

    // Gerar nome do arquivo
    const fileName = customFilename
      ? `${customFilename}.pdf`
      : `${generatePdfFilename(anamnese)}.pdf`;

    // Salvar o PDF
    pdf.save(fileName);

    return Promise.resolve();
  } catch (error) {
    console.error("Erro na exportação para PDF:", error);
    // Garantir que a classe seja removida em caso de erro
    document.body.classList.remove("exporting-pdf");
    return Promise.reject(error);
  }
}
