import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export type Response<T> = AxiosResponse<T>;

export class HttpRequester {
  constructor(private axios: AxiosInstance) {}

  public sendRequest<T>(config: AxiosRequestConfig): Promise<Response<T>> {
    return this.axios.request<T>(config) as Promise<Response<T>>;
  }
}

const axiosInstance = axios.create({
  baseURL: `http://localhost:${process.env.PORT}`,
});
export default new HttpRequester(axiosInstance);
