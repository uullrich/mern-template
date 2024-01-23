import Joi from "joi";
import { User } from "../model/User";

export const createUserBodySchema = {
  body: Joi.object<User>().keys({
    email: Joi.string().email().required(),
    profile: Joi.object<User["profile"]>()
      .keys({
        lastName: Joi.string().max(50).optional(),
        firstName: Joi.string().max(50).optional(),
      })
      .optional(),
  }),
};

export const userIdParameterSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
