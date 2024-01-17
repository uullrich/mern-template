import { Router } from "express";
import * as GalleryController from "../controller/Gallery.controller";

const galleryRouter = Router();

galleryRouter.get("/", GalleryController.getGalleries);
galleryRouter.get("/:id", GalleryController.getGalleryById);
galleryRouter.post("/", GalleryController.createGallery);
galleryRouter.delete("/:id", GalleryController.deleteGallery);

export default galleryRouter;
