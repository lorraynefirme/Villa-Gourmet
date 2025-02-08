import { assertion } from "@/utils/asserts/index";

export function assertionIsNotNulish<T>(value: T) {
  return assertion(
    value !== null && value !== undefined,
    "Erro no retorno da API"
  );
}
