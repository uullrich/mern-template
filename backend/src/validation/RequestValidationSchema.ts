import { type ObjectSchema } from "joi";

//see https://learn.microsoft.com/en-us/javascript/api/@azure/keyvault-certificates/requireatleastone?view=azure-node-latest
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type RequestValidationSchema = RequireAtLeastOne<Record<"body" | "query" | "params", ObjectSchema>>;
