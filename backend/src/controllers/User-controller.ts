import { Response, Request } from "express";
import { prisma } from "@/lib/prisma.js";
import bcrypt from "bcrypt";
import { z } from "zod";

class UserController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().min(3, "Coloque um nome valido."),
      email: z.email("Informe um email valido."),
      password: z.string().min(6, "Senha deve conter no mínimo 6 dígitos."),
    });

    const { name, email, password } = bodySchema.parse(request.body);
    const hashedPassword = await bcrypt.hash(password, 10);

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
