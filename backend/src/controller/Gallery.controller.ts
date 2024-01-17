import { Request, Response } from "express";

export const getGalleries = (request: Request, response: Response): void => {
  response.send("Hello World123!");
};

export const getGalleryById = (request: Request, response: Response): void => {
  response.send("Hello World: " + request.params.id);
};

export const createGallery = (request: Request, response: Response): void => {
  console.log("Create gallery with body:", request.body);
  response.sendStatus(201);
};

export const deleteGallery = (request: Request, response: Response): void => {
  console.log("Delete gallery with id:", request.params.id);
  response.sendStatus(204);
};
