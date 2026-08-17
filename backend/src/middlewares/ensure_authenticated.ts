import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AppError } from "../utils/AppError.js";
import { authConfig } from "../config/auth.js";

interface TokenPayload extends JwtPayload {
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Invalid token", 401);
  }

  try {
    const payload = jwt.verify(token, authConfig.jwt.secret) as TokenPayload;

    if (!payload.sub) {
      throw new AppError("Invalid token", 401);
    }

    request.user = {
      id: payload.sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}

export { ensureAuthenticated };
