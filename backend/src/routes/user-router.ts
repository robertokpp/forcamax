import { Router } from "express";
import { UserController } from "../controllers/User-controller.js";
import { userCreationRateLimit } from "../middlewares/rate-limit.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userCreationRateLimit, userController.create);

export { userRouter };
