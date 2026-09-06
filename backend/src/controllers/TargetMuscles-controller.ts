import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";

class TargetMusclesController {
  async index(request: Request, response: Response) {
    const targetMuscles = await prisma.targetMuscles.findMany({});

    return response.json(targetMuscles);
  }

  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(1),
    });

    const { name } = bodySchema.parse(request.body);

    const targetMuscle = await prisma.targetMuscles.create({
      data: { name },
    });

    return response.status(201).json(targetMuscle);
  }
}

export { TargetMusclesController };
