import { format } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Função para combinar classes com Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Função para formatar a data
export function formatDate(date: string | Date): string {
  if (!date) return "";
  try {
    return format(new Date(date), "dd/MM/yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

// Verificar autenticação
export function verifyPassword(
  inputPassword: string,
  vercelPassword: string
): boolean {
  return inputPassword === vercelPassword;
}

// Tradução de campos específicos para exibição
export const fieldTranslations: Record<string, string> = {
  // Identificação do paciente
  name: "Nome",
  dateOfBirth: "Data de Nascimento",
  age: "Idade",
  placeOfBirth: "Local de Nascimento",
  address: "Endereço",
  phone: "Telefone",
  cityDistrict: "Cidade/Bairro",

  // Encaminhamento
  diagnosis: "Diagnóstico",
  responsibleDoctor: "Médico Responsável",
  currentMedication: "Medicação Atual",
  mainComplaint: "Queixa Principal",

  // E outros campos conforme necessário...
};
