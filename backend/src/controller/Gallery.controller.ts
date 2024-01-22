import { NextFunction, Request, Response } from "express";
import { Gallery } from "../model/Gallery";
import { HttpStatus } from "../util/HttpStatus";
import GalleryService from "../service/Gallery.service";
import Logger from "../util/Logger";
import { TypedRequest } from "../types/TypedRequest";

export const getGalleries = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    Logger.info({ message: "Get all galleries" });
    const galleries = await GalleryService.getGalleries();
    response.json(galleries);
  } catch (error) {
    next(error);
  }
};

export const getGalleryById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    Logger.info({ message: "Get gallery with id", id: request.params.id });
    const gallery = await GalleryService.getGalleryById(request.params.id);
    if (!gallery) {
      response.sendStatus(404);
      return;
    }

    response.json(gallery);
  } catch (error) {
    next(error);
  }
};

export const createGallery = async (
  request: TypedRequest<Gallery>,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    Logger.info({ message: "Create gallery with body", body: request.body });
    const id = await GalleryService.createGallery(request.body);
    response.status(HttpStatus.CREATED).json({ id });
  } catch (error) {
    next(error);
  }
};

export const deleteGallery = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    Logger.info({ message: "Delete gallery with id", id: request.params.id });
    await GalleryService.deleteGallery(request.params.id);
    response.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};
