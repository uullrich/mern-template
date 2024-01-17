import Joi from "joi";
import type { GalleryCreateRequest } from "../model/Gallery";

export const createGalleryBodySchema = {
  body: Joi.object<GalleryCreateRequest>().keys({
    name: Joi.string().required(),
  }),
};

export const galleryIdParameterSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
