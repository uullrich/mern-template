import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpRequester {
  constructor(private axios: AxiosInstance) {}

  public sendRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.request<T>(config);
  }
}

const axiosInstance = axios.create({
  baseURL: `http://localhost:${process.env.PORT}`,
});
export default new HttpRequester(axiosInstance);
