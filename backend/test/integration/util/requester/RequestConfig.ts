export type Method = "GET" | "POST" | "DELETE" | "PUT";

export type RequestConfig = {
  method: Method;
  url: string;
  data?: unknown;
  params?: Record<string, string>;
  headers?: Record<string, string>;
};
