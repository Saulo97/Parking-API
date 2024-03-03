import { Router } from "express";
import { userRoutes } from "./user";
import { parkingRouter } from "./parking";

export const router = Router()

router.use(userRoutes)
router.use(parkingRouter)