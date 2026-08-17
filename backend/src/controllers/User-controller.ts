import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { z } from "zod";
import { hash } from "bcrypt";
import { AppError } from "../utils/AppError.js";

class UserController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().min(3, "Coloque um nome valido."),
      email: z.email("Informe um email valido.").toLowerCase(),
      password: z
        .string()
        .min(8, "A senha deve ter pelo menos 8 caracteres.")
        .max(30, "A senha deve ter no máximo 30 caracteres."),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const userVerify = await prisma.user.findUnique({
      where: { email },
    });

    if (userVerify) {
      throw new AppError("E-mail já cadastrado");
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });

    return response.status(201).json(user);
  }
}

export { UserController };
