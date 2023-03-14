import { AxiosError } from "axios";

export function createErrorMessage(err: AxiosError) {
  let errorMessage = "Serviço indisponivel, tente novamente mais tarde!";
  if (err.response) {
    errorMessage = "Erro: ";
  }
  return errorMessage;
}
