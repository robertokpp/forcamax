import { Router } from "express";
import { TrainingSessionController } from "../controllers/TrainingSession-controller.js";

const trainingSessionRouter = Router();
const trainingSessionController = new TrainingSessionController();

trainingSessionRouter.post("/", trainingSessionController.create);
trainingSessionRouter.get("/", trainingSessionController.index);

export { trainingSessionRouter };
