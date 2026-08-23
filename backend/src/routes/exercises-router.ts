import { Router } from "express";
import { ExercisesController } from "../controllers/Exercises-controller.js";

const exercisesRouter = Router();
const exercisesController = new ExercisesController();

exercisesRouter.get("/:trainingId", exercisesController.index);

export { exercisesRouter };
