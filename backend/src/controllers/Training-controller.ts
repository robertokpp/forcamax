import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";

class TrainingController {
  async index(request: Request, response: Response) {
    const id = request.user?.id

    if(!id){
      throw new AppError("Usuário não autenticado.")
    }
    
    const training = await prisma.training.findMany({
      where: { userId: id }
    });

    return response.json(training);
  }
}

export { TrainingController };
