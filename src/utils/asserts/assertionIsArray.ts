import { assertion } from "@/utils/asserts/index";

export function assertionIsArray<T>(value: T) {
  return assertion(Array.isArray(value), "Erro no retorno da API");
}
