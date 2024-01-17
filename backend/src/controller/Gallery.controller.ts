import { Request, Response } from "express";
import { GalleryModel } from "../model/Gallery";
import { HttpStatus } from "../util/HttpStatus";

export const getGalleries = async (request: Request, response: Response): Promise<void> => {
  try {
    console.log("Get all galleries");
    const galleries = await GalleryModel.find();
    response.json(galleries);
  } catch (error) {
    console.log(error);
  }
};

export const getGalleryById = async (request: Request, response: Response): Promise<void> => {
  try {
    console.log("Get gallery with id:", request.params.id);
    const gallery = await GalleryModel.findById(request.params.id);
    if (!gallery) {
      response.sendStatus(404);
      return;
    }

    response.json(gallery);
  } catch (error) {
    console.log(error);
  }
};

export const createGallery = async (request: Request, response: Response): Promise<void> => {
  try {
    console.log("Create gallery with body:", request.body);
    await GalleryModel.create({
      name: request.body.name,
    });
    response.sendStatus(HttpStatus.CREATED);
  } catch (error) {
    console.log(error);
  }
};

export const deleteGallery = async (request: Request, response: Response): Promise<void> => {
  try {
    console.log("Delete gallery with id:", request.params.id);
    await GalleryModel.findByIdAndDelete(request.params.id);
    response.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    console.log(error);
  }
};
