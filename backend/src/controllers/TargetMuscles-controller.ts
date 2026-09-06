import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { string, z } from "zod";

class TargetMusclesController {
  async index(request: Request, response: Response) {
    const targetMuscles = await prisma.targetMuscles.findMany({});

    return response.json(targetMuscles);
  }

  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: string(),
    });

    const { name } = bodySchema.parse(request.body);

    await prisma.targetMuscles.create({
      data: { name },
    });

    return response.json(201);
  }
}

export { TargetMusclesController };
