export function createErrorMessage(code: number, message: string) {
  const errorMessage = message
    ? message
    : "Serviço indisponivel, tente novamente mais tarde!";

  return { error: code, errorMessage: errorMessage };
}
