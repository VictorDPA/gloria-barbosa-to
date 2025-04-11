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
      hotfixes: ["px_scaling"], // Corrigir problemas de escala
    });

    // Dimensões da página A4
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    const contentHeight = pageHeight - 2 * margin;

    // Dividir o conteúdo em seções principais para evitar problemas de renderização
    const mainSections = [
      document.getElementById("section-part1"),
      document.getElementById("section-part2"),
      document.getElementById("section-part3"),
      document.getElementById("section-part4"),
    ].filter(Boolean) as HTMLElement[];

    if (mainSections.length === 0) {
      // Se não encontrar as seções específicas, usar o elemento completo
      mainSections.push(element);
    }

    // Configurações para melhor qualidade
    const scale = 2; // Maior escala para melhor qualidade
    let currentPage = 0;

    // Processar cada seção principal
    for (let i = 0; i < mainSections.length; i++) {
      const section = mainSections[i];

      // Adicionar nova página (exceto para a primeira seção)
      if (i > 0) {
        pdf.addPage();
      }
      currentPage = i;

      try {
        // Preparar a seção para captura
        const sectionClone = section.cloneNode(true) as HTMLElement;
        sectionClone.style.width = `${contentWidth}mm`;
        sectionClone.style.margin = "0";
        sectionClone.style.padding = "0";
        sectionClone.style.backgroundColor = "white";

        // Criar um contêiner temporário para renderizar a seção isoladamente
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.top = "-9999px";
        tempContainer.style.left = "-9999px";
        tempContainer.style.width = `${contentWidth}mm`;
        tempContainer.style.backgroundColor = "white";
        tempContainer.appendChild(sectionClone);
        document.body.appendChild(tempContainer);

        // Capturar a imagem com html2canvas com configurações otimizadas
        const canvas = await html2canvas(tempContainer, {
          scale: scale,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#FFFFFF",
          logging: false,
          imageTimeout: 30000,
          onclone: (clonedDoc) => {
            // Ajustar estilos no clone
            const clonedElement = clonedDoc.body.querySelector(
              `#${section.id}`
            );
            if (clonedElement) {
              (clonedElement as HTMLElement).style.width = `${contentWidth}mm`;
              (clonedElement as HTMLElement).style.padding = "0";
              (clonedElement as HTMLElement).style.margin = "0";
            }
          },
        });

        // Limpar o contêiner temporário
        document.body.removeChild(tempContainer);

        // Calcular dimensões proporcionais
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * contentWidth) / canvas.width;

        // Verificar se a imagem excede a altura da página
        if (imgHeight <= contentHeight) {
          // A imagem cabe na página atual
          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          pdf.addImage(
            imgData,
            "JPEG",
            margin,
            margin,
            imgWidth,
            imgHeight,
            undefined,
            "FAST"
          );
        } else {
          // A imagem é maior que a página, dividir em múltiplas páginas
          let remainingHeight = canvas.height;
          let currentPosition = 0;

          // Enquanto houver conteúdo para processar
          while (remainingHeight > 0) {
            // Calcular a altura proporcional que cabe na página
            const canvasChunkHeight =
              (contentHeight * canvas.width) / contentWidth;

            // Criar um canvas temporário para a parte atual
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = canvas.width;
            tempCanvas.height = Math.min(canvasChunkHeight, remainingHeight);
            const ctx = tempCanvas.getContext("2d")!;

            // Desenhar a parte relevante do canvas original
            ctx.drawImage(
              canvas,
              0,
              currentPosition,
              canvas.width,
              tempCanvas.height,
              0,
              0,
              canvas.width,
              tempCanvas.height
            );

            // Converter para imagem e adicionar ao PDF
            const imgData = tempCanvas.toDataURL("image/jpeg", 1.0);
            const chunkHeight =
              (tempCanvas.height * contentWidth) / canvas.width;

            // Se não for a primeira parte, adicionar nova página
            if (currentPosition > 0) {
              pdf.addPage();
              currentPage++;
            }

            pdf.addImage(
              imgData,
              "JPEG",
              margin,
              margin,
              imgWidth,
              chunkHeight,
              undefined,
              "FAST"
            );

            // Atualizar posição e altura restante
            currentPosition += tempCanvas.height;
            remainingHeight -= tempCanvas.height;

            // Se ainda houver conteúdo para processar, adicionar nova página
            if (remainingHeight > 0) {
              pdf.addPage();
              currentPage++;
            }
          }
        }
      } catch (sectionError) {
        console.error(`Erro ao processar seção ${i}:`, sectionError);
      }
    }

    // Adicionar assinatura se necessário
    const signatureElement =
      document.querySelector(".signature-line")?.parentElement;
    if (signatureElement) {
      try {
        // Verificar se já estamos na última página
        if (currentPage < mainSections.length - 1) {
          pdf.addPage();
        }

        const canvas = await html2canvas(signatureElement as HTMLElement, {
          scale: scale,
          backgroundColor: "#FFFFFF",
        });

        const imgWidth = contentWidth / 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(
          canvas.toDataURL("image/jpeg", 1.0),
          "JPEG",
          margin + contentWidth / 4, // Centralizar
          margin + contentHeight / 2, // Posicionar na metade inferior
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
      } catch (signatureError) {
        console.error("Erro ao processar assinatura:", signatureError);
      }
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
