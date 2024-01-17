import Joi from "joi";
import { Gallery } from "../model/Gallery";

export const createGalleryBodySchema = {
  body: Joi.object<Gallery>().keys({
    name: Joi.string().required(),
  }),
};

export const galleryIdParameterSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
