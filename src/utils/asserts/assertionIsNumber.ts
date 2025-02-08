import { assertion } from "@/utils/asserts/index";

export function assertionIsNumber<T>(value: T) {
  return assertion(typeof value === "number", "Erro no retorno da API");
}
