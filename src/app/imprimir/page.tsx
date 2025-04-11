// src/app/imprimir/page.tsx
"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PrintView } from "@/components/print/PrintView";
import { useAnamneseStore } from "@/lib/store";
import { exportToPdf, generatePdfFilename } from "@/lib/pdfExporter";

export default function PrintPage() {
  const router = useRouter();
  const currentAnamnese = useAnamneseStore((state) => state.currentAnamnese);
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [customFilename, setCustomFilename] = useState("");
  const [showFilenameInput, setShowFilenameInput] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // Gerar o nome padrão sugerido do arquivo
  const defaultFilename = generatePdfFilename(currentAnamnese);

  const handlePrint = () => {
    // Indicar que está preparando para impressão
    setIsPrinting(true);

    // Adicionar classe para melhorar qualidade de impressão
    document.body.classList.add("print-optimized");

    // Pequeno atraso para permitir que os estilos sejam aplicados corretamente
    setTimeout(() => {
      window.print();

      // Após o diálogo de impressão fechar, remover as classes
      setTimeout(() => {
        document.body.classList.remove("print-optimized");
        setIsPrinting(false);
      }, 1000);
    }, 300);
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    setExportError(null);

    try {
      // Preparar a página para exportação
      document.body.classList.add("prepare-export");

      // Usar o nome personalizado se fornecido e válido
      const filename = customFilename.trim()
        ? customFilename.trim()
        : undefined;

      // Pequeno atraso para permitir que os estilos sejam aplicados
      setTimeout(async () => {
        try {
          // Exportar usando a função otimizada
          await exportToPdf("print-content", currentAnamnese, filename);

          // Esconder o input de nome após exportação bem-sucedida
          if (showFilenameInput) {
            setShowFilenameInput(false);
          }
        } catch (error) {
          console.error("Erro ao exportar para PDF:", error);
          setExportError(
            "Ocorreu um erro ao exportar para PDF. Por favor, tente novamente."
          );
        } finally {
          // Remover classe de preparação
          document.body.classList.remove("prepare-export");
          setIsExporting(false);
        }
      }, 300);
    } catch (error) {
      console.error("Erro ao preparar exportação para PDF:", error);
      document.body.classList.remove("prepare-export");
      setExportError(
        "Ocorreu um erro ao preparar a exportação. Por favor, tente novamente."
      );
      setIsExporting(false);
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const toggleFilenameInput = () => {
    setShowFilenameInput(!showFilenameInput);
    if (!showFilenameInput) {
      // Inicializar com o nome sugerido quando mostrar o input
      setCustomFilename(defaultFilename);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 print:bg-white">
      <div className="print:hidden">
        <Header />
      </div>

      <main className="flex-1 container mx-auto px-4 py-6 print:p-0">
        <div className="print:hidden flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Visualizar Impressão
          </h1>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleBackToDashboard}>
              Voltar
            </Button>
            <Button
              variant="secondary"
              onClick={handlePrint}
              disabled={isPrinting}
            >
              {isPrinting ? "Preparando..." : "Imprimir"}
            </Button>
            <Button
              variant="primary"
              onClick={
                showFilenameInput ? handleExportPdf : toggleFilenameInput
              }
              disabled={isExporting}
            >
              {isExporting
                ? "Exportando..."
                : showFilenameInput
                ? "Confirmar Exportação"
                : "Exportar PDF"}
            </Button>
          </div>
        </div>

        {/* Opção de nome personalizado para o arquivo */}
        {showFilenameInput && (
          <div className="print:hidden mb-6 p-4 bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-grow">
                <Input
                  id="filename-input"
                  label="Nome do arquivo"
                  value={customFilename}
                  onChange={(e) => setCustomFilename(e.target.value)}
                  placeholder="Digite o nome do arquivo (sem extensão)"
                  helperText="O arquivo será salvo com extensão .pdf automaticamente"
                  fullWidth
                />
              </div>
              <div className="flex space-x-2 self-end">
                <Button
                  variant="outline"
                  onClick={toggleFilenameInput}
                  size="sm"
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleExportPdf}
                  size="sm"
                  disabled={isExporting}
                >
                  {isExporting ? "Exportando..." : "Exportar"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem de erro */}
        {exportError && (
          <div className="print:hidden mb-6 p-4 bg-red-50 text-red-800 rounded-md">
            {exportError}
          </div>
        )}

        {/* Conteúdo para impressão/exportação */}
        <div
          id="print-content"
          ref={printRef}
          className="print-container bg-white rounded-lg shadow-sm p-6 print:p-0 print:shadow-none"
        >
          <PrintView data={currentAnamnese} />
        </div>

        <div className="print:hidden mt-8 flex justify-end space-x-2">
          <Button variant="outline" onClick={handleBackToDashboard}>
            Voltar
          </Button>
          <Button
            variant="secondary"
            onClick={handlePrint}
            disabled={isPrinting}
          >
            {isPrinting ? "Preparando..." : "Imprimir"}
          </Button>
          <Button
            variant="primary"
            onClick={showFilenameInput ? handleExportPdf : toggleFilenameInput}
            disabled={isExporting}
          >
            {isExporting
              ? "Exportando..."
              : showFilenameInput
              ? "Confirmar Exportação"
              : "Exportar PDF"}
          </Button>
        </div>
      </main>
    </div>
  );
}
