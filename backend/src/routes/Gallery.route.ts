import { Router } from "express";
import * as GalleryController from "../controller/Gallery.controller";
import validate from "../middleware/validate";
import { createGalleryBodySchema, galleryIdParameterSchema } from "../validation/Gallery.validation";

const galleryRouter = Router();

galleryRouter.get("/:userId/gallery", GalleryController.getGalleries);
galleryRouter.get("/:userId/gallery/:galleryId", validate(galleryIdParameterSchema), GalleryController.getGalleryById);
galleryRouter.post("/:userId/gallery", validate(createGalleryBodySchema), GalleryController.createGallery);
galleryRouter.delete(
  "/:userId/gallery/:galleryId",
  validate(galleryIdParameterSchema),
  GalleryController.deleteGallery,
);

export default galleryRouter;
