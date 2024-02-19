import { Router } from "express";
import * as UserController from "../controller/User.controller.js";
import validate from "../middleware/validate.js";
import { createUserBodySchema, userIdParameterSchema } from "../validation/User.validation.js";

const userRouter = Router();

userRouter.get("/", UserController.getUsers);
userRouter.get("/:id", validate(userIdParameterSchema), UserController.getUserById);
userRouter.post("/", validate(createUserBodySchema), UserController.createUser);
userRouter.delete("/:id", validate(userIdParameterSchema), UserController.deleteUser);

export default userRouter;
