import { AxiosHttpClientAdapter, FetchHttpClientAdapter } from "../adapters";

type HttpClientFactoryType = "axios" | "fetch";

export const HttpClientFactory = (type: HttpClientFactoryType) => {
  switch (type) {
    case "axios":
      return new AxiosHttpClientAdapter();
    case "fetch":
      return new FetchHttpClientAdapter();
    default:
      throw new Error("Invalid http client type");
  }
};
