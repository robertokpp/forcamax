import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";
import { z } from "zod";

class TrainingSessionController {
  async create(request: Request, response: Response) {
    const userId = request.user?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const bodySchema = z.object({
      trainingId: z.uuid(),
    });

    const { trainingId } = bodySchema.parse(request.body);

    const training = await prisma.training.findFirst({
      where: { id: trainingId },
      include: { exercises: true },
    });

    if (!training) {
      throw new AppError("Treino nao existe na base.", 401);
    }

    const trainingSession = await prisma.trainingSession.create({
      data: {
        userId,
        trainingId,
        status: "in_progress",
        startedAt: new Date(),
      },
    });

    await prisma.sessionExercise.createMany({
      data: training.exercises.map((exercise, index) => ({
        sessionId: trainingSession.id,
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        position: index + 1,
      })),
    });

    const sessionExercise = await prisma.sessionExercise.findMany({});

    const sessionSet = await prisma.sessionSet.createMany({
      data: sessionExercise.map((sessionExercise, index) => ({
        sessionExerciseId: sessionExercise.id,
        number: index + 1,
      })),
    });

    return response.json();
  }
}

export { TrainingSessionController };
