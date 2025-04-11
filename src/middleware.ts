import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Rotas protegidas
  const protectedRoutes = ["/dashboard", "/imprimir"];
  const path = request.nextUrl.pathname;

  // Para demonstração, vamos simplificar e verificar apenas o cookie auth-state
  if (protectedRoutes.some((route) => path.startsWith(route))) {
    const directAuth = request.cookies.get("auth-state");
    
    // Se não estiver autenticado, redireciona para login
    if (!directAuth || directAuth.value !== "true") {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Se já estiver autenticado e tentar acessar login, redireciona para dashboard
  if (path === "/login") {
    const directAuth = request.cookies.get("auth-state");
    
    if (directAuth && directAuth.value === "true") {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/imprimir/:path*", "/login"],
};