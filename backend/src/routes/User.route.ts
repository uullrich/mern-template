import { Router } from "express";
import * as UserController from "../controller/User.controller";
import validate from "../middleware/validate";
import { createUserBodySchema, userIdParameterSchema } from "../validation/User.validation";

const userRouter = Router();

userRouter.get("/", UserController.getUsers);
userRouter.get("/:id", validate(userIdParameterSchema), UserController.getUserById);
userRouter.post("/", validate(createUserBodySchema), UserController.createUser);
userRouter.delete("/:id", validate(userIdParameterSchema), UserController.deleteUser);

export default userRouter;
