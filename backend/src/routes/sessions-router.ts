import { Router } from "express";
import { SessionsController } from "../controllers/Sessions-controller.js";
import { sessionRateLimit } from "../middlewares/rate-limit.js";

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post("/", sessionRateLimit, sessionsController.create);

export { sessionsRouter };
