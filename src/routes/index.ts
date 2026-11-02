import { Router } from "express";
import usersRouter from "./users.router.js";
import companiesRouter from "./companies.router.js";
import authRouter from "./auth.router.js";
import { healthCheck } from "../controllers/health.controller.js";
import routineRouter from "./routines.router.js";

const router = Router();

router.get("/", healthCheck);
router.use("/users", usersRouter);
router.use("/companies", companiesRouter);
router.use("/auth", authRouter);
router.use("/routines", routineRouter);

export default router;