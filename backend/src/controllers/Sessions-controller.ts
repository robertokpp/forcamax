import { AppError } from "../utils/AppError.js";
import { authConfig } from "../config/auth.js";
import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { compare } from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    const userSession = await prisma.user.findUnique({
      where: { email },
      omit: {
        updatedAt: true,
        createdAt: true,
      },
    });

    if (!userSession) {
      throw new AppError("Usuário ou senha incorreto.", 401);
    }

    const userMatched = await compare(password, userSession.password);

    if (!userMatched) {
      throw new AppError("Usuário ou senha incorreto.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = jwt.sign({ sub: userSession.id }, secret, { expiresIn });

    const { password: _password, ...user } = userSession;

    return response.json({ token, user });
  }
}

export { SessionsController };
