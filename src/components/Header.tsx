"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAnamneseStore } from "@/lib/store";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Use o hook do Zustand com uma função seletora que tem uma referência estável
  const setAuthenticated = useAnamneseStore((state) => state.setAuthenticated);
  const isAuthenticated = useAnamneseStore((state) => state.isAuthenticated);

  // Estado local para autenticação
  const [isAuth, setIsAuth] = useState(false);

  // Verificar autenticação ao montar o componente
  useEffect(() => {
    // Verificar tanto o state do Zustand quanto o localStorage
    const authFromLocalStorage = localStorage.getItem("auth-state") === "true";
    setIsAuth(isAuthenticated || authFromLocalStorage);
  }, [isAuthenticated]);

  const handleLogout = () => {
    // Limpar ambos os métodos de autenticação
    setAuthenticated(false);
    localStorage.removeItem("auth-state");
    router.push("/");
  };

  if (pathname === "/login" || pathname === "/") {
    return null;
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-slate-900">
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

            {isAuth && (
              <Button variant="outline" onClick={handleLogout}>
                Sair
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
