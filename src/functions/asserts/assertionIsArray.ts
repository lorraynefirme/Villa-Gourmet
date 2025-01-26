import { assertion } from "@/functions/asserts/index";

export function assertionIsArray<T>(value: T) {
  return assertion(Array.isArray(value), "Erro no retorno da API");
}
