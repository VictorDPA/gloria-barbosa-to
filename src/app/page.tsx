import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Sistema de Anamnese
        </h1>
        <p className="text-lg text-slate-700 mb-8">
          Plataforma para criação e gerenciamento de anamneses para
          profissionais de saúde.
        </p>
        <Link href="/login">
          <Button size="lg">Fazer Login</Button>
        </Link>
      </div>
    </main>
  );
}
