/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Desabilitar strict mode em desenvolvimento para evitar chamadas duplas
  ...(process.env.NODE_ENV === "development" ? { reactStrictMode: false } : {}),
  // Configuração para permitir usar a variável de ambiente
  env: {
    // A senha será obtida das variáveis de ambiente da Vercel
    NEXT_PUBLIC_AUTH_PASSWORD: process.env.NEXT_PUBLIC_AUTH_PASSWORD,
  },
  // Configuração para permitir importações absolutas a partir do diretório src
  webpack(config: unknown) {
    return config;
  },
};

module.exports = nextConfig;
