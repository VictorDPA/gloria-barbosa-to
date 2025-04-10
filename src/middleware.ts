import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Rotas protegidas
  const protectedRoutes = ["/dashboard", "/imprimir"];
  const path = request.nextUrl.pathname;

  // Em ambiente de desenvolvimento, permitir acesso
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  // Se a rota for protegida, verificar autenticação
  if (protectedRoutes.some((route) => path.startsWith(route))) {
    // Verificar o cookie de autenticação do Zustand
    const zustandAuth = request.cookies.get("anamnese-storage");
    // Verificar o item de localStorage (via cookie)
    const directAuth = request.cookies.get("auth-state");

    // Se nenhum dos dois métodos de autenticação estiver presente
    if (!zustandAuth && !directAuth) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Se tiver o cookie do Zustand, verificar se está autenticado
    if (zustandAuth) {
      try {
        const storage = JSON.parse(decodeURIComponent(zustandAuth.value));
        if (!storage?.state?.isAuthenticated) {
          const loginUrl = new URL("/login", request.url);
          return NextResponse.redirect(loginUrl);
        }
      } catch (error) {
        // Se não conseguir interpretar o cookie do Zustand, verificar o método direto
        if (!directAuth || directAuth.value !== "true") {
          const loginUrl = new URL("/login", request.url);
          return NextResponse.redirect(loginUrl);
        }
      }
    }
  }

  // Se o usuário já estiver autenticado e tentar acessar a página de login
  if (path === "/login") {
    const zustandAuth = request.cookies.get("anamnese-storage");
    const directAuth = request.cookies.get("auth-state");

    // Verificar se está autenticado por qualquer um dos métodos
    let isAuthenticated = false;

    if (directAuth && directAuth.value === "true") {
      isAuthenticated = true;
    }

    if (zustandAuth) {
      try {
        const storage = JSON.parse(decodeURIComponent(zustandAuth.value));
        if (storage?.state?.isAuthenticated) {
          isAuthenticated = true;
        }
      } catch (error) {
        // Ignorar erro de parsing
      }
    }

    // Se estiver autenticado, redirecionar para o dashboard
    if (isAuthenticated) {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/imprimir/:path*", "/login"],
};
