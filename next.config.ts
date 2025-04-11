/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Desabilitar strict mode em desenvolvimento para evitar chamadas duplas
  ...(process.env.NODE_ENV === "development" ? { reactStrictMode: false } : {}),
  env: {
    // Configuração para permitir usar a senha da Vercel
    NEXT_PUBLIC_AUTH_PASSWORD: process.env.NEXT_PUBLIC_AUTH_PASSWORD || "admin", // Senha padrão apenas para desenvolvimento
  },
  // Configuração para permitir importações absoluta a partir do diretório src
  webpack(config: unknown) {
    return config;
  },
};

module.exports = nextConfig;
