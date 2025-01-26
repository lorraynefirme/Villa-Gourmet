import { assertion } from "@/functions/asserts/index";

export function assertionIsNumber<T>(value: T) {
  return assertion(typeof value === "number", "Erro no retorno da API");
}
