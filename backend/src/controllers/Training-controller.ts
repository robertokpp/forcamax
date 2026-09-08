import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";
import { z } from "zod";

class TrainingController {
  async index(request: Request, response: Response) {
    const id = request.user?.id;

    if (!id) {
      throw new AppError("Usuário não autenticado.");
    }

    const training = await prisma.training.findMany({
      where: { userId: id },
      include: {
        TargetMuscles: true,
        exercises: true,
        trainingExercises: true,
      },
    });

    return response.json(training);
  }

  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      description: z.string().trim().max(1000).optional(),
      tag: z.enum(["push", "pull", "legs", "full", "core", "hit"]),
      difficulty: z.enum(["beginner", "intermediary", "advanced"]),
      targetMuscleIds: z.array(z.uuid()).default([]),
      exercises: z
        .array(
          z.object({
            id: z.uuid(),
            sets: z.number().int().positive().optional(),
            repetitions: z.string().trim().max(50).optional(),
            weight: z.string().trim().max(50).optional(),
            interval: z.string().trim().max(50).optional(),
          }),
        )
        .min(1),
    });

    const userId = request.user?.id;

    if (!userId) {
      throw new AppError("Usuário não autenticado.", 401);
    }

    const { name, description, tag, difficulty, targetMuscleIds, exercises } =
      bodySchema.parse(request.body);
    const exerciseIds = exercises.map((exercise) => exercise.id);

    if (new Set(exerciseIds).size !== exerciseIds.length) {
      throw new AppError(
        "Um exercício não pode ser adicionado mais de uma vez.",
      );
    }

    if (new Set(targetMuscleIds).size !== targetMuscleIds.length) {
      throw new AppError("Um músculo não pode ser adicionado mais de uma vez.");
    }

    const [foundExercises, foundTargetMuscles] = await Promise.all([
      prisma.exercise.count({ where: { id: { in: exerciseIds } } }),
      prisma.targetMuscles.count({ where: { id: { in: targetMuscleIds } } }),
    ]);

    if (foundExercises !== exerciseIds.length) {
      throw new AppError("Um ou mais exercícios não foram encontrados.");
    }

    if (foundTargetMuscles !== targetMuscleIds.length) {
      throw new AppError("Um ou mais músculos não foram encontrados.");
    }

    const training = await prisma.training.create({
      data: {
        name,
        description: description || null,
        tag,
        difficulty,
        userId,
        TargetMuscles: {
          connect: targetMuscleIds.map((id) => ({ id })),
        },
        trainingExercises: {
          create: exercises.map((exercise) => ({
            exerciseId: exercise.id,
            sets: exercise.sets,
            repetitions: exercise.repetitions || null,
            weight: exercise.weight || null,
            interval: exercise.interval || null,
          })),
        },
      },
      include: {
        TargetMuscles: true,
        trainingExercises: { include: { exercise: true } },
      },
    });

    return response.status(201).json(training);
  }
}

export { TrainingController };
