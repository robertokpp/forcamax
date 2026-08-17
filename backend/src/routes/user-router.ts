import { Router } from "express";
import { UserController } from "../controllers/User-controller.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.create);

export { userRouter };
