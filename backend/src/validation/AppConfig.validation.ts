import Joi from "joi";
import { AppConfig } from "../model/AppConfig";

export const appConfigSchema = Joi.object<AppConfig>().keys({
  env: Joi.string().valid("production", "development").required(),
  port: Joi.number().integer().min(0).max(65_535),
  mongoDbConnection: Joi.string().required(),
});