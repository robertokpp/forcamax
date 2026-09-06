import { TargetMusclesController } from "../controllers/TargetMuscles-controller.js";
import { Router } from "express";

const targetMusclesRouter = Router();
const targetMusclesController = new TargetMusclesController();

targetMusclesRouter.get("/", targetMusclesController.index);
targetMusclesRouter.post("/", targetMusclesController.create);

export { targetMusclesRouter };
