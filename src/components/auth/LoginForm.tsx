// src/components/auth/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAnamneseStore } from "@/lib/store";

export const LoginForm: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuthenticated = useAnamneseStore((state) => state.setAuthenticated);

  // Define a senha diretamente no código para garantir funcionamento
  // EM PRODUÇÃO: substitua por uma variável de ambiente ou um sistema de autenticação seguro
  const SENHA_CORRETA = "admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (password === SENHA_CORRETA) {
        // Define o estado de autenticação
        setAuthenticated(true);

        // Armazena diretamente no localStorage para garantir
        localStorage.setItem("auth-state", "true");

        // Navega para o dashboard
        router.push("/dashboard");
      } else {
        setError("Senha incorreta");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
      console.error(err);
    } finally {
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
      </form>

      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <p className="text-gray-700">Ambiente de desenvolvimento</p>
          <p className="text-gray-700">
            Senha: <code>admin</code>
          </p>
        </div>
      )}
    </div>
  );
};
