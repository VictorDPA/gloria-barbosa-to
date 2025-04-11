"use client";

import React, { useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Função para limpar todos os cookies
  const clearAllCookies = () => {
    const cookies = document.cookie.split(";");
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
    
    console.log("Todos os cookies foram removidos");
  };

  useEffect(() => {
    // Limpar localStorage e cookies ao entrar na página de login
    localStorage.removeItem("auth-state");
    localStorage.removeItem("anamnese-storage");
    clearAllCookies();
    
    console.log("Login page: localStorage e cookies limpos");
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <LoginForm router={router} />
    </main>
  );
}