import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware executando para: ", request.nextUrl.pathname);

  // Rotas protegidas
  const protectedRoutes = ["/dashboard", "/imprimir"];
  const path = request.nextUrl.pathname;

  // Se a rota for protegida, verificar autenticação
  if (protectedRoutes.some((route) => path.startsWith(route))) {
    console.log("Rota protegida detectada: ", path);

    // Verificar o cookie de autenticação do Zustand
    const zustandAuth = request.cookies.get("anamnese-storage");
    // Verificar o cookie de autenticação direta
    const directAuth = request.cookies.get("auth-state");

    let isAuthenticated = false;

    // Verificar autenticação direta
    if (directAuth && directAuth.value === "true") {
      console.log("Autenticado via auth-state cookie");
      isAuthenticated = true;
    }

    // Verificar autenticação via Zustand
    if (!isAuthenticated && zustandAuth) {
      try {
        const storage = JSON.parse(decodeURIComponent(zustandAuth.value));
        if (storage?.state?.isAuthenticated) {
          console.log("Autenticado via zustand storage");
          isAuthenticated = true;
        }
      } catch (error) {
        console.log("Erro ao processar zustand storage:", error);
      }
    }

    // Se não estiver autenticado, redirecionar para login
    if (!isAuthenticated) {
      console.log("Não autenticado, redirecionando para login");
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    console.log("Autenticado, permitindo acesso à rota protegida");
  }

  // Se o usuário já estiver autenticado e tentar acessar a página de login
  if (path === "/login") {
    console.log("Acessando página de login");

    const zustandAuth = request.cookies.get("anamnese-storage");
    const directAuth = request.cookies.get("auth-state");

    // Verificar se está autenticado por qualquer um dos métodos
    let isAuthenticated = false;

    if (directAuth && directAuth.value === "true") {
      isAuthenticated = true;
      console.log("Autenticado via auth-state cookie na página de login");
    }

    if (!isAuthenticated && zustandAuth) {
      try {
        const storage = JSON.parse(decodeURIComponent(zustandAuth.value));
        if (storage?.state?.isAuthenticated) {
          isAuthenticated = true;
          console.log("Autenticado via zustand storage na página de login");
        }
      } catch (error) {
        console.log("Erro ao processar zustand storage:", error);
      }
    }

    // Se estiver autenticado, redirecionar para o dashboard
    if (isAuthenticated) {
      console.log("Já autenticado, redirecionando para dashboard");
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/imprimir/:path*", "/login"],
};
