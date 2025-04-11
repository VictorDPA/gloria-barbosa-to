// src/components/auth/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Props para receber o router do componente pai
interface LoginFormProps {
  router: AppRouterInstance;
}

export const LoginForm: React.FC<LoginFormProps> = ({ router }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // SENHA FIXA PARA DEMONSTRAÇÃO
  const DEMO_PASSWORD = "admin";

  // Função para definir um cookie
  const setCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    console.log(`Cookie ${name} definido`);
  };

  // Várias abordagens de redirecionamento para garantir que uma delas funcione
  const navigateToDashboard = () => {
    try {
      console.log("Tentando redirecionamento usando Next.js router");
      router.push("/dashboard");
      
      // Como backup, também tenta o redirecionamento direto após um pequeno atraso
      setTimeout(() => {
        console.log("Tentando redirecionamento direto via window.location.href");
        window.location.href = "/dashboard";
      }, 100);
    } catch (err) {
      console.error("Erro durante redirecionamento com router:", err);
      // Se o router falhar, usa redirecionamento direto
      window.location.href = "/dashboard";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Tentando login com senha:", password);
      
      if (password === DEMO_PASSWORD) {
        console.log("Senha correta, autenticando...");
        
        // Armazenar em múltiplos lugares para garantir
        localStorage.setItem("auth-state", "true");
        sessionStorage.setItem("auth-state", "true");
        setCookie("auth-state", "true", 7);
        
        console.log("Estado de autenticação salvo, redirecionando...");
        
        // Aguardar um pouco para garantir que o estado foi salvo
        setTimeout(() => {
          navigateToDashboard();
        }, 200);
      } else {
        console.log("Senha incorreta");
        setError("Senha incorreta");
        setLoading(false);
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro ao fazer login. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
      <h1 className="text-2xl font-bold text-slate-900 text-center mb-6">
        Login
      </h1>

      <form onSubmit={handleSubmit}>
        <Input
          id="password"
          type="password"
          label="Senha"
          placeholder="Digite a senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          error={error}
          className="mb-6"
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Entrar"}
        </Button>
        
        <div className="mt-4">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => navigateToDashboard()}
          >
            Ir para Dashboard (alternativo)
          </Button>
        </div>
      </form>

      <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
        <p className="text-gray-700">
          Senha para demonstração: <code>admin</code>
        </p>
      </div>
    </div>
  );
};