"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAnamneseStore } from "@/lib/store";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const setAuthenticated = useAnamneseStore((state) => state.setAuthenticated);

  // Não renderizar o header em rotas específicas
  if (pathname === "/login" || pathname === "/") {
    return null;
  }

  const handleLogout = () => {
    // Limpar autenticação
    setAuthenticated(false);
    localStorage.removeItem("auth-state");
    
    // Redirecionar para a página inicial
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="font-bold text-xl text-slate-900">
              Sistema de Anamnese
            </Link>
          </div>

          <nav className="flex space-x-3">
            {pathname !== "/dashboard" && (
              <Link href="/dashboard">
                <Button variant="secondary">Dashboard</Button>
              </Link>
            )}

            {pathname === "/dashboard" && (
              <Link href="/imprimir">
                <Button variant="secondary">Visualizar Impressão</Button>
              </Link>
            )}

            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};