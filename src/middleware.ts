import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Rotas protegidas
  const protectedRoutes = ["/dashboard", "/imprimir"];
  const path = request.nextUrl.pathname;

  // Verificar autenticação para rotas protegidas
  if (protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`))) {
    const authCookie = request.cookies.get("auth-state");
    
    // Se não estiver autenticado, redirecionar para login
    if (!authCookie || authCookie.value !== "true") {
      console.log(`Rota protegida ${path} - redirecionando para login`);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Se já estiver autenticado e tentar acessar login
  if (path === "/login") {
    const authCookie = request.cookies.get("auth-state");
    
    if (authCookie && authCookie.value === "true") {
      console.log("Já autenticado - redirecionando para dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/imprimir", "/imprimir/:path*", "/login"],
};