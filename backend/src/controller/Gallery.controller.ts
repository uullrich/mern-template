import { NextFunction, Request, Response } from "express";
import { Gallery } from "../model/Gallery";
import { HttpStatus } from "../util/HttpStatus";
import GalleryService from "../service/Gallery.service";
import Logger from "../util/Logger";
import { TypedRequest } from "../types/TypedRequest";

export const getGalleries = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    Logger.info({ message: "Get all galleries for user" });
    const { userId } = request.params;
    const galleries = await GalleryService.getGalleries(userId);
    response.json(galleries);
  } catch (error) {
    next(error);
  }
};

export const getGalleryById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, galleryId } = request.params;
    Logger.info({ message: "Get gallery for user", userId, galleryId });

    const gallery = await GalleryService.getGalleryById(userId, galleryId);
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
    const { userId } = request.params as { userId: string };
    Logger.info({ message: "Create gallery for user with body", userId, body: request.body });

    const id = await GalleryService.createGallery(userId, request.body);
    response.status(HttpStatus.CREATED).json({ id });
  } catch (error) {
    next(error);
  }
};

export const deleteGallery = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, galleryId } = request.params;
    Logger.info({ message: "Delete gallery for user", userId, galleryId });

    await GalleryService.deleteGallery(userId, galleryId);
    response.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};
