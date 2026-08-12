import { AppError } from "@/utils/AppError.js";
import { authConfig } from "@/config/auth.js";
import { Response, Request } from "express";
import { prisma } from "@/lib/prisma.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { sign } from "jsonwebtoken";


class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError("User or password incorrect", 401);
    }

    const userMatched = await compare(password, user.password);

    if (!userMatched) {
      throw new AppError("User or password incorrect", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      { sub: String(user.id) },
      secret as any,
      { expiresIn: expiresIn as any }
    );
    
    return response.json({ token });
  }
}
