import { Router } from "express";
import { TrainingController } from "../controllers/Training-controller.js";

const trainingRouter = Router();
const trainingController = new TrainingController();

trainingRouter.get("/", trainingController.index);
trainingRouter.post("/", trainingController.create);

export { trainingRouter };
