import { rateLimit } from "express-rate-limit";

const sessionRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  // Logins bem-sucedidos não consomem o limite.
  skipSuccessfulRequests: true,

  message: {
    message:
      "Muitas tentativas de login. Aguarde 15 minutos e tente novamente.",
  },
});

const userCreationRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 3,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    message:
      "Muitas tentativas de criação de conta. Tente novamente mais tarde.",
  },
});

export { sessionRateLimit, userCreationRateLimit };