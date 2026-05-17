import axios from 'axios';

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as
      | {
          message?: string;
        }
      | undefined;

    if (responseData?.message) {
      return responseData.message;
    }
  }

  return 'Não foi possível concluir a operação. Tente novamente.';
}