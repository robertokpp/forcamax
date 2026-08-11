import { Router } from "express";
//import { ensureAuthenticated } from "@/middlewares/ensure_authenticated";

import { userRouter } from "./user-router.js";

const router = Router();

//Rotas publicas

router.use("/user", userRouter);

// Routes private
//router.use(ensureAuthenticated);
//router.use("/",);

export { router };
