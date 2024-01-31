import { AxiosResponse } from "axios";
import { RequestConfig } from "./RequestConfig";

export type Response<T = unknown> = AxiosResponse<T>;

export interface HttpRequester {
  sendRequest<T>(config: RequestConfig): Promise<Response<T>>;
}
