import { AxiosRequestConfig, Method } from "axios";
import { v4 as uuid } from "uuid";

export class RequestConfigBuilder {
  private requestConfig: AxiosRequestConfig;

  constructor() {
    this.requestConfig = {};
  }

  public withMethod(method: Method): RequestConfigBuilder {
    this.requestConfig.method = method;
    return this;
  }

  public withRequestBody<T>(data: T): RequestConfigBuilder {
    this.requestConfig.data = data;
    return this;
  }

  public withParams(parameters: Record<string, string>): RequestConfigBuilder {
    this.requestConfig.params = parameters;
    return this;
  }

  public withUrl(url: string): RequestConfigBuilder {
    this.requestConfig.url = url;
    return this;
  }

  public withRequestId(id: string): RequestConfigBuilder {
    if (!this.requestConfig.headers) {
      this.requestConfig.headers = {};
    }
    this.requestConfig.headers["x-request-id"] = id;

    return this;
  }

  public build(): AxiosRequestConfig {
    if (!this.requestConfig?.headers?.["x-request-id"]) {
      if (!this.requestConfig.headers) {
        this.requestConfig.headers = {};
      }
      this.requestConfig.headers["x-request-id"] = uuid();
    }

    if (!this.requestConfig.method) {
      throw new Error("Missing HTTP method");
    }

    if (!this.requestConfig.url) {
      throw new Error("Missing url");
    }

    return this.requestConfig;
  }
}
