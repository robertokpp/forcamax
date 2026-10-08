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

    const checkTrainingId = await prisma.training.findUnique({
      where: { id: trainingId },
    });

    if (!checkTrainingId) {
      throw new AppError("Treino nao existe");
    }

    const activeSession = await prisma.trainingSession.findFirst({
      where: {
        userId,
        status: "in_progress",
      },
    });

    if (activeSession) {
      throw new AppError("Ja existe um treino em andamento", 409);
    }

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

    const sessionExercises = await prisma.sessionExercise.findMany({
      where: { sessionId: trainingSession.id },
      orderBy: { position: "asc" },
    });

    const sessionSet = await prisma.sessionSet.createMany({
      data: sessionExercises.map((sessionExercise, index) => ({
        sessionExerciseId: sessionExercise.id,
        number: index + 1,
      })),
    });

    return response.status(201).json(trainingSession);
  }

  async index(request: Request, response: Response) {
    const userId = request.user?.id;

    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const trainingSession = await prisma.trainingSession.findFirst({
      where: { userId, status: "in_progress" },
    });

    return response.json(trainingSession);
  }
}

export { TrainingSessionController };
