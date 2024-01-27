import { AxiosResponse } from "axios";
import { RequestConfig } from "./RequestConfig";

export type Response<T> = AxiosResponse<T>;

export interface HttpRequester {
  sendRequest<T>(config: RequestConfig): Promise<Response<T>>;
}
