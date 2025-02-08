import { assertion } from "@/utils/asserts/index";

export function assertionIsString<T>(value: T) {
  return assertion(typeof value === "string", "Erro no retorno da API");
}
