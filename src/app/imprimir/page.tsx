"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { PrintView } from "@/components/print/PrintView";
import { useAnamneseStore } from "@/lib/store";
import { exportToPdf, generatePdfFilename } from "@/lib/utils";

export default function PrintPage() {
  const router = useRouter();
  // Uso de seletor individual
  const currentAnamnese = useAnamneseStore((state) => state.currentAnamnese);
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = async () => {
    setIsExporting(true);

    try {
      if (printRef.current) {
        await exportToPdf("print-content", currentAnamnese);
      }
    } catch (error) {
      console.error("Erro ao exportar para PDF:", error);
      alert(
        "Ocorreu um erro ao exportar para PDF. Por favor, tente novamente."
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
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
            <Button variant="secondary" onClick={handlePrint}>
              Imprimir
            </Button>
            <Button
              variant="primary"
              onClick={handleExportPdf}
              disabled={isExporting}
            >
              {isExporting ? "Exportando..." : "Exportar PDF"}
            </Button>
          </div>
        </div>

        <div id="print-content" ref={printRef}>
          <PrintView data={currentAnamnese} />
        </div>

        <div className="print:hidden mt-8 flex justify-end space-x-2">
          <Button variant="outline" onClick={handleBackToDashboard}>
            Voltar
          </Button>
          <Button variant="secondary" onClick={handlePrint}>
            Imprimir
          </Button>
          <Button
            variant="primary"
            onClick={handleExportPdf}
            disabled={isExporting}
          >
            {isExporting ? "Exportando..." : "Exportar PDF"}
          </Button>
        </div>
      </main>
    </div>
  );
}
