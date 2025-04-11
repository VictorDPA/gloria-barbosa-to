// src/components/auth/LoginForm.tsx
"use client";

import React, { useState, useEffect } from "react";
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
  const isAuthenticated = useAnamneseStore((state) => state.isAuthenticated);

  // Efeito para redirecionar se já estiver autenticado
  useEffect(() => {
    // Verifica se já está autenticado pelo Zustand ou localStorage
    const isAuthFromStorage = localStorage.getItem("auth-state") === "true";

    if (isAuthenticated || isAuthFromStorage) {
      console.log("Usuário já autenticado, redirecionando...");
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Tentamos primeiro a variável de ambiente, depois o fallback
      const correctPassword = process.env.NEXT_PUBLIC_AUTH_PASSWORD || "admin";

      if (password === correctPassword) {
        console.log("Senha correta, autenticando...");

        // Define o estado de autenticação
        setAuthenticated(true);

        // Armazena diretamente no localStorage para garantir
        localStorage.setItem("auth-state", "true");

        // Pequena pausa para garantir que o estado foi atualizado
        setTimeout(() => {
          console.log("Redirecionando para o dashboard...");
          // Força a navegação usando window.location em vez do router
          window.location.href = "/dashboard";
        }, 500);
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

// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/Input";
// import { Button } from "@/components/ui/Button";
// import { useAnamneseStore } from "@/lib/store";

// export const LoginForm: React.FC = () => {
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const setAuthenticated = useAnamneseStore((state) => state.setAuthenticated);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // Usar a variável de ambiente em vez de valor hardcoded
//       const correctPassword = process.env.NEXT_PUBLIC_AUTH_PASSWORD;

//       if (password === correctPassword) {
//         // Define o estado de autenticação
//         setAuthenticated(true);

//         // Armazena diretamente no localStorage para garantir
//         localStorage.setItem("auth-state", "true");

//         // Navega para o dashboard
//         router.push("/dashboard");
//       } else {
//         setError("Senha incorreta");
//       }
//     } catch (err) {
//       setError("Erro ao fazer login. Tente novamente.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
//       <h1 className="text-2xl font-bold text-slate-900 text-center mb-6">
//         Login
//       </h1>

//       <form onSubmit={handleSubmit}>
//         <Input
//           id="password"
//           type="password"
//           label="Senha"
//           placeholder="Digite a senha"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           fullWidth
//           error={error}
//           className="mb-6"
//         />

//         <Button
//           type="submit"
//           variant="primary"
//           className="w-full"
//           disabled={loading}
//         >
//           {loading ? "Carregando..." : "Entrar"}
//         </Button>
//       </form>

//       {process.env.NODE_ENV === "development" && (
//         <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
//           <p className="text-gray-700">Ambiente de desenvolvimento</p>
//           <p className="text-gray-700">
//             Senha:{" "}
//             <code>{process.env.NEXT_PUBLIC_AUTH_PASSWORD || "admin"}</code>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };
