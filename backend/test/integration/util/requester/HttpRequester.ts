import { AxiosResponse } from "axios";
import { RequestConfig } from "./RequestConfig.js";

export type Response<T = unknown> = AxiosResponse<T>;

export interface HttpRequester {
  sendRequest<T>(config: RequestConfig): Promise<Response<T>>;
}
