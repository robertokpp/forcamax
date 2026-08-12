import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure_authenticated.js";

import { userRouter } from "./user-router.js";
import { sessionsRouter } from "./sessions-router.js";

const router = Router();

//Rotas publicas

router.use("/user", userRouter);
router.use("/session", sessionsRouter);



// Routes private
router.use(ensureAuthenticated);
//router.use("/",);

export { router };
