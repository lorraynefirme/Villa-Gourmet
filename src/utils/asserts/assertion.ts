export function assertion(
  condition: boolean,
  message?: string
): asserts condition {
  if (!condition) {
    throw new Error(message ?? "Ocorreu algum erro");
  }
}
