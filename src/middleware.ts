// Este middleware está simplificado para funcionar com a autenticação básica
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Rotas protegidas
  const protectedRoutes = ["/dashboard", "/imprimir"];
  const path = request.nextUrl.pathname;

  // Verificar autenticação para rotas protegidas
  if (protectedRoutes.some((route) => path.startsWith(route))) {
    // Verificar o cookie de autenticação
    const authCookie = request.cookies.get("auth-state");
    const isAuthenticated = authCookie && authCookie.value === "true";
    
    // Debug
    console.log(`Middleware: Verificando rota ${path}, autenticado: ${isAuthenticated}`);
    
    // Se não estiver autenticado, redirecionar para login
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Permitir todas as outras requisições
  return NextResponse.next();
}

// Especifica apenas as rotas que necessitam de verificação
export const config = {
  matcher: ["/dashboard/:path*", "/imprimir/:path*"],
};