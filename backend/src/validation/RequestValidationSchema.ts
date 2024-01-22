import { type ObjectSchema } from "joi";
import { RequireAtLeastOne } from "../types/RequireAtLeastOne";

export type RequestValidationSchema = RequireAtLeastOne<Record<"body" | "query" | "params", ObjectSchema>>;
