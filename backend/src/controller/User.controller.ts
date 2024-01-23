import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../util/HttpStatus";
import Logger from "../util/Logger";
import { TypedRequest } from "../types/TypedRequest";
import { User } from "../model/User";
import UserService from "../service/User.service";

export const getUsers = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    Logger.info({ message: "Get all users" });
    const users = await UserService.getUsers();
    response.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    Logger.info({ message: "Get user with id", id: request.params.id });
    const user = await UserService.getUserById(request.params.id);
    if (!user) {
      response.sendStatus(404);
      return;
    }

    response.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  request: TypedRequest<User>,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    Logger.info({ message: "Create user with body", body: request.body });
    const id = await UserService.createUser(request.body);
    response.status(HttpStatus.CREATED).json({ id });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    Logger.info({ message: "Delete user with id", id: request.params.id });
    await UserService.deleteUser(request.params.id);
    response.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};
