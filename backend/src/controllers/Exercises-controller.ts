import { Response, Request } from "express";
import { AppError } from "../utils/AppError.js";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

class ExercisesController {
  async index(request: Request, response: Response) {
    const paramsSchema = z.object({
      trainingId: z.uuid(),
    });

    const { trainingId } = paramsSchema.parse(request.params);

    const exercisesTraining = await prisma.trainingExercise.findMany({
      where: { trainingId },
      include: { exercise: true },
    });

    const exercises = exercisesTraining.map((exercise) => ({
      set: exercise.sets,
      repetitions: exercise.repetitions,
      weight: exercise.weight,
      interval: exercise.interval,
      name: exercise.exercise.name,
      muscleGroup: exercise.exercise.muscleGroup,
    }));

    return response.json(exercises);
  }
}

export { ExercisesController };
