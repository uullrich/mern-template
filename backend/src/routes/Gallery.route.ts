import { Router } from "express";
import * as GalleryController from "../controller/Gallery.controller";
import validate from "../middleware/validate";
import { createGalleryBodySchema, galleryIdParameterSchema } from "../validation/Gallery.validation";

const galleryRouter = Router();

galleryRouter.get("/", GalleryController.getGalleries);
galleryRouter.get("/:id", validate(galleryIdParameterSchema), GalleryController.getGalleryById);
galleryRouter.post("/", validate(createGalleryBodySchema), GalleryController.createGallery);
galleryRouter.delete("/:id", validate(galleryIdParameterSchema), GalleryController.deleteGallery);

export default galleryRouter;
