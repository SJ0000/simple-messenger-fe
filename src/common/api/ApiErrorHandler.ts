import axios, {AxiosResponse} from "axios";

export function handleApiError(error: unknown, handler: (response: AxiosResponse) => void) {
  if (!axios.isAxiosError(error) || !error.response)
    throw Error(`${error} is not api error`)
  handler(error.response)
}

