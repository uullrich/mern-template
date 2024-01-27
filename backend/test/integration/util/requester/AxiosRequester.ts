import axios, { AxiosInstance } from "axios";
import { HttpRequester, Response } from "./HttpRequester";
import { RequestConfig } from "./RequestConfig";

export class AxiosRequester implements HttpRequester {
  constructor(private axios: AxiosInstance) {}

  public sendRequest<T>(config: RequestConfig): Promise<Response<T>> {
    return this.axios.request<T>(config) as Promise<Response<T>>;
  }
}

const axiosInstance = axios.create({
  baseURL: `http://localhost:${process.env.PORT}`,
});
export default new AxiosRequester(axiosInstance);
